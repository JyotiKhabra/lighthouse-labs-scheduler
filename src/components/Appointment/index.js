import React from "react";
import "components/Appointment/styles.scss";
import Show from "components/Appointment/Show";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";

import useVisualMode from "hooks/useVisualMode";

//const classNames = require('classnames');


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
      props.bookInterview(props.id, interview)
      .then (() => transition(SHOW));
  }
  function deleting() {
     transition(DELETING);
    console.log("deleting")
      props.cancelInterview(props.id)
      .then (() => transition(EMPTY));
  }



  return (
    
    <article className="appointment">
      <Header
        time={props.time}
      />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
      <Show
      student={props.interview && props.interview.student}
      name={props.interview && props.interview.interviewer.name}
      onDelete={deleting}    
      />
    )}
     {mode === CREATE && (
       <Form 
       interviewers={props.interviewers}
       onCancel={() => back(EMPTY)}
       onSave={save}
       />
       
     )}
      {mode === SAVING && <Status message="SAVING" />}
      {mode === DELETING && <Status message="DELETING" />}


   
    </article>
  )}


  // {props.interview ?(  
  //   <Show   student={props.interview.student}
  //   name={props.interview.interviewer.name}/>) : (<Empty />)}
