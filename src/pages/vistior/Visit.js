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
import moment from 'moment';

function Visit() {
  const [visit, setVisit] = useState([]);
  const [searchedVisit, setSearchedVisit] = useState([])
  const [service, setservice] = useState([]);
  const [patient, setPatient] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [price, setPrice] = useState([]);
  const [countVisit, setcountVisit] = useState([]);



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
    getAllDataService();
    getAllDataPrice();
    getAllDataPatient();
    getAllDataDoctor();
  }, []);
  const getAllData = async () => {
    try {

      await axios
        .get(`http://localhost:8000/api/visit/`)
        .then((res) => {
          const allNotes = res.data.visit;
          setVisit(res.data.visit);
          setcountVisit(res.data.countvisit);

          setSearchedVisit(res.data.visit)
          console.log("lllllll",res)
    

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
  const getAllDataService = async () => {
    try {

      await axios
        .get(`http://localhost:8000/api/service/`)
        .then((res) => {
          setservice(res.data.response);
            console.log(res.data.response)
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
  const setInputsearch = (value) => {

    // console.log("value:", value)


    const searchedData = visit.filter((val) => {
      if (value === "") {
        return val;
      }
      else if (val.doctor.name.toLowerCase().includes(value.toLowerCase())) {
        return val;
      }
      // else if (val.lastName.toLowerCase().includes(value.toLowerCase())) {
      //   return val;
      // }
    })
    setSearchedVisit(searchedData)
  }
  const FormatCellDate = (e) => {
    return (<td>{moment(e.dataItem[e.field]).format('DD-MM-yyyy')}</td>);
}
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
          <span className='spanNbPatient'> Number of visit:  {countVisit}
            {/* {countPatient} */}
          </span>

        </div>


        <div className='SearchPatient'>
          <SearchInput onChange={(event) => {
            setInputsearch(event.target.value) 

          }}
          />
        </div>
      </div>
      {open && <AddVisit
          handleClose={() => setOpen(false)}
          addNewVisit={addNewVisit}
          open={open}
          service={service}
          patient={patient}
          doctor={doctor}
          price={price}

        />}

      <Grid className='tabledrivergrid'
        data={currentPosts}
        style={{
        }}        >
        <GridColumn field="id" title="ID" width="50px" />

        <GridColumn title="patient" width="180px" className='fieldTable' >
        <GridColumn field="patient.firstName" width="100px" title="firstName" ></GridColumn>
        <GridColumn field="patient.lastName" width="80px" title="lastName"></GridColumn>
        </GridColumn>

        <GridColumn field="doctor.name" title="doctor" width="120px" className='fieldTable' />

        <GridColumn title="service" width="180px" className='fieldTable' >
        <GridColumn field="service.name" title="name" width="100px" className='fieldTable' />
        <GridColumn field="service.price" title="price" width="80px" className='fieldTable' />

        </GridColumn>

        <GridColumn field="price.amount" title="price visit" width="100px" className='fieldTable' />
        <GridColumn field="date" title="Date"
          filter="date"
        cell={FormatCellDate} 
         width="100px" className='fieldTable' />
        {/* <GridColumn field="description" title=" desc" width="120px" className='fieldTable' /> */}
        <GridColumn field="symptoms" title=" symptoms" width="100px" className='fieldTable ' />



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