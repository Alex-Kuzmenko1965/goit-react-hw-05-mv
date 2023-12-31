import { useEffect, useState, Suspense } from 'react';
import { NavLink, useParams, Outlet, useLocation } from 'react-router-dom';
import Container from '../components/Container/Container';
import MovieInform from '../components/MovieInform/MovieInform';
import Section from '../components/Section/Section';
import { getMovieById } from '../services/MovieAPI';
import cl from './MoviesDetails.module.css';
import noFound from '../not-found.jpg';

const MoviesDetails = () => {
  const styles = {
    marginTop: '30px',
    fontSize: '24px',
    fontWeight: 700,
  };

  const [movieInform, setMovieInform] = useState(null);
  const { movieId } = useParams();
  // console.log(useParams());  
  const location = useLocation();
  // console.log('location:', location);
  // console.log('location.state:', location.state);  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMovieById(movieId);
        setMovieInform(response);
        // console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [movieId]);

  if (!movieInform) {
    return;
  }

  const { poster_path, title, vote_average, overview, genres } =
    movieInform;

  const navLinkClassName = ({ isActive }) =>
    isActive ? cl.active : cl.nav_link;

  return (
    <main>
      <Section>
        <Container>
          <MovieInform
            posterPath = {poster_path
                ? `https://image.tmdb.org/t/p/w342/${poster_path}`
                : noFound}
            title={title}
            popularity={vote_average}
            overview={overview}
            genres={
              genres && genres.length > 0
                ? genres.map(({ name }) => name).join(', ') + '.'
                : ''
            }
          ></MovieInform>
          <ul className={cl.navLink_list}>
            <li>
              <NavLink
                state={location.state}
                className={navLinkClassName}
                to="cast"
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                state={location.state}
                className={navLinkClassName}
                to="reviews"
              >
                Reviews
              </NavLink>
            </li>
          </ul>
        </Container>
      </Section>
      <Suspense
        fallback={
          <Container>
            <div style={styles}>Loading page...</div>
          </Container>
        }
      >
        <Outlet />
      </Suspense>
    </main>
  );
};

export default MoviesDetails;