import React, { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8001';
export default function useApplicationData(initial){

  const URLs= [
    '/api/days',
    '/api/appointments',
    '/api/interviewers']
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

//websocket functionality
    useEffect(() => {
      const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL) 
      socket.onopen = function(event) {
        socket.send("ping");
      }
      socket.onmessage = function(event) {
        let data = JSON.parse(event.data);
        if(data.type === "SET_INTERVIEW"){
            setState(prevState => {
              const appointment = {
                ...prevState.appointments[data.id],
                interview: data.interview
              };
              const appointments = {
                ...prevState.appointments,
                [data.id]: appointment
              };
              const days = remainingSpots(appointments, prevState.days, prevState.day)
              return {...prevState, appointments, days}
            })

        }
      }
    }, []);

    //for fetching data from the api
    useEffect(() => {
        function getAllData(URLs){
          return Promise.all(URLs.map(fetchData))
          .then(response =>{
            setState({...state,
              days: response[0].data,
              appointments: response[1].data,
              interviewers: response[2].data});
        })}
        getAllData(URLs);
    },[])

//function for booking an interview
    function bookInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      const days = remainingSpots(appointments, state.days, state.day)

      return axios.put(`/api/appointments/${id}`, {
        ...appointment
      })
      .then(() => {
        setState({...state, appointments, days})
      })
   }
//function for canceling an interview
   function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = remainingSpots(appointments, state.days, state.day)

    return axios.delete(`/api/appointments/${id}`, {
      ...appointment
    })
    .then(() => {
      setState ({...state, appointment, days});
    });
   }
  const setDay = day => setState ({ ...state, day })

 //spots updating function for spots remaining
  function remainingSpots (appointments, days, day){
    let spotsAvailable = 0
    const thisDay = days.find(d => d.name === day)
    let appointment = thisDay.appointments
   for(const app of appointment){
     if(appointments[app].interview === null){
      spotsAvailable += 1
    };
  };
  thisDay.spots = spotsAvailable
  const index = days.findIndex(d => d.name === day.name)
  const thisDays = [...days];
  thisDays[index] = thisDay;

  return thisDays;

  };


  return { state, setDay, bookInterview, cancelInterview };
};
