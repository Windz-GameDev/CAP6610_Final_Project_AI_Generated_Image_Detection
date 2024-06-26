# AI Image Classifier App

## Overview

The AI Image Classifier App is a web application designed to classify images uploaded by users. It leverages machine learning to analyze images and predict whether they are AI-generated or real photos. The application is built using React for the front end, TypeScript for type-safe code, Vite for bundling and serving the application, and Python for the machine-learning model implementation.

## Technologies Used

- **Frontend**: React, TypeScript
- **Backend**: Python, Flask
- **Bundling and Serving**: Vite
- **Machine Learning Model**: Python
- **Styling**: Bootstrap (with Bootswatch themes)

## Features

- **Image Upload**: Users can upload images to be classified.
- **Classification Result**: The application displays the classification result, including the predicted label and the confidence score.
- **Error Handling**: The application handles errors gracefully, showing an error popup if the image upload fails.

## Setup

### Prerequisites

- Node.js and npm installed on your machine.
- Python installed on your machine.

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and then the `ai-image-classifier-app` folder.
3. Install the frontend dependencies by running `npm install` in the project root directory.
4. Install the backend dependencies by running `pip install -r requirements.txt` in the `src` directory.
5. Download our model from [HuggingFace](https://huggingface.co/AaronStudent/CAP6610_Final_Project_Model_AI_Image_Classifier/resolve/main/model_epoch_best.pth?download=true) and place it in the `src` directory.

### Running the Application

1. Start the backend server by navigating to the `src` directory and running `python main.py`. Make sure all installation steps have been completed, or you will encounter issues. Note: If you try to run it while your terminal is in a different directory, the server may crash when uploading an image from the front end.
2. Start the frontend server by running `npm run dev` in the `ai-image-classifier-app` folder.
   - Note: The backend should be run before the frontend because the latter requires it to function properly.
3. Open your web browser and navigate to `http://localhost:5173/` to access the application.

## Usage

1. **Upload an Image**: Click on the "Upload Image" button and select an image file from your computer.
2. **Classify the Image**: Click on the "Upload" button to send the image to the server for classification.
3. **View the Result**: Once the image is classified, the application will display the classification result, including whether the image is AI-generated or a real photo and the confidence score.

## Contributing

Contributions are welcome! If you find bugs or have suggestions for improvements, please feel free to submit a pull request or open an issue.

## Acknowledgments

The AI model was trained using framework [CNNDetection](https://github.com/peterwang512/CNNDetection) along with borrowing their implementation of ResNet-50, with this [dataset](https://universe.roboflow.com/itml-project/itml-final-project-ai-versus-non-ai-dataset/browse?queryText=&pageSize=50&startingIndex=0&browseQuery=true) as ResNet-50 fine-tuning data.

https://www.phind.com/, an AI search engine, was used to help write some of the custom CSS of the application.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
