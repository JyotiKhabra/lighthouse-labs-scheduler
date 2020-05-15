//returns an array of appointments
export function getAppointmentsForDay(state, day) { 
  const filteredDays = state.days.filter(days => days.name === day);
  //console.log("filtereddays", filteredDays)
  let appointment = [];
  if (!appointment){
    return null;
    }else if(filteredDays.length){
  appointment = filteredDays[0].appointments.map(id => state.appointments[id]);
  }
 return appointment;
};

export function getInterview(state, interview) { 
  if (!interview) {
    return null;
  }else {
    const student = interview.student;
    const interviewer = state.interviewers[interview.interviewer];
    let interviews = { interviewer, student };
    return interviews;
  } 
}

export function getInterviewersForDay(state, day) { 
  const filteredDays = state.days.filter(days => days.name === day);
  if (!filteredDays){
    return [];
  }  
  let interview = [];
  if(filteredDays.length){
  interview = filteredDays[0].interviewers.map(id => state.interviewers[id]);
}
 return interview;
};