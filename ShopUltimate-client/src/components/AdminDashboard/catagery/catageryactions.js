import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { ArrowDownwardRounded, Delete, Edit, Preview, RemoveRedEye } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import EditCatagery from "./editcatagery";

export default function CatageyActions({ params }) {
    const [eopen,seteOpen] = React.useState(false)

  return (
    <Box>
      <Tooltip title="Modify this Catagery">
        {/* <Link to={`/dashboard/modify-order/${params.row._id}`}> */}
          <IconButton onClick={()=>seteOpen(true)}>
            <Edit />
          </IconButton>
        {/* </Link> */}
      </Tooltip>
      <Tooltip title="Delete this Order">
        <IconButton>
          <Delete />
        </IconButton>
      </Tooltip>
      <Tooltip title="Preview Full Tree">
        <IconButton>
          <ArrowDownwardRounded />
        </IconButton>
      </Tooltip>
      <EditCatagery open={eopen} setOpen={seteOpen} catagery={params.row} />
    </Box>
  );
}
