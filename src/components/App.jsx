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
    // console.log(this.state.searchResult, prevState.searchResult);
  }

  handleSubmit = (searchQuery, page) => {
    console.log('App onSubmit =', searchQuery);

    const APIKEY = '28108593-121c85f8532d16352eac042b7';

    // if (this.state.searchResult === searchQuery) {
    if (searchQuery) {
      fetch(
        `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(res => {
          console.log(res.hits.length > 11 && res.totalHits > 12);
          this.setState({
            searchResult: [...this.state.searchResult, ...res.hits],
          });
          this.setState({ page: this.state.page + 1 });

          if (res.hits.length > 11 && res.totalHits > 12) {
            this.setState({ loadMore: true });
          }

          // console.log(this.state.searchResult);
        });
    }
    // } else {
    // this.setState({
    //   page: 1,
    //   searchResult: [],
    //   loadMore: false,
    //   value: '',
    // });
    // }
  };

  handleChange = e => {
    // console.log('App onChange', e.target.value);
    this.setState({ value: e.target.value });
  };

  loadMoreClick = e => {
    // console.log('click on loadMoreBtn', this.state.page);

    // if (this.state.searchResult !== this.state.value) {
    //   return this.setState({
    //     page: 1,
    //     searchResult: [],
    //     loadMore: false,
    //     value: '',
    //   });
    // }
    this.handleSubmit(this.state.value, this.state.page);
  };

  // componentDidUpdate(prevProps, prevState) {}

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
