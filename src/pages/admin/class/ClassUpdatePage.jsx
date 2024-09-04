

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from'react-router-dom';

const ClassUpdatePage = () => {
  const navigate = useNavigate ();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    title:"",
    content:""
  });
  const [editId, setEditId] = useState(null);


  const updateUser = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/v1/posts/${editId}`,
        formData
      );
      const updatedUsers = users.map((user) =>
        user.id === editId ? response.data : user
      );
      setUsers(updatedUsers);
      setFormData({title:"",
        content:""  });
      setEditId(null);
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  const handleSubmit = (e) => {
    navigate(`/class`)
    e.preventDefault();
    if (editId) {
      updateUser();
    } else {
      createUser();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleEdit = (user) => {
    setFormData({
      title: user.title,
      content: user.content,
    });
    setEditId(user.id);
  };

  return (
    <div>
      <h1>User Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Class Name"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="content"
          placeholder="Description"
          value={formData.content}
          onChange={handleInputChange}
          required
        />

        <button type="submit">{editId ? 'Update' : 'Create'}</button>
      </form>
      <ul>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              <div>
                <strong>Name:</strong> {user.title}
                <br />
                <strong>Email:</strong> {user.content}
                <br />
                <br />
              </div>
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No users found</li>
        )}
      </ul>
    </div>
  );
};

export default ClassUpdatePage;