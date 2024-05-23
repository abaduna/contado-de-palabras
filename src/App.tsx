
import { useEffect, useState } from 'react';
import './App.css'

function App() {
  
  const [userMessage,setUserMessage] = useState<string>("")
  const [timeStart,setTimeStart] = useState<Date>(new Date())
  const [timeDifference, setTimeDifference] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [play, setPlay] = useState<boolean>(false);
  const MesajeArry = 'hola mundo'.split("")
 useEffect(()=>{
  
  const MesajeArryUser = userMessage.split("")
  if ( userMessage.length > 0 &&  MesajeArryUser[userMessage.length - 1] === MesajeArry[userMessage.length - 1] ) {
    console.log("es igual");
    setScore(score+10)
  }else {
    setUserMessage("")
    setTimeStart(new Date())
    setScore(0)
    setTimeDifference(0)
  }
 },[userMessage])

  useEffect(() => {
    console.log('play', play)
    if (play) {
     const interval = setInterval(() => {
      const millis: number = Date.now() - timeStart
      setTimeDifference(millis/1000)
    }, 1000);  
    return () => clearInterval(interval); 
    }else {
      setUserMessage("")
    setTimeStart(new Date())
    setScore(0)
    setTimeDifference(0)
    }
    

    
}, [play,timeStart]);
const handlerPlay =()=>{
setPlay(!play)
}
 /**timeStart
  * año now - año
  * time ahor - time start
  * time -
  *  console.log('importante',   Math.floor( new Date().getMilliseconds() - new Date(timeStart).getMilliseconds()))
  */
  return (
    <>
    <h1 className='word'>
        {MesajeArry.map((char, index) => (
          <span key={index} style={{ color: userMessage[index] === char ? 'red' : 'black' }}>
            {char}
          </span>
        ))}
      </h1>
      <div>
        <span >time: {timeDifference.toString()}s</span><br/>
        <span >score: {score}</span>
      </div>
      
    <input type="text"  value={userMessage} className='input' onChange={e=>setUserMessage(e.target.value)} placeholder='hola mundo'/>
    <button className='btn' style={{ backgroundColor:  play ? 'red' : 'green' }} onClick={handlerPlay}>{play ? "stop" : "play"}</button>
    </>
  )
}


export default App
