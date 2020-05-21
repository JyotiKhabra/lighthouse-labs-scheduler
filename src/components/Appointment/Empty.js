import React from "react";
import "components/Appointment/styles.scss";
//const classNames = require('classnames');

//the empty container where you see the add button 
export default function Empty(props) {
  return (
    <main className="appointment__add">
    <img
      className="appointment__add-button"
      src="images/add.png"
      alt="Add"
      onClick={props.onAdd}
    />
    </main>
  );
}