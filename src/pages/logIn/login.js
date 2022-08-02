import "./login.css"
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import MyFormHelperText from '@mui/material/FormHelperText';
import logo from '../../pic/logo.png'
import clinic from '../../pic/undraw_medicine_b-1-ol.svg'
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from "@mui/material/CircularProgress";


import React, { useState } from 'react'
const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const [value, setValue] = useState('Controlled');
  // const handleChangee = (event) => {
  //     setValue(event.target.value);
  // }
  //password

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  // login
  const login = async (e) => {
    e.preventDefault();
    setLoading(true)
    var admin = { userName, password }
    axios.post(`http://localhost:8000/api/admin/signin`, admin)
      .then(async res => {
        // console.log("token", res.data.Token)

        setLoading(false);
        toast.success("Logged in success")
        localStorage.setItem("token", res.data.Token);
        // window.location.reload();
        navigate("/home")
      })
      .catch((error) => {
        setLoading(false);
        alert("error")
        if (error.response) {
          // Request made and server responded
            toast.warn(error.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            toast.error(error.response.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
            toast.error(error.request, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            // Something happened in setting up the request that triggered an Error
            toast.error("Error", error.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
        }
      })}
  return (
    <div className=' logniContainer'>
      <ToastContainer />
      <div className='logincontainer1'>
        <div className='loginSubContainer'>
          <div className="logoCintainer">
            <img src={logo}
              className="logo"

            />

          </div>

          <div className='headerlogin'>

            <h1 className="headerh1">Welcome back</h1>
            <p className="headerP">welcome back! Please enter your details</p>
          </div>
          <div>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '40ch' },
              }}
              noValidate
              autoComplete="off"
              className="boxLogin"
            >

              {/* <TextField
                                id="outlined-multiline-flexible"
                                label="Multiline"
                                multiline
                                maxRows={4}
                                value={value}
                                onChange={handleChange}
                                className="inputmargin"
                                
                            /> */}
              <TextField id="outlined-basic"
                label="Outlined"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              //  variant="outlined"
              />


              <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password"
                >Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  // value={values.password}
                  // onChange={handleChange('password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                <a href="#" className="loginForget"> Forget password</a>
                <Button variant="contained"
                  href="#contained-buttons"
                  className="buttonSubmit"
                  onClick={login}
                >
                  Send
                </Button>
              </FormControl>

            </Box>
            {/* <form className='formLogin'>
                        <label>
                            Email: <br />
                            <input type="text" name="name" />
                        </label>
                        <label>
                            password:
                            <br />
                            <input type="password" name="name" />
                        </label>
                        <input type="submit" value="Submit" />
                    </form> */}
          </div>
        </div>

      </div>
      <div className='logincontainer2'>

        {/* <h1>sss</h1> */}
        <img src={clinic}
          className="clinic"

        />
      </div>
    </div>
  )
}

export default Login