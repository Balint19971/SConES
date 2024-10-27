import * as React from "react";
import { Box, Button, Grid, Modal } from "@mui/material";
import ImageCropper from "./ImageCropper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "1300px",
  height: "90%",
  maxHeight: "800px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ updateAvatar, closeModal, imgSrc }: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdateAvatar = (imgSrc: string) => {
    updateAvatar(imgSrc);
    handleClose(); // Close the modal after updating the avatar
  };

  return (
    <div>
      <Grid>
        <Button onClick={handleOpen}>Upload new profile picture?</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ImageCropper
              updateAvatar={handleUpdateAvatar}
              closeModal={closeModal}
              img={imgSrc}
            />
          </Box>
        </Modal>
      </Grid>
    </div>
  );
}
