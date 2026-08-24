import { Route, Routes } from 'react-router';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Explore from './pages/Explore.jsx';
import Favorites from './pages/Favorites.jsx';
import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';

/**
 * Componente principale dell'applicazione.
 * @returns {React.JSX.Element} - Componente App.
 */
function App() {
  return (
    <>
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
