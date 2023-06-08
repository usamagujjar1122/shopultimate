import * as React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import { Cancel, DeleteOutlineOutlined } from "@mui/icons-material";

import {
  Grid,
  TextField,
  Button,
  Typography,
  Alert,
  ImageList,
  ImageListItem,
  IconButton,
  ImageListItemBar,
  Paper,
  Autocomplete,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
// import { clearalert, inprogress } from "../../redux/actions/authactions";
import {
  getproduct,
  updateproduct,
} from "../../../redux/actions/productactions";
import { styled } from "@mui/material/styles";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Slide from "@mui/material/Slide";
import { useNavigate, useParams } from "react-router-dom";
import Imageslist from "../../upload/progressList/productimagelist";
import ProgressList from "../../upload/progressList/progressList";
import { addproductimage } from "../../../redux/actions/productimagesactions";
import { CLEAR_PRODUCT_IMAGE } from "../../../redux/types";
import { getusershops } from "../../../redux/actions/shopactions";
import { getbrands } from "../../../redux/actions/brandsactions";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Input = styled("input")({
  display: "none",
});

export default function EditProduct(props) {
  const params = useParams();
  const navigate = useNavigate();
  const product = useSelector((state) => state.products.product);
  const brands = useSelector((state) => state.brands.brands);

  const productimagestosend = useSelector(
    (state) => state.productimages.imagestosend
  );

  const [productTitle, setproductTitle] = useState();
  const [productDescription, setproductDescription] = useState();
  const [catagery, setcatagery] = useState();
  const [subcatagery, setsubcatagery] = useState();
  const [productimage, setproductimage] = useState([]);
  const [productimages, setproductimages] = useState([]);
  const [brand, setbrand] = useState();
  const [discount, setdiscount] = useState();

  const [price, setprice] = useState();
  const [instock, setinstock] = useState();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const error = useSelector((state) => state.errors);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    // dispatch({ type: CLEAR_PRODUCT_IMAGE });
    dispatch(getusershops());
    dispatch(getbrands());
  }, []);
  useEffect(() => {
    dispatch(getproduct(params?.id));
  }, [params.id]);
  useEffect(() => {
    dispatch({ type: CLEAR_PRODUCT_IMAGE });

    if (product) {
      setproductTitle(product.productTitle);
      setproductDescription(product.productDescription);
      setcatagery(product.catagery);
      setsubcatagery(product.subcatagery);
      setprice(product.price);
      setinstock(product.instock);
      setdiscount(product.discount);
      // setbrand(product.brand);
      product.images.map((url) => dispatch(addproductimage(url)));

      //   setproductimage(props.product.productimage);
    }
  }, [product]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const submitform = (event) => {
    console.log("sumit");
    event.preventDefault();
    const formData = {
      id: params.id,
      productTitle: productTitle,
      productDescription: productDescription,
      catagery: catagery,
      // subcatagery: subcatagery,
      images: productimagestosend,
      price: price,
      instock: instock,
    };
    dispatch(updateproduct(formData, navigate));

    // if (productimage.length > 0) {
    //   const promises = [];
    //   for (let index = 0; index < productimage.length; index++) {
    //     const element = productimage[index];
    //     const imageref = ref(storage, `images/${element.name}`);
    //     const upload = uploadBytes(imageref, element).then(async () => {
    //       await getDownloadURL(imageref).then((url) => {
    //         formData.images.push(url);
    //       });
    //     });
    //     promises.push(upload);
    //     // console.log(promises)
    //     // upload.then(async ()=>{
    //     //     await getDownloadURL(imageref).then(url=>{
    //     //         console.log(url)
    //     //         formData.shopavatar.push(url)
    //     //         console.log(formData)
    //     //     })
    //     // })
    //   }
    //   Promise.all(promises)
    //     .then(() => {
    //       console.log("promisses");
    //       dispatch(updateproduct(formData));
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // } else {
    //   dispatch(updateproduct(formData));
    // }
  };
  return (
    <>
      <Paper sx={{ p: 2, border: "1px solid #d0d0d0" }}>
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
            label="Product Name"
            fullWidth
            size="small"
            style={{ marginBottom: "1em" }}
            type="text"
            placeholder="Product Name"
            value={productTitle}
            onChange={(e) => setproductTitle(e.target.value)}
            name="Product Name"
          />
          <TextField
            variant="outlined"
            label="Product Description"
            fullWidth
            multiline
            rows={5}
            size="small"
            style={{ marginBottom: "1em" }}
            type="text"
            placeholder="Product Description"
            value={productDescription}
            onChange={(e) => setproductDescription(e.target.value)}
            name="Product Description"
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
          <Autocomplete
            id="free-solo-demo"
            inputValue={product?.brand}
            // defaultValue={product?.brand}
            // value={brand}
            freeSolo={true}
            options={brands && brands}
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => setbrand(value?.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                placeholder="Select Product Brand"
              />
            )}
          />
          <TextField
            variant="outlined"
            label="Price"
            fullWidth
            size="small"
            style={{ marginBottom: "1em" }}
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setprice(e.target.value)}
            name="price"
          />
          <TextField
            variant="outlined"
            label="In Stock"
            fullWidth
            size="small"
            style={{ marginBottom: "1em" }}
            type="number"
            placeholder="In Stock"
            value={instock}
            onChange={(e) => setinstock(e.target.value)}
            name="instock"
          />

          <TextField
            variant="outlined"
            fullWidth
            size="small"
            style={{ marginBottom: "1em" }}
            type="number"
            placeholder="Discount in %age"
            value={discount}
            onChange={(e) => setdiscount(e.target.value)}
            name="discount"
          />
          {/* <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select Store"
            onChange={(e) => setstore(e.target.value)}
            fullWidth
            value={store}
          >
            {shop.length > 0
              ? shop.map((item) => (
                  <MenuItem value={item._id}>{item.shopname}</MenuItem>
                ))
              : null}
          </Select> */}
          <Typography component="h5" variant="h5" align="center">
            Select Images
          </Typography>
          <Typography align="center">
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                multiple
                onChange={(e) => setproductimages([...e.target.files])}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                align="center"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Typography>

          <ProgressList files={productimages} />
          <Imageslist />

          <Button autoFocus type="submit" variant="contained">
            Save changes
          </Button>
        </Box>
      </Paper>
    </>
  );
}
