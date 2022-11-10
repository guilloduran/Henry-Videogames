import React from 'react';
import './VideogameDetail.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogameDetail } from '../../redux/actions';
import { useParams, Link } from 'react-router-dom';
import { deleteDetailStore } from '../../redux/actions';
import { useEffect } from 'react';

const VideogameDetail = () => {
  const { id } = useParams();
  let dispatch = useDispatch();
  const videogame = useSelector((state) => state.videogameDetail);

  useEffect(() => {
    dispatch(getVideogameDetail(id));
    return () => {
      dispatch(deleteDetailStore());
    };
  }, [dispatch, id]);
  let length = videogame.platforms?.length;

  return (
    <div>
      {videogame.name ? (
        <div className="detail-container">
          <div className="button-container">
            <Link to="/home">
              <button className="detail-button" type="button">
                Back
              </button>
            </Link>
          </div>
          <div className="detail-img-container">
            <img
              src={
                videogame.background_image
                  ? videogame.background_image
                  : 'https://i.blogs.es/1778b7/190220-198x-review/1366_2000.jpeg'
              }
              alt={videogame.name}
            />
          </div>
          <div className="detail-data">
            <h2>{videogame.name}</h2>
            <p>
              <span className="detail-headline">Released:</span>{' '}
              {videogame.released}
            </p>
            <p>
              <span className="detail-headline">Genres:</span>
              {videogame.genres?.map((e) => (
                <span className="detail-genre"> {e.name} </span>
              ))}
            </p>
            <p>
              <span className="detail-headline">Platforms:</span>
              {videogame.platforms?.map((e, index) => {
                return (
                  <span className="detail-platform">
                    {length !== index + 1
                      ? ` ${e.platform.name} / `
                      : e.platform.name}
                  </span>
                );
              })}
            </p>
            <p>
              <span className="detail-headline">Rating:</span> ☆{' '}
              {videogame.rating}
            </p>
          </div>
          <div className="detail-description">
            <h3>Description</h3>
            <p>{videogame.description_raw}</p>
          </div>
        </div>
      ) : (
        <div className="spinner detail-spinner">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </div>
  );
};

export default VideogameDetail;
