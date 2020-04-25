/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'formik';

class ErrorFocus extends Component {
  componentDidUpdate(prevProps) {
    const { isSubmitting, isValidating, errors } = prevProps.formik;
    const keys = Object.keys(errors);
    if (keys.length > 0 && isSubmitting && !isValidating) {
      const selector = `[name="${keys[0]}"]`;
      const errorElement = document.querySelector(selector);
      if (errorElement) {
        errorElement.focus();
        errorElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  }

  render() {
    return null;
  }
}

export default connect(ErrorFocus);
