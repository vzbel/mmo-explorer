import { useState, useEffect } from 'react';
import mmoapi from './services/mmoapi';
import utils from './utils/utils';

import Card from './components/Card';
import MiniCard from './components/MiniCard';

import './App.css';

const App = () => {
  const [games, setGames] = useState([]);
  // Current index in the games list
  const [index, setIndex] = useState(21);
  // Indices seen so far
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getAllGames = async () => {
      const data = await mmoapi.getAll();
      setGames(data);
    };
    getAllGames();
  }, []);

  // Current game displayed to user
  let game;
  if(games.length > 0){
    game = games[index];
  }

  // TODO: complete when implementing ban list 
  const handleTagRemoval = (tag) => {
    const [key, value] = Object.entries(tag)[0];
    console.log(`${value} will be added to ban list for ${key}`);
  };

  const handleReroll = () => {
    setIndex(utils.getRandomIndex(games.length));
    setHistory([...history, index]);
  };

  return (
    <div className="wrapper flex">
      <main>
        <header>
          <h1>MMO Explorer</h1>
        </header>
        <h2>Explore</h2>
        {
          game && 
          <Card 
            image={{
              url: game.thumbnail,
              alt: game.name + " game art, an MMORPG game"
            }}
            title={{
              text: game.title,
              link: game.game_url
            }}
            tags={[
              {genre: game.genre},
              {platform: game.platform}
            ]}
            onRemoveTag={handleTagRemoval}
            description={game.short_description}
            details={[
              {publisher: game.publisher},
              {developer: game.developer}
            ]}
          />
        }

        <button onClick={handleReroll} className="btn-reg">
        Reroll MMO
        </button>
      </main>

      <hr className="main-separator"/>

      <aside>
        <h3>History</h3>
        <section className="history-grid flex">
          { 
            history.length > 0 && 
            history.toReversed().map((seenIndex) => {
              const seenGame = games[seenIndex];
              return (
                <MiniCard
                  key={seenGame.title}
                  image={{
                    url: seenGame.thumbnail,
                    alt: seenGame.name + " game art, an MMORPG game"
                  }}
                  title={{
                    text: seenGame.title,
                    link: seenGame.game_url
                  }}
                  details={[
                    {publisher: seenGame.publisher},
                    {developer: seenGame.developer}
                  ]}
                />
              );
            })
          }
        </section>
      </aside>
    </div>
  );
};

export default App;
