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
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
      props.bookInterview(props.id, interview)
      .then (() => transition(SHOW));
   

   // console.log("props.id, interview", props.id, interview)
  }
  console.log("interview", props.interview)
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
      />
    )}
     {mode === CREATE && (
       <Form 
       interviewers={props.interviewers}
       onCancel={() => back(EMPTY)}
       onSave={save}
       />
     )}
   
    </article>
  )}


  // {props.interview ?(  
  //   <Show   student={props.interview.student}
  //   name={props.interview.interviewer.name}/>) : (<Empty />)}
