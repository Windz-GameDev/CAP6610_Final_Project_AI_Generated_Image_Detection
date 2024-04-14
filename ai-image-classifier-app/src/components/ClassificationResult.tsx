import React, { useState } from "react";

interface ClassificationResultProps {
  imageUrl: string;
  predictedLabel: string;
  predictionConfidence: number;
}

// Functional component expecting props matching the ClassificationResultProps interface
const ClassificationResult: React.FC<ClassificationResultProps> = ({
  imageUrl,
  predictedLabel,
  predictionConfidence,
}) => {
  // Component logic and JSX goes here
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={imageUrl} className="card-img-top" alt="Classified Image" />
      <div className="card-body">
        <h5 className="card-title">Classification: {predictedLabel}</h5>
        <p className="card-text">Confidence: {predictionConfidence}</p>
      </div>
    </div>
  );
};

export default ClassificationResult;
