import React, { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import ClassificationResult from "./components/ClassificationResult";

const App: React.FC = () => {
  const [classificationData, setClassificationData] = useState<{
    imageUrl: string;
    predictedLabel: string;
    predictionConfidence: number;
  } | null>(null);

  return (
    <div className="container my-5 container my-5">
      <h1 className="text-center text-primary mb-4">
        AI Image Classification App
      </h1>
      <div>
        <ImageUpload onUpload={setClassificationData} />
        {classificationData && (
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

export default App;
