import React, { useState, useEffect, } from 'react'
import Button from "@mui/material/Button";
import SearchInput from "../../components/Search/Search"
import axios from "axios";
import AddLabs from '../lab/AddLabs';
import { MyCommandCell } from "./myCommandCell"
import {
  Grid,
  GridColumn,
  // GridToolbar,
  // GridRow,
}
  from "@progress/kendo-react-grid";
import Pagination from "../../components/pagination/pagination" 
import EditLabs from './EditLabs';

function Lab() {
  const [labs, setLabs] = useState([]);
  const [searchedLabs, setSearchedLabs] = useState([])
  const [open, setOpen] = useState(false)
  // const [countlab, setcountlab] = useState(0);
  
  const [openEdit, setOpenEdit] = useState({ open: false, data: {} });
  const [dataItem, setDataItem] = useState({})

  //
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchedLabs.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    getAllData();
    // Viewinfo()
    // getAllDataLab();
    // getbyIdDataLab();
    
  }, []);
  const getAllData = async () => {
    try {

      await axios
        .get(`http://localhost:8000/api/lab/`)
        .then((res) => {
          const allNotes = res.data.response;
          setLabs(res.data.response);
          // setcountPatient(res.data.countPatient)
          setSearchedLabs(res.data.response)
          // console.log(res.data)
    

          for (let i = 0; i < allNotes.length; i++) {
            allNotes[i].id = i+1;
          }
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };
  const addNewLab = async (value) => {
    setOpen(true)
    try {
      // e.preventDefault();
      let data = value;
      console.log(data)
      await axios
        .post(`http://localhost:8000/api/lab`, data)
        .then((res) => {

          const patients = res.data;
          getAllData();
          console.log("service:", labs)
          //  setPatient([...patients, patients])
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
    let index = labs.filter((record) => record._id !== item._id);
    console.log("patients: ", index);
    for (let i = 0; i < index.length; i++) {
      index[i].id = i;
    }
    setLabs(index);
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

  const setInputsearch = (value) => {
    const searchedData = labs.filter((val) => {
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
    setSearchedLabs(searchedData)
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
          clickEdit={(data) => {
            handleOpenEdit(data)
            setDataItem(data);
          }}
       
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
            onClick={addNewLab}
          >
            + new service
          </Button>
        
        </div>
      

        <div className='SearchPatient'>
          <SearchInput onChange={(event) => 
          { 
            setInputsearch(event.target.value) 
          
          }}
           />
        </div>
      
        {open && <AddLabs
          handleClose={() => setOpen(false)}
          addNewLab={addNewLab}
          open={open}

        />}
          <EditLabs 
          handleClose={handleClose}
          editById={(data, id) => editById(data, id)}
          formState={openEdit} setEditData={setOpenEdit}
         />
    
    </div>
    <Grid className='tabledrivergrid'
        data={currentPosts}
        style={{
        }}        >
        <GridColumn field="id" title="ID" width="50px" />
        <GridColumn field="name" title=" name" width="230px" className='fieldTable' />
        <GridColumn field="address" title=" address" width="230px" className='fieldTable ' />
        <GridColumn field="phone" title="phone" width="230px" className='fieldTable' />

        
        <GridColumn cell={CommandCell} width="259px" title="Action" className='fieldTableAction' />



      </Grid>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={labs.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
    </div>

  )
}

export default Lab