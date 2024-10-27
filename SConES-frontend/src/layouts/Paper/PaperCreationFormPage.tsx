import { Box, Button, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import usePaperCreation from "../../utils/functions/paper-creation-form/usePaperCreation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SConESColors } from "../../config/Theme";

export const PaperCreationFormPage = () => {
  const [paperTitle, setPaperTitle] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [email3, setEmail3] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { createPaper, objectPath } = usePaperCreation();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const paperData = {
      title: paperTitle,
      emails: [email1, email2, email3],
      objectPath: objectPath,
    };

    await createPaper(paperData, selectedFile);
    window.location.href = "/papers";
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ mt: 18 }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 3, fontWeight: "bold", color: SConESColors.lightBlue }}
      >
        Upload Paper
      </Typography>
      <Box sx={{ width: "500px" }}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          onChange={(e) => setPaperTitle(e.target.value)}
        />
        <TextField
          label="Author 1 Email"
          type="email"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          onChange={(e) => setEmail1(e.target.value)}
        />
        <TextField
          label="Author 2 Email"
          type="email"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          onChange={(e) => setEmail2(e.target.value)}
        />
        <TextField
          label="Supervisor Email"
          type="email"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          onChange={(e) => setEmail3(e.target.value)}
        />
      </Box>
      <input
        type="file"
        onChange={(e) => handleFileChange(e)}
        accept=".pdf"
        style={{ display: "none" }}
        id="fileInput"
      />
      <label htmlFor="fileInput">
        <Button
          variant="contained"
          component="span"
          color="primary"
          sx={{ mb: 2 }}
        >
          Select PDF File
        </Button>
      </label>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mb: 2 }}
      >
        Create Paper
      </Button>
      <Button variant="outlined" color="primary" href="/papers">
        List Papers
      </Button>
      <ToastContainer />
    </Box>
  );
};
