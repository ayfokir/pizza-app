import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadIcon from "@mui/icons-material/Upload"; // Import upload icon


// Styled component for visually hidden input
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload() {
  return (
    <Button
      component="label"
      fullWidth
      variant="outlined" // Changed to outlined for a distinct look
      sx={{
        border: "2px dashed #CCCCCC", // Dashed border style
        textTransform: "none", // Preserve text casing (PascalCase)
        color: "#FF9921", // Set text and icon color
        padding: "16px", // Add padding for a better look
      }}
      startIcon={<UploadIcon />} // Add upload icon
      >
      Upload Logo
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => {
          const files = event.target.files;
          if (files.length > 0) {
            console.log("Selected files:", files);
          }
        }}
        multiple // Allow multiple file selection
      />
    </Button>
  );
}
