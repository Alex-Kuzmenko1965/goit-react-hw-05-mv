import { Suspense } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Container from '../Container/Container';
import cl from './SharedLayout.module.css';

const SharedLayout = () => {
  const styles = {
    marginTop: '30px',
    fontSize: '24px',
    fontWeight: 700,
  };

  const navLinkClassName = ({ isActive }) =>
    isActive ? cl.active : cl.nav_link;

  return (
    <>
      <header className={cl.header}>
        <Container>
          <nav>
            <ul className={cl.nav_list}>
              <li>
                <NavLink className={navLinkClassName} to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className={navLinkClassName} to="/movies">
                  Movies
                </NavLink>
              </li>
            </ul>
          </nav>
        </Container>
      </header>
      <Suspense
        fallback={
          <Container>
            <div style={styles}>Loading page...</div>
          </Container>
        }
      >
        <Outlet />
      </Suspense>
    </>
  );
};

export default SharedLayout;