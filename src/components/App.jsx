import React, { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreButton from './Button/Button';
import FetchFn from './api/api';
import Modal from './Modal/Modal';

import './styles.css';
import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    value: 'sad',
    page: 1,
    searchResult: [],
    loadMore: false,
    loader: false,
    modalLargeImage: '',
  };

  handleSubmit = async (searchQuery, page) => {
    try {
      this.setState({ loader: true });

      return await FetchFn(searchQuery, page).then(res => {
        this.setState({
          searchResult: [...this.state.searchResult, ...res.hits],
          page: this.state.page + 1,
        });

        if (res.hits.length > 11 && res.totalHits > 12) {
          this.setState({ loadMore: true });
        }
      });
    } catch (error) {
    } finally {
      this.setState({ loader: false });
    }
  };

  handleClick = largeImage => {
    this.setState({ modalLargeImage: largeImage, modal: true });
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  loadMoreClick = () => {
    this.handleSubmit(this.state.value, this.state.page);
  };

  modalClose = () => {
    this.setState({ modal: false });
  };

  render() {
    return (
      <div className="App">
        <>
          <Searchbar
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
            page={this.state.page}
            value={this.state.value}
          />
          {this.state.loader ? (
            <Loader />
          ) : (
            <ImageGallery
              images={this.state.searchResult}
              page={this.state.page}
              onClick={this.handleClick}
            />
          )}

          <LoadMoreButton
            onClick={this.loadMoreClick}
            buttonStatus={this.state.loadMore}
            images={this.state.searchResult}
          />

          {this.state.modal && (
            <Modal
              largeImage={this.state.modalLargeImage}
              onClose={this.modalClose}
            />
          )}
        </>
      </div>
    );
  }
}
