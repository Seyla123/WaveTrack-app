
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import {
  Table,
  TableCell,
  TableContainer,
  TableBody,
  TableRow,
  TableHead,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
 
} from "@mui/material";

function ClassDetailPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);; // Initialize as null

  //Fect Post and Comment
  
  useEffect(() => {
    const fetchPost = async (postId) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/posts/with-comments/${postId}`
        );
        setPost(response.data); // Set post as an object
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPost();
  }, [postId]);
  
  //Delete Comment
  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/comments/${commentId}`);
      setPost({...post, comments: post.comments.filter((c) => c.id!== commentId)});
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  }

    // If post is null, display a loading message
    if (!post) {
      return <Typography>Loading...</Typography>;
    }


  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h2" gutterBottom>
        {post.title} Class Detail
      </Typography>
      <hr />
      <Box sx={{ marginBottom: 4 }}>
        <Typography>Class Information </Typography>
        <br />
        <Typography variant="h4">Title: {post.title}</Typography>
        <br />
        <Typography variant="h5"> Content: {post.content}</Typography>
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
          <TableHead>
            <TableRow>
              <TableCell>Comment Detail</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              {post.comments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell>{comment.comment_body}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDelete(comment.id)}>Delete</Button>
                </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default ClassDetailPage;

