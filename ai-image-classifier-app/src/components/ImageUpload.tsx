// Import React object for using JSX and useState hook for adding state to functional components
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import Modal from "react-bootstrap/Modal";

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

  // State for managing error popup visibility
  // showErrorPopup is a boolean value initially set to false.
  // It will be set to true in the handleUpload function
  // when an upload to the server fails.
  const [showErrorPopup, setShowErrorPopup] = useState<boolean>(false);

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

  // Define async function to call API with the selected image in state
  async function call_api(selected_image: File) {
    // Create a FormData object to hold our image file
    var formData = new FormData();

    // Append the selected image file to the FormData object with the key "image"
    formData.append("image", selected_image);

    // Define URL of the ML server which will process the image upload
    const server = "http://localhost:8080/api/output";

    // Kris, slightly modified your code to only make one server connection request
    // Use axios to send a POST request to the defined server with the FormData object as the body
    // This will send the image file for processing and get the classification
    // result when processing is completed

    try {
      let serverResponse = await axios.post(server, formData);

      // Log response data (JSON object) from server for debugging purposes
      console.log(serverResponse.data);

      //  Return the extracted output array stored in the JSON object response from the server
      return serverResponse.data.output;
    } catch (error) {
      // Use type guard to check if error is an AxiosError object
      // This check is added to avoid TypeScript warnings
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          // Log error message returned from server to the console
          console.error("Error:", error.response.data.error);
        } else {
          // Handle other unexpected errors and print them to the console
          console.error("An unexpected error occured:", error);
        }
      }

      return null;
    }
  }

  // Upload Image to BackEnd for processing
  const handleUpload = async () => {
    // First make sure an image has been uploaded by the user.
    // Note: This function never should have been called if selectedImage is null.
    if (selectedImage) {
      // Log name of image to be processed
      console.log("Uploading image", selectedImage.name);

      // Get API response in the form of an array. We assign the result here,
      // and use that result later and call 'await', all to force the program to wait
      // for an output to produce (so that it doesn't show an empty prediction)
      let result = await call_api(selectedImage);

      // Image failed to be transmitted to the server
      if (result === null) {
        console.error("Upload failed");
        setShowErrorPopup(true); // Show the error popup
        console.log(showErrorPopup);
        return null;
      }

      const predictedLabel = result[0];

      const predictedConfidence = result[1];

      // Store our response data in an object
      // We store the image data in the same format as the object argument
      // expected by the onUpload function of the app component.
      const response = {
        imageUrl: URL.createObjectURL(selectedImage),
        predictedLabel: predictedLabel,
        predictionConfidence: predictedConfidence,
      };

      // Log response data to make sure it looks as we expect
      console.log("Response:", response);

      // Propogate classification data to app component so it can be passed to
      // the classification result component
      onUpload(response);
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
          type="button"
          className="btn btn-primary mt-2"
          onClick={handleUpload} // To begin the upload classification process, the handleUpload function is called
          disabled={!selectedImage} // If selected image is null, disable upload button
        >
          Upload
        </button>
      </div>
      {/*
        If an image is selected, then preview it.
      */}
      {selectedImage && (
        <div className="d-flex flex-column align-items-center preview justify-content-center">
          <p>Image Preview:</p>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
            className="img-thumbnail mt-3"
            style={{
              maxWidth: "500px",
              maxHeight: "500px",
              objectFit: "contain",
            }}
          />
        </div>
      )}
      {/* 
      React-Bootstrap modal for Error Popup 
      It will display when an upload fails.
      It will be disabled when user clicks out of the modal, 
      or either of the two close buttons.
      */}
      <Modal show={showErrorPopup} onHide={() => setShowErrorPopup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Image upload failed. Please try again.</Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowErrorPopup(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

// Export component so it can be used in app.tsx
export default ImageUpload;
