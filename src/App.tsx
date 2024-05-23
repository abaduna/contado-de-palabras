import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [userMessage, setUserMessage] = useState<string>("");
  const [timeStart, setTimeStart] = useState<Date>(new Date());
  const [timeDifference, setTimeDifference] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [play, setPlay] = useState<boolean>(false);
  const [winer, setWiner] = useState<boolean>(false);
  const MesajeArry = "hola mundo".split("");

  useEffect(() => {

    const MesajeArryUser = userMessage.split("")
    console.log('first', MesajeArryUser[userMessage.length - 1])
    
    if (
      userMessage.length > 0 && MesajeArryUser[userMessage.length - 1]=== MesajeArry[userMessage.length - 1] ) {
      setScore(score + 10);
      if ( userMessage.length > 0 && MesajeArryUser[9]=== "o" ) {
        console.log('ganasta')
        setWiner(true)
        setPlay(false)
      setUserMessage("");
      setTimeStart(new Date());
      setScore(0);
      setTimeDifference(0);
      }
    } else {
      setPlay(false)
      setUserMessage("");
      setTimeStart(new Date());
      setScore(0);
      setTimeDifference(0);
    }

  }, [userMessage]);
  let  intervalId = 0
  useEffect(() => {


    if (play) {
       intervalId = window.setInterval(() => {
        const currentMillis = Date.now();
        const elapsedSeconds = Math.floor((currentMillis - timeStart.getTime()) / 1000);
        setTimeDifference(elapsedSeconds);
      }, 1000);
    } else {
      clearInterval(intervalId);
      setUserMessage("");
      setTimeStart(new Date());
      setScore(0);
      setTimeDifference(0);
    }

    // Cleanup function to ensure interval is cleared on unmount
    return () => clearInterval(intervalId);
  }, [play, timeStart]);

  const handlerPlay = () => {
    setPlay(!play);
  };

  return (
    <>
      <h1 className="word">
        {MesajeArry.map((char, index) => (
          <span
            key={index}
            style={{ color: userMessage[index] === char ? "red" : "black" }}
          >
            {char}
          </span>
        ))}
      </h1>
      {winer && <h1>Ganaste</h1>}
      <div>
        <span>time: {timeDifference}s</span>
        <br />
        <span>score: {score}</span>
      </div>

      <input
        type="text"
        value={userMessage}
        className="input"
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="hola mundo"
      />
      <button
        className="btn"
        style={{ backgroundColor: play ? "red" : "green" }}
        onClick={handlerPlay}
      >
        {play ? "stop" : "play"}
      </button>
    </>
  );
}

export default App;