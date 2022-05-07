import React from 'react';
import { Link } from 'react-router-dom';

function withLink(WrappedComponent) {
  return function wrappedFn({ to }) {
    return (
      <Link to={to}>
        <WrappedComponent />
      </Link>
    );
  };
}

export default withLink;
