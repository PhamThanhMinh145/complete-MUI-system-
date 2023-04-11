import { CssBaseline } from "@mui/material";
import React from "react";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import "./App.css";
import Employees from "../pages/Employees/Employees";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ImportExcel from "../components/import/ImportExcel";
import ImportExcelPostAPI from "../components/import/ImportExcelPostAPI";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SideMenu />} />
        </Routes>
        <div className="appMain">
          <Routes>
            <Route path="/">
              <Route index element={<Header /> && <Employees />} />
            </Route>
          </Routes>
        </div>

        <Routes>
          <Route path="/import" element={<ImportExcel />} />
        </Routes>
      </BrowserRouter>
      <CssBaseline />
    </>
  );
}

export default App;
