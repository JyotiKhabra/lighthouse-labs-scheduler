import React, { useEffect } from "react";
import "components/Appointment/styles.scss";
import Show from "components/Appointment/Show";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Error from "components/Appointment/Error";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import useVisualMode from "hooks/useVisualMode";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const FORM = "FORM";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

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
      .then(() => transition(SHOW))
      .catch(()=> transition(ERROR_SAVE, true));
  }
  function deleting() {
    transition(DELETING, true);
      props.cancelInterview(props.id)
        .then(() => transition(EMPTY))
        .catch((error)=> console.log(error));
  }
  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
      transition(EMPTY);
    }
  }, [props.interview]);




  return (
    
    <article className="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && props.interview && ( 
      <Show
      student={props.interview && props.interview.student}
      name={props.interview && props.interview.interviewer.name}    
      onDelete={() => transition(CONFIRM)}
      onEdit={() => transition(EDIT)}    
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
      {mode === CONFIRM && 
      <Confirm
      message="Are you sure you want to delete?" 
      onCancel={() => back(EMPTY)}
      onConfirm={deleting}    
      />}
      {mode === DELETING &&  <Status message="DELETING" />}
      {mode === EDIT && (
        <Form
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        name={props.interview.student}
        onCancel={() => back()} 
        onSave={save}
        />
      )}
     {mode === ERROR_DELETE && (
        <Error
        onClose={() => back()}
        message="Error! Could not cancel the appointment" />
      )}

      {mode === ERROR_SAVE && (
        <Error
        onClose={() => back()}
        message="Error! Could not save the appointment" />
      )} 

   
    </article>
  )}



