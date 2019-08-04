/* 
  HOC: a Higher Order Component is a function that accepts a component as paramater and returns an augmented version of this component. Often used in React libraries.
  It wraps a component and returns an enhanced component. 
  hocFactory:: W: React.Component => E: React.Component
*/

import React from "react";
import image from "../assets/img/loading.svg";
import "./withLoading.css";

interface Iprops {
  propName: string[];
}

const isEmpty = (prop: any) =>
  prop === null ||
  prop === undefined ||
  (prop.hasOwnProperty("length") && prop.length === 0) ||
  (prop.contructor === Object && Object.keys(prop).length === 0);

const withLoading = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) =>
  class WithLoading extends React.Component<P, Iprops> {
    render() {
      if (isEmpty("")) {
        return (
          <div className="loader center-page loader--style1" title="0">
            <img src={image} alt="loading gif" />
          </div>
        );
      } else {
        return <WrappedComponent {...(this.props as P)} />;
      }
    }
  };

export default withLoading;
