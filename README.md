# Countries Atlas

Applicazione web React (Vite) che usa la REST API pubblica https://countries.dev per cercare, esplorare e confrontare nazioni.

Porting React del progetto originale in Vanilla JavaScript, realizzato a partire dal template ufficiale del corso.

## Architettura e Struttura Directory

Il progetto adotta l'architettura standard di Vite + React, strutturando il codice in base al principio di *Separation of Concerns* per disaccoppiare strato dati, componenti UI e pagine/route.

```text
├── app/
│   ├── App.jsx             # Componente radice con routing (react-router)
│   ├── App.css              # Foglio di stile globale
│   ├── main.jsx             # Entry point React
│   ├── components/          # UI riusabile (header, footer, card, suggerimenti, tabella)
│   ├── pages/                # Una pagina/route per ogni vista (Home, Search, Explore, Favorites, Dashboard)
│   └── services/             # Data access layer (api.js) e persistenza localStorage (storage.js)
├── index.html
├── package.json
├── vite.config.js
├── LICENSE
└── README.md
```

## Funzionalità Core

* **Ricerca Intelligente (`pages/Search.jsx`, `services/api.js`):** Ricerca asincrona per nome paese o capitale, con suggerimenti dinamici e parsing dei dati della REST API.
* **Esplorazione Geografica (`pages/Explore.jsx`):** Filtro e visualizzazione dei paesi per regione o continente con schede informative dettagliate.
* **Dashboard Statistiche (`pages/Dashboard.jsx`):** Ordinamento e confronto nazioni per popolazione, area geografica e densità abitativa.
* **Gestione Preferiti (`services/storage.js`):** Persistenza client-side dei codici ISO alpha-3 mediante `localStorage` per mantenere le preferenze tra sessioni.
* **Componenti Dinamici (`components/CountryCard.jsx`, `components/RecordsTable.jsx`):** Rendering reattivo di schede paese, tabelle informative e stati di caricamento/errore/vuoto.

## Setup ed Esecuzione

Requisiti minimi: Node.js, Git.

```bash
npm install
npm run dev
```

A quel punto l'applicazione sarà accessibile all'indirizzo locale indicato dal terminale (tipicamente `http://localhost:5173`) e potete esplorare tutte le funzionalità offerte, dalla ricerca di singoli paesi, all'esplorazione geografica, fino alla consultazione del dashboard statistico e la gestione dei preferiti.

# Esercizi da Svolgere

Gli esercizi totali sono suddivisi in 3 macro-aree di intervento, ognuna con un peso specifico in termini di punteggio finale.
I primi due avranno anche dei commenti `TODO` all'interno del codice per guidarvi nei punti esatti in cui intervenire.
Il terzo esercizio richiede invece un'attività di debugging logico, per cui dovrete esplorare autonomamente i file per trovare e risolvere il problema.

### 1. INTEGRAZIONI DATI (60p)

**Obiettivo:** Ripristinare il sistema di recupero e visualizzazione dei dati delle nazioni. Il sito per ora da errore o mostra dati incompleti in praticamente tutte le sezioni chiave.

**Task richiesti:**

1. **Data Fetching in [app/services/api.js](app/services/api.js)**\
   Completa la logica della funzione `requestCountryList` per effettuare una fetch all'endpoint passato come parametro. Dovrai gestire correttamente la risposta, trasformare i dati ricevuti e implementare una gestione degli errori corretta.

2. **Data Binding & UI Rendering in [app/components/CountryCard.jsx](app/components/CountryCard.jsx)**\
   Una volta recuperati i dati, completa il markup JSX del componente `CountryCard` per popolare correttamente la card di ogni paese. Assicurati che tutte le informazioni richieste (bandiera, nome, codice, capitale, regione, popolazione, area e densità) siano visualizzate in modo chiaro e ordinato.

### 2. CORREZIONE LAYOUT (30p)

**Obiettivo:** Ripristinare la visualizzazione di alcune sezioni del sito che presentano anomalie strutturali ed estetiche.

**Task richiesti:**

1. **Correzione Form in [app/pages/Dashboard.jsx](app/pages/Dashboard.jsx)**\
   Nella sezione del form per la selezione di metrica, ordine e numero di elementi, manca la classe corretta per mostrare i gruppi del form in modo ordinato. Cerca la classe corretta da inserire nei `div` che contengono i gruppi per ripristinare l'allineamento e la spaziatura corretta tra i campi del form. (cerca la classe nelle altre pagine che hanno il form corretto)

2. **Select con bordo errato [app/App.css](app/App.css)**\
   Gli elementi `select` all'interno del form del dashboard non hanno il bordo arrotondato come previsto dallo stile generale dell'app. Completa la sezione CSS relativa agli elementi `select` in `App.css` indicata da `input, select` per aggiungere il bordo arrotondato mancante.

3. **Stile Tabella [app/App.css](app/App.css)**\
   La tabella che mostra i risultati del dashboard non ha un layout difficile da leggere. Completa la sezione CSS relativa alla tabella in `App.css` indicata da `.records-table th, .records-table td`. Indicazioni più specifiche sono presenti nei commenti `TODO` all'interno del file CSS.

### 3. DEBUGGING LOGICO (10p)

**Obiettivo:** Individuare e risolvere un'anomalia nel flusso esecutivo della user interface.

**Problema riscontrato:**\
Quando si accede alla pagina di ricerca (`/search`) e si esegue una query, si può scegliere di cercare per nazione o per capitale. Tuttavia, quando si seleziona la ricerca per capitale, non vengono restituiti risultati anche se esistono paesi con quella capitale (es. "Roma" per l'Italia).

**Task richiesti:**
1. Esamina il codice e comprendi da dove nasce il problema, identificando la causa logica che impedisce il corretto funzionamento della ricerca per capitale.
2. Correggi il bug in modo che la ricerca per capitale funzioni correttamente, restituendo i risultati attesi quando si inserisce una query valida.
