import React from "react";
import "./Banner.css"; // Import custom CSS styling for banner

// Define type for props
interface BannerProps {
  slogan: string; // Slogan text to display passed as a prop
}

const Banner: React.FC<BannerProps> = ({ slogan }) => {
  return (
    <div className="banner">
      <h1>{slogan}</h1>
    </div>
  );
};

// Export banner component so it can be used on home page
export default Banner;
