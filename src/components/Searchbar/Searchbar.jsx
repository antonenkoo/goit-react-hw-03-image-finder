import React from 'react';
import { Formik, Form, Field } from 'formik';
import '../styles.css';

/////////////////////////////////////////////////////

const Searchbar = props => {
  const initialValues = {
    searchQuery: props.value,
    searchResult: [],
    page: props.page,
  };

  const handleSubmit = (values, { resetForm }) => {
    values = initialValues.searchQuery;
    if (values) {
      props.onSubmit(values, initialValues.page);
    }
    resetForm();
    return null;
  };

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
            name="searchQuery"
            value={props.value}
            onChange={props.onChange}
          />
        </Form>
      </header>
    </Formik>
  );
};

export default Searchbar;
