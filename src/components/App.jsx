import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import './styles.css';
import LoadMoreButton from './Button/Button';

export class App extends Component {
  state = {
    page: 1,
    searchResult: [],
    loadMore: false,
    value: '',
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log(this.state.searchResult.length, 'in update');
    // console.log(this.state.searchResult.length > 1);
    // this.state.searchResult.length > 1
    //   ? this.setState({ loadMore: true })
    //   : this.setState({ loadMore: false });
    // if (prevState.searchResult.length !== this.state.searchResult.length) {
    //   if (this.state.searchResult.length > 1) {
    //     this.setState({ loadMore: true });
    //   }
    //   this.setState({ loadMore: false });
    // }
  }

  handleSubmit = (searchQuery, page) => {
    // console.log('App onSubmit =', searchQuery);

    const APIKEY = '28108593-121c85f8532d16352eac042b7';

    if (searchQuery) {
      fetch(
        `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(res => {
          this.setState({
            searchResult: [...this.state.searchResult, ...res.hits],
          });
          this.setState({ page: this.state.page + 1 });

          if (res.hits.length > 11 && res.totalHits > 12) {
            this.setState({ loadMore: true });
          }
        });
      // console.log(this.state.searchResult.length, 'in submit ');
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
          <ImageGallery
            images={this.state.searchResult}
            page={this.state.page}
          />
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
