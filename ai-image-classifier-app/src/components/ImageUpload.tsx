import React, { useState } from "react";

const ImageUpload: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Files is a FileList object. We first make sure it exist on the event's target (the input element).
    // We then make sure there is at least one image selected by the user, i.e event.target.files[0]
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]); // Update the selected in state to the image set by the user
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
      </div>
      {selectedImage && (
        <div className="preview">
          <p>Selected image:</p>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
            className="img-thumbnail"
          />
        </div>
      )}
    </div>
  );
};

// Export component so it can be used in app.tsx
export default ImageUpload;
