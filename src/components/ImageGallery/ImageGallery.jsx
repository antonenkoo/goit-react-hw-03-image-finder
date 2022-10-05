import React, { Component } from 'react';
import { Formik } from 'formik';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import '../styles.css';

class ImageGalery extends Component {
  render() {
    return (
      <Formik>
        <ul className="ImageGallery">
          <ImageGalleryItem images={this.props.images} />
        </ul>
      </Formik>
    );
  }
}

export default ImageGalery;
