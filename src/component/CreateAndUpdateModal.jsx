import React, { useState } from "react";

import {
  DialogTitle,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material/";

export default function CreateAndUpdateModal({
  handleClose,
  setFormData,
  formName = { formName },
  open = { open },
  title = { title },
  body = { body },
  handleSubmit,
}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>
          {formName === "create" ? "Create New Post" : " Edit Post"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={setFormData}
          />
          <TextField
            autoFocus
            margin="dense"
            name="body"
            label="Body"
            type="text"
            fullWidth
            variant="standard"
            value={body}
            onChange={setFormData}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            {formName === "create" ? "Create" : " Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
