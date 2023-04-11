import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from "@mui/material";
import React from "react";

const Checkbox = ({ name, label, value, onChange }) => {

const convertToDefEventPara = (name, value) => ({
    target: {
        name, value
    }
})


  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckbox
            name={name}
            color="primary"
            checked={value}
            onChange={e => onChange(convertToDefEventPara(name, e.target.checked)) }
          />
        }
        label={label}
      ></FormControlLabel>
    </FormControl>
  );
};

export default Checkbox;
