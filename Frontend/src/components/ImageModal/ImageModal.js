import React from "react";
import ModalImage from "react-modal-image";

const ImageModal = ({ imageUrl, className }) => {
  return (
    <ModalImage
      small={imageUrl}
      large={imageUrl}
      hideDownload="true"
      hideZoom="true"
    />
  );
};

export default ImageModal;
