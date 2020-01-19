import React from 'react';

const Laps=({laps}) =>{
    let feeds='';
    if(laps.length>0){
        feeds=laps.map((val,index)=>{
            return (<li key={index} ><span className="lap">Lap {index}</span><time>{val.starttime}</time> -- <time>{val.duartion}</time> -- <time>{val.endtime}</time></li>
                
            )
        }).reverse();
        return(
            <ul className="laps">
            <li>
                <span className="lap"># Lap </span>
                <span className="timetlt">EndTime</span>
                <span className="timetlt">Duration</span>            
                <span className="timetlt">StartTime</span>
            </li>
            {feeds}
            </ul>
            
        )
    }else{
         
        return (
            null
        )
    }
    
}

export default Laps;