import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useSelector } from "react-redux";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import "./styles.css";
export default function MobileCatageryDrawer({ open, setOpen }) {
  const catageries = useSelector((state) => state.catageries.catageries);
  const renderTree = (nodes) => (
    <TreeItem key={nodes?._id} nodeId={nodes?._id} label={nodes?.name}>
      {Array.isArray(nodes?.children)
        ? nodes.children?.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  const handleChange = async (event, node) => {
    console.log("nodeId: ", node);
  };
  return (
    <div>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        sx={{ width: "240px !important" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #d0d0d0",
          }}
        >
          <Box
            sx={{
              p: 2,
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                width: "100%",
                color: "#333",
                fontWeight: "700",
                letterSpacing: "1px",
                fontSize: "18px",
                textAlign: "center",
              }}
            >
              Shop
              <span style={{ color: "#64a832" }}>Ultimate</span>
            </Typography>
          </Box>
          <IconButton onClick={() => setOpen(false)} sx={{ mr: 1 }}>
            <Close />
          </IconButton>
        </Box>
        <Box>
          {catageries &&
            catageries.map((item) => (
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
            ))}
        </Box>
      </Drawer>
    </div>
  );
}
