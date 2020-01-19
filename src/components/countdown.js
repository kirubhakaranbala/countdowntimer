import React, { Component } from "react";
import "../App.css";
import Laps from './laps';
import Timer from './timer';

class Countdown extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    laps:[],
    exceed:false
  };

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem("state",JSON.stringify(this.state));
  }

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime
    });
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      if(newTime < 0){
        this.setState({
          exceed:true
        })
      }else{
        this.setState({
          exceed:false
        })
      }
      if (newTime >= 0 || this.state.exceed) {
        this.setState({
          timerTime: newTime
        });
      } else {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
       
      }
    }, 10);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };


  resetTimer = () => {
        this.setState({
        timerTime: 0,
        timerStart:0,
        timerOn:false,
        exceed:false,
        laps:[]
      });
      clearInterval(this.timer);
      localStorage.setItem('state','');
  
  };

  
  adjustTimer = input => {
    const { timerTime, timerOn } = this.state;
    if (!timerOn) {
      if (input === "incHours" && timerTime + 3600000 < 216000000) {
        this.setState({ timerTime: timerTime + 3600000 });
      } else if (input === "decHours" && timerTime - 3600000 >= 0) {
        this.setState({ timerTime: timerTime - 3600000 });
      } else if (input === "incMinutes" && timerTime + 60000 < 216000000) {
        this.setState({ timerTime: timerTime + 60000 });
      } else if (input === "decMinutes" && timerTime - 60000 >= 0) {
        this.setState({ timerTime: timerTime - 60000 });
      } else if (input === "incSeconds" && timerTime + 1000 < 216000000) {
        this.setState({ timerTime: timerTime + 1000 });
      } else if (input === "decSeconds" && timerTime - 1000 >= 0) {
        this.setState({ timerTime: timerTime - 1000 });
      }else if (input === "incMiSeconds" && timerTime + 1 < 216000000) {
        this.setState({ timerTime: timerTime + 1 });
      }else if (input === "decMiSeconds" && timerTime - 1 >= 0) {
        this.setState({ timerTime: timerTime - 1 });
      }
    }
  };
  
  componentDidMount() {
    document.addEventListener("keydown", this.keyPressed);
    if(localStorage.getItem('state'))
    {
      let state=JSON.parse(localStorage.getItem('state'));
      this.setState(state);
    }
  }

  keyPressed =(e) =>{
    
    if(e.keyCode === 32){
    const { timerTime,laps,timerStart,timerOn } = this.state;
    let timerset= timerTime;
    let lapstate=laps;
    let duration='';
    let starttime='';
    let endtime='';

    if(lapstate.length>0){
      duration=Math.abs(lapstate[lapstate.length-1].timer-timerTime);
      starttime=Math.abs(lapstate[lapstate.length-1].timer);
      
    }else{
      duration=Math.abs(timerTime-timerStart);
      starttime=Math.abs(timerStart);
    }
    
    if(timerStart !=0 && timerOn === true && timerTime >0){

    let durationval,startval,endval;
    if(duration){
    let mileseconds = ("00" + Math.floor((duration/100 ) *100)).slice(-3);
    let seconds = ("0" + (Math.floor((duration / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((duration / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor((duration / 3600000) % 60)).slice(-2);
    durationval=`${hours}:${minutes}:${seconds}:${mileseconds}`;

    }

    if(starttime){
      let mileseconds = ("00" + Math.floor((starttime/100 ) *100)).slice(-3);
      let seconds = ("0" + (Math.floor((starttime / 1000) % 60) % 60)).slice(-2);
      let minutes = ("0" + Math.floor((starttime / 60000) % 60)).slice(-2);
      let hours = ("0" + Math.floor((starttime / 3600000) % 60)).slice(-2);
      startval=`${hours}:${minutes}:${seconds}:${mileseconds}`;
      
      }

      if(timerTime){
        let mileseconds = ("00" + Math.floor((timerTime/100 ) *100)).slice(-3);
        let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
        let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);
        endval=`${hours}:${minutes}:${seconds}:${mileseconds}`;
        
        }






    //let val={'val':`${hours}:${minutes}:${seconds}:${mileseconds}`,timer:timerTime};
    let val={'duartion':durationval,'starttime':startval,'endtime':endval,timer:timerTime};
   
    lapstate.push(val);
      
    this.setState({laps:lapstate});
    }
    }

    if(e.keyCode === 8){
      const {laps} = this.state;
      let lapstate=laps;
      
      if(lapstate.length >0){
      let mergeval= lapstate[lapstate.length-1].timer;
      lapstate.pop();
       
      this.setState({
        laps:lapstate,
        timerTime:mergeval
      });
    }
    }

  }

  render() {
     
    const { timerTime, timerStart, timerOn ,laps,exceed} = this.state;

    
    return (
      <div className={exceed ? "Countdown Exceed" :"Countdown"}  >       
        
        <div className="Countdown-label">Hours : Minutes : Seconds : Msec</div>
        <Timer state={this.state} adjustTimer={this.adjustTimer}/>  
        <div className="Actionbtn">
        {timerOn === false && (timerStart === 0 || timerTime === timerStart) && (
          <button className="Button-start" onClick={this.startTimer} type="button" disabled={!timerTime} for="start">
            Start
          </button>
        )}
        {timerOn === true  && (
            <>
          <button className="Button-stop" onClick={this.stopTimer} for="stop">
            Stop
          </button>
          <button className="Button-stop" onClick={this.stopTimer}>
            Pause
          </button>

         
        </>
        )}
        {timerOn === false &&
          (timerStart !== 0 && timerStart !== timerTime && timerTime !== 0) && (
            <button className="Button-start" onClick={this.startTimer} for="start">
              Start
            </button>
          )}

        {(timerOn === false && timerStart !== 0) &&
          (timerStart !== timerTime  ) && (
            <button className="Button-reset" onClick={this.resetTimer}>
              Reset
            </button>
          )}

        </div>       
        <Laps laps={laps}/>
      </div>
    );
  }
}

export default Countdown;
