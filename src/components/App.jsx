import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreButton from './Button/Button';
import FetchFn from './api/api';

import './styles.css';
import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    page: 1,
    searchResult: [],
    loadMore: false,
    value: '',
    loader: false,
  };

  componentDidUpdate(prevProps, prevState) {
    // this.setState(this.setState({ loader: false }));
    // if (prevState.searchResult !== this.state.searchResult) {
    //   this.setState(this.setState({ loader: false }));
    // }
  }

  handleSubmit = (searchQuery, page) => {
    // const APIKEY = '28108593-121c85f8532d16352eac042b7';

    if (searchQuery) {
      FetchFn(searchQuery, page).then(res => {
        this.setState({
          searchResult: [...this.state.searchResult, ...res.hits],
          page: this.state.page + 1,
          loader: true,
        }); 

        if (res.hits.length > 11 && res.totalHits > 12) {
          this.setState({ loadMore: true });
        }
      });
    }
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  loadMoreClick = e => {
    this.handleSubmit(this.state.value, this.state.page);
  };

  componentDidMount = () => {
    // console.log('did mount');
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
            />
          )}

          <LoadMoreButton
            onClick={this.loadMoreClick}
            buttonStatus={this.state.loadMore}
            images={this.state.searchResult}
          />
        </>
      </div>
    );
  }
}
