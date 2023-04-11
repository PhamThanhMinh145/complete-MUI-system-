import React from "react";
import '../controls/control.css'
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
  } from "@mui/material";
const Input = ({ name, label, value, error = null , onChange, ...other }) => {
  return (
    <TextField
      className="field"
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && {error: true, helperText: error})}
    />
  );
};

export default Input;
