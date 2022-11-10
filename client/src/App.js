import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Landing from './components/Landing/Landing';
import { Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllVideogames } from './redux/actions';
import Videogames from './components/Videogames/Videogames';
import CreateVideogame from './components/CreateVideogame/CreateVideogame';
import VideogameDetail from './components/VideogameDetail/VideogameDetail';
import { getPlatforms } from './redux/actions';
import { getGenres } from './redux/actions';

function App() {
  let dispatch = useDispatch();

  useEffect(() => {
    const awaitData = async function () {
      await dispatch(getAllVideogames());
      dispatch(getPlatforms());
      dispatch(getGenres());
    };
    awaitData();
  }, [dispatch]);

  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route exact path="/home">
        <Navbar />

        <Videogames />
      </Route>
      <Route exact path="/create">
        <Navbar />
        <CreateVideogame />
      </Route>
      <Route exact path="/videogames/:id">
        <Navbar />
        <VideogameDetail />
      </Route>
    </div>
  );
}

export default App;
