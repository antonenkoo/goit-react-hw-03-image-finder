import React from 'react';
import '../styles.css';

const ImageGalleryItem = props => {
  // console.log('images in ImageGalleryItem', props.images);

  return (
    <>
      <li className="ImageGalleryItem" key={props.images.tags}>
        <img
          key={props.images.tags}
          className="ImageGalleryItem-image"
          src={props.images.webformatURL}
          alt={props.images.tags}
          id={props.images.id}
        />
      </li>
    </>
  );
};

export default ImageGalleryItem;
