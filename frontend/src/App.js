import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from './components/UserTable';
import UserFormModal from './components/UserFormModal';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add or Edit user
  const handleAddOrEditUser = async (formData) => {
    console.log('Submitting:', formData); 

    try {
      if (editUser) {
        await axios.put(`http://localhost:5000/users/${editUser._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/users', formData);
      }

      fetchUsers();
      handleClose();
    } catch (err) {
      console.error('Error submitting form:', err.message);
      alert('Something went wrong. Check console for details.');
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err.message);
    }
  };

  // Close modal
  const handleClose = () => {
    setShowModal(false);
    setEditUser(null);
  };

  // Edit user handler
  const handleEdit = (user) => {
    setEditUser(user);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">User Management Dashboard</h1>
      <Button className="mb-3" onClick={() => setShowModal(true)}>Add User</Button>

      <UserFormModal
        show={showModal}
        handleClose={handleClose}
        handleSubmit={handleAddOrEditUser}
        editUser={editUser}
      />

      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;


