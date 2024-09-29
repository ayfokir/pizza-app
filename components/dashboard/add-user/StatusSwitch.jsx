import React from 'react';
import { Box, Switch, Typography } from '@mui/material';
import { Check } from '@mui/icons-material';

const StatusSwitch = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding="4px 8px"
      borderRadius="12px"
      bgcolor="#E8F5E9"
      width="auto"
    >
      <Check style={{ color: '#388E3C', marginRight: 8 }} />
      <Typography variant="body1" style={{ color: '#388E3C', marginRight: 8 }}>
        Active
      </Typography>
          <Switch
      defaultChecked
      size="small"
      sx={{
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: '#388E3C',
          '&:hover': {
            backgroundColor: 'rgba(56, 142, 60, 0.08)',
          },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: '#388E3C',
        },
        '& .MuiSwitch-track': {
          borderRadius: 20 / 2,
          // width: 22, // Adjust the width as needed
          // height: 14, // Adjust the height as needed
        },
      }}
    />
        </Box>
  );
};

export default StatusSwitch;
