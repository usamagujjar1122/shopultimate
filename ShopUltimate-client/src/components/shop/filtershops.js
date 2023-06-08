import * as React from "react";
import {
  Grid,
  Container,
  Box,
  Button,
  Typography,
  Stack,
  TextField,
  Paper,
  InputLabel,
  Autocomplete,
  Chip,
  Checkbox,
  Rating,
  ImageList,
  IconButton,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useDispatch, useSelector } from "react-redux";
import { Close, FilterAlt, Search } from "@mui/icons-material";
import { getbrands } from "../../redux/actions/brandsactions";
import Data from "../SellerDashboard/shops/citiesandcountrydata";
export default function ShopFilter({
  setstorename,
  setcatgery,
  setcountry,
  handlefilter,
  storename,
  country,
  catagery,
}) {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(null);

  const catageries = useSelector((state) => state.catageries.catageries);
  const brands = useSelector((state) => state.brands.brands);
  const colors = ["#ffcf83", "#e39763", "#b87a45", "#a65950", "#8f2929"];
  // const handleclose = () => {
  //   props.setOpen(false);
  // };
  React.useEffect(() => {
    dispatch(getbrands());
  }, []);

  const handleChange = (event, newValue) => {
    // console.log(newValue);
    setcatgery(newValue);
  };
  return (
    <Container maxWidth="md">
      <Paper sx={{ boxShadow: "0" }}>
        <Box>
          <Box>
            <TextField
              variant="outlined"
              placeholder="Search By Store Name...."
              fullWidth
              value={storename}
              size="small"
              onChange={(e) => setstorename(e.target.value)}
              InputProps={{
          endAdornment: (
            <InputAdornment position="end">
             <IconButton onClick={()=>{setcatgery('');setstorename('')}}><Close /></IconButton>
            </InputAdornment>
          ),
        }}
             
            />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              // maxWidth: { xs: 320, sm: 480 },
              bgcolor: "background.paper",
            }}
          >
            <Tabs
              value={catagery}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              aria-label="visible arrows tabs example"
              sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                  "&.Mui-disabled": { opacity: 0.3 },
                },
              }}
            >
              {catageries &&
                catageries.map((cat) => (
                  <Tab 
                    value={cat.name}
                    label={
                      <Chip
                        label={`${cat.name}`}
                        variant="contained"
                        sx={{
                          textTransform: "capitalize",
                          p: 1,
                          // borderRadius: "5px",
                          fontWeight: "bold",
                          // borderColor:
                          //   colors[Math.floor(Math.random() * colors.length)],
                          // color:
                          //   colors[Math.floor(Math.random() * colors.length)],
                        }}
                      />
                    }
                  />
                ))}
            </Tabs>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
