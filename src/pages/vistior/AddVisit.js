import React, { useState } from 'react'
// import "./addDoctor.css";
// import * as React from 'react';
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function AddVisit(props) {
  const [labs, setAge] = React.useState('');
  const [patient, setPatient] = React.useState('');
  const [doctor, setDoctor] = React.useState('');
  const [price, setPrice] = React.useState('');



  const [value, setValue] = useState({})
  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value })
    console.log(value)
  }
  // console.log()
  const handleSubmit = (event) => {
    event.preventDefault();
    props.addNewVisit(value)
    props.handleClose();
    console.log("add submit")

  }
  return (
    <div className="addDriver-container">
      <form method="POST">
        {/* <h1>hello</h1> */}
        <Dialog
          // TransitionComponent={props.Transition}
          open={props.open}
          onClose={props.handleClose}
        >
          <DialogTitle>Add new visit</DialogTitle>
          <DialogContent>
            <TextField
              required
              autoFocus
              margin="dense"
              id="description"
              label="description"
              onChange={handleChange}
              type="text"
              fullWidth
              variant="standard"
              name='description'
              className='inputVisit'
            />


            <TextField
              required
              autoFocus
              margin="dense"
              id="symptoms"
              label="symptoms"
              onChange={handleChange}
              type="string"
              fullWidth
              variant="standard"
              // InputProps={{ inputProps: { min: 10000000, max: 99999999 } }}
              name='symptoms'
              className='inputVisit'


            />
            <FormControl fullWidth>

              <InputLabel id="demo-simple-select-label">labs</InputLabel>
              <Select
                required
                autoFocus
                margin="dense"
                id="lab.name"
                labelId="demo-simple-select-label"
                variant="standard"

                label="labs"
                onChange={handleChange}
                name='lab'
                className='inputVisit'

              >
                {/* <MenuItem></MenuItem> */}
                {props.labs.map(lab => {
                  return <MenuItem value={lab._id}>{lab.name}</MenuItem>
                })}
              </Select>
            </FormControl>

            <FormControl fullWidth>

              <InputLabel id="demo-simple-select-label">patinet</InputLabel>
              <Select
                required
                autoFocus
                margin="normal" 
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="patient"
                onChange={handleChange}
                name='patient'
                className='inputVisit'

              >
                <MenuItem></MenuItem>
                {props.patient.map(patinets => {
                  return <MenuItem value={patinets._id}>{patinets.firstName}</MenuItem>
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth>

              <InputLabel id="demo-simple-select-label">doctor</InputLabel>
              <Select
                required
                autoFocus
                margin="dense"
                labelId="demo-simple-select-label"
                id="doctor.name"
                label="doctor"
                onChange={handleChange}
                name='doctor'
                className='inputVisit'

              >
                <MenuItem></MenuItem>
                {props.doctor.map(doctors => {
                  return <MenuItem value={doctors._id}>{doctors.name}</MenuItem>
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth>

              <InputLabel id="demo-simple-select-label">price</InputLabel>
              <Select
                required
                autoFocus
                margin="dense"
                labelId="demo-simple-select-label"
                id="price.amount"
                label="price"
                onChange={handleChange}
                name='price'
                className='inputVisit'

              >
                <MenuItem></MenuItem>
                {props.price.map(prices => {
                  return <MenuItem value={prices._id}>{prices.amount}</MenuItem>
                })}
              </Select>
            </FormControl>


          </DialogContent>

          <DialogActions>
            <Button type="submit" onClick={handleSubmit}>Save</Button>
            <Button onClick={props.handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </form>


    </div>
  )

}