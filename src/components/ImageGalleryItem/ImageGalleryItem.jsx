import React from 'react';
// import { Formik } from 'formik';
import '../styles.css';

const ImageGalleryItem = props => {
  // if (props.image) {
  // console.log('HAHAHHAAHHAH', props.images);
  return (
    <>
      {props.images.map(img => {
        // console.log(img);
        return (
          <li className="ImageGalleryItem" key={img.id}>
            <img
              className="ImageGalleryItem-image"
              src={img.webformatURL}
              alt={img.tags[0]}
              id={img.id}
            />
          </li>
        );
      })}
    </>
  );
  // }
};

export default ImageGalleryItem;
