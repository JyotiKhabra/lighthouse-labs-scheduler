import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Show from "components/Appointment/Show";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";

//const classNames = require('classnames');


export default function Appointment(props) {
  props.interview() ? Show : Empty
  return (
    <Fragment>
    <Header
    time={props.time}
    />
    <Show
    />
    <Empty/>
    <Appointment id="last" time="1pm" />
  
   </Fragment>
    //<article className="appointment"></article>
  );
}