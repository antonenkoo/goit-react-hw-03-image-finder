import React from 'react';
import '../styles.css';

const ImageGalleryItem = props => {
  return (
    <>
      <li className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={props.images.webformatURL}
          alt={props.images.tags}
          onClick={() => props.onClick(props.images.largeImageURL)}
        />
      </li>
    </>
  );
};

export default ImageGalleryItem;
