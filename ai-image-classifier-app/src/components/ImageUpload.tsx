// Import React object for using JSX and useState hook for adding state to functional components
import React, { useState } from "react";

// Declare an interface named ImageUploadProps
// This allows us to define a contract for a certain structure of an object.
// Essentially we can type check the props that the ImageUpload component expects to recieve.
// onUpload is a property of the below interface meaning the component will expect it as a prop.
// It is a function that takes one argument which is a data object.
// The data object contains the following properties
// imageUrl: A string representing the url of the uploaded image
// predictedLabel: The label given to the image by the ML backend
// predictionConfidence: How confident the ML model is in its prediction

interface ImageUploadProps {
  onUpload: (data: {
    imageUrl: string;
    predictedLabel: string;
    predictionConfidence: number;
  }) => void;
}

// Define a react functional component called ImageUpload using the ImageUploadProps interface.
// The onUpload function passed from the parent component is destructed from the props object
// so it can be accessed directly.
const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  // Use the useState hook to create a state variable to keep track of the
  // user's image selection. It is additionally used to determine whether to
  // conditionally render the image preview and the upload button.
  // Everytime the user sets a new image file, the setSelectedImage function is called
  // which updates the selectedImage state variable.
  // This change in state variable causes react to automatically re-render the component
  // with the new image. We specify the selectedImage state variable can be
  // of either type null or a file object depending on whether an image has been uploaded.
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // Event handler designed to respond to changes in the file input element within
  // the ImageUpload component. The parameter represents the event object
  // eventually passed to the event handler by react
  // while React.ChangeEvent<HTMLInputElement> describes the structure
  // of an event object for a change on an HTMLInputElement.
  // This type of event contains a target property, target, which we can
  // use to access the image input.
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // The files property of the event.target object is a FileList object.
    // We first make sure it exists on the the input element and then ensure
    // there is at least one image selected by the user, i.e event.target.files[0]
    // Since our file input is only configured to accept one image,
    // there will never be more than one.
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]); // Update the selected image in state to the image set by the user
    }
  };

  // Upload Image to BackEnd for processing
  const handleUpload = () => {
    // First make sure an image has been uploaded by the user.
    // Note: This function never should have been called if selectedImage is null.
    if (selectedImage) {
      // For now, perform mock processing until backend is implemented
      // Print to console noting selected image is being sent to backend and
      // processing has begun.
      console.log("Uploading image", selectedImage.name);

      // Randomly choose between "AI Generated" and "Real Photo" to mimick prediction
      const labels = ["AI Generated", "Real Photo"];

      // Math.random returns a number in the range [0, 1)
      // Multiplying this number by the length of the labels array
      // gives a floating point number between [0, length of labels array - 1]
      // taking the floor of this number gives a valid index representing our random choice.
      const predictedLabel = labels[Math.floor(Math.random() * labels.length)];

      // Generate a random confidence score between 0 and 100
      // Same logic but multiplying by 101 gives a value between 0 and (101 - 1), both inclusive.
      const predictedConfidence = Math.floor(Math.random() * 101);

      // Store our random mock response data in an object
      // We store the image data in the same format as the object argument
      // expected by the onUpload function of the app component.
      const mockResponse = {
        imageUrl: URL.createObjectURL(selectedImage),
        predictedLabel: predictedLabel,
        predictionConfidence: predictedConfidence,
      };

      // Log mock response data to make sure it looks as we expect
      console.log("Mock response:", mockResponse);

      // Propogate classification data to app component so it can be passed to
      // the classification result component
      onUpload(mockResponse);
    }
  };

  // Return JSX
  return (
    // All JSX is wrapped in a div with the bootstrap container class
    // The container class certains the content and applies some padding.
    // Additionally some margin is added to the top.
    <div className="container mt-3">
      {/* 
        Div wrapping the File Input label, the file input and the upload button. 
        Some margin is added to the bottom between this div and the image preview.
      */}
      <div className="mb-3">
        <label htmlFor="imageUpload" className="form-label">
          Upload Image
        </label>
        <input
          className="form-control"
          type="file"
          id="imageUpload"
          onChange={handleImageChange} // Image changes are handled by the handleImageChange function
        />
        <button
          className="btn btn-primary mt-2"
          onClick={handleUpload} // To begin the upload classification process, the handleUpload function is called
          disabled={!selectedImage} // If selected image is null, disable upload button
        >
          Upload
        </button>
      </div>
      {/*
        If an image is selected, then preview it. Label and a div 
        containing the formatting for the image are grouped together
        in a preview div. 
      */}
      {selectedImage && (
        <div className="preview">
          <p>Selected image:</p>
          <div className="d-flex justify-content-center mt-3">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Preview"
              className="img-thumbnail"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Export component so it can be used in app.tsx
export default ImageUpload;
