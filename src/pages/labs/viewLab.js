import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
    Grid,
    GridColumn,
    // GridToolbar,
    // GridRow,
  }
    from "@progress/kendo-react-grid";
function ViewLab(props) {
  const {handleCloseLab,openLab,handleClickOpenLab,labs } = props;

  return (
    <div>
    {/* <h1>sds</h1> */}
    <Dialog
          // TransitionComponent={props.Transition}
          open={openLab}
          onClose={handleCloseLab}
        >
        <DialogTitle>Subscribe</DialogTitle>
        <Grid className='tabledrivergrid'
        data={labs}
        style={{
        }}        >
        <GridColumn field="id" title="ID" width="50px" />
        <GridColumn field="name" title=" name" width="193px" className='fieldTable' />
        <GridColumn field="price" title=" price" width="193px" className='fieldTable ' />
        <GridColumn field="description" title="description" width="193px" className='fieldTable' />
        <GridColumn field="lab.name" title="lab" width="193px" className='fieldTable' />

        
        {/* <GridColumn cell={CommandCell} width="177px" title="Action" className='fieldTableAction' /> */}



      </Grid>
      </Dialog>
    </div>
  )
}

export default ViewLab