import * as React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { useDropzone } from "react-dropzone";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Alert,
  ImageList,
  ImageListItem,
  IconButton,
  FormControl,
  Autocomplete,
  InputLabel,
  Avatar,
  CircularProgress,
  Paper,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../layouts/loading";
import { useState, useEffect } from "react";
import { clearalert, inprogress } from "../../../redux/actions/authactions";
import { getsingleshop, updateshop } from "../../../redux/actions/shopactions";
import { styled } from "@mui/material/styles";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Slide from "@mui/material/Slide";
import { useNavigate, useParams } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
const Input = styled("input")({
  display: "none",
});

export default function EditShop(props) {
  const params = useParams()
  const navigate = useNavigate()
  const [shoplogoupload, setShoplogoupload] = useState(false);
  const [shopbannerupload, setShopbannerupload] = useState(false);

  const [shopname, setshopname] = useState();
  const [aboutShop, setaboutShop] = useState();
  const [catagery, setcatagery] = useState();
  const [subcatagery, setsubcatagery] = useState();
  const [storeimage, setstoreimage] = useState([]);
  const [oldimages, setoldimages] = useState();
  const [brand, setbrand] = useState([]);

  const [shoptype, setshoptype] = useState();
  const [shopcountry, setshopcountry] = useState();
  const [shopcity, setshopcity] = useState();
  const [shopstreetaddress, setshopstreetaddress] = useState();
  const [shopphone, setshopphone] = useState();
  const [storebannerimage, setstorebannerimage] = useState([]);
  const [storelogo, setstorelogo] = useState([]);
  const [storebanner, setstorebanner] = useState([]);

  const [progress, setProgress] = useState(0);
  const [bannerprogress, setbannerProgress] = useState(0);

  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const error = useSelector((state) => state.errors);
  const [open, setOpen] = React.useState(false);

  const isLoading = useSelector((state) => state.shop.isLoading);
  const shop = useSelector((state) => state.shop.shop);

  useEffect(()=>{
dispatch(getsingleshop(params?.id))
  },[])

  useEffect(() => {
    if (shop) {
      setshopname(shop.shopname);
      setaboutShop(shop.aboutShop);
      setcatagery(shop.catagery);

      setshopphone(shop.shopphone);
      setshopcountry(shop.country);
      setshopcity(shop.city);
      setshopstreetaddress(shop.streetaddress);
      setshoptype(shop.Shoptype);
      setstorelogo(shop.shopavatar);
      setstorebanner(shop.shopbanner);
    }
  }, [shop]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handlestorelogoupload = (e) => {
    setShoplogoupload(true);
    setstoreimage([e.target.files[0]]);
    const file = e.target.files[0];
    console.log(file);
    const storageRef = ref(storage, "storelogo" + "/" + file.name);
    const upload = uploadBytesResumable(storageRef, file);
    upload.on(
      "state_change",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        try {
          const url = await getDownloadURL(storageRef);
          setstorelogo([url]);
          setShoplogoupload(false);
        } catch (error) {
          console.log(error);
        }
      }
    );
  };
  const handlestorebannerupload = (e) => {
    setShopbannerupload(true);
    setstorebannerimage([e.target.files[0]]);
    const file = e.target.files[0];
    const storageRef = ref(storage, "storebanner" + "/" + file.name);
    const upload = uploadBytesResumable(storageRef, file);
    upload.on(
      "state_change",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setbannerProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        try {
          const url = await getDownloadURL(storageRef);
          setstorebanner([url]);
          setShopbannerupload(false);
        } catch (error) {
          console.log(error);
        }
      }
    );
  };
  const submitform = (event) => {
    console.log("sumit");
    event.preventDefault();
    const formData = {
      _id: params.id,
      shopname: shopname,
      aboutShop: aboutShop,
      catagery: catagery,
      shopavatar: storelogo,
      country: shopcountry,
      city: shopcity,
      streetaddress: shopstreetaddress,
      shopphone: shopphone,
      Shoptype: shoptype,
      shopbanner: storebanner,
    };
    console.log(formData);
    dispatch(updateshop(formData, navigate));
    setshopname("");
    setcatagery("");
    setsubcatagery("");
    setContent("");
    setstorelogo([]);
    setstorebanner([]);
    setshopcity("");
    setshopcountry("");
    setshopstreetaddress("");
    setbrand("");
    setshoptype("");
    setstorebannerimage([]);
    setstoreimage([]);
    setshopphone("");
  };
  return (
    <>
      <Paper sx={{p:2}}>
        
          <Box
            component="form"
            sx={{}}
            style={{ marginTop: "2em" }}
            method="post"
            onSubmit={submitform}
          >
            {/* {error.message ?  <Alert onClose={() => {dispatch(clearalert())}} style={{ marginBottom: "10px" }} variant="filled" severity="error">{error.message}</Alert>: null} */}

            <TextField
              variant="outlined"
              label="Shop Name"
              fullWidth
              size="small"
              style={{ marginBottom: "1em" }}
              type="text"
              placeholder="Shop Name"
              value={shopname}
              onChange={(e) => setshopname(e.target.value)}
              name="shopname"
            />
            <TextField
              variant="outlined"
              label="About Shop"
              fullWidth
              multiline
              rows={5}
              size="small"
              style={{ marginBottom: "1em" }}
              type="text"
              placeholder="Description"
              value={aboutShop}
              onChange={(e) => setaboutShop(e.target.value)}
              name="aboutShop"
            />
            <TextField
              variant="outlined"
              label="Catagery"
              fullWidth
              size="small"
              style={{ marginBottom: "1em" }}
              type="text"
              placeholder="Catagery"
              value={catagery}
              onChange={(e) => setcatagery(e.target.value)}
              name="catagery"
            />
           
          
            <FormControl size="small" sx={{ width: "100%", mt: 2 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Select Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={shoptype}
                label="Select Type"
                onChange={(e) => {
                  setshoptype(e.target.value);
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Retail">Retail</MenuItem>
                <MenuItem value="Whole Sale">Whole Sale</MenuItem>
                <MenuItem value="Service">Service</MenuItem>
              </Select>
            </FormControl>
            <InputLabel sx={{ color: "black", mb: 1, mt: 1 }}>
              Store Logo
            </InputLabel>
            <Typography align="center">
              <label htmlFor="icon-button-file">
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onChange={handlestorelogoupload}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  align="center"
                  variant="contained"
                  size="large"
                >
                  <Avatar
                    sx={{
                      width: 150,
                      height: 150,
                      bgcolor: shoplogoupload && "green",
                    }}
                    src={!shoplogoupload && storelogo[0] ? storelogo[0] : ""}
                  >
                    {shoplogoupload ? (
                      <Box>
                        <CircularProgress sx={{ color: "white" }} />
                        <Typography>Uploading {progress}%</Typography>
                      </Box>
                    ) : (
                      <PhotoCamera />
                    )}
                  </Avatar>
                </IconButton>
              </label>
            </Typography>
            {/* <ProgressList files={storeimage} setstorelogo={setstorelogo} /> */}

            <InputLabel sx={{ color: "black", mb: 1, mt: 1 }}>
              Store Banner Image
            </InputLabel>
            <Typography align="center" sx={{ width: "100%" }}>
              <label htmlFor="icon-button-file1">
                <Input
                  accept="image/*"
                  id="icon-button-file1"
                  type="file"
                  onChange={handlestorebannerupload}
                />
                <IconButton
                  sx={{ width: "100%" }}
                  color="primary"
                  aria-label="upload banner"
                  component="span"
                  align="center"
                  variant="contained"
                  size="large"
                >
                  <Avatar
                    sx={{
                      width: "100%",
                      height: "300px",
                      bgcolor: shopbannerupload && "green",
                    }}
                    variant="rounded"
                    src={
                      !shopbannerupload && storebanner[0] ? storebanner[0] : ""
                    }
                  >
                    {shopbannerupload ? (
                      <Box>
                        <CircularProgress sx={{ color: "white" }} />
                        <Typography>Uploading {bannerprogress}%</Typography>
                      </Box>
                    ) : (
                      <PhotoCamera />
                    )}
                  </Avatar>
                </IconButton>
              </label>
            </Typography>
            <Typography component="h5" variant="h5" sx={{ mt: 1, mb: 1 }}>
              Shop Location Details
            </Typography>
            <TextField
              variant="outlined"
              label="Country"
              fullWidth
              size="small"
              style={{ marginBottom: "1em" }}
              type="text"
              placeholder="Country"
              value={shopcountry}
              onChange={(e) => setshopcountry(e.target.value)}
              name="shopcountry"
            />
            <TextField
              variant="outlined"
              label="City"
              fullWidth
              size="small"
              style={{ marginBottom: "1em" }}
              type="text"
              placeholder="City"
              value={shopcity}
              onChange={(e) => setshopcity(e.target.value)}
              name="shopcity"
            />
            <TextField
              variant="outlined"
              label="Street Address"
              fullWidth
              size="small"
              style={{ marginBottom: "1em" }}
              type="text"
              placeholder="Street Address"
              value={shopstreetaddress}
              onChange={(e) => setshopstreetaddress(e.target.value)}
              name="shopstreetaddress"
            />
            <TextField
              variant="outlined"
              label="Phone"
              fullWidth
              size="small"
              style={{ marginBottom: "1em" }}
              type="text"
              placeholder="Phone"
              value={shopphone}
              onChange={(e) => setshopphone(e.target.value)}
              name="shopphone"
            />
            {/* <DialogActions> */}
              <Button type="submit" variant="contained">
                Save changes
              </Button>
            {/* </DialogActions> */}
          </Box>
       
      {/* <Loading isloading={isLoading} /> */}
      </Paper>
    </>
  );
}
