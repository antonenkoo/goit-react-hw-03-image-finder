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
    value: '',
    page: 1,
    currentSearchQuery: '',
    searchResult: [],
    loadMore: false,
    loader: false,
    modalLargeImage: '',
  };

  handleSubmit = async (searchQuery, page) => {
    if (this.state.currentSearchQuery !== searchQuery) {
      try {
        this.setState({ loader: true });
        return await FetchFn(searchQuery, 1).then(res => {
          this.setState({
            searchResult: res.hits,
            page: this.state.page + 1,
            currentSearchQuery: searchQuery,
          });

          if (res.hits.length > 11 && res.totalHits > 12) {
            this.setState({ loadMore: true });
          }
        });
      } catch (error) {
      } finally {
        this.setState({ loader: false });
      }
    }

    try {
      this.setState({ loader: true });
      return await FetchFn(searchQuery, page).then(res => {
        this.setState({
          searchResult: [...this.state.searchResult, ...res.hits],
          page: this.state.page + 1,
          currentSearchQuery: searchQuery,
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

  loadMoreClick = async () => {
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

          <ImageGallery
            images={this.state.searchResult}
            page={this.state.page}
            onClick={this.handleClick}
          />
          {this.state.loader ? (
            <Loader />
          ) : (
            <LoadMoreButton
              onClick={this.loadMoreClick}
              buttonStatus={this.state.loadMore}
              images={this.state.searchResult}
            />
          )}

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
