import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Autocomplete,
  Avatar,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Send } from "@mui/icons-material";
import { addcatagery } from "../../../redux/actions/catageryactions";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase";

export default function AddCatagery({ open, setOpen }) {
  const dispatch = useDispatch();
  //   const [open, setOpen] = React.useState(false);
  const [catagery_name, setcatageryname] = React.useState();
  const [parent, setparent] = React.useState();
  const [image, setImage] = React.useState();

  const catageries = useSelector((state) => state.catageries?.catagerieslist);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleadd = (e) => {
    const data = {
      catagery_name,
      parentId: parent,
      categoryImage: image,
    };
    console.log(data);
    dispatch(addcatagery(data));
  };
  const handleimage = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, "catagoryImages" + "/" + file.name);
    const upload = uploadBytesResumable(storageRef, file);
    upload.on(
      "state_change",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        try {
          const url = await getDownloadURL(storageRef);
          setImage(url);
          //   setShoplogoupload(false);
        } catch (error) {
          console.log(error);
        }
      }
    );
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        sx={{
          "& .css-tlc64q-MuiPaper-root-MuiDialog-paper": { overflowY: "unset" },
        }}
      >
        <DialogTitle>Create New Catagery</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Catagery Name"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              setcatageryname(e.target.value);
            }}
          />
          <Autocomplete
            sx={{ mt: 1 }}
            onChange={(e, value) => {
              setparent(value._id);
            }}
            disablePortal
            id="combo-box-demo"
            options={catageries}
            getOptionLabel={(option) => option?.catagery_name}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label="Catagery Parent" />
            )}
          />
          <Typography align="center" m={"10px"}>
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                sx={{ display: "none" }}
                onChange={handleimage}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                align="center"
                variant="contained"
                size="small"
              >
                <Avatar
                  src={image && image}
                  sx={{
                    width: 100,
                    height: 100,
                    align: "center",
                  }}
                ></Avatar>
              </IconButton>
            </label>
            <Typography sx={{ opacity: image ? "0.5" : "1" }}>
              Select Icon Image
            </Typography>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleadd} variant="contained" endIcon={<Send />}>
            Add Catagery
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
