import React from 'react';

const Timer=({state,adjustTimer}) =>{
    const { timerTime} = state;

    let mileseconds = ("00" + Math.floor((timerTime/100 ) *100)).slice(-3);
    let seconds = ("-0" + (Math.floor(Math.abs((timerTime / 1000) % 60) % 60))).slice(-2);
    let minutes = ("0" + Math.floor(Math.abs((timerTime / 60000) % 60))).slice(-2);
    let hours = ("0" + Math.floor(Math.abs((timerTime / 3600000) % 60))).slice(-2);

    return(
        <div className="Countdown-display">
          <button onClick={() => adjustTimer("incHours")}>&#8679;</button>
          <button onClick={() => adjustTimer("incMinutes")}>
            &#8679;
          </button>
          <button onClick={() => adjustTimer("incSeconds")}>
            &#8679;
          </button>
          <button onClick={() => adjustTimer("incMiSeconds")}>
            &#8679;
          </button>

          <div className="Countdown-time">
          <span className="minus">{timerTime <0 ? '-':''}</span> {hours} : {minutes} : {seconds} : <small>{mileseconds}</small>
            
          </div>

          <button onClick={() => adjustTimer("decHours")}>&#8681;</button>
          <button onClick={() => adjustTimer("decMinutes")}>
            &#8681;
          </button>
          <button onClick={() => adjustTimer("decSeconds")}>
            &#8681;
          </button>
          <button onClick={() => adjustTimer("decMiSeconds")}>
            &#8681;
          </button>          
           
        </div>
    )
}


export default Timer;