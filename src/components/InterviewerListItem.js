import React from "react";
import "components/InterviewerListItem.scss";
const classNames = require('classnames');


export default function InterviewerListItem(props) {
  const interviewerListItem = classNames({
    'interviewers__item': true, 
    'interviewers__item-image': props.avatar,
    'interviewers__item--selected': props.selected
  });
  return (
    <li 
      className={interviewerListItem} 
      onClick={() => props.setInterviewer(props.name)}
    >
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}
   </li>
  );
}
