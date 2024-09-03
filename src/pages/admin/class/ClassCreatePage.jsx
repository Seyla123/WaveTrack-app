import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TextField, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, colors, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const ClassCreatePage= () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

//Create Class
    const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3003/api/v1/posts', newPost);
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
    // margin: "0 auto",
    padding: "32px",
    alignItems: "end",
    flexWrap: "wrap",
  };
  return (
    <Container sx={containerStyles}>
        <Typography sx={{fontFamily:"Roboto", fontSize:"32px"}}>CLASS ADD</Typography>
        <Typography sx={{fontFamily:"Roboto",fontSize:'16px',marginBottom:'24px'}}>Please fill in the Information about the Class</Typography>

      {/* Input Form*/}
      <Box component="form" onSubmit={handleCreate} >
        <Typography>Class Information</Typography>
        <hr />
        <TextField
          label="Class Name"
          variant="outlined" 
          value={newPost.title}
          onChange={(event) => setNewPost({ ...newPost, title: event.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          variant="outlined" 
          value={newPost.content}
          onChange={(event) => setNewPost({ ...newPost, content: event.target.value })}
          fullWidth
          margin="normal"
          multiline
          required
          rows={4}
        />
        <Box sx={{ display: 'flex', justifyContent: 'right', gap:8, alignItems: 'center', marginBottom: '8px' }}>
            <Button onClick={handleCancel} variant="contained">Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
            Add Class
            </Button>
        </Box>
        
      </Box>
    </Container>
  );
};

export default ClassCreatePage;
