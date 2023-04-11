import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from "@mui/material";
import React from "react";
import '../controls/control.css'

const Select = ({ name, label, value, error= null , onChange, options }) => {
  return (

    <FormControl variant="outlined" className="field" 
      {...(error && {error: true})}

        >
        <InputLabel>{label}</InputLabel>
        <MuiSelect
            label={label}
            name={name}
            value={value}
            onChange={onChange}
        >
            <MenuItem value="">None</MenuItem>
            {
                options.map(
                    item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                )
            }
        </MuiSelect>
        {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  ) 
};

export default Select;
