from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from PIL import Image
from io import BytesIO
import random

# Instantiate app
app = Flask(__name__)
cors = CORS(app,  resources={r"/*": {"origins": "*"}})


def mock_predict_image():

    # Define possible labels
    labels = ["AI Generated", "Real Photo"]

    # Randomly choose one of the two labels
    predicted_label = random.choice(labels)

    # Generate a random confidence score between 0 and 100, both inclusive
    prediction_confidence = random.randint(0, 100)

    return predicted_label, prediction_confidence

@app.route("/api/output", methods=["POST"])
@cross_origin()
def get_image():
    
    # Make sure the image file exists in the post request
    # request.files is a dictionary like object made available by flask 
    # that can be used to access uploaded files by their keys. 
    if 'image' in request.files:
        image_file = request.files['image'] # If so, have image_file point to the file object
    else:
        # Return an error if no file is uploaded with 400 status code to signify bad request to front end
        return jsonify({"error": "No image file was included in the request"}), 400


    # Get the prediction result
    # This is temporarily just mocking the prediction
    predicted_label, prediction_confidence = mock_predict_image()
    
    # Return the JSON response containing the prediction result
    # The output list contains the predicted label and prediction confidence.
    return jsonify(
        {
            "output": [
                predicted_label,
                prediction_confidence
            ]
        }
        )

if __name__ == "__main__":
    app.run(debug=True, port=8080)