import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import React from "react";
import ActionButton from "./ActionButton";

import "./style/popup.css";
import CloseIcon from "@mui/icons-material/Close";

const Popup = ({ title, children, openPopup, setOpenPopup }) => {
  return (
    <Dialog open={openPopup} maxWidth="md" className="dialog">
      <div className="space">
        <DialogTitle>
          <div style={{ display: "flex" }}>
            <Typography variant="h5" component="div" style={{ flexGrow: 1 }}>
              {title}
            </Typography>
            <ActionButton color="close" onClick={() => setOpenPopup(false)}>
              <CloseIcon style={{ color: "red" }} />
            </ActionButton>
          </div>
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
      </div>
    </Dialog>
  );
};

export default Popup;
