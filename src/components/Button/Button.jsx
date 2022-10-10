import React from 'react';
import '../styles.css';

const LoadMoreButton = props => {
  return props.buttonStatus ? (
    <button className="Button" onClick={props.onClick}>
      Load more
    </button>
  ) : null;
};

export default LoadMoreButton;
