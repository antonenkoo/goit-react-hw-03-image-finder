import React from 'react';
import { Formik } from 'formik';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import '../styles.css';

const ImageGalery = props => {
  // console.log('imgs in ImageGallery', props.images);
  return (
    <Formik>
      <ul className="ImageGallery">
        {props.images.map(img => (
          <ImageGalleryItem images={img} />
        ))}
      </ul>
    </Formik>
  );
};

export default ImageGalery;
