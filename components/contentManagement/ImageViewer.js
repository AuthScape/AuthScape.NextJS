import React, { useEffect } from "react";
import {
  Stack,
  TextField,
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
  Dialog,
  Slide,
  Button,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ImageViewer = ({ isOpen, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
      PaperProps={{
        sx: { borderRadius: 3 },
      }}
    >
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 6,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h3">{isOpen?.title}</Typography>
      </DialogTitle>
      <DialogContent sx={{ paddingBottom: 2 }}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Image
            src={isOpen?.url}
            width={500}
            height={500}
            objectFit="contain"
          />
        </Box>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

//export default ImageViewer;
