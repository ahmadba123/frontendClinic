import React, { useState, useEffect, } from 'react'
import SearchInput from "../../components/Search/Search";
import { MyCommandCell } from "./myCommandCell"
import "./doctor.css"
import AddPatient from './addDoctor/addDoctor'
import axios from "axios";
import ViewInfo from './viewInfo/ViewInfo';
import Button from "@mui/material/Button";
// import ScheduleDoctor from '../../components/ScheduleDoctor';
import {
  Grid,
  GridColumn,
  GridToolbar,
  GridRow,
}
  from "@progress/kendo-react-grid";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import Pagination from "../../components/pagination/pagination"


function Doctor(props) {
  const [doctors, setDoctors] = useState([]);
  const [searchedDrivers, setSearchedDrivers] = useState([])

  const [open, setOpen] = useState('')
  const [countdoctor, setcountDoctor] = useState(0);
  const [openViewInfo, setopenViewInfo] = useState(false)
  const [viewInfo, setViewInfo] = useState('')
//
const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
 
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchedDrivers.slice(indexOfFirstPost, indexOfLastPost);




  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    try {

      await axios
        .get(`http://localhost:8000/api/doctor`)
        .then((res) => {
          const allNotes = res.data.doctor;
          setDoctors(res.data.doctor);
          setcountDoctor(res.data.countdoctor)
          setSearchedDrivers(res.data.doctor)
          // const notes = setDoctors;
          console.log(res.data);

          for (let i = 0; i < allNotes.length; i++) {
            allNotes[i].id = i+1;
     } })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  const Viewinfo = async () => {
    try {
      setopenViewInfo(true)

      await axios
        .get(`http://localhost:8000/api/doctor`)
        .then((res) => {
          const allNotes = res.data.response;
          setViewInfo(allNotes);

          console.log(res.data.response);
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  const remove = async (item) => {
    // console.log(item)
    await axios.delete(`http://localhost:8000/api/doctor/${item._id}`);
    // console.log(item)
    let index = doctors.filter((record) => record._id !== item._id);
    console.log("doctors: ", index);
    for (let i = 0; i < index.length; i++) {
      index[i].id = i;
    }
    setDoctors(index);
    getAllData();
    alert("deleted")
  };
  // const remove = (id) => {
  //   axios
  //     .delete(`http://localhost:8000/api/doctor/${id}`)
  //     .then((res) => {
  //   getAllData();
  // alert("Customer deleted successfully");
  //     })
  //     .catch((err) => console.log(err));
  // };



  // const addNewDriver = async (value) => {
  //   setOpen(true)
  //    // setLoading(true);
  //    try {
  //     // e.preventDefault();
  //     let data = value;
  //     // console.log(data)
  //     await axios
  //       .post(`http://localhost:8001/api/driver`, data)
  //       .then((res) => {
  //         const doctor = res.data;
  //         console.log("driver:", doctor)
  //         setDoctors([...doctors, doctor])
  //         // setSearchedDrivers([...searchedDrivers, driver]);
  //         getAllData();
  //         // setLoading(false);
  //       })
  //       .catch((err) => console.log(err));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  const CommandCell = (map) => {
    // console.log(map)
    return (
      <MyCommandCell
        {...map}
        Viewinfo={Viewinfo}
        remove={remove}
        dataItem={map.dataItem}
        doctors={doctors}

      />
    );
  }
  const setInputsearch = (value) => {

    // console.log("value:", value)


    const searchedData = doctors.filter((val) => {
      if (value === "") {
        return val;
      }
      else if (val.name.toLowerCase().includes(value.toLowerCase())) {
        return val;
      }
      // else if (val.phone.toLowerCase().includes(value.toLowerCase())) {
      //   return val;
      // }
    })
    setSearchedDrivers(searchedData)
  }

  return (

    <div className='container containerDoctor'>
      <div className='headerDoctor'>
        <div className='headerDoctor1'>
          <Button
            sx={{ color: "white", background: "#455CC7" }}
            className="addBtnadmin"
            variant="outlined"
            // onClick={addNewDriver}
          >
            + new doctor
          </Button>
          <span className='spanNbDoctor'> Number of Doctors: {countdoctor}</span>
        </div>
        <div className='Search'>
        <SearchInput onChange={(event) => { setInputsearch(event.target.value) }} />
</div>
        {/* {openViewInfo && <ScheduleDoctor
          ViewInfohandleClose={() => setopenViewInfo(false)}
          viewInfo={viewInfo}
          openViewInfo={openViewInfo}
        />} */}
        <AddPatient handleClose={() => setOpen(false)}
          // addNewDriver={addNewDriver} 
          open={open} />
      </div>

      <Grid className='tabledrivergrid'
        data={currentPosts}
        style={{
        }}        >
        <GridColumn field="id" title="ID" width="50px" />
        <GridColumn field="name" title=" Name" width="170px" className='fieldTable' />
        <GridColumn field="phone" title=" phone" width="170px" className='fieldTable ' />
        <GridColumn field="domain.name" title="domain" width="160px" className='fieldTable' />
        <GridColumn field="dob" title="DOB" width="170px" className='fieldTable' />
        <GridColumn cell={CommandCell} width="280px" title="Action" className='fieldTableAction' />
    


      </Grid>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={doctors.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
    </div>

  )
}

export default Doctor