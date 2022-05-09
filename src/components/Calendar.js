import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../stylesheets/Calendar.scss'

function CalendarAdmin() {
  const [value, onChange] = useState(new Date());

  return (
    <div style={{width: '100%'}} >
      <Calendar onChange={onChange} value={value} className="react-calendar" />
    </div>
  );
}
export default CalendarAdmin