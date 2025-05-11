import { Box, Typography } from "@mui/material";

export const StatItem: React.FC<{
  value: number | undefined;
  label: string;
}> = ({ value, label }) => (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <Typography variant="h6">{value ?? 0}</Typography>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
  </Box>
);