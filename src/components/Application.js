import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import Appointment from "components/Appointment/index";
import DayList from "components/DayList";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";


const URLs= ['http://localhost:8001/api/days', 'http://localhost:8001/api/appointments', 'http://localhost:8001/api/interviewers']
function fetchData(URL) {
  return axios
    .get(URL)
    .catch(function(error) {
      //putting this catch here to prevent promise.all from failing, incase one promise fails.
      console.log(error)
  });
}

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  useEffect(() => {
      function getAllData(URLs){
        return Promise.all(URLs.map(fetchData))
        .then(response =>{
          console.log(response) 
          setState({...state, days: response[0].data, appointments: response[1].data, interviewers: response[2].data});
      })}
      getAllData(URLs);
  },[]) 

  
  const setDay = day => setState({ ...state, day })
  const appointments = getAppointmentsForDay({...state}, state.day)
   const appointment = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
        return (
            <Appointment 
              key={appointment.id}
              {...appointment}
              interview={interview}
            />
          );
        });
      console.log("appointments", appointments);



  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList 
  days={state.days}
  day={state.day}
  setDay={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {appointment}
        <Appointment id="last" time="5pm" />
      </section>
    </main>
  );
}
