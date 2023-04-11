import { Card, Paper, Typography } from "@mui/material";
import React from "react";

const PageHeader = ({ title, subTitle, icon }) => {
  return (
    <Paper elevation={0} square className="pageHeader">
      <div className="info">
        <Card className="pageIcon">{icon}</Card>
        <div className="pageTitle">
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle2" component="div" className="subTitle">
            {subTitle}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default PageHeader;
