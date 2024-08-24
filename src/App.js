import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [points, setPoints] = useState(0);
  const [time, setTime] = useState(0);
  const [circles, setCircles] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [target, setTarget] = useState(1);
  const [message, setMessage] = useState("LET'S PLAY!");
  const [messageClass, setMessageClass] = useState('default');

  useEffect(() => {
    let timer;
    if (gameStarted) {
      timer = setInterval(() => {
        setTime(prev => prev + 0.1);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [gameStarted]);

  const startGame = () => {

    if (isNaN(points) || points <= 0) {
      setMessage("LET'S PLAY!");
      setMessageClass('default');
      return;
    }

    const numCircles = points;
    const newCircles = [];
    for (let i = 1; i <= numCircles; i++) {
      newCircles.push({ id: i, x: Math.random() * 350, y: Math.random() * 350 });
    }

    setCircles(newCircles);
    setGameStarted(true);
    setTime(0);
    setTarget(1);
    setMessage("GAME STARTED ! GOOD LUCK !");
    setMessageClass('playing');

  };

  const handleCircleClick = (id) => {
    if (id === target) {

      const updatedCircles = circles.map(circle =>
        circle.id === id ? { ...circle, fadeOut: true } : circle // thêm  thuộc tính fadeOut == true cho circle được click = với giá trị tương đương
      );

      setCircles(updatedCircles);

      setTimeout(() => {
        const newCircles = updatedCircles.filter(circle => circle.id !== id);
        setCircles(newCircles);
        setTarget(target + 1);
        if (newCircles.length === 0) {
          setGameStarted(false);
          setMessage('ALL CLEARED!');
          setMessageClass('won');
        }
      }, 300);
    } else {
      setGameStarted(false);
      setMessage('GAME OVER!');
      setMessageClass('lost');
    }
  };

  return (
    <div className="App">
      <h1 className={messageClass}>{message}</h1>
      <label>
        Points :
        <input
          type="number"
          value={points}
          onChange={(e) => setPoints(parseInt(e.target.value))}
        />
      </label>

      <div>Time  : {time.toFixed(1)}s</div>

      <button onClick={startGame}>{gameStarted ? 'Restart' : 'Start'}</button>

      <div className="game-board">
        {circles.map(circle => (
          <div
            key={circle.id}
            className={`circle ${circle.fadeOut ? 'fade-out' : ''}`}
            style={{ left: circle.x, top: circle.y }}
            onClick={() => handleCircleClick(circle.id)}
          >
            {circle.id}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
