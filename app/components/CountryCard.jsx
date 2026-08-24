/**
 * Formatta un numero per la visualizzazione nel formato locale italiano (es: 1.000.000).
 *
 * @param {number} value - Il numero da formattare
 * @returns {string} - Stringa del numero formattato
 */
function formatNumber(value) {
  return Number(value || 0).toLocaleString('it-IT');
}

/**
 * Card riusabile per visualizzare i dettagli di un paese.
 * Include flag, nome, capitale, popolazione, area, densita e opzionale pulsante favorito.
 *
 * @param {Object} props
 * @param {Object} props.country - Oggetto nazione con tutti i dati
 * @param {boolean} [props.showFavoriteButton=false] - Se mostrare il pulsante per aggiungere ai preferiti
 * @param {boolean} [props.isFavorite=false] - Se il paese è gia nei preferiti (per mostrare stella piena)
 * @param {Function} [props.onToggleFavorite] - Callback quando si clicca il pulsante preferito
 * @returns {React.JSX.Element} - Elemento article con la card del paese
 */
function CountryCard({ country, showFavoriteButton = false, isFavorite = false, onToggleFavorite }) {
  // TODO 1: Completare il markup della card usando i dati del paese.
  // Manca la bandiera che va messa come prima cosa nella card.
  // Poi manca il name che deve essere mostrato in un paragrafo prima del code (classe country-title).
  // Infine mancano i dettagli come capital, region, population, area e densityLabel nella parte meta.
  // (fai in modo di evidenziare il nome del campo, es: "Capitale: Roma")
  return (
    <article className="country-card">
      <div className="country-header">
        <div>
          <p className="country-code">{country.code}</p>
        </div>
        {showFavoriteButton && (
          <button
            type="button"
            className="btn btn-secondary btn-favorite"
            onClick={() => onToggleFavorite?.(country)}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        )}
      </div>
      <div className="country-meta"></div>
    </article>
  );
}

export default CountryCard;

/**
 * Renderizza un array di card paesi.
 *
 * @param {Object} props
 * @param {Array} props.countries - Array di oggetti nazione da visualizzare
 * @param {boolean} [props.showFavoriteButton=false] - Se mostrare il pulsante favorito su ogni card
 * @param {Function} [props.isFavorite] - Funzione che ritorna true/false se il paese è favorito
 * @param {Function} [props.onToggleFavorite] - Callback quando si cambia uno stato favorito
 * @returns {React.JSX.Element} - Griglia di card paesi
 */
export function CountryCardGrid({ countries, showFavoriteButton = false, isFavorite, onToggleFavorite }) {
  return (
    <div className="cards-grid">
      {countries.map((country) => (
        <CountryCard
          key={country.code}
          country={country}
          showFavoriteButton={showFavoriteButton}
          isFavorite={typeof isFavorite === 'function' ? isFavorite(country) : false}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export { formatNumber };
