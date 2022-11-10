import React from 'react';
import './SearchBar.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getName } from '../../redux/actions';

function SearchBar({ setCurrentPage, handleReset, clearMessageStatus }) {
  const dispatch = useDispatch();
  const [videogame, setVideogame] = useState('');

  const handleInputChange = (e) => {
    e.preventDefault();
    setVideogame(e.target.value);
    //dispatch(getName(e.target.value));
  };
  // const handleReset = (e) => {
  //   e.preventDefault();
  //   dispatch(getAllVideogames());
  //   setVideogame('');
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getName(videogame));
    dispatch(clearMessageStatus());
    setCurrentPage(1);
  };

  return (
    <>
      <div className="searchbar-container">
        <input
          type="text"
          placeholder="Search your game!"
          value={videogame}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
        <button
          className="search-button"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Search
        </button>
        <button
          className="search-button reset-button"
          type="submit"
          onClick={(e) => {
            handleReset(e);
            setVideogame('');
            dispatch(clearMessageStatus());
          }}
        >
          Reset
        </button>
      </div>
    </>
  );
}

export default SearchBar;
