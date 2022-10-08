import React from 'react';
import '../styles.css';

const ImageGalleryItem = props => {
  // console.log('images in ImageGalleryItem', props.images);

  return (
    <>
      <li className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={props.images.webformatURL}
          alt={props.images.tags}
        />
      </li>
    </>
  );
};

export default ImageGalleryItem;
