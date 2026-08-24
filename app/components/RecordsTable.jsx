/**
 * Tabella riusabile per visualizzare dati con colonne configurabili.
 * Supporta azioni come click su righe, eliminazione di singoli record o di tutti.
 *
 * @param {Object} props
 * @param {string} props.emptyMessage - Messaggio da mostrare se non ci sono dati
 * @param {Array} props.records - Array di dati da visualizzare (una riga per elemento)
 * @param {Array} props.columns - Array di definizioni colonna { header: string, render: function }
 *   - header: intestazione della colonna
 *   - render: funzione(record, index) che ritorna il valore da mostrare
 * @param {Function} [props.onRowClick] - Callback quando si clicca una riga
 * @param {Function} [props.onDelete] - Callback quando si clicca il pulsante elimina riga
 * @param {Function} [props.onDeleteAll] - Callback quando si clicca il pulsante elimina tutto
 * @param {string} [props.clearAllLabel="Cancella tutti"] - Testo del pulsante elimina tutto
 * @param {string} [props.deleteLabel="Rimuovi"] - Testo del pulsante elimina riga
 * @returns {React.JSX.Element}
 */
function RecordsTable({
  emptyMessage,
  records,
  columns,
  onRowClick,
  onDelete,
  onDeleteAll,
  clearAllLabel = 'Cancella tutti',
  deleteLabel = 'Rimuovi',
}) {
  if (!Array.isArray(records) || records.length === 0) {
    return <div className="empty">{emptyMessage}</div>;
  }

  const withActions = typeof onDelete === 'function';

  const handleDeleteAll = () => {
    const confirmed = confirm('Sei sicuro di voler rimuovere tutti i record?');

    if (confirmed) {
      onDeleteAll();
    }
  };

  const handleRowKeyDown = (event, record) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onRowClick(record);
    }
  };

  return (
    <section className="records-panel">
      <div className="records-header">
        {typeof onDeleteAll === 'function' && (
          <button id="btn-clear-all" className="btn btn-danger" type="button" onClick={handleDeleteAll}>
            {clearAllLabel}
          </button>
        )}
      </div>
      <div className="records-table-wrapper">
        <table className="records-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.header}>{column.header}</th>
              ))}
              {withActions && <th>Azioni</th>}
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr
                key={index}
                className="records-row"
                tabIndex={0}
                onClick={() => onRowClick?.(record)}
                onKeyDown={(event) => handleRowKeyDown(event, record)}
              >
                {columns.map((column) => (
                  <td key={column.header}>{String(column.render(record, index))}</td>
                ))}
                {withActions && (
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btn-delete"
                      onClick={(event) => {
                        event.stopPropagation();
                        onDelete(record);
                      }}
                    >
                      {deleteLabel}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RecordsTable;
