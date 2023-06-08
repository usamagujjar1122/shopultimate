import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete, cardActionAreaClasses } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Send } from '@mui/icons-material';
import { editcatagery } from '../../../redux/actions/catageryactions';
export default function EditCatagery({open,setOpen,catagery}) {
    const dispatch = useDispatch()
  const [catagery_name, setcatageryname] = React.useState();
  const [parent, setparent] = React.useState();

  const catageries = useSelector((state) => state.catageries?.catagerieslist);
  
  React.useEffect(() => {
    if (catagery) {
        setcatageryname(catagery.catagery_name)
        setparent((catageries?.find((cat)=>cat?._id == catagery.parentId))?.catagery_name)
    }
  
   
  }, [])

  const handleClose = () => {
    setOpen(false);
  };
  const handledit = (e)=>{
const data = {
    catagery_name,
    parentId:parent
}
dispatch(editcatagery(data,catagery?._id))

  }

  return (
    <div>
    
      <Dialog open={open} onClose={handleClose} fullWidth sx={{"& .css-tlc64q-MuiPaper-root-MuiDialog-paper":{overflowY:"unset"}}}>
        <DialogTitle>EditCreate New Catagery</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Catagery Name"
            type="text"
            fullWidth
            value={catagery_name}
            variant="outlined"
            onChange={(e)=>{setcatageryname(e.target.value)}}
          />
          <Autocomplete
          sx={{mt:1}}
          onChange={(e,value)=>{setparent(value._id)}}
  disablePortal
  id="combo-box-demo"
  options={catageries}
  getOptionLabel={(option)=> option?.catagery_name}
inputValue={parent && parent}

  fullWidth
  renderInput={(params) => <TextField {...params} label="Catagery Parent" />}
/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handledit} variant="contained" endIcon={<Send />}>Add Catagery</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
