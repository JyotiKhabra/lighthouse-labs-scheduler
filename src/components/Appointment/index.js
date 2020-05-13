import React from "react";
import "components/Appointment/styles.scss";
import Show from "components/Appointment/Show";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";

//const classNames = require('classnames');


export default function Appointment(props) {

  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
     {props.interview ?(  
     <Show   student={props.interview.student}
     name={props.interview.interviewer.name}/>) : (<Empty />)}
    </article>
  )}
