import { Route, Routes } from 'react-router-dom';
import MoviesDetails from './pages/MovieDetails';
import SharedLayout from './components/SharedLayout/SharedLayout';
import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Movies = lazy(() => import('./pages/Movies'));
const Reviews = lazy(() => import('./components/Reviews/Reviews'));
const Cast = lazy(() => import('./components/Cast/Cast'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:movieId" element={<MoviesDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};