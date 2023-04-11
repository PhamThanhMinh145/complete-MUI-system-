import { FormControlLabel, FormLabel, Grid, TextField } from "@mui/material";

import React, { useState, useEffect } from "react";
import Input from "../../components/controls/Input";
import RadioGroupp from "../../components/controls/RadioGroup";
import Select from "../../components/controls/Select";
import "./style/employeeForm.css";
import * as employeeService from "../../service/employeeService";
import Checkbox from "../../components/controls/Checkbox";
import DatePickers from "../../components/controls/DatePicker";
import Button from "../../components/controls/Button";

const initialFValues = {
  id: 0,
  fullname: "",
  email: "",
  mobile: "",
  city: "",
  gender: "male",
  departmentId: "",
  hireDate: new Date(),
  isPermanent: false,
};

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

const EmployeeForm = ({ addOrEdit, recordForEdit }) => {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const validationOnChange = true;

  const validation = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullname" in fieldValues)
      temp.fullname = fieldValues.fullname ? "" : "This field is required";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid";
    if ("mobile" in fieldValues)
      temp.mobile =
        fieldValues.mobile.length > 10 ? "" : "Maximum 11 numbers required";
    if ("departmentId" in fieldValues)
      temp.departmentId =
        fieldValues.departmentId.length != 0 ? "" : "This field is required";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    if (validationOnChange) validation({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation()) {
      addOrEdit(values, resetForm);
    }
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  // code for edit
  useEffect(
    () => {
      if (recordForEdit != null)
        setValues({
          ...recordForEdit,
        });
    },
    { recordForEdit }
  );

  return (
    <form onSubmit={handleSubmit} className="rootEmployee" autoComplete="off">
      <Grid container>
        <Grid item xs={6} className="grid">
          <div className="input">
            <Input
              name="fullname"
              label="Full Name"
              value={values.fullname}
              onChange={handleInputChange}
              error={errors.fullname}
            />
          </div>
          <div className="input">
            <Input
              name="email"
              label="Email"
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
            />
          </div>

          <div className="input">
            <Input
              name="mobile"
              label="Mobile"
              value={values.mobile}
              onChange={handleInputChange}
              error={errors.mobile}
            />
          </div>

          <div className="input">
            <Input
              name="city"
              label="City"
              value={values.city}
              onChange={handleInputChange}
            />
          </div>
        </Grid>
        <Grid item xs={6} className="grid">
          <div className="radio">
            <RadioGroupp
              name="gender"
              label="Gender"
              value={values.gender}
              onChange={handleInputChange}
              items={genderItems}
            />
          </div>

          <div className="select">
            <Select
              name="departmentId"
              label="Department"
              value={values.departmentId}
              onChange={handleInputChange}
              options={employeeService.getDepartmentCollection()}
              error={errors.departmentId}
            />
          </div>

          <div className="date">
            <DatePickers
              name="hireDate"
              label="Hire Date"
              value={values.hireDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="checkbox">
            <Checkbox
              name="isPermanent"
              label="Permanent Employee"
              value={values.isPermanent}
              onChange={handleInputChange}
            />
          </div>

          <div className="btn">
            <Button type="submit" text="Submit" className="submit" />

            <Button text="Reset" color="" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default EmployeeForm;
