import {
  CurrencyExchange,
  KeyboardArrowDown,
  MonetizationOn,
  MoneyOffCsredRounded,
  ShoppingBasket,
  TimelapseTwoTone,
  Timeline,
} from "@mui/icons-material";
import {
  Grid,
  Box,
  Stack,
  Typography,
  IconButton,
  Paper,
  Button,
  Chip,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import d from "../../images/d.svg";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function Stats() {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Paper
        sx={{
          p: 3,
          mb: 2,
          boxShadow: "0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography sx={{ color: "#4E97FD", fontWeight: "bold" }}>
            Good Morning, Maruf!
          </Typography>
          <Typography sx={{ color: "#7D879C", mt: 2 }}>
            Here’s what happening with your store today!
          </Typography>
        </Box>
        <Box>
          <img src={d} />
        </Box>
      </Paper>
      <Grid container spacing={2}>
        <Grid item md={3} xs={2}>
          <Paper sx={{ p: 2, boxShadow: 0 }}>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Box>
                <Typography sx={{ mb: 3, fontSize: "18px" }}>
                  Todays Sale
                </Typography>
                <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>
                  $30
                </Typography>
              </Box>
              <Box sx={{ mt: -1 }}>
                <IconButton>
                  <MonetizationOn sx={{ color: "orange" }} fontSize="large" />
                </IconButton>
              </Box>
            </Stack>
          </Paper>
        </Grid>
        <Grid item md={3} xs={2}>
          <Paper sx={{ p: 2, boxShadow: 0 }}>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Box>
                <Typography sx={{ mb: 3, fontSize: "18px" }}>
                  Todays Orders
                </Typography>
                <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>
                  3
                </Typography>
              </Box>
              <Box sx={{ mt: -1 }}>
                <IconButton>
                  <ShoppingBasket sx={{ color: "blue" }} fontSize="large" />
                </IconButton>
              </Box>
            </Stack>
          </Paper>
        </Grid>
        <Grid item md={3} xs={2}>
          <Paper sx={{ p: 2, boxShadow: 0 }}>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Box sx={{}}>
                <Typography sx={{ mb: 3, fontSize: "18px" }}>
                  Total Sales
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>
                    $300
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mt: -1, display: "flex", flexDirection: "column" }}>
                <IconButton sx={{ mb: 1 }}>
                  <CurrencyExchange sx={{ color: "orange" }} fontSize="large" />
                </IconButton>
                <Button
                  variant="contained"
                  color="success"
                  endIcon={<KeyboardArrowDown />}
                  size="small"
                  sx={{ boxShadow: "0" }}
                >
                  All Time
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Grid>
        <Grid item md={3} xs={2}>
          <Paper sx={{ p: 2, boxShadow: 0 }}>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Box>
                <Typography sx={{ mb: 3, fontSize: "18px" }}>
                  Total Orders
                </Typography>
                <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>
                  $30
                </Typography>
              </Box>
              <Box sx={{ mt: -1, display: "flex", flexDirection: "column" }}>
                <IconButton sx={{ mb: 1 }}>
                  <Timeline sx={{ color: "blue" }} fontSize="large" />
                </IconButton>
                <Button
                  variant="contained"
                  endIcon={<KeyboardArrowDown />}
                  size="small"
                  sx={{ boxShadow: "0" }}
                >
                  This Month
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12} sx={{ mt: 2 }}>
          <Paper sx={{ boxShadow: "0" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #d0d0d0",
                alignItems: "center",
                p: 2,
              }}
            >
              <Typography>Recent Purchases</Typography>
              <Link to="/dashboard/myorders" style={{ textDecoration: "none" }}>
                <Button variant="outlined">All Orders</Button>
              </Link>
            </Box>
            <Box>
              <TableContainer>
                <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                  <TableHead
                    sx={{
                      background: "#f3f5f9",
                    }}
                  >
                    <TableRow>
                      <TableCell
                        sx={{
                          color: "#333",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        Order Id
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#333",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        Items
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#333",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        Payment
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#333",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        Amount
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Typography>878778</Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography>Led</Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography>
                          <Chip
                            // variant="outlined"
                            label="Success"
                            sx={{ borderRadius: "4px", color: "#e94560" }}
                          />
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography>$30</Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
