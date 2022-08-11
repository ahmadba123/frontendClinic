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
export default function EditServises(props) {
  let {editById, } = props;

  const handleChange = (event) => {
    props.setEditData({ ...props.formState, data: { ...props.formState.data, [event.target.name]: event.target.value } })
  }

  const handleSubmit = (event) => {
    // console.log("edit submit")
    event.preventDefault();
    // console.log("props: ",props)
   
    
    editById({ id: props.formState.data._id,data:{...props.formState.data}})
    props.handleClose();

  }
  return (
    <div className="addDriver-container">
      <form method="POST">
      {/* <h1>hello</h1> */}
        <Dialog
          // TransitionComponent={props.Transition}
          TransitionComponent={props.Transition}
          open={props.formState.open}
          onClose={props.handleClose}
        >
          <DialogTitle>Add new services</DialogTitle>
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
            defaultValue={props.formState.data.name || ''}


            />
      

            <TextField
              required
              autoFocus
              margin="dense"
              id="price"
              label="price"
              onChange={handleChange}
              type="string"
              fullWidth
              variant="standard"
              // InputProps={{ inputProps: { min: 10000000, max: 99999999 } }}
              name='price'
            //   defaultvalue={props.formState.data?.price || ''}
            defaultValue={props.formState.data.price || ''}


            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="description"
              label="description"
              onChange={handleChange}
              type="string"
              fullWidth
              variant="standard"
              name='description'
            //   value={props.formState.data?.description || ''}
            defaultValue={props.formState.data.description || ''}


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
  defaultValue={props.formState.data.lab || ''}

>
  {/* <MenuItem></MenuItem> */}
  {props.labs.map(lab => {
    return <MenuItem value={lab._id}>{lab.name}</MenuItem>
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
      </div>)}

