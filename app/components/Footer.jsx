/**
 * Footer con informazioni sull'app e crediti.
 *
 * @returns {React.JSX.Element} - Componente Footer.
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          Countries Atlas | Dati da{' '}
          <a href="https://restcountries.com" target="_blank" rel="noreferrer">
            REST Countries
          </a>
        </p>
        <p>Ricerca, esplorazione per regione, preferiti e dashboard statistiche.</p>
      </div>
    </footer>
  );
}

export default Footer;
