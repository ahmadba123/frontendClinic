import React, { useState } from 'react'
// import "./addDoctor.css";
// import * as React from 'react';
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";


export default function AddLabs(props) {

  const [value, setValue] = useState({})
  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value })
    console.log(value)
  }
  // console.log()
  const handleSubmit = (event) => {
    event.preventDefault();
    props.addNewLab(value)
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
          <DialogTitle>Add new labs</DialogTitle>
          <DialogContent>
            <TextField
              required
              autoFocus
              margin="dense"
              id="name"
              label="name"
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
              id="address"
              label="address"
              onChange={handleChange}
              type="string"
              fullWidth
              variant="standard"
              // InputProps={{ inputProps: { min: 10000000, max: 99999999 } }}
              name='address'

            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="phone"
              label="phone"
              onChange={handleChange}
              type="number"
              fullWidth
              variant="standard"
              name='phone'
            />
            


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