import { useEffect, useState } from 'react';
import RecordsTable from '../components/RecordsTable.jsx';
import { formatNumber } from '../components/CountryCard.jsx';
import { getCountriesByCodes } from '../services/api.js';
import { clearFavoriteCodes, getFavoriteCodes, removeFavoriteCode } from '../services/storage.js';

/**
 * Pagina di gestione dei preferiti (codici ISO alpha-3).
 * @returns {React.JSX.Element} - Componente Favorites.
 */
function Favorites() {
  const [countries, setCountries] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | success | error
  const [errorMessage, setErrorMessage] = useState('');

  async function loadFavorites() {
    setStatus('loading');

    try {
      const codes = getFavoriteCodes();
      const items = await getCountriesByCodes(codes);

      setCountries(items);
      setStatus('success');
    } catch (error) {
      setErrorMessage(error?.message || 'Impossibile caricare i preferiti.');
      setStatus('error');
    }
  }

  useEffect(() => {
    loadFavorites();
  }, []);

  function handleDelete(country) {
    removeFavoriteCode(country.code);
    loadFavorites();
  }

  function handleDeleteAll() {
    clearFavoriteCodes();
    loadFavorites();
  }

  return (
    <>
      <section className="panel page-section">
        <h2>Preferiti</h2>
        <p className="section-description">Persistenza locale dei soli codici ISO 3166-1 alpha-3.</p>
      </section>

      <section className="page-section">
        {status === 'loading' && <div className="loading">Caricamento preferiti...</div>}
        {status === 'error' && (
          <div className="error">
            <strong>Errore</strong>
            <p>{errorMessage}</p>
          </div>
        )}
        {status === 'success' && (
          <RecordsTable
            emptyMessage="Non hai ancora aggiunto nazioni preferite."
            records={countries}
            columns={[
              { header: 'ISO', render: (country) => country.code },
              { header: 'Nazione', render: (country) => country.name },
              { header: 'Capitale', render: (country) => country.capital },
              { header: 'Regione', render: (country) => country.region },
              { header: 'Popolazione', render: (country) => formatNumber(country.population) },
              { header: 'Densita', render: (country) => country.densityLabel },
            ]}
            onDelete={handleDelete}
            onDeleteAll={handleDeleteAll}
            clearAllLabel="Svuota preferiti"
            deleteLabel="Rimuovi"
          />
        )}
      </section>
    </>
  );
}

export default Favorites;
