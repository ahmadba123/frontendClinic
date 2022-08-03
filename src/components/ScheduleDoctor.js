import React, { useState, useEffect, } from 'react'
import { render } from 'react-dom';
import axios from "axios";
import {Calendar , momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
function ScheduleDoctor() {

moment.locale('en-GB');
const localizer = momentLocalizer(moment)
const defaultDate = new Date(2022, 1, 31)
const views = ['day', 'work_week']
const [scheduleDoctor, setscheduleDoctor] = useState([]);

useEffect(() => {
  getAllData();
  // Viewinfo()
}, []);

const getAllData = async () => {
  try {

    await axios
      .get(`http://localhost:8000/api/schedule/`)
      .then((res) => {
       
        setscheduleDoctor(res.data.responce)
        console.log(res.data.response)
       
      })
      .catch((err) => console.log(err));
  } catch (e) {
    console.log(e);
  }
};

const events = [
    {
      id: 0,
      title: 'MسيشسشسيS training',

      start: new Date(2022, 0, 29, 9, 0, 0),
      end: new Date(2022, 0, 29, 13, 0, 0),
      resourceId: 1,
    },
    { scheduleDoctor},
    {
      id: 1,
      title: 'MS training',
      allDay: true,
      start: new Date(2022, 0, 29, 14, 0, 0),
      end: new Date(2022, 0, 29, 16, 30, 0),
      resourceId: 2,
      
    }]

//  const ScheduleDoctor = () => (
  return (

  <div style={{ height: 700 }}>
    <Calendar
    className='container'
     localizer={localizer}
     startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      events={events}
      // scheduleDoctor={scheduleDoctor}
      defaultDate={defaultDate}
      
    // defaultView={Views.DAY}
      
    //   events={[
    //     {
    //       'title': 'My event',
    //       'allDay': false,
    //       'start': new Date(2018, 0, 1, 10, 0), // 10.00 AM
    //       'end': new Date(2018, 0, 1, 14, 0), // 2.00 PM 
    //     }
    //   ]}
    //   step={60}
    //   view='week'
    //   views={['week']}
    //   min={new Date(2008, 0, 1, 8, 0)} // 8.00 AM
    //   max={new Date(2008, 0, 1, 17, 0)} // Max will be 6.00 PM!
    //   date={new Date(2018, 0, 1)}
    />
  </div>
);
  }
render(<ScheduleDoctor />, document.getElementById('root'));

export default ScheduleDoctor