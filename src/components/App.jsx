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
    searchQuery: '',
  };

  handleSubmit = (searchQuery, { resetForm }) => {
    console.log('App onSubmit', searchQuery);

    const APIKEY = '28108593-121c85f8532d16352eac042b7';

    if (searchQuery) {
      fetch(
        `https://pixabay.com/api/?q=${searchQuery}&page=1&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(res => {
          // props.onSubmit(res.hits, searchQuery);
          this.setState({ searchResult: res.hits });
          this.setState({ searchQuery: searchQuery });
          // res.hits.length > 0 ? this.setState({ loadMore: true }) : null;
        });

      resetForm();
    }

    // this.setState({ searchResult: array });
    // this.setState({ serchQuery: serchQuery });

    // if (array.length > 0) {
    //   this.setState({ loadMore: true });
    // }
  };

  handleChange = e => {
    console.log('App onChange', e.target.value);
    this.setState({ value: e.target.value });
  };

  // loadMoreClick = () => {
  //   console.log('click on loadMoreBtn');
  // };

  // componentDidUpdate(prevProps, prevState) {
  //   // console.log('App prevProps => ', prevProps);
  //   // console.log('App prevState => ', prevState);

  //   if (prevState.searchResult !== this.state.searchResult) {
  //     console.log(
  //       'update app',
  //       prevState.searchResult,
  //       this.state.searchResult
  //     );
  //     return fetch(
  //       `https://pixabay.com/api/?q=${this.state.serchQuery}&page=1&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=12`
  //     )
  //       .then(res => res.json())
  //       .then(res => {
  //         // console.log(res.hits);
  //         // initialValues.searchResult = res.hits;
  //         // props.onSubmit(res.hits);
  //         // console.log(initialValues);
  //       });

  //     // return this.setState({ loadMore: true });
  //   }
  //   // this.setState({ loadMore: false });
  // }

  // componentDidMount = () => {
  //   console.log('did mount');
  // };

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
          <ImageGallery images={this.state.searchResult} />
          <LoadMoreButton
            onClick={this.loadMoreClick}
            buttonStatus={this.state.loadMore}
          />
        </>
      </div>
    );
  }
}
