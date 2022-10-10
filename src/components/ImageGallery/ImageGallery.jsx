import React from 'react';
import { Formik } from 'formik';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid';

import '../styles.css';

const ImageGalery = props => {
  return (
    <Formik>
      <ul className="ImageGallery">
        {props.images.map(img => (
          <ImageGalleryItem
            images={img}
            key={nanoid()}
            onClick={props.onClick}
          />
        ))}
      </ul>
    </Formik>
  );
};

export default ImageGalery;
