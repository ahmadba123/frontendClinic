import React, { useState, useEffect, } from 'react'
import SearchInput from "../../components/Search/Search";
import { MyCommandCell } from "./myCommandCell"
import AddPatient from './AddPatinet'
import EditPatinet from './EditPatinet';
import axios from "axios";
import "./Patient.css";
import moment from 'moment';

// import ViewInfo from './viewInfo/ViewInfo';
import Button from "@mui/material/Button";
import {
  Grid,
  GridColumn,
  // GridToolbar,
  // GridRow,
}
  from "@progress/kendo-react-grid";
// import { ExcelExport } from "@progress/kendo-react-excel-export";
import Pagination from "../../components/pagination/pagination"


function Patient() {

  const [patients, setPatient] = useState([]);
  const [searchedPatient, setSearchedPatient] = useState([])
  const [openEdit, setOpenEdit] = useState({ open: false, data: {} });
  const [dataItem, setDataItem] = useState({})

  const [open, setOpen] = useState(false)
  const [countPatient, setcountPatient] = useState(0);
  //
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchedPatient.slice(indexOfFirstPost, indexOfLastPost);
  useEffect(() => {
    getAllData();
    // Viewinfo()
  }, []);

  const getAllData = async () => {
    try {

      await axios
        .get(`http://localhost:8000/api/patient/`)
        .then((res) => {
          const allNotes = res.data.patient;
          setPatient(res.data.patient);
          setcountPatient(res.data.countPatient)
          setSearchedPatient(res.data.patient)
          console.log(res.data)
          // const notes = setDoctors;

          for (let i = 0; i < allNotes.length; i++) {
            allNotes[i].id = i+1;
          }
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  const remove = async (item) => {
    // console.log(item)
    await axios.delete(`http://localhost:8000/api/patient/${item._id}`);
    // console.log(item)
    let index = patients.filter((record) => record._id !== item._id);
    console.log("patients: ", index);
    for (let i = 0; i < index.length; i++) {
      index[i].id = i;
    }
    setPatient(index);
    getAllData();
    alert("deleted")
  };

  const addNewPatient = async (value) => {
    setOpen(true)
    try {
      // e.preventDefault();
      let data = value;
      console.log(data)
      await axios
        .post(`http://localhost:8000/api/patient`, data)
        .then((res) => {

          const patients = res.data;
          getAllData();
          console.log("patients:", patients)
          //  setPatient([...patients, patients])
          //  console.log(patients)
          // setSearchedDrivers([...searchedDrivers, driver]);
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  }
  const handleClose = () => {
    setOpenEdit({ open: false, data: {} })
  };
  const handleOpenEdit = (data) => {
    // console.log('data:::', data)
    setOpenEdit({ open: true, data })
  };
  const editById = async (args) => {
    // console.log("driver args in parent:", args)
    // console.log("driver data in parent:", )
    // let data = [], id = 3;
    try {
      await axios
        .put(`http://localhost:8000/api/patient/${args.id}`, args.data)
        .then((res) => {
          // const allNotes = res.data;
          getAllData();

          alert("update")

          // setLoading(false);
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

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
        // dataItem={map.dataItem}
        patient={patients}
        clickEdit={(data) => {
          handleOpenEdit(data)
          setDataItem(data);
        }}

      />
    );
  }
  const setInputsearch = (value) => {

    // console.log("value:", value)


    const searchedData = patients.filter((val) => {
      if (value === "") {
        return val;
      }
      else if (val.firstName.toLowerCase().includes(value.toLowerCase())) {
        return val;
      }
      else if (val.lastName.toLowerCase().includes(value.toLowerCase())) {
        return val;
      }
    })
    setSearchedPatient(searchedData)
  }

  return (
    <div className='container coantainerPatient'>
      <div className='headerPatient'>
        <div className='headerPatient1'>
          <Button
            sx={{ color: "white", background: "#455CC7" }}
            className="addBtnadmin"
            variant="outlined"
            onClick={addNewPatient}
          >
            + new patient
          </Button>
          <span className='spanNbPatient'> Number of patients:  {countPatient}
            {/* {countPatient} */}
          </span>
        </div>
      

        <div className='SearchPatient'>
          <SearchInput onChange={(event) => { setInputsearch(event.target.value) }} />
        </div>
      

        {open && <AddPatient
          handleClose={() => setOpen(false)}
          addNewPatient={addNewPatient}
          open={open}

        />}
         

      </div>
      <EditPatinet handleClose={handleClose}
          editById={(data, id) => editById(data, id)}
          formState={openEdit} setEditData={setOpenEdit}

        />
      <Grid className='tabledrivergrid'
        data={currentPosts}
        // style={{
        // }}      
          >
        <GridColumn field="id" title="ID" width="50px" />
        <GridColumn field="firstName" title=" firstName" width="100px" className='fieldTable' />
        <GridColumn field="lastName" title=" lastName" width="100px" className='fieldTable ' />
        <GridColumn field="motherName" title="motherName" width="110px" className='fieldTable' />
        <GridColumn field="fatherName" title="fatherName" width="110px" className='fieldTable' />
        <GridColumn field="phone" title="phone" width="110px" className='fieldTable' />
        <GridColumn field="dob" title="DOB"
        filter="date"
        cell={FormatCellDate} 
         width="130px" className='fieldTable' />
        <GridColumn field="address" title="address" width="120px" className='fieldTable' />
        <GridColumn cell={CommandCell} width="170px" title="Action" className='fieldTableAction' />



      </Grid>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={patients.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
    </div>




  )
}

export default Patient