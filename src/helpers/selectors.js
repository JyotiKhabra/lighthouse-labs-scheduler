//returns an array of appointments
export function getAppointmentsForDay(state, day) { 
  const filteredDays = state.days.filter(days => days.name === day);
  //console.log("filtereddays", filteredDays)
  let appointment = [];
  if(filteredDays.length){
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
