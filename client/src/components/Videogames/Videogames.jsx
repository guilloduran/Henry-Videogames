import React from 'react';
import './Videogames.scss';
import VideogameCard from '../VideogameCard/VideogameCard';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../Pagination/Pagination';
import { useState, useEffect } from 'react';
import {
  orderByName,
  orderByRating,
  filterMaster,
  clearMessageStatus,
} from '../../redux/actions';
import SearchBar from '../SearchBar/SearchBar';

const Videogames = () => {
  const videogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const message = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setvideogamesPerPage] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPerPage; //
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; //
  const currentVideogames = videogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [selectedOrigin, setSelectedOrigin] = useState('All');
  const [selectedName, setSelectedName] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');

  useEffect(() => {
    dispatch(filterMaster(selectedGenre, selectedPlatform, selectedOrigin));
  }, [selectedGenre, selectedPlatform, selectedOrigin, dispatch]);

  const [order, setOrder] = useState('');

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleOrder = (e) => {
    e.preventDefault();
    setSelectedName(e.target.value);
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  };
  const handleRating = (e) => {
    e.preventDefault();
    setSelectedRating(e.target.value);
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSelectedName('All');
    setSelectedRating('All');
    setSelectedGenre('All');
    setSelectedPlatform('All');
    setSelectedOrigin('All');
    setCurrentPage(1);
  };
  return (
    <div className="global-container">
      <div className="searchbar">
        <SearchBar
          clearMessageStatus={clearMessageStatus}
          handleReset={handleReset}
          pagination={pagination}
          setCurrentPage={setCurrentPage}
        ></SearchBar>
      </div>

      <div className="filters-containers">
        <div className="select">
          <select value={selectedName} onChange={(e) => handleOrder(e)}>
            <option value="All">Sort by Name</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
          <div className="select_arrow"></div>
        </div>
        <div className="select">
          <select value={selectedRating} onChange={(e) => handleRating(e)}>
            <option value="All">Sort by Rating</option>
            <option value="higher">5-1</option>
            <option value="lower">1-5</option>
          </select>
          <div className="select_arrow"></div>
        </div>
        <div className="select">
          <select
            value={selectedOrigin}
            onChange={(e) => {
              setSelectedOrigin(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">Sort by Origin</option>
            <option value="db">Database</option>
            <option value="api">API</option>
          </select>
          <div className="select_arrow"></div>
        </div>
        <div className="select">
          <select
            value={selectedGenre}
            onChange={(e) => {
              setSelectedGenre(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">Sort by Genres</option>
            {genres.map((g) => (
              <option key={g.id} value={g.name}>
                {g.name}
              </option>
            ))}
          </select>
          <div className="select_arrow"></div>
        </div>
        <div className="select">
          <select
            value={selectedPlatform}
            onChange={(e) => {
              setSelectedPlatform(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">Sort by Platforms</option>
            {platforms.map((p, i) => (
              <option key={i} value={p}>
                {p}
              </option>
            ))}
          </select>
          <div className="select_arrow"></div>
        </div>
      </div>
      {message.length ? (
        ''
      ) : (
        <Pagination
          videogamesPerPage={videogamesPerPage}
          videogames={videogames.length}
          pagination={pagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

      {message.length ? (
        <p className="message-error">{message}</p>
      ) : currentVideogames.length > 0 ? (
        <div className="videogame-container">
          {currentVideogames &&
            currentVideogames.map((videogame) => (
              <VideogameCard
                key={videogame.id}
                id={videogame.id}
                genres={videogame.genres}
                platforms={videogame.platforms}
                name={videogame.name}
                released={videogame.released}
                rating={videogame.rating}
                background_image={videogame.background_image}
                createdInDb={videogame.createdInDb}
              />
            ))}
        </div>
      ) : (
        <div className="spinner">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </div>
  );
};

export default Videogames;
