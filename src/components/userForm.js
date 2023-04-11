import React, {useState} from 'react'
import '../pages/Employees/style/employeeForm.css'

export function userForm(initialFValues){

  const [values, setValues] = useState(initialFValues);

  const handleInputChange = e =>{
    const {name, value} = e.target
    setValues({
        ...values,
        [name]: value
    })
  }

  return (
   values,
   setValues, 
   handleInputChange
  )
}

export function Form(props){
    return (
        <form className="rootEmployee">
            {props.children}
        </form>
    )
}


