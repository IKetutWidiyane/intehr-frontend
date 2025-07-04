import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Table, Button, Modal } from '../../components';
import UserForm from '../../components/forms/UserForm';
import api from '../../services/api';
import { toast } from 'react-toastify';

const Users = () => {
  const { user } = useAuth();
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (err) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' },
    { header: 'Position', accessor: 'position' },
    {
      header: 'Actions',
      accessor: 'id',
      render: (id, row) => (
        <div className="flex space-x-2">
          <button onClick={() => handleEdit(row)} className="text-blue-600">
            Edit
          </button>
          <button onClick={() => handleDelete(id)} className="text-red-600">
            Delete
          </button>
        </div>
      )
    }
  ];

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/users/${id}`);
        toast.success('User deleted successfully');
        fetchUsers();
      } catch (err) {
        toast.error('Failed to delete user');
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (currentUser) {
        await api.put(`/users/${currentUser.id}`, formData);
        toast.success('User updated successfully');
      } else {
        await api.post('/users', formData);
        toast.success('User created successfully');
      }
      setIsModalOpen(false);
      setCurrentUser(null);
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <Button onClick={() => {
          setCurrentUser(null);
          setIsModalOpen(true);
        }}>
          Add User
        </Button>
      </div>

      <Table columns={columns} data={users} loading={loading} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentUser(null);
        }}
        title={currentUser ? 'Edit User' : 'Add New User'}
      >
        <UserForm
          initialData={currentUser}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setCurrentUser(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default Users;