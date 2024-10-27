import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import useDeletePaper from "../../utils/functions/list-papers/useDeletePaper";
import useFetchPapers from "../../utils/functions/list-papers/useFetchPapers";

export const PaperListPage = () => {
  const { papers, isLoading, error: fetchError } = useFetchPapers();
  const {
    handleDeletePaper,
    deletedPaperId,
    error: deleteError,
  } = useDeletePaper();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (fetchError || deleteError) {
    return (
      <div>
        {fetchError && <p>{fetchError}</p>}
        {deleteError && <p>{deleteError}</p>}
      </div>
    );
  }

  return (
    <Grid container spacing={2} justifyContent="center" mt={4}>
      {papers.map((paper, i) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
          <Card
            sx={{ height: "100%", cursor: "pointer", border: "1px solid #ddd" }}
            onClick={() => (window.location.href = `/paper/${paper.paperId}`)}
          >
            <CardContent>
              <Typography variant="h6">{paper.title}</Typography>
              <Typography variant="body2">ID: {paper.paperId}</Typography>
              <Typography variant="body2">
                Author: {paper.authorsName}
              </Typography>
              <Typography variant="body2">
                Supervisor: {paper.supervisorsName}
              </Typography>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeletePaper(paper.paperId);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            href="/paper-create"
          >
            Add New Paper
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
