import React from "react";
import ImageUpload from "./components/ImageUpload";
import ClassificationResult from "./components/ClassificationResult";

const App: React.FC = () => {
  return (
    <div>
      <ImageUpload />
      {/* Once an image is uploaded and classified, display the results*/}
      {/* <ClassificationResult imageUrl={imageUrl} label={label} confidence={confidence}/> */}
    </div>
  );
};

export default App;
