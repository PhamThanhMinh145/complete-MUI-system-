import React, { useState } from "react";
import EmployeeForm from "./EmployeeForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import EditIcon from "@mui/icons-material/Edit";
import {
  InputAdornment,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
} from "@mui/material";
import "./style/employees.css";
import useTable from "../../components/useTable";
import * as employeeService from "../../service/employeeService";
import Input from "../../components/controls/Input";
import { Search } from "@mui/icons-material";
import Button from "../../components/controls/Button";
import AddIcon from "@mui/icons-material/Add";
import Popup from "../../components/Popup";
import ActionButton from "../../components/ActionButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import { Link } from "react-router-dom";

const headCells = [
  { id: "fullname", label: "Employee Name" },
  { id: "email", label: "Email" },
  { id: "mobile", label: "Mobile Number" },
  { id: "department", label: "Department" },
  { id: "action", label: "Action", disableSorting: true },
];

const Employees = () => {
  const [records, setRecords] = useState(employeeService.getAllEmployees());
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.fullname.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const addOrEdit = (employee, resetForm) => {
    if (employee.id == 0) {
      employeeService.insertEmployee(employee);
    } else {
      employeeService.updateEmployee(employee);
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setRecords(employeeService.getAllEmployees());
    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id) => {
    employeeService.deleteEmployee(id);
    setRecords(employeeService.getAllEmployees());
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };

  return (
    <>
      <PageHeader
        title="New Employee"
        subTitle="Form design with validation"
        icon={<PeopleOutlineIcon fontSize="large" />}
      />
      <Paper className="pageContent">
        <Toolbar>
          <Input
            className="searchInput"
            label="Search"
            other={{
              InputProps: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              },
            }}
            onChange={handleSearch}
          />

          <div style={{ display: "flex", justifyContent: "flex-end", flexDirection: "column" }}>
            <Button
              text="Add New"
              variant="outlined"
              startIcon={<AddIcon />}
              className="newButton"
              onClick={() => {
                setOpenPopup(true);
                setRecordForEdit(null);
              }}
            />
            <Link to="import" style={{ textDecoration: "none" }}>
              <Button
                text="Import"
                variant="outlined"
                startIcon={<AddIcon />}
                className="newButton"
                onClick={() => {
                  setOpenPopup(true);
                  setRecordForEdit(null);
                }}
              />
            </Link>
          </div>
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.fullname}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>
                  <ActionButton color="edit">
                    <EditIcon
                      fontSize="small"
                      onClick={() => {
                        openInPopup(item);
                      }}
                    />
                  </ActionButton>
                  <ActionButton color="delete">
                    <DeleteIcon
                      fontSize="small"
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: "Are you sure to delete this record?",
                          subTitle: "You can't undo this operation",
                          onConfirm: () => {
                            onDelete(item.id);
                          },
                        });
                        //onDelete(item.id);
                      }}
                    />
                  </ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>

      <Popup
        title="Employee from"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EmployeeForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Employees;
