import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => (
  <Box 
    component="footer"
    sx={{
      py: 3, 
      px: 2, 
      mt: 'auto', 
    }}
  >
    <Typography variant="body2" color="text.secondary" align="center" fontStyle="italic">
      Rock-Connect: Connecting Fans and Artists since 2025
    </Typography>
  </Box>
);

export default Footer;