import React from 'react';
import { Formik, Form, Field } from 'formik';
import '../styles.css';

///////////////////////////////////////

const Searchbar = props => {
  const initialValues = {
    searchQuery: '',
    searchResult: [],
  };

  const APIKEY = '28108593-121c85f8532d16352eac042b7';

  const handleSubmit = (values, { resetForm }) => {
    if (values.searchQuery) {
      fetch(
        `https://pixabay.com/api/?q=${values.serchQuery}&page=1&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(res => {
          initialValues.searchResult = res.hits;
          props.onSubmit(res.hits, values.serchQuery);
        });

      resetForm();
    }
    return null;
  };

  // const handleChange = () => {
  //   console.log('object');
  // };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <header className="Searchbar">
        <Form className="SearchForm">
          <button className="SearchForm-button" type="submit">
            <span className="SearchForm-button-label"></span>
          </button>
          <Field
            autoComplete="off"
            className="SearchForm-input"
            type="input"
            name="serchQuery"
            onChange={props.onChange}
            value={props.value}
          />
        </Form>
      </header>
    </Formik>
  );
};

export default Searchbar;
