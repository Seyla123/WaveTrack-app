import React, { useEffect, useState } from "react";
import axios from "axios";
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
  Checkbox,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ClassListPage = () => {
  const [posts, setPosts] = useState([]);
  const [menuClick, setMenuClick] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const navigate = useNavigate();

  //fetch data
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/api/v1/posts`);
        setPosts(response.data);
      } catch (err) {
        console.log(`Error fetching posts: ${err}`);
      }
    };

    fetchPosts();
  }, []);

  // Click to navigate to create new class

  const handleCreate = () => {
    navigate(`/class/create`);
  };
  // Click to View  Class Detail Page
  const handleTitleClick = (postId) => {
    navigate(`/class/${postId}`);
  };

  // Click to show menu Edit or Delete
  const handleMenuClick = (event, postId) => {
    setMenuClick(event.currentTarget);
    setSelectedPostId(postId);
  };
  // Click to close menu
  const handleMenuClose = () => {
    setMenuClick(null);
    setSelectedPostId(null);
  };

  // Click to Edit page
  const handleUpdate = () => {
    navigate(`/class/update/${selectedPostId}`, { state: { posts } });
    handleMenuClose();
  };

  //Click to delete not yet done
  const handleDelete = async (selectedPostId) => {
    try {
      await axios.delete(
        `http://localhost:3003/api/v1/posts/${selectedPostId}`
      );
      setPosts(posts.filter((post) => post.id !== selectedPostId));
      console.log(`Deleted post with id: ${selectedPostId}`);
    } catch (err) {
      console.log(`Error deleting post: ${err}`);
    }
    handleMenuClose();
  };

  //for searching filter

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add Style

  const containerStyles = {
    width: "Auto",
    maxWidth: "1139px",
    minWidth: "300px",
    margin: "0 auto",
    padding: "32px",
    alignItems: "end",
    flexWrap: "wrap",
  };

  const flexBoxStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    flexWrap: "wrap",
  };

  const inputBoxStyles = {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "16px",
  };

  const textFieldStyles = {
    flex: "200px",
    width: "75%",
    minWidth: "300px",
  };

  const tableContainerStyles = {
    width: "100%",
    overflowX: "auto",
  };
  const buttonStyles = {
    backgroundColor: "#1976d2",
    color: "#fff",
    padding: "8px 16px",
    cursor: "pointer",
    marginTop: "8px",
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "red",
    },
  }


  // Component
  return (
    <Box sx={containerStyles}>
      <h1>CLASS LISTS</h1>

      <Box sx={flexBoxStyles}>
        <h4>There are total classes</h4>
        <Button
          onClick={handleCreate}
          sx={buttonStyles}
        >
          ADD CLASS
        </Button>
      </Box>

      <Box sx={inputBoxStyles}>
        <TextField
          label="Search Classes"
          variant="outlined"
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={textFieldStyles}
        />
        <Button sx={{ height: 56 }}>Search</Button>
      </Box>

      <TableContainer component={Paper} sx={tableContainerStyles}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>Class ID</TableCell>
              <TableCell>Class Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPosts.map((post, index) => (
              <TableRow key={post.id || index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell
                  onClick={() => handleTitleClick(post.id)}
                  sx={{ cursor: "pointer", color: "blue" }}
                >
                  {post.title}
                </TableCell>
                <TableCell>{post.content}</TableCell>
                <TableCell>{post.content}</TableCell>
                <TableCell>
                  <IconButton
                    onMouseEnter={(event) => handleMenuClick(event, post.id)}
                  >
                    ...
                  </IconButton>
                  <Menu
                    anchorEl={menuClick}
                    open={Boolean(menuClick)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => handleUpdate(post.id)}>
                      Update
                    </MenuItem>
                    <MenuItem onClick={() => handleDelete(post.id)}>
                      Delete
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ClassListPage;
