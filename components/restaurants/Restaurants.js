import React from 'react';
import { Avatar, Box, Card, Typography } from '@mui/material';
import Image from 'next/image';

const Restaurants = ({ name, location, logoUrl, orders }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 2,
        borderRadius: '15px',
        backgroundColor: 'white',
        width: "574px",
        height: "120px",
        flexShrink: 0, // Ensure it doesn't shrink in a flex container
      }}
    >
      {/* Left Section: Avatar, Name, and Description in a column */}
      <Box display="flex" flexDirection="column">
        <Box display={"flex"}>
          <Avatar
            alt={name}
            src={logoUrl} // Render restaurant logo
            sx={{ width: 56, height: 56, marginRight: 2 }}
          />
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
            {name}
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Location: {location}
        </Typography>
      </Box>

      {/* Right Section: Orders */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          backgroundColor: '#eef7f0',
          padding: '8px 16px',
          borderRadius: '12px',
          width: "362px",
          height: "108px",
        }}
      >
        <Image  
          src="/order.png"  // Assuming you have a default order image
          width={80}
          height={80}
          alt="Orders"
        />
        <Box sx={{ marginLeft: 1 }}>
          <Typography variant="body2" color="textSecondary" align="right">
            Number of orders
          </Typography>
          <Typography variant="h4" fontWeight="bold" sx={{ color: '#f7931e' }}>
            {orders} {/* Display the number of orders */}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default Restaurants;
