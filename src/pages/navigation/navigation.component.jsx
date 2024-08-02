// Importar el archivo CSS
import './navigation.styles.css';
import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation-container">
        <div className="nav-links">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/iniciar-sesion" className="nav-link">Iniciar Sesion</Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
