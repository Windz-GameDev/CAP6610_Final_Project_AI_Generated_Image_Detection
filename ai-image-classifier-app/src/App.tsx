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
    <div>
      <ImageUpload onUpload={setClassificationData} />
      {classificationData && (
        <ClassificationResult
          imageUrl={classificationData.imageUrl}
          predictedLabel={classificationData.predictedLabel}
          predictionConfidence={classificationData.predictionConfidence}
        />
      )}
    </div>
  );
};

export default App;
