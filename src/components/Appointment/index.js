import React from "react";
import "components/Appointment/styles.scss";
import Show from "components/Appointment/Show";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";

//const classNames = require('classnames');


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    
    <article className="appointment">
      <Header
        time={props.time}
      />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
      <Show
      student={props.interview.student}
      name={props.interview.interviewer.name}    
      />
    )}
     {mode === CREATE && (
       <Form 
       interviewers={[]}
       onCancel={() => back(EMPTY)}
       onSave={() => transition(CREATE)}
       
       />
     )}
   
    </article>
  )}


  // {props.interview ?(  
  //   <Show   student={props.interview.student}
  //   name={props.interview.interviewer.name}/>) : (<Empty />)}
