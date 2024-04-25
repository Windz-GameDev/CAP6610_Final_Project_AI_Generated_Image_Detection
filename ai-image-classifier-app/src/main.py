from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from PIL import Image
from io import BytesIO
import requests

# Instantiate app
app = Flask(__name__)
cors = CORS(app,  resources={r"/*": {"origins": "*"}})

@app.route("/api/output", methods=["POST"])
@cross_origin()
def get_image():
    data = request.get_data()

    response = data
    print("-----------------------------------------------")
    response_str = response[5: ]
    print(f'Response: {response_str}')
    return response_str


@app.route('/api/output', methods=['GET'])
@cross_origin()
def give_answer():
    return jsonify(
        {
            "output": [
                "AI_Generated",
                "69"
            ]
        }
        )


if __name__ == "__main__":
    app.run(debug=True, port=8080)