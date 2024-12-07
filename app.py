from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from persiantools.jdatetime import JalaliDatetime
import os
import openpyxl
from openpyxl.styles import PatternFill
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
orders_db = {}  # In-memory orders database
transfer_options = ["پست", "اسنپ باکس", "ماهکس"]  # Valid transfer types

# Ensure upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def fetch_image_url(product_url):
    try:
        response = requests.get(product_url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        figure_tag = soup.find('figure', class_='product-image')
        if not figure_tag:
            return None

        img_tag = figure_tag.find('img')
        if not img_tag:
            return None

        image_url = img_tag.get('data-zoom-image') or img_tag.get('src')
        if not image_url:
            return None

        if image_url.startswith('/'):
            image_url = f"https://www.mezonroban.com{image_url}"
        
        return image_url
    except Exception:
        return None

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400
        
    file = request.files['file']
    if not file.filename.endswith('.xlsx'):
        return jsonify({"error": "Invalid file format. Only .xlsx is allowed."}), 400

    filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filepath)
    
    try:
        wb = openpyxl.load_workbook(filepath)
        ws = wb.active
        
        # Process the Excel file and populate orders_db
        # Your existing Excel processing logic here
        
        return jsonify({
            "message": "File uploaded and processed successfully",
            "file_path": filepath
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/orders', methods=['GET'])
def get_orders():
    page = int(request.args.get('page', 1))
    size = int(request.args.get('size', 10))
    start = (page - 1) * size
    end = start + size
    
    orders_list = list(orders_db.items())[start:end]
    return jsonify({
        "page": page,
        "size": size,
        "total_pages": (len(orders_db) + size - 1) // size,
        "orders": [{"id": id, **data} for id, data in orders_list]
    })

@app.route('/api/orders/<order_id>', methods=['GET'])
def get_order(order_id):
    if order_id not in orders_db:
        return jsonify({"error": "Order not found"}), 404
    return jsonify({"id": order_id, **orders_db[order_id]})

@app.route('/api/orders/<order_id>/scan', methods=['POST'])
def scan_sku():
    data = request.json
    if not data or 'sku' not in data or 'status' not in data:
        return jsonify({"error": "Invalid request data"}), 400
    
    # Your existing scan logic here
    
    return jsonify({"message": "SKU scanned successfully"})

@app.route('/api/orders/<order_id>/transfer', methods=['POST'])
def update_transfer(order_id):
    if order_id not in orders_db:
        return jsonify({"error": "Order not found"}), 404
        
    data = request.json
    if not data or 'transfer_type' not in data:
        return jsonify({"error": "Invalid request data"}), 400
        
    transfer_type = data['transfer_type']
    if transfer_type not in transfer_options:
        return jsonify({"error": "Invalid transfer type"}), 400
    
    orders_db[order_id]['transfer_type'] = transfer_type
    orders_db[order_id]['transfer_timestamp'] = JalaliDatetime.now().strftime("%Y/%m/%d %H:%M:%S")
    
    return jsonify({
        "message": "Transfer type updated successfully",
        "order_id": order_id
    })

@app.route('/api/download', methods=['GET'])
def download_file():
    # Your existing download logic here
    return send_file(
        'path_to_generated_file.xlsx',
        as_attachment=True,
        download_name='orders.xlsx'
    )

if __name__ == '__main__':
    app.run(debug=True, port=5000)