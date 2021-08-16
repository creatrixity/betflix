import { useState } from "react";
import Loader from "./Loader";

const LazyLoadedImage = ({ src, ...rest }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const image = new Image();
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  image.src = src;
  image.onload = handleImageLoad;

  return (
    <>
      {imageLoaded ? (
        <img alt={""} onLoad={handleImageLoad} src={src} {...rest} />
      ) : (
        <Loader />
      )}
    </>
  );
};

export default LazyLoadedImage;
