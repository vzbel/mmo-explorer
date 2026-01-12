import { useState, useEffect } from 'react';
import mmoapi from './services/mmoapi';
import utils from './utils/utils';

import Card from './components/Card';
import MiniCard from './components/MiniCard';

import './App.css';

const App = () => {
  const [games, setGames] = useState([]);
  // Current index in the games list
  const [index, setIndex] = useState(0);
  // Games seen so far
  const [history, setHistory] = useState([]);
  const [bans, setBans] = useState({
    genre: [],
    platform: [] 
  });
  // Used when the onscreen game is banned,
  // but must remain on screen for the user
  const [bannedGame, setBannedGame] = useState(null);

  useEffect(() => {
    const getAllGames = async () => {
      const data = await mmoapi.getAll();
      setGames(data);
    };
    getAllGames();
  }, []);


  let filteredGames = [];
  if(games.length > 0) {
    filteredGames = games.filter((g) => {
      let keep = true;
      // bans and game keys match
      for(const key of Object.keys(bans)){
        if(bans[key].includes(g[key])){
          keep = false; 
        }
      }
      return keep;
    });
  }

  let game;
  // Current game displayed to user
  if(bannedGame){
    game = bannedGame;
  }else if(filteredGames.length > 0){
    game = filteredGames[index];
  }

  // Add a tag to ban list
  const handleTagRemoval = (tag) => {
    const [key, value] = Object.entries(tag)[0];

    // Prevent duplicate bans
    if(!bans[key].find((v) => v === value)){
      // Update object and array
      setBans({...bans, [key]: [...bans[key], value]});
      // Current onscreen game is banned
      if(game && game[key] === value){
        setBannedGame(game);
      }
    }
  };

  const handleUnban = (key, value) => {
    setBans({
      ...bans, 
      [key]: bans[key].filter((v) => v !== value)
    });
    setBannedGame(game);
  };

  const handleReroll = () => {
    setIndex(utils.getRandomIndex(filteredGames.length));
    if(game && !history.find((g) => g.id === game.id)){
      setHistory([...history, game]);
    }
    setBannedGame(null);
  };

  return (
    <div className="wrapper flex">
      <main>
        <header>
          <h1>MMO Explorer</h1>
        </header>
        <h2>Explore</h2>
        {
          game ? 
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
          :
          <p className="no-games-msg">No game to show. Maybe remove some filters?</p>
        }
        <div className="bans flex">
          Bans:
          {
            Object.entries(bans).map(([key, list]) => (
              list.map((item) => (
                <button 
                  key={item} 
                  className="banned-tag"
                  onClick={() => handleUnban(key, item)}
                >
                {item}
                </button>
              ))
            )) 
          }
        </div>
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
            history.toReversed().map((seenGame) => {
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
