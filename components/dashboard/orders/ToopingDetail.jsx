import { Modal, Box, Typography, Chip, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ToopingDetail = ({ open, onClose, orderDetails }) => {
  const { name, toppings, quantity } = orderDetails;

  // Predefined array of colors
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#F4A460', '#FFD700'];

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'white',
          borderRadius: '12px',
          boxShadow: 24,
          p: 4,
          width: '90%',
          maxWidth: '400px',
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            mb: 2,
          }}
        >
          Order Details
        </Typography>

        {/* Order Information */}
        <Box sx={{ mb: 2 }} display={"flex"}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Name:
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.3, marginLeft: '15px' }}>{name}</Typography>
        </Box>

        {/* Toppings */}
        <Box sx={{ mb: 1 }} display={"flex"}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Toppings:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' , marginLeft: '15px' }}>
            {toppings.map((topping, index) => (
              <Chip
                key={index}
                label={topping.name}
                sx={{
                  bgcolor: colors[index % colors.length],  // Cycle through colors array
                  color: 'white',
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Quantity */}
        <Box display={"flex"}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Quantity:
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.3, marginLeft: '15px' }}>{quantity}</Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default ToopingDetail;
