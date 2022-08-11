import React, { useState, useEffect } from 'react';
import "./Date-Time.css"
import {BsCalendarWeek}from "react-icons/bs";
import {FiClock}from "react-icons/fi";


// import './App.css';
// import { ReactComponent as ClockIcon } from './icons/clock.svg';
// import { ReactComponent as CalenderIcon } from './icons/calendar.svg';

function DateTime() {
    const [dateState, setDateState] = useState(new Date());
    useEffect(() => {
           setInterval(() => setDateState(new Date()), 30000);
    }, []);
    return (
        <div className="DateTime"  >
            {/* <CalenderIcon /> */}
            <BsCalendarWeek  className='BsCalendarWeek' color={"black"}/>
            <p className='date1'>
              {' '}
              {dateState.toLocaleDateString('en-GB', {
                 day: 'numeric',
                 month: 'numeric',
                 year: 'numeric',
              })}
              
            </p>
            {/* <ClockIcon /> */}
            <p>
            <FiClock className='BsClock' color={"black"}/>
             {dateState.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            })}
            </p>
        </div>
    );
}

export default DateTime;