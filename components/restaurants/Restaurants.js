import React from 'react';
import { Avatar, Box, Card, Typography, Grid } from '@mui/material';
import { Bolt } from '@mui/icons-material';
import Image from 'next/image'
const OrderCard = () => {
  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 2,
        borderRadius: '15px',
        backgroundColor: '#fcefdc',
        width: "574px",
        height: "154px",
        flexShrink: 0, // Ensure it doesn't shrink in a flex container

      }}
    >
      {/* Left Section: Avatar, Name, and Description in a column */}
        <Box display="flex" flexDirection="column">
        <Box display={"flex"}>
            <Avatar
              alt="Azmera Pizza"
              src="/azmera.png" // Replace with actual image URL
              sx={{ width: 56, height: 56, marginRight: 2 }}
            />
              <Typography variant="h6" fontWeight="bold" sx={{mt: 1}}>
                Azmera Pizza
              </Typography>
        </Box>
          <Typography variant="body2" color="textSecondary" sx={{mt:1}}>
            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to...
          </Typography>
        </Box>
      

      {/* Right Section: Icon and Order Number in a row */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          backgroundColor: '#eef7f0',
          padding: '8px 16px',
          borderRadius: '12px',
          width: "362px",
          height: "108px"
        }}
      >
        {/* <Bolt sx={{ fontSize: 40, color: '#f7931e' }} /> */}
        <Image  
        src={"/order.png"}
        width={80}
        height={80}
        
        />
        <Box sx={{ marginLeft: 1 }}>
          <Typography variant="body2" color="textSecondary" align="right">
            Number of orders
          </Typography>
          <Typography variant="h4" fontWeight="bold" sx={{ color: '#f7931e' }}>
            2K
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default OrderCard;
