// Import react for creating the app component and useState hook for managing its state
import React, { useState } from "react";

// Import the ImageUpload component for handling image uploads and getting classification data
import ImageUpload from "./components/ImageUpload";

// Import the ClassificationResult component for neatly displaying the classification results
import ClassificationResult from "./components/ClassificationResult";

// Import to use Font Awesome Brain Icon next to title
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain } from "@fortawesome/free-solid-svg-icons";

// Define the App component as a functional component
const App: React.FC = () => {
  // We use the useState hook to create the classificationData state variable
  // responsible for storing data about the predicted image,
  // predicted label, and the image url.
  // The variable can be either type null or a data object with the above
  // properties just mentioned.
  const [classificationData, setClassificationData] = useState<{
    imageUrl: string;
    predictedLabel: string;
    predictionConfidence: number;
  } | null>(null);

  // App additionally returns JSX representing the UI of the application.
  // Everything is wrappped in a bootstrap container class for styling, centering, and padding.
  // It contains the website header, the ImageUpload component for uploadng images,
  // and conditionally renders the ClassificationResult if data is available.
  return (
    <div className="container my-5">
      <h1 className="text-center text-primary mb-4">
        AI Image Classification App <FontAwesomeIcon icon={faBrain} />
      </h1>
      <div>
        {/*
          The ImageUpload component is rendered with its onUpload prop set to 
          the setClassificationData function. This means when an image has been uploaded
          and safely processed, setClassificationData will be called with the 
          processed data, updating classificationData in state with the result.
        */}
        <ImageUpload onUpload={setClassificationData} />
        {/*
          If classification data exists, render it through the ClassificationResult component.
          Otherwise, don't display it.
        */}
        {classificationData && (
          // ClassificationResult component is rendered with the classificationData properties
          // as its props.
          <div className="d-flex justify-content-center align-items-center mt-5">
            <ClassificationResult
              imageUrl={classificationData.imageUrl}
              predictedLabel={classificationData.predictedLabel}
              predictionConfidence={classificationData.predictionConfidence}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Export the App component as the default export
// so it's available for import in the entry point of the app, main.tsx
export default App;
