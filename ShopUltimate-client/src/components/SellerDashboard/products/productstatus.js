import { Switch, Box } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateproduct } from "../../../redux/actions/productactions";
export default function Productstatus({ params }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(params.row.isActive);
  const handlechange = (e) => {
    setChecked(e.target.checked);
    dispatch(updateproduct({ isActive: !checked, id: params.row._id }));
  };
  return (
    <Box>
      <Switch
        defaultChecked={checked}
        onChange={handlechange}
        color="success"
      />
    </Box>
  );
}
