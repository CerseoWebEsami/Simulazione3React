import { useEffect, useRef, useState } from 'react';

/**
 * Crea una funzione "debounced" che attende prima di eseguirsi.
 * Utile per evitare troppe richieste al server mentre l'utente digita.
 *
 * @param {Function} callback - Funzione da eseguire dopo il delay
 * @param {number} [waitMs=350] - Millisecondi da aspettare dopo l'ultimo input
 * @returns {Function} - Funzione debounced che accetta gli stessi parametri del callback
 */
function debounce(callback, waitMs = 350) {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), waitMs);
  };
}

/**
 * Campo input con menu di suggerimenti autocomplete.
 * Ascolta gli input dell'utente, chiama una funzione di fetch e mostra i risultati.
 *
 * @param {Object} props
 * @param {string} props.value - Valore corrente del campo input
 * @param {Function} props.onChange - Callback(value) quando l'utente digita
 * @param {Function} props.onEnter - Callback quando si preme invio nel campo
 * @param {Function} props.fetchSuggestions - Funzione async che ritorna i suggerimenti per una query
 * @param {Function} props.onSelect - Callback quando l'utente seleziona un suggerimento
 * @param {Function} [props.getLabel] - Funzione per estrarre l'etichetta da mostrare (default: item.name)
 * @param {string} [props.placeholder]
 * @param {React.ReactNode} [props.trailing] - Elemento da affiancare al campo input (es. pulsante Cerca)
 * @returns {React.JSX.Element}
 */
function CountrySuggestions({
  value,
  onChange,
  onEnter,
  fetchSuggestions,
  onSelect,
  getLabel = (item) => item.name,
  placeholder,
  trailing,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);
  const debouncedFetch = useRef(
    debounce(async (query, fetcher, setter, show) => {
      try {
        const result = await fetcher(query);
        setter(Array.isArray(result) ? result.slice(0, 7) : []);
        show(true);
      } catch (_error) {
        setter([]);
        show(false);
      }
    }, 300)
  );

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setVisible(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleInputChange = (event) => {
    const query = event.target.value;
    onChange(query);

    if (query.trim().length < 2) {
      setSuggestions([]);
      setVisible(false);
      return;
    }

    debouncedFetch.current(query.trim(), fetchSuggestions, setSuggestions, setVisible);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setVisible(false);
      onEnter?.();
    }
  };

  const handleSelect = (item) => {
    onSelect(item);
    setVisible(false);
  };

  return (
    <div ref={containerRef}>
      <div className="input-wrapper">
        <input
          id="search-input"
          type="text"
          placeholder={placeholder}
          autoComplete="off"
          value={value}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        {trailing}
      </div>
      <div id="search-suggestions" className={`suggestions ${visible && suggestions.length > 0 ? '' : 'hidden'}`}>
        {suggestions.map((item, index) => (
          <button
            type="button"
            key={item.code || index}
            className="suggestion-item"
            onClick={() => handleSelect(item)}
          >
            {getLabel(item)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CountrySuggestions;
