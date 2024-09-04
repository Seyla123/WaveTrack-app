import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Paper,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Hidden,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const ClassListPage = () => {
  const [posts, setPosts] = useState([]);
  const [menuClick, setMenuClick] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch Data
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

  //Navigate to create page
  const handleCreate = () => {
    navigate(`/class/create`);
  };

  //Click to View Detail
  const handleTitleClick = (postId) => {
    navigate(`/class/${postId}`);
  };

  //Click to Drop Menu Click
  const handleMenuClick = (event, postId) => {
    setMenuClick(event.currentTarget);
    setSelectedPostId(postId);
  };

  //Handle Menu Close
  const handleMenuClose = () => {
    setMenuClick(null);
    setSelectedPostId(null);
  };

  //navigate to Update Page
  const handleUpdate = () => {
    navigate(`/class/update/${selectedPostId}`, { state: { posts } });
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

  //Filter using for searching post even if lower or upper case
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Const Column for using with DataGrid
  const columns = [
    {
      field: "title",
      headerName: "Class ID",
      disableColumnMenu: true,
      sortable: false,
      resizable: false,
      width: 270,
      minWidth: 50,
      headerAlign: "center", 
      align: "center",
      renderCell: (params) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleTitleClick(params.row.id)}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "content",
      headerName: "Class Name",
      disableColumnMenu: true,
      sortable: false,
      resizable: false,
      width: 300,
      headerAlign: "center", 
      align: "center",
    },
    {
      field: "description",
      headerName: "Description",
      disableColumnMenu: true,
      sortable: false,
      resizable: false,
      width: 365,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Action",
      disableColumnMenu: true,
      sortable: false,
      resizable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box sx={{ boxShadow: "none" }}>
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
              Edit
            </MenuItem>
            <MenuItem onClick={() => handleDelete(params.row.id)}>
              Delete
            </MenuItem>
          </Menu>
        </Box>
      ),
      width: 195,
    },
  ];

  //Add Style

  const containerStyles = {
    width: "Auto",
    maxWidth: "lg",
    minWidth: "300px",
    margin: "0 auto",
    padding: "32px",
    alignItems: "end",
    flexWrap: "wrap",
    backgroundColor: "#F9FAFB",
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
    backgroundColor: "#FFFFFF",
  };

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Box sx={containerStyles}>
      <Typography sx={{ fontFamily: "Roboto", fontSize: "32px" }}>
        CLASS LISTS
      </Typography>
      <Box sx={flexBoxStyles}>
        <Typography sx={{ fontFamily: "Roboto", fontSize: "16px" }}>
          There are total classes
        </Typography>
        <Button
          onClick={handleCreate}
          sx={{ backgroundColor: "#1976d2", color: "#fff" }}
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
        <Hidden smDown>
          <Button sx={{ height: 56 }}>Search</Button>
        </Hidden>
      </Box>

      <Paper sx={tableContainerStyles}>
        <DataGrid
          rows={filteredPosts}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 15]}
          checkboxSelection
          sx={{ border: 0 }}
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
};

export default ClassListPage;
