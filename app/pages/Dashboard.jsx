import { useEffect, useState } from 'react';
import RecordsTable from '../components/RecordsTable.jsx';
import { formatNumber } from '../components/CountryCard.jsx';
import { getAllCountries, sortCountries } from '../services/api.js';

/**
 * Pagina dashboard con statistiche e ordinamento paesi.
 * @returns {React.JSX.Element} - Componente Dashboard.
 */
function Dashboard() {
  const [metric, setMetric] = useState('population');
  const [order, setOrder] = useState('desc');
  const [limit, setLimit] = useState(25);
  const [allCountries, setAllCountries] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | success | error
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function loadDashboardData() {
      setStatus('loading');

      try {
        const items = await getAllCountries();
        setAllCountries(items);
        setStatus('success');
      } catch (error) {
        setErrorMessage(error?.message || 'Impossibile caricare le statistiche.');
        setStatus('error');
      }
    }

    loadDashboardData();
  }, []);

  let ordered = [];
  let renderStatus = status;
  let renderErrorMessage = errorMessage;

  if (status === 'success') {
    try {
      ordered = sortCountries(allCountries, metric, order).slice(0, limit);
    } catch (error) {
      renderStatus = 'error';
      renderErrorMessage = error?.message || 'Impossibile caricare le statistiche.';
    }
  }

  return (
    <>
      <section className="panel page-section">
        <h2>Dashboard Statistiche</h2>
        <p className="section-description">
          Dati da endpoint /all con ordinamento client-side per popolazione, area e densita.
        </p>
        <div className="form-grid">
          {/* TODO 2: Aggiungere la classe corretta per mostrare i gruppi del form correttamente */}
          <div className="">
            <label htmlFor="metric-select">Metrica</label>
            <select id="metric-select" value={metric} onChange={(event) => setMetric(event.target.value)}>
              <option value="population">Popolazione</option>
              <option value="area">Area geografica</option>
              <option value="density">Densita</option>
            </select>
          </div>
          <div className="">
            <label htmlFor="order-select">Ordine</label>
            <select id="order-select" value={order} onChange={(event) => setOrder(event.target.value)}>
              <option value="desc">Decrescente</option>
              <option value="asc">Crescente</option>
            </select>
          </div>
          <div className="">
            <label htmlFor="limit-select">Elementi</label>
            <select id="limit-select" value={limit} onChange={(event) => setLimit(Number(event.target.value))}>
              <option value="10">Top 10</option>
              <option value="25">Top 25</option>
              <option value="50">Top 50</option>
              <option value="250">Tutti</option>
            </select>
          </div>
        </div>
      </section>

      <section className="page-section">
        {renderStatus === 'loading' && <div className="loading">Caricamento dati globali...</div>}
        {renderStatus === 'error' && (
          <div className="error">
            <strong>Errore</strong>
            <p>{renderErrorMessage}</p>
          </div>
        )}
        {renderStatus === 'success' && (
          <RecordsTable
            emptyMessage="Nessun dato disponibile."
            records={ordered}
            columns={[
              { header: '#', render: (_country, index) => index + 1 },
              { header: 'Nazione', render: (country) => country.name },
              { header: 'ISO', render: (country) => country.code },
              { header: 'Regione', render: (country) => country.region },
              { header: 'Popolazione', render: (country) => formatNumber(country.population) },
              { header: 'Area km2', render: (country) => formatNumber(country.area) },
              { header: 'Densita', render: (country) => country.densityLabel },
            ]}
          />
        )}
      </section>
    </>
  );
}

export default Dashboard;
