import { Button } from '@mui/material'
import React from 'react'



const ActionButton = ({color,children, onClick}) => {
  return (
    <Button onClick={onClick} className={color}>
        {children}
    </Button>
  )
}

export default ActionButton