import './VideogameCard.scss';
import React from 'react';
import { Link } from 'react-router-dom';

const VideogameCard = (props) => {
  return (
    <div className="videogame">
      <Link to={`/videogames/${props.id}`}>
        <div className="bg-img">
          <img
            src={
              props.background_image
                ? props.background_image
                : 'https://i.blogs.es/1778b7/190220-198x-review/1366_2000.jpeg'
            }
            alt={props.name}
          />
        </div>
        <h2 className="game-title">{props.name}</h2>
        <p>Rating: ☆ {props.rating}</p>
        <div className="genres">
          <p>
            {props.genres[0] ? (
              props.genres[1] ? (
                <span className="spanero">
                  <span className="spans">{props.genres[0].name}</span>
                  <span className="spans">{props.genres[1].name}</span>
                </span>
              ) : (
                <span className="spans"> {props.genres[0].name}</span>
              )
            ) : (
              <span className="spans"> No genre</span>
            )}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default VideogameCard;
