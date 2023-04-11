import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import './style/notification.css'

const Notification = ({notify, setNotify}) => {


    const handleClose = (event, reason) =>{
        if(reason === 'clickaway'){
            return;
        }
        setNotify({
            ...notify,
            isOpen:false

        })

    }


  return (
   <Snackbar 
   className='notify'
    open= {notify.isOpen}
    autoHideDuration={2000}
    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
    onClose ={handleClose}
   >
    <Alert severity={notify.type} onClose ={handleClose} >
        {notify.message}
    </Alert>
   </Snackbar>
  )
}

export default Notification