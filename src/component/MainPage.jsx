import React, { useEffect, useState } from "react";

import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import Dashboard from "./Dashboard";
import { useDispatch } from "react-redux";
import { fetchAllPosts, editPost } from "../features/posts/postSlice";

const drawerWidth = 240;

export default function MainPage() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleCreateClickOpen = () => {
    setOpen(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            All Posts
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {["All Posts", "Create"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <InboxIcon />
                  ) : (
                    <AddCircleIcon onClick={handleCreateClickOpen} />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Dashboard
          open={open}
          setOpen={setOpen}
          handleCreateClickOpen={handleCreateClickOpen}
        />
      </Box>
    </Box>
  );
}
