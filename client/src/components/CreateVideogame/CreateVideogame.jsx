import React from 'react';
import './CreateVideogame.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getAllVideogames,
  postVideogame,
  clearMessageStatus,
} from '../../redux/actions';

const validate = (input) => {
  let errors = [];
  if (/^\s*$/.test(input.name)) {
    errors.name = 'Must type a name';
  }

  if (!input.released) {
    errors.released = 'Must select a date';
  }

  if (!/^[1-5]$/.test(input.rating)) {
    errors.rating = 'Must provide a rating between 1 and 5';
  }
  if (input.genres < 1) {
    errors.genres = 'Must add at least one genre for the game';
  }
  if (input.platforms?.length < 1) {
    errors.platforms = 'Must add at least one paltform for the game';
  }
  if (!input.description_raw) {
    errors.description_raw = 'Must type a description for the game';
  }
  if (!input.background_image.includes('.jpeg')) {
    errors.background_image = 'Must provide a .JPEG image URL';
  }
  return errors;
};

function CreateVideogame() {
  const dispatch = useDispatch();

  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);

  const message = useSelector((state) => state.message);

  const [errors, setErrors] = useState('');

  const [input, setInput] = useState({
    name: '',
    description_raw: '',
    released: '',
    rating: '',
    platforms: [],
    genres: [],
    background_image: '',
    createdInDb: true,
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handleSelect = (e) => {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
    setErrors(
      validate({
        ...input,
        genres: [...input.genres, e.target.value],
      })
    );
  };
  const handleSelectPlatforms = (e) => {
    setInput({
      ...input,
      platforms: [...input.platforms, { platform: { name: e.target.value } }],
    });
    setErrors(
      validate({
        ...input,
        platforms: [...input.genres, e.target.value],
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(postVideogame(input));
    dispatch(getAllVideogames());
    setInput({
      name: '',
      description_raw: '',
      released: '',
      rating: '',
      platforms: [],
      genres: [],
      background_image: '',
    });
  };
  const handleRemoveGenre = (e) => {
    setInput({
      ...input,
      genres: input.genres.filter((gen) => gen !== e),
    });
  };
  const handleRemovePlatform = (e) => {
    setInput({
      ...input,
      platforms: input.platforms.filter((plat) => plat !== e),
    });
  };
  // useEffect(() => {
  //   console.log(input);
  // }, [input]);

  return (
    <div className="form-container">
      <h2>Add your videogame!</h2>

      {message.length > 0 && (
        <div className="error-bg">
          <div className="error-popup">
            {message === 'Game succesfully added.' ? (
              <p className="success-message">{message}</p>
            ) : (
              <p className="error-message">{message}</p>
            )}
            <button
              type="button"
              className="popup-button"
              onClick={() => dispatch(clearMessageStatus())}
            >
              Back
            </button>
          </div>
        </div>
      )}

      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Released:</label>
          <input
            type="date"
            value={input.released}
            name="released"
            onChange={(e) => handleChange(e)}
          />
          {errors.released && <p className="error">{errors.released}</p>}
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            value={input.rating}
            name="rating"
            onChange={(e) => handleChange(e)}
          />
          {errors.rating && <p className="error">{errors.rating}</p>}
        </div>
        <div className="selectors">
          <label>Genres:</label>
          <select onChange={(e) => handleSelect(e)}>
            <option value="">Choose genres</option>
            {genres.map((g, index) => (
              <option key={index} value={g.name}>
                {g.name}
              </option>
            ))}
          </select>
          {errors.genres && <p className="error">{errors.genres}</p>}
          <div className="select_arrow2"></div>
          {input.genres.map((el, index) => (
            <div key={index} className="selected">
              <button type="button" onClick={() => handleRemoveGenre(el)}>
                {el} <span>x</span>
              </button>
            </div>
          ))}
        </div>
        <div className="selectors">
          <label>Platforms:</label>
          <select onChange={(e) => handleSelectPlatforms(e)}>
            <option value="">Choose platforms</option>
            {platforms.map((p, index) => (
              <option key={index} value={p}>
                {p}
              </option>
            ))}
          </select>
          {errors.platforms && <p className="error">{errors.platforms}</p>}
          <div className="select_arrow2"></div>
          {input.platforms.map((el, index) => (
            <div key={index} className="selected">
              <button type="button" onClick={() => handleRemovePlatform(el)}>
                {el.platform.name} <span>x</span>
              </button>
            </div>
          ))}
        </div>
        <div>
          <label>Description:</label>
          <input
            type="textarea"
            value={input.description_raw}
            name="description_raw"
            onChange={(e) => handleChange(e)}
          />
          {errors.description_raw && (
            <p className="error">{errors.description_raw}</p>
          )}
        </div>
        <div>
          <label>Imagen:</label>
          <input
            type="textarea"
            value={input.background_image}
            name="background_image"
            onChange={(e) => handleChange(e)}
          />
          {errors.background_image && (
            <p className="error">{errors.background_image}</p>
          )}
        </div>
        <Link to="/home">
          <button
            type="button"
            className="back-button"
            onClick={() => dispatch(clearMessageStatus())}
          >
            Back
          </button>
        </Link>
        {!input.name ? (
          <button className="button-disabled" type="submit" disabled>
            Create
          </button>
        ) : errors.name ||
          errors.rating ||
          errors.description_raw ||
          errors.released ||
          errors.platforms ||
          errors.genres ||
          errors.background_image ? (
          <button className="button-disabled" type="submit" disabled>
            Create
          </button>
        ) : (
          <button className="submit-form" type="submit">
            Create
          </button>
        )}
      </form>
    </div>
  );
}

export default CreateVideogame;
