import { useState, useEffect } from 'react';
import mmoapi from './services/mmoapi';
import './App.css';

const App = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const data = mmoapi.getAll();
    setGames(data);
  }, []);

  return (
    <div>
      Welcome
    </div>
  );
};

export default App;
