from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from PIL import Image
from resnet import resnet50
import random
import torch
from torchvision import transforms

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

def predImage(filNam):
    
    labels = ["AI Generated", "Real Photo"]
    
    model = resnet50(num_classes=1)
    
    state_dict = torch.load("./model_epoch_best.pth", map_location='cpu')
    
    model.load_state_dict(state_dict['model'])
    
    model.eval()
    
    # Transform
    trans_init = []
    
    trans = transforms.Compose(trans_init + [
    
        transforms.ToTensor(),
        
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        
    ])

    img = trans(Image.open(filNam).convert('RGB'))

    with torch.no_grad():
        in_tens = img.unsqueeze(0)
        prob = model(in_tens).sigmoid().item()
    
    if prob < .5: 
        
        return labels[0], (1 - prob) * 100
        
    else: 
        
        return labels[1], prob * 100
        
    

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
    predicted_label, prediction_confidence = predImage(image_file)
    
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
