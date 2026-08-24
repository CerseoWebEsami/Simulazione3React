import { useEffect, useState } from 'react';
import { CountryCardGrid } from '../components/CountryCard.jsx';
import { getCountriesByRegion } from '../services/api.js';
import { getFavoriteCodes, toggleFavoriteCode } from '../services/storage.js';

const REGIONS = [
  { value: 'africa', label: 'Africa' },
  { value: 'americas', label: 'Americas' },
  { value: 'asia', label: 'Asia' },
  { value: 'europe', label: 'Europe' },
  { value: 'oceania', label: 'Oceania' },
];

/**
 * Pagina di esplorazione per regione/continente.
 * @returns {React.JSX.Element} - Componente Explore.
 */
function Explore() {
  const [region, setRegion] = useState('europe');
  const [status, setStatus] = useState('loading'); // loading | success | empty | error
  const [countries, setCountries] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [favoriteCodes, setFavoriteCodes] = useState(() => getFavoriteCodes());

  useEffect(() => {
    let cancelled = false;

    async function loadRegion() {
      setStatus('loading');

      try {
        const items = await getCountriesByRegion(region);

        if (cancelled) {
          return;
        }

        if (!Array.isArray(items) || items.length === 0) {
          setStatus('empty');
          setCountries([]);
          return;
        }

        setCountries(items);
        setStatus('success');
      } catch (error) {
        if (cancelled) {
          return;
        }

        setErrorMessage(error?.message || 'Operazione non riuscita');
        setStatus('error');
      }
    }

    loadRegion();

    return () => {
      cancelled = true;
    };
  }, [region]);

  function handleToggleFavorite(country) {
    toggleFavoriteCode(country.code);
    setFavoriteCodes(getFavoriteCodes());
  }

  return (
    <>
      <section className="panel page-section">
        <h2>Esplora per Regione</h2>
        <p className="section-description">Filtra nazioni per continente tramite endpoint regione.</p>
        <div className="form-group region-group">
          <label htmlFor="region-select">Regione</label>
          <select id="region-select" value={region} onChange={(event) => setRegion(event.target.value)}>
            {REGIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="page-section">
        {status === 'loading' && <div className="loading">Caricamento regione...</div>}
        {status === 'empty' && <div className="empty">Nessuna nazione disponibile per questa regione.</div>}
        {status === 'error' && (
          <div className="error">
            <strong>Errore nel caricamento</strong>
            <p>{errorMessage}</p>
          </div>
        )}
        {status === 'success' && (
          <CountryCardGrid
            countries={countries}
            showFavoriteButton
            isFavorite={(country) => favoriteCodes.includes(country.code)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </section>
    </>
  );
}

export default Explore;
