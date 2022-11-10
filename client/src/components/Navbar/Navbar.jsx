import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import { clearMessageStatus } from '../../redux/actions';
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <>
      <nav className="nav-container">
        <div className="left-nav">
          <ul>
            <li className="logo">
              <Link onClick={() => dispatch(clearMessageStatus())} to="/home">
                198X
              </Link>
            </li>
          </ul>
        </div>
        <div className="right-nav">
          <ul>
            <li>
              <Link onClick={() => dispatch(clearMessageStatus())} to="/home">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={() => dispatch(clearMessageStatus())} to="/create">
                Create Videogame
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
