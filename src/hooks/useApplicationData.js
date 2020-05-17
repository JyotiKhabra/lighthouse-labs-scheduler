import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial){

  const URLs= ['http://localhost:8001/api/days', 'http://localhost:8001/api/appointments', 'http://localhost:8001/api/interviewers']
  function fetchData(URL) {
    return axios
      .get(URL)
      .catch(function(error) {
        //putting this catch here to prevent promise.all from failing, incase one promise fails.
        console.log(error)
    });
  }
  
    const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {}
    });

    useEffect(() => {
    const socket = new WebSocket("ws://localhost:8001")
    socket.onopen = function(event) {   
    socket.send("ping") 
    }
    socket.onmessage = function(event) {
      console.log(event.data);
    }
  }, []);
    
    useEffect(() => {
        function getAllData(URLs){
          return Promise.all(URLs.map(fetchData))
          .then(response =>{
            console.log(response) 
            setState({...state, days: response[0].data, appointments: response[1].data, interviewers: response[2].data});
        })}
        getAllData(URLs);
    },[]) 
    
    function bookInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      const days = remainingSpots(appointments)
    
      return axios.put(`http://localhost:8001/api/appointments/${id}`, {
        ...appointment
      })
      .then(() => {
        setState({...state, appointments, days})
      })
   }
  
   function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = remainingSpots(appointments)

    return axios.delete(`http://localhost:8001/api/appointments/${id}`, {
      ...appointment
    })
    .then(() => {
      setState({...state, appointment, days});
    });
   }
  const setDay = day => setState({ ...state, day })

  function remainingSpots (appointments){
    let spotsAvailable = 0 
    const day = state.days.find(day => day.name === state.day) 
    let appointment = day.appointments
   for(const app of appointment){
     if(appointments[app].interview === null){ 
      spotsAvailable += 1
    }
  }
  day.spots = spotsAvailable
  const index = state.days.findIndex(d => d.name === day.name)
 // console.log("index", index )
  const days = [...state.days];
  days[index] = day;
 // console.log("daysindex", days[index])

  
  return days; 

  } 
 
  
  return{ state, setDay, bookInterview, cancelInterview };
}
