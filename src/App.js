
import React from "react";
import { BrowserRouter, Route, Routes, Navigate ,} from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import Doctor from "./pages/doctor/doctor";
import Home from "./pages/home/home";
import EditProfile from "./pages/editProfile/editProfile"
import Labs from "./pages/labs/labs"
import Financial from "./pages/financial/financial"
import Vistior from "./pages/vistior/vistior"
import Patient from "./pages/Patient/Patient";
import Login from "./pages/logIn/login"
import ProtectedRoutes from "./components/ProtectedRoutes";
import {ToastContainer} from "react-toastify";
import axios from "axios";
import NotFound from "./pages/logIn/NotFound"
import '@progress/kendo-theme-default/dist/all.css';

import ScheduleDoctor from "./components/ScheduleDoctor";



// export function Page(props) {
//   return (
//     <div className="main_container">
//       <Layout active={props.active} />
//       <div className="main_section">{props.children}</div>
//     </div>
//   );
// }

function App() {
  return (
    <>
 <ToastContainer />
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login />} />
          {
            localStorage.getItem("token") !== null ?
            <Route element={(
                <>
               <Layout/>
                </>
              )}>

               
                <Route path="/home" element={<Home />} />
                <Route path="/service" element={<Labs />}></Route>
                <Route path="/doctor" element={<Doctor />}></Route>
                <Route path="/editProfile" element={<EditProfile />}></Route>
                <Route path="/financial" element={<Financial />}></Route>
                <Route path="/vistior" element={<Vistior />}></Route>
                <Route path="/patient" element={<Patient />}></Route>
                <Route path="/schedule" element={<ScheduleDoctor />}></Route>

            <Route path="/*" element={<NotFound />} />

              </Route>
          
               :
              <Route path="*" element={<Login />} />
          } 
          {/* <Route path="*" element={<Login />} /> */}

        </Routes>
      </BrowserRouter>




      {/* <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <>
          
               {localStorage.getItem("token") !== null ? (
                <Route path="/login" element={<Login />}></Route>
      
      
        ) : (
                
                <Route element={(
                <>
               <Layout />
                </>
              )}>
                <Route path="/labs" element={<Labs />}></Route>
                <Route path="/doctor" element={<Doctor />}></Route>
                <Route path="/editProfile" element={<EditProfile />}></Route>
                <Route path="/financial" element={<Financial />}></Route>
                <Route path="/vistior" element={<Vistior />}></Route>
                <Route path="/patient" element={<Patient />}></Route>
                <Route path="/doctor" element={<Doctor />}></Route>

                <Route index element={<Home />}></Route>
              </Route>

        )}
              
                
              <Route path="*" element={<Login />} />
          
       
          </>



        </Routes>
      </BrowserRouter> */}
    </>
  );
}

export default App;
