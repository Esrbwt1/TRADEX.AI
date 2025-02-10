import json
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/generate-document', methods=['POST'])
def generate_document():
    try:
        data = request.get_json()
        document_type = data.get("document_type", "trade document")
        details = data.get("details", "No additional details provided.")
        generated_text = f"This is a simulated {document_type} generated for the details: {details}"

        return jsonify({
            "success": True,
            "document": generated_text
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@app.route('/check-compliance', methods=['POST'])
def check_compliance():
    try:
        # Get JSON data from the request
        data = request.get_json()
        document = data.get("document", "")
        
        if not document:
            return jsonify({
                "success": False,
                "error": "No document provided."
            }), 400
        
        # For MVP, simulate a compliance check:
        # Here, we'll just assume that if the document's length is greater than 20 characters, it's compliant.
        if len(document) > 20:
            compliance_status = "Compliant"
            compliance_details = "Simulated check: Document meets all required standards."
        else:
            compliance_status = "Non-compliant"
            compliance_details = "Simulated check: Document seems to be missing important details."
        
        return jsonify({
            "success": True,
            "compliance_status": compliance_status,
            "details": compliance_details
        })
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500



if __name__ == '__main__':
    app.run(debug=True)