// Import React to create functional component for the classification card
import React from "react";

// Define the structure of the props object for the Classification component
interface ClassificationResultProps {
  // URL of our classified image
  imageUrl: string;

  // Label predicted by the ML model for the image, A.I. generated or no
  predictedLabel: string;

  // Confidence score which represents how certain the model is in its prediction
  predictionConfidence: number;
}

// Functional component that displays the result of the image classification
// performed in the backend. It expects props matching the ClassificationResultProps interface.
// The props object is destructed so its properties can be accessed directly.
const ClassificationResult: React.FC<ClassificationResultProps> = ({
  imageUrl,
  predictedLabel,
  predictionConfidence,
}) => {
  // The component returns JSX representing the UI for displaying the classification card.
  // The card contains a smaller image preview, the predicted label from the model, and it's confidence score.
  return (
    <div className="d-flex flex-column align-items-center">
      <p>Result:</p>
      <div className="card">
        {/*
        Image preview is displayed at the top of the card.
        The src attribute is set to the imageUrl prop, while "Classified Image"
        is displayed as alternative text for accessability. 
        The card body contains the card title and text.
        */}

        <img
          src={imageUrl}
          className="card-img-top"
          alt="Classified Image"
          style={{
            maxWidth: "500px",
            maxHeight: "500px",
          }}
        />
        <div className="card-body">
          {/*
          Predicted label is displayed for the card title while the confidence score is displayed
          as the text of the card.
        */}
          <h5 className="card-title">Classification: {predictedLabel}</h5>
          <p className="card-text">Confidence: {predictionConfidence}%</p>
        </div>
      </div>
    </div>
  );
};

// Export the ClassificationResult so it can be imported in App.tsx
export default ClassificationResult;
