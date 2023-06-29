import PropTypes from 'prop-types';
import cl from './Section.module.css';

const Section = ({ children }) => {
  return <section className={cl.section}>{children}</section>;
};

Section.propTypes = {
  children: PropTypes.node,
};

export default Section;