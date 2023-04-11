import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx/xlsx.js";

const EXTENSIONS = ["xlsx", "xls"];

const ImportExcel = () => {
  const [colDefs, setColDefs] = useState([]);
  const [data, setData] = useState([]);

   const [files, setFiles] = useState('')

  const convertToJson = (headers, data) => {
    const rows = [];
    data.forEach((row) => {
      let rowData = {};
      row.forEach((element, index) => {
        rowData[headers[index]] = element;
      });
      rows.push(rowData);
    });
    return rows;
  };

  const getExtention = (file) => {
    const parts = file.name.split(".");
    const extension = parts[parts.length - 1];
    return EXTENSIONS.includes(extension);
  };

  const importExcel = (e) => {
    const file = e.target.files[0];
    console.log(file)
    // setFiles(file.name);
    const render = new FileReader();
    render.onload = (event) => {
      // parse data

      const bstr = event.target.result;
      const workBook = XLSX.read(bstr, {
        cellText: false,
        cellDates: true,
        type: "binary",
        cellDates: true,
        dateNF: 'dd"."mm"."yyyy',
        locale: "vi",
      });

      //get first sheet
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      // convert to array
      const fileData = XLSX.utils.sheet_to_json(workSheet, {
        header: 1,
        raw: false,
      });
      //console.log(fileData)

      //set header in state
      const headers = fileData[0];
      const heads = headers.map((head) => ({ title: head, field: head }));
      console.log(heads);
      setColDefs(heads);

      // removing header
      fileData.splice(0, 1);
      //console.log(fileData)
      setData(convertToJson(headers, fileData));
    };

    if (file) {
      if (getExtention(file)) {
        render.readAsBinaryString(file);
      } else {
        alert("import file input, select excel file");
      }
    } else {
      setData([]);
      setColDefs([]);
    }
  };
  

  return (
    <div className="import">
      <h1 align="center">React-app</h1>
      <h4 align="center">Import Data from Excel in material table</h4>
      {/* <h3>{file.name}</h3> */}
      <input type="file" onChange={importExcel} />
      <DataGrid
        style={{ height: 400, width: "100%" }}
        title="Book data"
        // data={data}
        rows={data}
        getRowId={(row) => row.BookName}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        columns={colDefs}
      />
    </div>
  );
};

export default ImportExcel;
