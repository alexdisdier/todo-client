/* eslint-disable react/display-name */
/* 
  HOC: a Higher Order Component is a function that accepts a component as paramater and returns an augmented version of this component. Often used in React libraries.
  It wraps a component and returns an enhanced component. 
  hocFactory:: W: React.Component => E: React.Component
*/

import React from 'react';
import image from '../assets/img/loading.svg';
import './withLoading.css';

// eslint-disable-next-line react/prop-types
const withLoading = WrappedComponent => ({ loading, ...rest }) =>
    loading ? (
        <div className="loader center-page loader--style1" title="0">
            <img src={image} alt="loading gif" />
        </div>
    ) : (
        <WrappedComponent {...rest} />
    );

export default withLoading;
