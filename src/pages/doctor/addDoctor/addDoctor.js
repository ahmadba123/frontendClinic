import React, { useState } from 'react'
import "./addDoctor.css";
// import * as React from 'react';
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export default function AddPatient(props) {

  const [value, setValue] = useState({})
  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value })

  }
  // console.log()
  const handleSubmit = (event) => {
    console.log("add submit")
    event.preventDefault();
    props.addNewDriver(value)
    props.handleClose();

  }
  return (
    <div className="addDriver-container">
      <form method="POST">
        <Dialog
          TransitionComponent={props.Transition}
          open={props.open}
          onClose={props.handleClose}
        >
          <DialogTitle>Add new doctor</DialogTitle>
          <DialogContent>
            <TextField
              required
              autoFocus
              margin="dense"
              id="name"
              label="Full Name"
              onChange={handleChange}
              type="name"
              fullWidth
              variant="standard"
              name='name'
            />
      

            <TextField
              required
              autoFocus
              margin="dense"
              id="phone_number"
              label="phone"
              onChange={handleChange}
              type="number"
              fullWidth
              variant="standard"
              InputProps={{ inputProps: { min: 10000000, max: 99999999 } }}
              name='phone_number'

            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="major"
              label="major"
              onChange={handleChange}
              type="string"
              fullWidth
              variant="standard"
              name='major'
            />
            
            {/* <TextField
              autoFocus
              margin="dense"
              id="type"
              label="enter type"
              type="string"
              fullWidth
              variant="standard"
              name='type'
              onChange={handleChange}

            /> */}
            {/* <TextField
              autoFocus
              margin="dense"
              id="status"
              label="enter status"
              type="string"
              fullWidth
              variant="standard"
              name='status'
              onChange={handleChange}

            /> */}
          </DialogContent>

          <DialogActions>
            <Button type="submit" onClick={handleSubmit}>Save</Button>
            <Button onClick={props.handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </form>

      {/* <form className='form-addDriver'>
        <div className="header-addDriver">
          <h1 className="title-addDriver">new driver</h1>
        </div>
        <div className="content-addDriver" >
          <input name='name' type="text" className="input-addDriver" placeholder="full name" onChange={handleChange}
          ></input>
          <input name='email' type="text" className="input-addDriver" placeholder="email" onChange={handleChange}></input>

          <input name='phone_number' type="number" className="input-addDriver" placeholder="phone number" onChange={handleChange}></input>

          <input name='type' type="text" className="input-addDriver" placeholder="type" onChange={handleChange}></input>
          <input name='password' type="text" className="input-addDriver" placeholder="password" onChange={handleChange}></input>

          <select name="status" value={value.status||''} className="input-addDriver"  onChange={handleChange}>
            <option value=''></option>
            <option value="Available">Available</option>
            <option value="inDuty">InDuty</option>
            <option value="offline">Offline</option>
          </select> */}
      {/* <Stack >
  <Autocomplete
    id="free-solo-demo"
    freeSolo
    options={top100Films.map((option) => option.title)}
    renderInput={(params) => <TextField {...params} label="freeSolo" />}
    className="input-addDriver"
  />
  

   </Stack> */}

      {/* </div>

        <div className="button-addDriver">
          <button className="button-row-table-save" onClick={handleSubmit}> save</button>
          <button className="button-row-table-delete" onClick={props.handleClose}>delete </button>
        </div>
      </form> */}
    </div>
  )

}