import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.scss';

const Landing = () => {
  return (
    <>
      <div className="bg-image"></div>
      <div className="text">
        <h1>
          Do we care about gaming? <br /> We absolutely care.
        </h1>
        <Link to="/home">
          <button className="btn-landing">Let's go!</button>
        </Link>
      </div>
    </>
  );
};

export default Landing;
