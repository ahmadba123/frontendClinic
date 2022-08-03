import React, { useState, useEffect, } from 'react'
import SearchInput from "../../components/Search/Search"
import { MyCommandCell } from "./myCommandCell"
import AddLabs from './AddLabs';
// import EditPatinet from './EditPatinet';
import axios from "axios";
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
import "./labs.css"
import EditServises from './EditServises';
import ViewLab from './viewLab';
function Labs() {
  const [services, setServices] = useState([]);
  const [labs, setLabs] = useState([]);

  const [searchedServices, setSearchedServices] = useState([])
  const [openEdit, setOpenEdit] = useState({ open: false, data: {} });

  const [dataItem, setDataItem] = useState({})

  const [openLab, setOpenLab] = useState(false);
  const [open, setOpen] = useState(false)
  // const [countlab, setcountlab] = useState(0);
  //
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchedServices.slice(indexOfFirstPost, indexOfLastPost);

const handleClickOpenLab = () => {
  setOpenLab(true);
};


const handleCloseLab = () => {
  setOpenLab(false);
};
  const setInputsearch = (value) => {
  const searchedData = services.filter((val) => {
    if (value === "") {
      return val;
    }
    else if (val.name.toLowerCase().includes(value.toLowerCase())) {
      return val;
    }
    // else if (val.lastName.toLowerCase().includes(value.toLowerCase())) {
    //   return val;
    // }
  })
  setSearchedServices(searchedData)
  }
  useEffect(() => {
    getAllData();
    // Viewinfo()
    getAllDataLab();
  }, []);
  const getAllData = async () => {
    try {

      await axios
        .get(`http://localhost:8000/api/service/`)
        .then((res) => {
          const allNotes = res.data.response;
          setServices(res.data.response);
          // setcountPatient(res.data.countPatient)
          setSearchedServices(res.data.response)
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
  const getAllDataLab = async () => {
    try {

      await axios
        .get(`http://localhost:8000/api/lab/`)
        .then((res) => {
          const allNotes = res.data.response;
          setLabs(res.data.response);
          // setcountPatient(res.data.countPatient)
          console.log("labs",res.data.response)
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
  const CommandCell = (map) => {
    // console.log(map)
    return (
      <MyCommandCell
        {...map}
        // Viewinfo={Viewinfo}
        remove={remove}
        // dataItem={map.dataItem}
        services={services}
        clickEdit={(data) => {
          handleOpenEdit(data)
          setDataItem(data);
        }}
        handleClickOpenLab={handleClickOpenLab}

      />
    );
  }
   const addNewServices = async (value) => {
    setOpen(true)
    try {
      // e.preventDefault();
      let data = value;
      console.log(data)
      await axios
        .post(`http://localhost:8000/api/service`, data)
        .then((res) => {

          const patients = res.data;
          getAllData();
          console.log("service:", patients)
          //  setPatient([...patients, patients])
          //  console.log(patients)
          // setSearchedDrivers([...searchedDrivers, driver]);
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  }
  const remove = async (item) => {
    // console.log(item)
    await axios.delete(`http://localhost:8000/api/service/${item._id}`);
    // console.log(item)
    let index = services.filter((record) => record._id !== item._id);
    console.log("patients: ", index);
    for (let i = 0; i < index.length; i++) {
      index[i].id = i;
    }
    setServices(index);
    getAllData();
    alert("deleted")
  };
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
        .put(`http://localhost:8000/api/service/${args.id}`, args.data)
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
  return (
    
    <div className='container coantainerPatient'>
      <div className='headerPatient'>
        <div className='headerPatient1'>
          <Button
            sx={{ color: "white", background: "#455CC7" }}
            className="addBtnadmin"
            variant="outlined"
            onClick={addNewServices}
          >
            + new service
          </Button>
          {/* <span className='spanNbPatient'> Number of patients:   */}
            {/* {countPatient} */}
          {/* </span> */}
        </div>
      

        <div className='SearchPatient'>
          <SearchInput onChange={(event) => { setInputsearch(event.target.value) }} />
        </div>
      

        {open && <AddLabs
          handleClose={() => setOpen(false)}
          addNewServices={addNewServices}
          open={open}
          labs={labs}

        />}
      {openLab &&  
      <ViewLab
          handleClickOpenLab={handleClickOpenLab}
          handleCloseLab={handleCloseLab}
          openLab={openLab}
          labs={labs}

        />}

      
      </div>
    
      <EditServises
          handleClose={handleClose}
          editById={(data, id) => editById(data, id)}
          formState={openEdit} setEditData={setOpenEdit}
         />

      <Grid className='tabledrivergrid'
        data={currentPosts}
        style={{
        }}        >
        <GridColumn field="id" title="ID" width="50px" />
        <GridColumn field="name" title=" name" width="193px" className='fieldTable' />
        <GridColumn field="price" title=" price" width="193px" className='fieldTable ' />
        <GridColumn field="description" title="description" width="193px" className='fieldTable' />
        <GridColumn field="lab.name" title="lab" width="193px" className='fieldTable' />

        
        <GridColumn cell={CommandCell} width="177px" title="Action" className='fieldTableAction' />



      </Grid>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={services.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
      
    </div>
  )
}

export default Labs