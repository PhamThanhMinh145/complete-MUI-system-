import React from "react";
import "../import/import.css";
import ReactFileRender from "react-file-reader";
import Button from "../controls/Button";

const headCells = [
    { id: "fullname", label: "Employee Name" },
    { id: "email", label: "Email" },
    { id: "mobile", label: "Mobile Number" },
    { id: "department", label: "Department" },
    { id: "action", label: "Action", disableSorting: true },
  ];
const ImportExcelPostAPI = () => {
  return (
    <div className="Container">
      <div className="SubContainer">
        <div className="Box1">
          <div className="Input-Container">
            <div className="Flex-Container">
              <div className="Header">Excel & CSV Bulk Data Upload</div>
              <div className="Sub-flex-container">
                <div className="FileName"></div>
                <div className="UploadButton">
                  <ReactFileRender fileTypes={".xlsx, .csv"} className="Upload"> 
                    <Button type="submit" text="Submit" className="submit" />
                  </ReactFileRender>
                </div>
              </div>
            </div>
            <div className="flex-Button">
            <Button type="submit" text="Upload" className="submit" />
            </div>
          </div>
        </div>
        <div className="Box2"></div>
      </div>
    </div>
  );
};

export default ImportExcelPostAPI;
