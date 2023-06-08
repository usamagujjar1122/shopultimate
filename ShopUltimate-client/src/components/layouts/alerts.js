import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";

const Alertt = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Alert(props) {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const alerts = useSelector((state) => state.alerts);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {alerts
        ? alerts.map((alert) => (
            <Snackbar
              open={props.open}
              autoHideDuration={6000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alertt
                onClose={handleClose}
                severity={alert.alertType}
                sx={{ width: "100%" }}
              >
                {alert.msg}
              </Alertt>
            </Snackbar>
          ))
        : null}
    </Stack>
  );
}
