import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  Typography,
  Box,
  DialogContent,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addbrand } from "../../redux/actions/brandsactions";
export default function Createbrand(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [b_image, setb_image] = useState();
  const handlesubmit = () => {
    const formData = {
      name: name,
    };
    dispatch(addbrand(formData));
  };
  return (
    <Dialog open={props.open} onClose={null}>
      <DialogTitle>
        <Typography>Create Brand</Typography>
      </DialogTitle>
      <DialogContent>
        <Box component="form">
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            style={{ marginBottom: "1em" }}
            type="text"
            label="Brand Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handlesubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}
