import { React, useEffect, useMemo, useRef } from "react";
import Nav from "../../layouts/nav";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import JoditEditor from "jodit-react";
import Imagelist from "../../upload/progressList/productimagelist";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Grid,
  TextField,
  Button,
  Typography,
  ImageList,
  ImageListItem,
  IconButton,
  ImageListItemBar,
  Avatar,
  Fab,
  Input,
  Paper,
  Autocomplete,
} from "@mui/material";
import { Alert as A } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
// import { clearalert, inprogress } from "../../redux/actions/authactions";
import { styled } from "@mui/material/styles";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { DeleteOutlineOutlined, Send } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import {
  CLEAR_PRODUCT_IMAGE,
  PRODUCT_ACTION_ATTEMPT,
} from "../../../redux/types";
import Alert from "../../layouts/alerts";
import { addproduct } from "../../../redux/actions/productactions";
import { getusershops } from "../../../redux/actions/shopactions";
import ProgressList from "../../upload/progressList/progressList";
import Loading from "../../layouts/loading";
import { getbrands } from "../../../redux/actions/brandsactions";
import { getsinglecatagery } from "../../../redux/actions/catageryactions";
import { useNavigate } from "react-router-dom";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";

export default function AddproductAdmin(props) {
  const [productTitle, setproductTitle] = useState();
  const [productDescription, setproductDescription] = useState();
  const [catagery, setcatagery] = useState(null);
  const [subcatagery, setsubcatagery] = useState();
  const [productimage, setproductimage] = useState([]);
  const [price, setprice] = useState();
  const [instock, setinstock] = useState();
  const [store, setstore] = useState("");
  const [images, setImages] = useState([]);
  const [brand, setbrand] = useState();
  const [discount, setdiscount] = useState();
  const editor = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({ type: CLEAR_PRODUCT_IMAGE });
    dispatch(getusershops());
    dispatch(getbrands());
  }, []);

  const shop = useSelector((state) => state.shop.usershops);
  const catageries = useSelector((state) => state.catageries.catageries);
  const catagerieslist = useSelector(
    (state) => state.catageries.catagerieslist
  );

  // console.log(catageries);
  const brands = useSelector((state) => state.brands.brands);
  // const catageries = useSelector((state) => state.shop.usershops);
  useEffect(() => {
    if (store) {
      setcatagery(catageries?.find((cat) => cat.name == store?.catagery));
      console.log(catagery);
      // dispatch(getsinglecatagery(store?.catagery));
    }

    // setcatagery(null);
  }, [store]);
  const renderTree = (nodes) => (
    <TreeItem key={nodes?._id} nodeId={nodes?._id} label={nodes?.name}>
      {Array.isArray(nodes?.children)
        ? nodes.children?.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );
  const handleChange = async (event, node) => {
    console.log(node);
    // setcatagery(node);
  };
  const productimages = useSelector(
    (state) => state.productimages.imagestosend
  );
  const fileRef = useRef();
  const handleClick = () => {
    fileRef.current.click();
  };
  const isLoading = useSelector((state) => state.products.isLoadingp);
  console.log(productimage);
  const handleClose = () => {
    props.setproductaddOpen(false);
  };
  const placeholder = "Start typing";
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typings...",
    }),
    [placeholder]
  );
  const handleStoreChange = async (e) => {
    setstore(e.target.value);
  };
  const submitform = async (event) => {
    event.preventDefault();
    dispatch({ type: PRODUCT_ACTION_ATTEMPT });

    const formData = {
      productTitle: productTitle,
      productDescription: productDescription,
      catagery: catagery,
      subcatagery: subcatagery,
      images: productimages,
      price: price,
      instock: instock,
      shop: store?._id,
      brand: brand,
      discount: discount,
    };
    // console.log(formData);
    dispatch(addproduct(formData, navigate));
    // setproductTitle("");
    // setproductDescription("");
    // setcatagery("");
    // setsubcatagery("");
    // setproductimage([]);
    // setprice("");
    // setinstock("");
    // setstore("");
    // setbrand("");
    // setdiscount("");
    // dispatch({ type: CLEAR_PRODUCT_IMAGE });
  };
  return (
    <Paper sx={{ p: 2, boxShadow: "0", border: "1px solid #e3e6fe" }}>
      <Box component="form" style={{}} method="post" onSubmit={submitform}>
        <InputLabel sx={{ color: "#333" }}>Product Title</InputLabel>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          style={{ marginBottom: "1em" }}
          type="text"
          placeholder="My Awesome Product"
          value={productTitle}
          onChange={(e) => setproductTitle(e.target.value)}
          name="Product Name"
        />
        <InputLabel sx={{ color: "#333" }}>Product Description</InputLabel>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          style={{ marginBottom: "1em" }}
          type="text"
          placeholder="My Awesome Product Description...."
          value={productDescription}
          onChange={(e) => setproductDescription(e.target.value)}
          name="Product description"
          multiline={true}
          rows={6}
        />
        {/* <JoditEditor
          ref={editor}
          value={productDescription}
          config={config}
          tabIndex={2} // tabIndex of textarea
          onBlur={(newContent) => setproductDescription(newContent)} // preferred to use only this option to update the content for performance reasons
          // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => {
            setproductDescription(newContent);
          }}
        /> */}
        <InputLabel
          id="demo-simple-select-label"
          sx={{ color: "black", mt: 1 }}
        >
          Select Store
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Select Store"
          onChange={handleStoreChange}
          // onChange={(e) => {
          //   setstore(e.target.value);
          //   console.log(store);
          // }}
          fullWidth
          defaultValue={shop?.length && shop[0]}
          value={store}
          size="small"
        >
          {shop?.length > 0
            ? shop.map((item) => (
                <MenuItem value={item} key={item._id}>
                  {item.shopname}
                </MenuItem>
              ))
            : null}
        </Select>
        <InputLabel sx={{ color: "#333", mt: 2 }}>Catagery</InputLabel>
        {/* {store && (
          <A icon={false} severity="success" sx={{ mt: 1, mb: 1 }}>
            {`${store && store.catagery} > ${catagery ? catagery : ""}`}
          </A>
        )} */}

        {/* <TextField
          variant="outlined"
          fullWidth
          size="small"
          style={{ marginBottom: "1em" }}
          type="text"
          placeholder="Catagery...."
          value={catagery}
          onChange={(e) => setcatagery(e.target.value)}
          name="catagery"
        /> */}
        {/* {catagery?.children?.length ? (
          catagery?.children?.map((item) => (
            <TreeView
              onNodeSelect={handleChange}
              aria-label="rich object"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpanded={["root"]}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{ height: 110, flexGrow: 1 }}
            >
              {renderTree(item)}
            </TreeView>
          ))
        ) : (
          <Typography sx={{ color: "#333", p: 1 }}>""</Typography>
        )} */}
        <Autocomplete
          id="free-solo-demo"
          // freeSolo={true}
          options={catagerieslist && catagerieslist}
          getOptionLabel={(option) => option?.catagery_name}
          // value={catagery}
          onChange={(event, value) => setcatagery(value?._id)}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              placeholder="Product Catagery"
            />
          )}
        />
        <InputLabel sx={{ color: "#333" }}>Brand</InputLabel>
        <Autocomplete
          id="free-solo-demo"
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

        {/* <TextField
            variant="outlined"
            fullWidth
            size="small"
            style={{ marginBottom: "1em" }}
            type="text"
            placeholder="Brand...."
            value={brand}
            onChange={(e) => setbrand(e.target.value)}
            name="brand"
          /> */}
        <InputLabel sx={{ color: "#333" }}>Price</InputLabel>

        <TextField
          variant="outlined"
          fullWidth
          size="small"
          style={{ marginBottom: "1em" }}
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setprice(e.target.value)}
          name="price"
        />
        <InputLabel sx={{ color: "#333" }}>
          Discount (Percentage) (Optional)
        </InputLabel>

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
        <InputLabel sx={{ color: "#333" }}>Avalaible Stock</InputLabel>

        <TextField
          variant="outlined"
          fullWidth
          size="small"
          style={{ marginBottom: "1em" }}
          type="number"
          placeholder="In Stock"
          value={instock}
          onChange={(e) => setinstock(e.target.value)}
          name="instock"
        />

        <Typography
          component="h5"
          variant="h5"
          align="center"
          sx={{ mt: 2, mb: 1 }}
        >
          Select Images
        </Typography>
        <Typography align="center">
          <Input
            type="file"
            inputProps={{ multiple: true }}
            sx={{ display: "none" }}
            inputRef={fileRef}
            onChange={(e) => setproductimage([...e.target.files])}
          />
          <Fab color="primary" aria-label="add" onClick={handleClick}>
            <AddIcon fontSize="large" />
          </Fab>
          {/* <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                multiple
                onChange={(e) => setproductimage([...e.target.files])}
              />
              <Fab color="primary" aria-label="upload picture">
              <AddIcon />
            </Fab> */}
          {/* <Avatar
                sx={{ width: "100%", height: "300px", cursor: "pointer" }}
                variant="rounded"
              >
                <IconButton
                  color="primary"
                  
                  component="span"
                  align="center"
                >
                  <PhotoCamera />
                </IconButton>
              </Avatar> */}
          {/* </label> */}
        </Typography>
        <ProgressList
          files={productimage}
          images={images}
          setproductimages={setImages}
        />
        <Imagelist />

        <Button
          variant="contained"
          color="success"
          type="submit"
          fullWidth
          endIcon={<Send />}
        >
          Create New Product
        </Button>
      </Box>
      <Loading isloading={isLoading} />
    </Paper>
  );
}
