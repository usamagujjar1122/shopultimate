import React from "react";
import { useSelector } from "react-redux";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

export default function Treeview() {
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
      {catageries &&
        catageries.map((item) => (
          <TreeView
            onNodeSelect={handleChange}
            aria-label="rich object"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={["root"]}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {renderTree(item)}
          </TreeView>
        ))}
    </div>
  );
}
