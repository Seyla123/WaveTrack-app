


import React, { useState } from "react";
import axios from "axios";

import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ClassCreatePage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [error, setError] = useState("");

  // Create Class
  const handleCreate = async (e) => {
    e.preventDefault();

    // Validate form

    if (!newPost.title ) {
      setError("Class Name fields are required."); 
      return;
    }
    if( !newPost.content){
      setError("Description fields are required."); 
      return;
    }
    if (!newPost.title || !newPost.content){
      setError("All fields are required."); 
      return;
    }
    
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/posts",
        newPost
      );
      setPosts([...posts, response.data]);
      setNewPost({ title: "", content: "" });
      setError(""); 
    } catch (err) {

      setError("An error occurred while creating the class."); 
    }
  };

  // Click to Cancel
  const handleCancel = () => {
    navigate(`/class`);
  };

  const containerStyles = {
    width: "Auto",
    maxWidth: "lg",
    minWidth: "300px",
    margin: "0 auto",
    padding: "32px",
    flexWrap: "wrap",
    backgroundColor: "#F9FAFB"
  };

  return (
    <Container sx={containerStyles}>
      <Typography sx={{ fontFamily: "Roboto", fontSize: "32px" }}>
        CLASS ADD
      </Typography>
      <Typography
        sx={{ fontFamily: "Roboto", fontSize: "16px", marginBottom: "24px" }}
      >
        Please fill in the Information about the Class
      </Typography>

      {/* Input Form */}
      <Box
        component="form"
        onSubmit={handleCreate}
        sx={{ backgroundColor: "#ffffff", padding: "32px", borderRadius: "4px" }}
      >
        {error && (
          <Alert severity="error" sx={{ marginBottom: "16px" }}>
            {error}
          </Alert>
        )}
        <Typography sx={{ backgroundColor: "#ffffff", marginBottom:'18px',fontWeight: 600 }}>Class Information</Typography>
        <hr />
        <Box>
        <Typography sx={{fontSize:'16px',marginTop:'16px'}}> Class Name</Typography>
        <TextField
          label="Class Name"
          variant="outlined"
          value={newPost.title}
          onChange={(event) =>
            setNewPost({ ...newPost, title: event.target.value })
          }
          fullWidth
          margin="normal"
          // required
        />
        </Box>
        <Box>
        <Typography sx={{fontSize:'16px',marginTop:'16px'}}>Description</Typography>
        <TextField
          label="Description"
          variant="outlined"
          value={newPost.content}
          onChange={(event) =>
            setNewPost({ ...newPost, content: event.target.value })
          }
          fullWidth
          margin="normal"
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: '#ffffff', // Replace with your desired color
            },
          }}
          multiline
          // required
          rows={4}
        />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            gap: 4,
            alignItems: "center",
            marginBottom: "8px",
            backgroundColor: "#ffffff"
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
            Add Class
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ClassCreatePage;


