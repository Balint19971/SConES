import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    Typography,
  } from "@mui/material";
  import DeleteIcon from "@mui/icons-material/Delete";
  import AddIcon from "@mui/icons-material/Add";
  import useDeletePaper from "../../utils/functions/list-papers/useDeletePaper";
import useFetchMyPapers from "../../utils/functions/list-papers/useFetchMyPapers";
import { useAuth } from "../../utils/hooks/useAuth";
  
  export const MyPapers = () => {
    const userName = useAuth().userName;
    const { papers, isLoading, error: fetchError } = useFetchMyPapers(userName);
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
      <Box display="flex" justifyContent="center" mt={4}>
        <Box width="300px">
          {papers.map((paper, i) => (
            <Card
              key={i}
              sx={{ mb: 2, cursor: "pointer", border: "1px solid #ddd" }}
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
          ))}
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            href="/paper-create"
          >
            Add New Paper
          </Button>
        </Box>
      </Box>
    );
  };
  