import { useState } from "react";

export default function useVisualMode(initial){
  const [history, setHistory] = useState([initial]);

  const back = () => {
   if(history.length < 2){
    return;
   };
   //prev is for setting the previous state
    setHistory(prev => [...prev.slice(0, prev.length -1)]);
  }

  const transition = (newMode, replace = false) => {
    setHistory( prev => replace ? [...prev.slice(0, prev.length -1), newMode] : [...prev, newMode])
  }

  return{ mode: history[history.length-1], transition, back };
}



