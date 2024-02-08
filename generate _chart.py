from flask import Flask, request, jsonify, send_file


import pandas as pd
import matplotlib.pyplot as plt

from io import StringIO, BytesIO
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from flask import send_from_directory
from werkzeug.utils import secure_filename
import os
from io import TextIOWrapper
import csv
from datetime import datetime
from collections import defaultdict


app = Flask(__name__)
CORS(app)



UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'csv'}


# Setup the Flask-JWT-Extended extension
app.config['JWT_SECRET_KEY'] = 'secret'  
jwt = JWTManager(app)



@app.route('/upload-sales/<user_id>', methods=['POST'])
@jwt_required()
def upload_sales_data(user_id):
    try:
        print("Inside upload_sales")
        user_id = get_jwt_identity()
        print(user_id, "Hello")
        file = request.files['sales_data']

        if file.filename.endswith('.csv'):
            # Read CSV file
            print("Ins")
            csv_reader = csv.reader(TextIOWrapper(file.stream, 'utf-8'))
            header = next(csv_reader)  # Skip the header

            # Assuming your CSV has 'Order Date' and 'Sales' columns
            order_date_index = header.index('Order Date')
            sales_index = header.index('Sales')
            print("Order Date", order_date_index, sales_index)
            for row in csv_reader:
                print(row)
                order_date_str = row[order_date_index].strip()
                sales_str = row[sales_index].strip()
                print("Sale Date", sales_str, order_date_str)
                order_date = datetime.strptime(order_date_str, '%m/%d/%Y').date()

                sales = float(sales_str.replace(',', ''))

                print(order_date, sales)
                # Store data in the database
                sales_data = SalesData(user_id=user_id, order_date=order_date, sales=sales) 
                print(sales_data)
                db.session.add(sales_data)

            db.session.commit()

            return jsonify({'message': 'Sales data uploaded successfully'}), 200
        else:
            return jsonify({'error': 'Invalid file format. Please upload a CSV file.'}), 400

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/generate-sales-chart', methods=['POST'])
@jwt_required()
def generate_sales_chart():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()

        # Retrieve sales data based on the selected date range
        start_date = datetime.strptime(data['startDate'], '%Y-%m-%d').date()
        end_date = datetime.strptime(data['endDate'], '%Y-%m-%d').date()

        print(start_date, end_date)

        sales_data = SalesData.query.filter_by(user_id=user_id) \
                                   .filter(SalesData.order_date.between(start_date, end_date)) \
                                   .all()

        print(sales_data)
        # Calculate daily total sales
        daily_totals = defaultdict(float)
        for sale in sales_data:
            daily_totals[sale.order_date] += sale.sales

        # Extract dates and total sales from the calculated daily totals
        dates = list(daily_totals.keys())
        total_sales = list(daily_totals.values())

        # Convert dates to ordinal representation
        date_ordinals = [date.toordinal() for date in dates]

        # Generate sales chart using matplotlib in non-interactive mode
        plt.switch_backend('agg')  # Use non-interactive backend
        fig, ax = plt.subplots(figsize=(10, 6))
        ax.plot(date_ordinals, total_sales, marker='o', linestyle='-', color='blue')
        ax.set_title('Daily Total Sales Chart')
        ax.set_xlabel('Date')
        ax.set_ylabel('Total Sales')
        ax.set_xticks(date_ordinals)  # Set tick locations to be the original dates
        ax.set_xticklabels(dates)  # Set tick labels to be the original dates
        ax.tick_params(axis='x', rotation=45)
        fig.tight_layout()

        # Save the chart image as BytesIO
        chart_image = BytesIO()
        fig.savefig(chart_image, format='png')
        plt.close(fig)  # Close the figure

        # Send the chart image to the frontend
        chart_image.seek(0)
        return send_file(chart_image, mimetype='image/png')

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
