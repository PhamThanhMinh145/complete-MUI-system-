import {
  AppBar,
  Badge,
  Grid,
  IconButton,
  InputBase,
  Toolbar,
} from "@mui/material";
import React from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SearchIcon from '@mui/icons-material/Search';



const Header = () => {
  return (
    <AppBar position="static" className="appBar">
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item >
            <InputBase placeholder="Search topics"
            startAdornment={<SearchIcon fontSize="small" style={{marginRight: "8px"}}/>}  className="searchInput"/>
          </Grid>
          <Grid item sm></Grid>
          <Grid item>
            <IconButton>
              <Badge badgeContent={4} color="secondary">
                <NotificationsNoneIcon fontSize="small" />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={3} color="primary">
                <ChatBubbleOutlineIcon  fontSize="small"/>
              </Badge>
            </IconButton>
            <IconButton>
            <Badge>
                <PowerSettingsNewIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
