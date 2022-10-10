import React, { Component } from 'react';

import '../styles.css';

class Modal extends Component {
  componentDidMount() {
    console.log('modal window did mount');

    console.log(this.props.largeImage);

    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    console.log('modal window was unmount :(');

    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log('нажали ESC нужно закрыть мoдалку');
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    console.log('кдикнули в бекдроп');
    console.log(e.target, e.currentTarget);

    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">
          <img src={this.props.largeImage} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
