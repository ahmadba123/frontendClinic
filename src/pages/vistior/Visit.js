import React, { useState, useEffect, } from 'react'
import Button from "@mui/material/Button";
import axios from "axios";
import AddVisit from './AddVisit';
import SearchInput from "../../components/Search/Search"
import { MyCommandCell } from "./myCommandCell"
import {
  Grid,
  GridColumn,
  // GridToolbar,
  // GridRow,
}
  from "@progress/kendo-react-grid";
import Pagination from "../../components/pagination/pagination";

function Visit() {
  const [visit, setVisit] = useState([]);
  const [searchedVisit, setSearchedVisit] = useState([])
  const [labs, setLabs] = useState([]);
  const [patient, setPatient] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [price, setPrice] = useState([]);


  const [open, setOpen] = useState(false)
  // const [countlab, setcountlab] = useState(0);


  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchedVisit.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    getAllData();
    getAllDataLab();
    getAllDataPrice();
    getAllDataPatient();
    getAllDataDoctor();
  }, []);
  const getAllData = async () => {
    try {

      await axios
        .get(`http://localhost:8000/api/visit/`)
        .then((res) => {
          const allNotes = res.data.response;
          setVisit(res.data.response);
          // setcountPatient(res.data.countPatient)
          setSearchedVisit(res.data.response)
          console.log(res.data)
    

          for (let i = 0; i < allNotes.length; i++) {
            allNotes[i].id = i+1;
          }
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };
  
  // add visit 
  const addNewVisit = async (value) => {
    setOpen(true)
    try {
      // e.preventDefault();
      let data = value;
      console.log(data)
      await axios
        .post(`http://localhost:8000/api/visit`, data)
        .then((res) => {

          // const patients = res.data;
          getAllData();
          // console.log("visit:", visit)
          //  setPatient([...patients, patients])
          // setSearchedDrivers([...searchedDrivers, driver]);
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  }
  const getAllDataLab = async () => {
    try {

      await axios
        .get(`http://localhost:8000/api/lab/`)
        .then((res) => {
          setLabs(res.data.response);

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
          setPatient(res.data.patient);
          // console.log("dasasd",res.data.patient)
                
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };
  const getAllDataDoctor = async () => {
    try {

      await axios
        .get(`http://localhost:8000/api/doctor/`)
        .then((res) => {
          setDoctor(res.data.doctor);
                
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  const getAllDataPrice = async () => {
    try {

      await axios
        .get(`http://localhost:8000/api/price/`)
        .then((res) => {
          setPrice(res.data.response);
                
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };
// end add visit
  const remove = async (item) => {
    // console.log(item)
    await axios.delete(`http://localhost:8000/api/visit/${item._id}`);
    // console.log(item)
    let index = visit.filter((record) => record._id !== item._id);
    console.log("visit: ", index);
    for (let i = 0; i < index.length; i++) {
      index[i].id = i;
    }
    setVisit(index);
    getAllData();
    alert("deleted")
  };

  const CommandCell = (map) => {
    // console.log(map)
    return (
      <MyCommandCell
        {...map}
        // Viewinfo={Viewinfo}
        remove={remove}
        // // dataItem={map.dataItem}
        // services={services}
        // clickEdit={(data) => {
        //   handleOpenEdit(data)
        //   setDataItem(data);
        // }}

      />
    );
  }
  return (
    <div className='container coantainerPatient'>
      <div className='headerPatient'>
        <div className='headerPatient1'>
          <Button
            sx={{ color: "white", background: "#455CC7" }}
            className="addBtnadmin"
            variant="outlined"
          onClick={addNewVisit}
          >
            + new visit
          </Button>

        </div>


        <div className='SearchPatient'>
          <SearchInput onChange={(event) => {
            // setInputsearch(event.target.value) 

          }}
          />
        </div>
      </div>
      {open && <AddVisit
          handleClose={() => setOpen(false)}
          addNewVisit={addNewVisit}
          open={open}
          labs={labs}
          patient={patient}
          doctor={doctor}
          price={price}

        />}

      <Grid className='tabledrivergrid'
        data={currentPosts}
        style={{
        }}        >
        <GridColumn field="id" title="ID" width="50px" />
        <GridColumn field="description" title=" desc" width="138px" className='fieldTable' />
        <GridColumn field="symptoms" title=" symptoms" width="138px" className='fieldTable ' />
        <GridColumn field="price.amount" title="price" width="120px" className='fieldTable' />
        <GridColumn field="doctor.name" title="doctor" width="130px" className='fieldTable' />
        <GridColumn field="patient.firstName" title="patient" width="138px" className='fieldTable' />
        <GridColumn field="lab.name" title="lab" width="120px" className='fieldTable' />



        <GridColumn cell={CommandCell} width="165px" title="Action" className='fieldTableAction' />



      </Grid>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={visit.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  )
}

export default Visit