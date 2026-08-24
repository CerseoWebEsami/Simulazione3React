import { NavLink } from 'react-router';

const PAGES = [
  { name: 'Home', path: '/', end: true },
  { name: 'Ricerca', path: '/search' },
  { name: 'Esplora', path: '/explore' },
  { name: 'Preferiti', path: '/favorites' },
  { name: 'Dashboard', path: '/dashboard' },
];

/**
 * Header con menu di navigazione tra le pagine.
 * Evidenzia automaticamente la pagina corrente nel menu.
 *
 * @returns {React.JSX.Element} - Componente Header.
 */
function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">
          <NavLink to="/">Countries Atlas</NavLink>
        </h1>
        <nav className="header-nav">
          <ul>
            {PAGES.map((page) => (
              <li key={page.path}>
                <NavLink
                  to={page.path}
                  end={page.end}
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                >
                  {page.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
