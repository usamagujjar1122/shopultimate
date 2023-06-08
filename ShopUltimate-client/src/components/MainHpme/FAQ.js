import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => {
      setExpanded(prev=> prev===panel? null : panel );
    }

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={()=>handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography sx={{fontWeight:'bold'}}>How to contact with Customer Service?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Our Customer Experience Team is available 7 days a week and we offer 2 ways to get in contact.Email and Chat . We try to reply quickly, so you need not to wait too long for a response!.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={()=>handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography sx={{fontWeight:'bold'}}>App installation failed, how to update system information?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Please read the documentation carefully . We also have some online video tutorials regarding this issue . If the problem remains, Please Open a ticket in the support forum
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={()=>handleChange('panel3')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography sx={{fontWeight:'bold'}}>Website response taking time, how to improve?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          At first, Please check your internet connection . We also have some online video tutorials regarding this issue . If the problem remains, Please Open a ticket in the support forum.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={()=>handleChange('panel4')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography sx={{fontWeight:'bold'}}>How do I create a account?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          If you want to open an account for personal use you can do it over the phone or online. Opening an account online should only take a few minutes.
          </Typography>
        </AccordionDetails>
      </Accordion>
     
    </div>
  );
}