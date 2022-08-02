import React, { useState } from 'react'
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";



export default function EditDriver(props) {
  let {editById, } = props;
 
  // console.log("fd",driver.name)  

  // const [name, setName] = useState(driver.name);
  // const [phoneNumber, setPhoneNumber] = useState(driver.phone_number);
  // // const [address, setAddress] = useState("");
  // const [email, setEmail] = useState(driver.email);
  // const [type, setType] = useState(driver.type);
  // const [status, setstatus] = useState(driver.status);
  // const [password, setPassword] = useState(driver.password)



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
// console.log("jjj",editById)

  return (
    <div className="container">
      <form method="POST">
        {/* {console.log('dialog:::', props)} */}
        <Dialog
          TransitionComponent={props.Transition}
          open={props.formState.open}
          onClose={props.handleClose}
        >
          <DialogTitle>edit new patient</DialogTitle>
          <DialogContent>
            <TextField
              required
              autoFocus
              margin="dense"
              id="firstName"
              label="first Name"
              onChange={handleChange}
              type="string"
              fullWidth
              variant="standard"
              name='firstName'
              defaultValue={props.formState.data.firstName || ''}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="lastName"
              label="last Name"
              onChange={handleChange}
              type="string"
              fullWidth
              variant="standard"
              name='lastName'
              defaultValue={props.formState.data.lastName || ''}

            />

       
            <TextField
              required
              autoFocus
              margin="dense"
              id="fatherName"
              label="father Name"
              onChange={handleChange}
              type="string"
              fullWidth
              variant="standard"
              name='fatherName'
              defaultValue={props.formState.data.fatherName || ''}
              
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="motherName"
              label="mother Name"
              onChange={handleChange}
              type="string"
              fullWidth
              variant="standard"
              name='motherName'
              value={props.formState.data.motherName || ''}

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
              InputProps={{ inputProps: { min: 10000000, max: 99999999 } }}
              name='phone'
              value={props.formState.data.phone || ''}

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
              name='address'
              value={props.formState.data.address || ''}
              
            />
                <TextField
              required
              autoFocus
              margin="dense"
              id="dob"
              label="dob"
              onChange={handleChange}
              type="date"
              fullWidth
              variant="standard"
              name='dob'
              value={props.formState.data.dob || ''}
              
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
