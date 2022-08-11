import React, { useState, useEffect, } from 'react'

import DateTime from '../../components/DateTime/Date-Time'
import {BsPersonFill}from "react-icons/bs";
import {FaHospitalAlt}from "react-icons/fa";
import {MdOutlinePaid} from "react-icons/md";
import {MdPaid} from "react-icons/md";
import axios from "axios";

import "./home.css"
function Home() {
  const[doctor,setDoctor]=useState('');
  const[patient,setPatient]=useState('');
  const[visit,setVisit]=useState('');
  const[lab,setLab]=useState('');

  useEffect(() => {
    getAllDataDoctor();
    getAllDataPatient();
    getAllDataVisit();
    getAllDataLab();
  }, []);

  const getAllDataDoctor = async () => {
    try {

      await axios
        .get(`http://localhost:8000/api/doctor/`)
        .then((res) => {
          setDoctor(res.data.countdoctor)
          // console.log(res.data)

        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };
  const getAllDataPatient = async () => {
    try {

      await axios
        .get(`http://localhost:8000/api/patient/`)
        .then((res) => {
          setPatient(res.data.countPatient)
          // console.log(res.data)

        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };
  const getAllDataVisit= async () => {
    try {

      await axios
        .get(`http://localhost:8000/api/visit/`)
        .then((res) => {
          setVisit(res.data.countvisit)
          console.log(res.data)

        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  const getAllDataLab= async () => {
    try {

      await axios
        .get(`http://localhost:8000/api/lab/`)
        .then((res) => {
          setLab(res.data.countLab)
          console.log(res.data)

        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='container pageHome' >
      <DateTime></DateTime>
      <div className='allCard'>
    <div className='nbOfDr'>
    <BsPersonFill size={40}/>
        number of doctors:
        <span className='nbCardDr'><b>{doctor}</b></span>
      </div>
      <div className='nbOfDr'>
      <BsPersonFill size={40}/>
        number of patien:
        <span className='nbCardDr'><b>{patient}</b></span>

      </div>
      <div className='nbOfDr'>
      <BsPersonFill size={40}/>

        number of visits:
        <span className='nbCardDr'><b>{visit}</b></span>

      </div>
      <div className='nbOfDr'>
      <FaHospitalAlt size={40}/>
        number of labs:
        <span className='nbCardDr'><b>{lab}</b></span>

      </div>
    </div>
    <div className='allCradPrice'>
    <div className='nbOfDr'>
    <MdOutlinePaid size={40}/>
        price visit of day
     <span className='nbCardDr'><b>2 000 000 L .L</b></span>

      </div>
      <div className='nbOfDr'>
    <MdOutlinePaid size={40}/>
      price visit of week

      <span className='nbCardDr'><b>2 000 000 L .L</b></span>

      </div>
      <div className='nbOfDr'>
    <MdOutlinePaid size={40}/>

      price visit of month
      <span className='nbCardDr'><b>2 000 000 L .L</b></span>

      </div>
      <div className='nbOfDr'>
    <MdOutlinePaid size={40}/>
      price visit of year
      <span className='nbCardDr'><b>2 000 000 L .L</b></span>

      </div>
    </div>
  
    <div className='allCradlabs'>
    <div className='nbOfDr'>
    <MdPaid size={40}/>
        price labs of day
      <span className='nbCardDr'><b>2 000 000 L .L</b></span>
      </div>
      <div className='nbOfDr'>
    <MdPaid size={40}/>

      price labs of week
      <span className='nbCardDr'><b>2 000 000 L .L</b></span>

      </div>
      <div className='nbOfDr'>
    <MdPaid size={40}/>

      price labs of month
      <span className='nbCardDr'><b>2 000 000 L .L</b></span>

      </div>
      <div className='nbOfDr'>
    <MdPaid size={40}/>

      price labs of year
      <span className='nbCardDr'><b>2 000 000 L .L</b></span>

      </div>
    </div>
    </div>

  )
}

export default Home