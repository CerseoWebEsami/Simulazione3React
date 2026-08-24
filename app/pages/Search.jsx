import { useState } from 'react';
import { CountryCardGrid } from '../components/CountryCard.jsx';
import CountrySuggestions from '../components/CountrySuggestions.jsx';
import { searchCountriesByCapital, searchCountriesByName } from '../services/api.js';
import { getFavoriteCodes, toggleFavoriteCode } from '../services/storage.js';

/**
 * Pagina di ricerca per nome o capitale nazione.
 * @returns {React.JSX.Element} - Componente Search.
 */
function Search() {
  const [searchType, setSearchType] = useState('name');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | empty | error
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [favoriteCodes, setFavoriteCodes] = useState(() => getFavoriteCodes());

  /**
   * Ritorna la funzione di ricerca appropriata (per nome o per capitale).
   * @returns {Function} - searchCountriesByName o searchCountriesByCapital
   */
  function getSearchHandler() {
    return searchType === 'capital' ? searchCountriesByCapital : searchCountriesByName;
  }

  async function runSearch(overrideQuery) {
    const value = (overrideQuery ?? query).trim();

    if (!value) {
      setStatus('empty');
      setResults([]);
      return;
    }

    setStatus('loading');

    try {
      const handler = getSearchHandler();
      const items = await handler(value);

      if (!Array.isArray(items) || items.length === 0) {
        setStatus('empty');
        setResults([]);
        return;
      }

      setResults(items);
      setStatus('success');
    } catch (error) {
      setErrorMessage(error?.message || 'Operazione non riuscita');
      setStatus('error');
    }
  }

  function handleToggleFavorite(country) {
    toggleFavoriteCode(country.code);
    setFavoriteCodes(getFavoriteCodes());
  }

  return (
    <>
      <section className="panel page-section">
        <h2>Ricerca Nazioni</h2>
        <p className="section-description">Cerca una nazione per nome o per capitale.</p>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="search-type">Tipo ricerca</label>
            <select
              id="search-type"
              value={searchType}
              onChange={(event) => {
                setSearchType(event.target.value);
              }}
            >
              <option value="name">Nome nazione</option>
              <option value="capital">Capitale</option>
            </select>
          </div>
          <div className="form-group input-wide">
            <label htmlFor="search-input">Valore</label>
            <CountrySuggestions
              value={query}
              onChange={setQuery}
              onEnter={() => runSearch()}
              placeholder="Es: Italy oppure Rome"
              fetchSuggestions={(value) => getSearchHandler()(value)}
              getLabel={(country) => `${country.name} (${country.code})`}
              onSelect={(country) => {
                const value = searchType === 'capital' ? country.capital : country.name;
                setQuery(value);
                setResults([country]);
                setStatus('success');
              }}
              trailing={
                <button id="btn-search" className="btn btn-primary" type="button" onClick={() => runSearch()}>
                  Cerca
                </button>
              }
            />
          </div>
        </div>
      </section>

      <section className="page-section">
        {status === 'idle' && <div className="empty">Inserisci un nome nazione o una capitale per iniziare.</div>}
        {status === 'loading' && <div className="loading">Ricerca in corso...</div>}
        {status === 'empty' && <div className="empty">Nessun risultato trovato.</div>}
        {status === 'error' && (
          <div className="error">
            <strong>Errore nel caricamento</strong>
            <p>{errorMessage}</p>
          </div>
        )}
        {status === 'success' && (
          <CountryCardGrid
            countries={results}
            showFavoriteButton
            isFavorite={(country) => favoriteCodes.includes(country.code)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </section>
    </>
  );
}

export default Search;
