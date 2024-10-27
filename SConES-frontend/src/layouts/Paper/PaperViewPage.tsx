import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper as MuiPaper,
  Link,
} from "@mui/material";
import useUpdatePaperTitle from "../../utils/functions/view-paper/useUpdatePaperTitle";
import useUpdatePaperGrade from "../../utils/functions/view-paper/supervisorUpdatePaperGrade";
import { useAuth } from "../../utils/hooks/useAuth";
import useUpdatePaperApprove from "../../utils/functions/view-paper/useUpdatePaperAprove";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import useFetchPaper from "../../utils/functions/view-paper/useFetchPaper";

export const PaperViewPage = ({ userRole }: any) => {
  const [title, setTitle] = useState("");
  const [grade, setGrade] = useState("");
  const { id } = useParams();
  const { paper } = useFetchPaper(id || "");
  const [isMyPaper, setIsMyPaper] = useState<boolean>(false);
  const { userName } = useAuth();
  const {
    handleUpdateTitle,
    isLoading: updateLoading,
    error: updateError,
    updateTitleVisible,
    setUpdateTitleVisible,
  } = useUpdatePaperTitle(id || "");

  const { handleApprovePaper, isLoading: approveLoading, error: approveError } = useUpdatePaperApprove(id || "");

  useEffect (() => {
    if (paper && userName) {
      if (paper.supervisorsName.includes(userName)) {
        setIsMyPaper(true);
      } else {
        setIsMyPaper(false);
      }
    }
  }, [paper, userName]);

  const { handleUpdateGrade, updateGradeVisible, setUpgradeGradeStateVisible } =
    useUpdatePaperGrade(id || "");

  const handleUpdateTitleVisibility = () => {
    if (updateTitleVisible) {
      setUpdateTitleVisible(false);
    } else {
      setUpdateTitleVisible(true);
    }
  };

  const handleUpdateGradeVisibility = () => {
    if (updateGradeVisible) {
      setUpgradeGradeStateVisible(false);
    } else {
      setUpgradeGradeStateVisible(true);
    }
  };

  if (!paper) {
    return <div>Paper not found</div>;
  }

  const handleTitleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTitle(event.target.value);
  };

  const handleGradeInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGrade(event.target.value);
  };

  return (
    <Box p={2}>
      <MuiPaper elevation={3} sx={{ p: 2 }}>
        <Typography variant="body1">Id: {paper?.paperId}</Typography>
        <Typography variant="body1">Title: {paper?.title}</Typography>
        <Typography variant="body1">Authors: {paper?.authorsName}</Typography>
        <Typography variant="body1">
          Supervisors: {paper?.supervisorsName}
        </Typography>
        <Link
          href={paper?.pdfUrl}
          target="_blank"
          rel="noopener"
          underline="hover"
          sx={{ display: "block", mt: 2, cursor: "pointer" }}
        >
          View Paper
        </Link>
        {userRole === "AUTHOR" && (
          <Button
            variant="outlined"
            color="primary"
            onClick={handleUpdateTitleVisibility}
            sx={{ mt: 2 }}
          >
            Update Title
          </Button>
        )}
        {userRole === "SUPERVISOR" && isMyPaper && (
          <>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleUpdateGradeVisibility}
              sx={{ mt: 2, ml: 2 }}
            >
              Add Grade
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleApprovePaper}
              sx={{ mt: 2, ml: 2 }}
            >
              Aprove this Paper
            </Button>
          </>
        )}
      </MuiPaper>
      {updateTitleVisible && userRole === "AUTHOR" && (
        <Box mt={2}>
          <TextField
            label="New Title"
            variant="outlined"
            fullWidth
            onChange={handleTitleInputChange}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleUpdateTitle(title)}
          >
            Change Title
          </Button>
        </Box>
      )}
      {updateGradeVisible && userRole === "SUPERVISOR" && (
        <Box mt={2}>
          <TextField
            label="Grade"
            variant="outlined"
            fullWidth
            onChange={handleGradeInputChange}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleUpdateGrade(grade)}
          >
            Grade Paper!
          </Button>
        </Box>
      )}
      <ToastContainer />
    </Box>
  );
};
