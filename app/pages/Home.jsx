import { Link } from 'react-router';

/**
 * Pagina Home con panoramica dell'app.
 * @returns {React.JSX.Element} - Componente Home.
 */
function Home() {
  return (
    <>
      <section className="hero page-section">
        <h2>Countries Atlas</h2>
        <p>
          Applicazione didattica in React che usa restcountries.com per consultare nazioni, salvarle nei
          preferiti e analizzare statistiche globali.
        </p>
        <div className="quick-links">
          <Link className="btn btn-primary" to="/search">
            Vai a Ricerca
          </Link>
          <Link className="btn btn-secondary" to="/explore">
            Apri Esplora
          </Link>
        </div>
      </section>

      <section className="page-section">
        <h3>Come funziona</h3>
        <div className="guide-grid">
          <article className="guide-card">
            <h4>1. Cerca una nazione</h4>
            <p>Usa Ricerca per interrogare gli endpoint per nome o capitale.</p>
          </article>
          <article className="guide-card">
            <h4>2. Esplora per continente</h4>
            <p>Filtra le nazioni con routing basato su endpoint regione.</p>
          </article>
          <article className="guide-card">
            <h4>3. Salva preferiti</h4>
            <p>I preferiti usano localStorage e memorizzano solo il codice ISO alpha-3.</p>
          </article>
          <article className="guide-card">
            <h4>4. Analizza statistiche</h4>
            <p>Confronta popolazione, area e densita dalla dashboard dedicata.</p>
          </article>
        </div>
      </section>
    </>
  );
}

export default Home;
