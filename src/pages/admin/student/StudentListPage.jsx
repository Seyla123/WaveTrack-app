import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Paper,
  Checkbox,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const StudentListPage = () => {
  const [posts, setPosts] = useState([]);
  const [menuClick, setMenuClick] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
//Fetch Data
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/posts`);
        setPosts(response.data);
      } catch (err) {
        console.log(`Error fetching posts: ${err}`);
      }
    };

    fetchPosts();
  }, []);
//Handle click to create student
  const handleCreate = () => {
    navigate(`/student/create`);
  };
//Handle click to view detail
  const handleTitleClick = (postId) => {
    navigate(`/student/${postId}`);
  };
//Handle Menu Click
  const handleMenuClick = (event, postId) => {
    setMenuClick(event.currentTarget);
    setSelectedPostId(postId);
  };
//Handle menu Close
  const handleMenuClose = () => {
    setMenuClick(null);
    setSelectedPostId(null);
  };
//Haclde Update
  const handleUpdate = () => {
    navigate(`/student/update/${selectedPostId}`, { state: { posts } });
    handleMenuClose();
  };
//Handle Delete
  const handleDelete = async (selectedPostId) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/v1/posts/${selectedPostId}`
      );
      setPosts(posts.filter((post) => post.id !== selectedPostId));
      console.log(`Deleted post with id: ${selectedPostId}`);
    } catch (err) {
      console.log(`Error deleting post: ${err}`);
    }
    handleMenuClose();
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      field: "title",
      headerName: "ID",
      width: 270,
      minWidth: 50,
      headerAlign: "center", // Center align the header text
      align: "center",
      renderCell: (params) => (
        <span
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => handleTitleClick(params.row.id)}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "content",
      headerName: "Full Name",
      width: 300,
      headerAlign: "center", // Center align the header text
      align: "center",
    },
    {
      field: "description",
      headerName: "Gender",
      width: 365,
      headerAlign: "center", // Center align the header text
      align: "center",
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center", // Center align the header text
      align: "center",
      renderCell: (params) => (
        <div>
          <IconButton
            onMouseEnter={(event) => handleMenuClick(event, params.row.id)}
          >
            ...
          </IconButton>
          <Menu
            anchorEl={menuClick}
            open={Boolean(menuClick)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleUpdate(params.row.id)}>
              Update
            </MenuItem>
            <MenuItem onClick={() => handleDelete(params.row.id)}>
              Delete
            </MenuItem>
          </Menu>
        </div>
      ),
      width: 150,
    },
  ];

  //Add Style 

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

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Box sx={containerStyles}>
      <Typography sx={{ fontFamily: "Roboto", fontSize: "32px" }}>
        STUDENT LISTS
      </Typography>
      <Box sx={flexBoxStyles}>
        <Typography sx={{fontFamily:'Roboto',fontSize:'16px'}}>There are total students</Typography>
        <Button
          onClick={handleCreate}
          sx={{ backgroundColor: "#1976d2", color: "#fff"}}
        >
          ADD STUDENT
        </Button>
      </Box>
      <Box sx={inputBoxStyles}>
        <TextField
          label="Search Students..."
          variant="outlined"
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={textFieldStyles}
        />
        <Button sx={{ height: 56 }}>Search</Button>
      </Box>
      <Paper sx={tableContainerStyles}>
        <DataGrid
          rows={filteredPosts}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 15]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </Box>
  );
};

export default StudentListPage;
