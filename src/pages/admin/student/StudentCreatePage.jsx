import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  colors,
  Container,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const StudentCreatePage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  //Create Class
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/posts",
        newPost
      );
      setPosts([...posts, response.data]);
      setNewPost({ title: "", content: "" });
    } catch (err) {
      console.log(`Error creating post: ${err}`);
    }
  };

  // Click t Cancel
  const handleCancel = () => {
    navigate(`/class`);
  };

  const containerStyles = {
    width: "Auto",
    maxWidth: "1139px",
    minWidth: "300px",
    margin: "0 auto",
    padding: "32px",
    flexWrap: "wrap",
  };
  return (
    <Container sx={containerStyles}>
      <Typography sx={{ fontFamily: "Roboto", fontSize: "32px" }}>
        ADD NEW STUDENT
      </Typography>
      <Typography
        sx={{ fontFamily: "Roboto", fontSize: "16px", marginBottom: "24px" }}
      >
        Please fill in the Information about student
      </Typography>

      {/* Input Form*/}
      <Box
        component="form"
        onSubmit={handleCreate}
        sx={{ backgroundColor: "beige", padding: "32px", borderRadius: "4px" }}
      >
        <Typography>Student Information</Typography>
        <hr />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
            gap: "10px",
          }}
        >
          <TextField
            label="First Name"
            variant="outlined"
            value={newPost.title}
            onChange={(event) =>
              setNewPost({ ...newPost, title: event.target.value })
            }
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="LastName"
            variant="outlined"
            value={newPost.content}
            onChange={(event) =>
              setNewPost({ ...newPost, content: event.target.value })
            }
            fullWidth
            margin="normal"
            required
            rows={4}
          />
        </Box>
        <TextField
          label="Class"
          variant="outlined"
          value={newPost.content}
          onChange={(event) =>
            setNewPost({ ...newPost, content: event.target.value })
          }
          fullWidth
          margin="normal"
          //   select
          required
          rows={4}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
            gap: "10px",
          }}
        >
          <TextField
            label="Gender"
            variant="outlined"
            value={newPost.content}
            onChange={(event) =>
              setNewPost({ ...newPost, content: event.target.value })
            }
            fullWidth
            margin="normal"
            required
            // select
            rows={4}
          />
          <TextField
            label="Date of Birth"
            variant="outlined"
            value={newPost.content}
            onChange={(event) =>
              setNewPost({ ...newPost, content: event.target.value })
            }
            fullWidth
            margin="normal"
            required
            rows={4}
          />
        </Box>
        <TextField
          label="Phone Number"
          variant="outlined"
          value={newPost.content}
          onChange={(event) =>
            setNewPost({ ...newPost, content: event.target.value })
          }
          fullWidth
          margin="normal"
          required
          rows={4}
        />
        <TextField
          label="Email"
          variant="outlined"
          value={newPost.content}
          onChange={(event) =>
            setNewPost({ ...newPost, content: event.target.value })
          }
          fullWidth
          margin="normal"
          required
          rows={4}
        />
        <TextField
          label="Address"
          variant="outlined"
          value={newPost.content}
          onChange={(event) =>
            setNewPost({ ...newPost, content: event.target.value })
          }
          fullWidth
          margin="normal"
          multiline
          required
          rows={4}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            gap: 4,
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <Button
            onClick={handleCancel}
            variant="contained"
            sx={{ backgroundColor: "white", color: "black" }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default StudentCreatePage;
