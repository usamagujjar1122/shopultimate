import React, { useEffect, useMemo, useRef } from "react";
import Nav from "../../layouts/nav";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { useDropzone } from "react-dropzone";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import JoditEditor from "jodit-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  Avatar,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  ImageList,
  ImageListItem,
  IconButton,
  ImageListItemBar,
  Container,
  FormControl,
  CircularProgress,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { clearalert, inprogress } from "../../../redux/actions/authactions";
import { addshop } from "../../../redux/actions/shopactions";
import { styled } from "@mui/material/styles";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { SHOP_ACTION_ATTEMPT } from "../../../redux/types";
import Alert from "../../layouts/alerts";
import { useNavigate } from "react-router-dom";
import Slide from "@mui/material/Slide";
import ProgressList from "../../upload/progressList/progressList";
import Loading from "../../layouts/loading";
import axios from "axios";
import Data from "./citiesandcountrydata";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Input = styled("input")({
  display: "none",
});
export default function Addshop(props) {
  const [shoplogoupload, setShoplogoupload] = useState(false);
  const [shopbannerupload, setShopbannerupload] = useState(false);

  const [shopname, setshopname] = useState();
  const [aboutShop, setaboutShop] = useState();
  const [catagery, setcatagery] = useState();
  const [subcatagery, setsubcatagery] = useState();
  const [brand, setbrand] = useState([]);

  const [shoptype, setshoptype] = useState("");
  const [shopcountry, setshopcountry] = useState();
  const [shopcity, setshopcity] = useState(null);
  const [shopstreetaddress, setshopstreetaddress] = useState();
  const [shopphone, setshopphone] = useState();

  const [storeimage, setstoreimage] = useState([]);
  const [storebannerimage, setstorebannerimage] = useState([]);
  const [storelogo, setstorelogo] = useState([]);
  const [storebanner, setstorebanner] = useState([]);

  const [progress, setProgress] = useState(0);
  const [bannerprogress, setbannerProgress] = useState(0);
  const [countries, setCountries] = useState(null);
  const [cl, setcl] = useState(false);
  const [city, setCity] = useState(null);
  const [cityy, setCityy] = useState(null);

  const [ctl, setctl] = useState(false);

  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const isLoading = useSelector((state) => state.shop.isLoading);
  const catageries = useSelector((state) => state.catageries.catageries);
  const editor = useRef(null);

  const alerts = useSelector((state) => state.alerts);
  const navigate = useNavigate();

  const handleClose = () => {
    props.setshopaddOpen(false);
  };
  const placeholder = "Start typing";
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typings...",
    }),
    [placeholder]
  );

  const handlestorelogoupload = (e) => {
    setShoplogoupload(true);
    setstoreimage([e.target.files[0]]);
    const file = e.target.files[0];
    if (!file) {
      setShoplogoupload(false);
      return;
    }

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
    if (!file) {
      setShopbannerupload(false);
      return;
    }
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
  const submitform = async (event) => {
    event.preventDefault();
    dispatch({ type: SHOP_ACTION_ATTEMPT });

    const formData = {
      shopname: shopname,
      aboutShop: content,
      catagery: catagery,
      subcatagery: subcatagery,
      shopavatar: storelogo,
      country: shopcountry?.country,
      city: shopcity,
      streetaddress: shopstreetaddress,
      shopphone: shopphone,
      Shoptype: shoptype,
      Brands: brand,
      shopbanner: storebanner,
    };
    dispatch(addshop(formData, navigate));
    // setshopname("");
    // setcatagery("");
    // setsubcatagery("");
    // setContent("");
    // setstorelogo([]);
    // setstorebanner([]);
    // setshopcity("");
    // setshopcountry("");
    // setshopstreetaddress("");
    // setbrand("");
    // setshoptype("");
    // setstorebannerimage([]);
    // setstoreimage([]);
    // setshopphone("");
    // if (storeimage.length > 0) {
    //   const promises = [];
    //   // for (let index = 0; index < storeimage.length; index++) {
    //   const element = storeimage[0];
    //   const imageref = ref(storage, `images/${element.name}`);
    //   const upload = uploadBytes(imageref, element).then(async () => {
    //     await getDownloadURL(imageref).then((url) => {
    //       formData.shopavatar.push(url);
    //     });
    //   });
    //   const element1 = storebannerimage[0];
    //   const imageref1 = ref(storage, `images/${element1.name}`);
    //   const upload1 = uploadBytes(imageref1, element1).then(async () => {
    //     await getDownloadURL(imageref1).then((url) => {
    //       formData.shopbanner.push(url);
    //     });
    //   });
    //   promises.push(upload1);
    //   // console.log(promises)
    //   // upload.then(async ()=>{
    //   //     await getDownloadURL(imageref).then(url=>{
    //   //         console.log(url)
    //   //         formData.shopavatar.push(url)
    //   //         console.log(formData)
    //   //     })
    //   // })
    //   // }
    //   Promise.all(promises)
    //     .then(() => {
    //       dispatch(addshop(formData, navigate));
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // } else {
    //   dispatch(addshop(formData));
    //   setshopname("");
    //   setaboutShop("");
    //   setcatagery("");
    //   setsubcatagery("");
    //   setstoreimage([]);
    // }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ p: 3, boxShadow: "0" }}>
        {/* <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.shopaddopen}
        sx={{}}
        fullScreen
        TransitionComponent={Transition}
      > */}

        <Box component="form" method="post" onSubmit={submitform}>
          {/* <Typography component="h5" variant="h5" sx={{ mt: 1, mb: 1 }}>
              Shop Details
            </Typography> */}
          <InputLabel sx={{ color: "black" }}>Store Name</InputLabel>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            style={{ marginBottom: "1em" }}
            type="text"
            placeholder="e.g My Brand New Store..."
            value={shopname}
            onChange={(e) => setshopname(e.target.value)}
            name="shopname"
          />
          <InputLabel sx={{ color: "black", mb: 1 }}>
            Store Description
          </InputLabel>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            multiline={true}
            rows={6}
            maxRows={8}
            style={{ marginBottom: "1em" }}
            type="text"
            placeholder="e.g My Brand New Store About ..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            name="shopdescrption"
          />

          {/* <JoditEditor
            ref={editor}
            value={aboutShop}
            config={config}
            tabIndex={2} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {
              setContent(newContent);
            }}
          /> */}
          <InputLabel sx={{ color: "black", mb: 1, mt: 1 }}>
            Catagery
          </InputLabel>

          <Autocomplete
            id="free-solo-demo"
            options={catageries && catageries}
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => setcatagery(value?.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                placeholder="Search By Catageries....."
              />
            )}
          />

          <InputLabel sx={{ color: "black", mb: 1, mt: 1 }}>
            Store Type
          </InputLabel>
          <FormControl size="small" sx={{ width: "100%" }}>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              defaultValue=""
              value={shoptype}
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
                  src={
                    !shoplogoupload && storeimage[0]
                      ? URL.createObjectURL(storeimage[0])
                      : ""
                  }
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
              {/* <IconButton
                sx={{ width: "100%" }}
                color="primary"
                aria-label="upload banner"
                component="span"
                align="center"
                variant="contained"
                size="large"
              > */}
              <Avatar
                sx={{
                  width: "100%",
                  height: "300px",
                  bgcolor: shopbannerupload && "green",
                }}
                variant="rounded"
                src={
                  !shopbannerupload && storebannerimage[0]
                    ? URL.createObjectURL(storebannerimage[0])
                    : ""
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
              {/* </IconButton> */}
            </label>
          </Typography>

          <InputLabel sx={{ color: "black", mb: 1, mt: 1 }}>
            Store Location (Country)
          </InputLabel>
          {/* <TextField
            variant="outlined"
            fullWidth
            size="small"
            style={{ marginBottom: "1em" }}
            type="text"
            placeholder="e.g United State"
            value={shopcountry}
            onChange={(e) => setshopcountry(e.target.value)}
            name="shopcountry"
          /> */}
          <Autocomplete
            id="free-solo-demo"
            options={Data && Data}
            getOptionLabel={(option) => option.country}
            onChange={(event, value) => {
              setshopcity(null);
              setshopcountry(value);
            }}
            loading={Data}
            renderInput={(params) => (
              <TextField {...params} size="small" placeholder="Country" />
            )}
          />
          <InputLabel sx={{ color: "black", mb: 1 }}>
            Store Location (City)
          </InputLabel>

          <Autocomplete
            id="free-solo-demo"
            options={shopcountry?.cities}
            value={shopcity}
            getOptionLabel={(option) => option}
            onChange={(event, value) => setshopcity(value)}
            loading={Data}
            renderInput={(params) => (
              <TextField {...params} size="small" placeholder="City" />
            )}
          />
          <InputLabel sx={{ color: "black", mb: 1 }}>
            Store Location (Street Address)
          </InputLabel>

          <TextField
            variant="outlined"
            fullWidth
            size="small"
            style={{ marginBottom: "1em" }}
            type="text"
            placeholder="e.g Shop no 12 ......."
            value={shopstreetaddress}
            onChange={(e) => setshopstreetaddress(e.target.value)}
            name="streetaddress"
          />
          <InputLabel sx={{ color: "black", mb: 1 }}>Store Phone</InputLabel>
          {/* <TextField
            variant="outlined"
            fullWidth
            size="small"
            style={{ marginBottom: "1em" }}
            type="text"
            placeholder="+1 345678181..."
            value={shopphone}
            onChange={(e) => setshopphone(e.target.value)}
            name="shopphone"
          /> */}
          <PhoneInput
            containerStyle={{}}
            inputStyle={{
              width: "100%",
            }}
            defaultCountry="no"
            value={shopphone}
            onChange={(value, country, e, formattedValue) =>
              setshopphone(formattedValue)
            }
          />
          {isLoading ? (
            <Button fullWidth variant="contained" color="primary">
              <CircularProgress size={22} />
            </Button>
          ) : (
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Create Shop
            </Button>
          )}
        </Box>
        {/* </Dialog> */}
        {/* <Loading isloading={isLoading} /> */}
      </Paper>
    </Box>
  );
}
