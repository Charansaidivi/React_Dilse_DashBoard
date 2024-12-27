import React from 'react';
import { Link } from 'react-router-dom';
const ErrorPage = () => {
  return (
    <>
      <div className="errorPage">
        <Link to="/">
          <p>Go Back</p>
        </Link>
        <h1>404</h1>
        <div>Page Not Found</div>
      </div>
    </>
  );
};

export default ErrorPage;
