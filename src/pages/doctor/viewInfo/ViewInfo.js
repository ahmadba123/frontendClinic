import React, { useState, useEffect, } from 'react'

import axios from "axios";
import Button from "@mui/material/Button";
import {
  Grid,
  GridColumn,
  GridToolbar,
  GridRow,
}
  from "@progress/kendo-react-grid";
  
 
function ViewInfo(props) {
  const { dataItem, Viewinfo, remove, doctors } = props;

  const [value, setValue] = useState({});
  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value })

  }
 
  return (
    
    <Grid className='tabledrivergrid'
    data={Viewinfo}
    style={{
      width: "1017px",
    }}        >
    <GridColumn field="id" title="ID" width="50px" />
    <GridColumn field="name" title=" Name" width="150px" className='fieldTable' />
    <GridColumn field="phone" title=" phone" width="150px" className='fieldTable ' />
    <GridColumn field="domain.name" title="domain" width="150px" className='fieldTable' />
    <GridColumn field="dob" title="DOB" width="150px" className='fieldTable' />



  </Grid>
  )
}

export default ViewInfo