import React, { useState, useEffect } from "react";
import axios from "axios";

interface ImageUploadProps {
  onUpload: (data: {
    imageUrl: string;
    predictedLabel: string;
    predictionConfidence: number;
  }) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Files is a FileList object. We first make sure it exist on the event's target (the input element).
    // We then make sure there is at least one image selected by the user, i.e event.target.files[0]
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]); // Update the selected in state to the image set by the user
    }
  };
  

  //I'll comment this later.
  async function call_api(selected_image: File) {

    var body = new FormData()
    body.append('image',selected_image)

    const server = "http://localhost:8080/api/output"
    let send = await axios.post(server,
      URL.createObjectURL(selected_image)
    )
    console.log(send.data)

    let response = await axios.get(server);
    console.log(response.data.output)

    return response.data.output
  }


  const handleUpload = async () => {
    // Upload Image to BackEnd for processing
    if (selectedImage) {
      // For now, perform mock processing and log to console
      console.log("Uploading image", selectedImage.name);

      // get API response in the form of an array. We assign the result here, 
      // and use that result later and call 'await', all to force the program to wait
      // for an output to produce (so that it doesn't show an empty prediction)
      let result = await call_api(selectedImage)

      // Randomly choose between "AI Generated" and "Real Photo" to mimick prediction
      const labels = ["AI Generated", "Real Photo", "Squilliam Fancyson"];

      // Math.random returns a number in the range [0, 1)
      // Multiplying this number by the length of the labels array
      // gives a floating point number between [0, length of labels array - 1]
      // taking the floor of this number gives a valid index representing our random choice.
      //const predictedLabel = labels[Math.floor(Math.random() * labels.length)];
      const predictedLabel = result[0]

      // Generate a random confidence score between 0 and 100
      // Same logic but multiplying by 101 gives a value between 0 and (101 - 1), both inclusive.
      //const predictedConfidence = Math.floor(Math.random() * 101);
      const predictedConfidence = result[1]
      

      // Store our random mock response data in an object
      const mockResponse = {
        imageUrl: URL.createObjectURL(selectedImage),
        predictedLabel: predictedLabel,
        predictionConfidence: predictedConfidence,
      };

      // Log mock response data to make sure it looks as we expect
      console.log("Mock response:", mockResponse);

      // Propogate classification data to app component so it can be passed to
      // the classification result component
      onUpload({
        imageUrl: URL.createObjectURL(selectedImage),
        predictedLabel: predictedLabel,
        predictionConfidence: predictedConfidence,
      });
    }
  };

  // Return JSX
  return (
    <div className="container mt-3">
      <div className="mb-3">
        <label htmlFor="imageUpload" className="form-label">
          Upload Image
        </label>
        <input
          className="form-control"
          type="file"
          id="imageUpload"
          onChange={handleImageChange}
        />
        <button
          className="btn btn-primary mt-2"
          onClick={handleUpload}
          disabled={!selectedImage} // If selected image is null, disable upload button
        >
          Upload
        </button>
      </div>
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
