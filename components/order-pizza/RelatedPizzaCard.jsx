import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Image from 'next/image';

const RelatedPizzaCard = ({ pizzaId, name, price, pizza_photo, toppings }) => {
  console.log("toppings:", toppings);
  return (
    <Card
      sx={{
        width: 380,
        height: 400, // Set height greater than width
        border: 'none', // Remove border
        borderRadius: 2, // Add border radius
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center content
        justifyContent: 'center', // Center content vertically
        marginTop: 4,
        gap : 4
      }}
    >
      {/* <div style={{ width: '100%', height: '140px' }}> */}
        <Image
          src={pizza_photo}
          alt={name}
          width={200}
          height={200} // Adjust height to fit the div
          style={{ borderRadius: '8px' }} // Optional: Add border radius to the image
        />
      {/* </div> */}
      <CardContent sx={{ marginTop: "12px", textAlign: 'center' }}> {/* Center text */}
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ margin: '8px 0' }}>
          {toppings.map((topping) => topping.name).join(', ')}
        </Typography>
        <Typography variant="body1" color="primary">
          ${price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RelatedPizzaCard;
