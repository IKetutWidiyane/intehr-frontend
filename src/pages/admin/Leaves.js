import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Table, Button, Modal } from '../../components';
import LeaveForm from '../../components/forms/LeaveForm';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { FiCalendar, FiCheck, FiX } from 'react-icons/fi';

const Leaves = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLeave, setCurrentLeave] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchLeaves();
  }, [filterStatus]);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const url = filterStatus === 'all' ? '/leaves' : `/leaves?status=${filterStatus}`;
      const response = await api.get(url);
      setLeaves(response.data);
    } catch (err) {
      toast.error('Failed to fetch leave requests');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: 'Employee', accessor: 'Employee.User.name' },
    { header: 'Type', accessor: 'type' },
    { 
      header: 'Date', 
      accessor: 'id',
      render: (id, row) => (
        `${new Date(row.start_date).toLocaleDateString()} - ${new Date(row.end_date).toLocaleDateString()}`
      )
    },
    { header: 'Duration', accessor: 'id', render: (id, row) => {
      const start = new Date(row.start_date);
      const end = new Date(row.end_date);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
    }},
    { header: 'Reason', accessor: 'reason', truncate: true },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === 'approved' ? 'bg-green-100 text-green-800' :
          status === 'rejected' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {status}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (id, row) => (
        <div className="flex space-x-2">
          {row.status === 'pending' && (
            <>
              <button
                onClick={() => handleApprove(id)}
                className="text-green-600 hover:text-green-800"
                title="Approve"
              >
                <FiCheck />
              </button>
              <button
                onClick={() => handleReject(id)}
                className="text-red-600 hover:text-red-800"
                title="Reject"
              >
                <FiX />
              </button>
            </>
          )}
          <button
            onClick={() => {
              setCurrentLeave(row);
              setIsModalOpen(true);
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            View
          </button>
        </div>
      )
    }
  ];

  const handleApprove = async (id) => {
    try {
      await api.put(`/leaves/${id}/status`, { status: 'approved' });
      toast.success('Leave request approved');
      fetchLeaves();
    } catch (err) {
      toast.error('Failed to approve leave request');
    }
  };

  const handleReject = async (id) => {
    try {
      await api.put(`/leaves/${id}/status`, { status: 'rejected' });
      toast.success('Leave request rejected');
      fetchLeaves();
    } catch (err) {
      toast.error('Failed to reject leave request');
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (currentLeave) {
        await api.put(`/leaves/${currentLeave.id}`, formData);
        toast.success('Leave request updated successfully');
      } else {
        await api.post('/leaves', formData);
        toast.success('Leave request created successfully');
      }
      setIsModalOpen(false);
      setCurrentLeave(null);
      fetchLeaves();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Leave Management</h1>
        <div className="flex items-center space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <Button
            onClick={() => {
              setCurrentLeave(null);
              setIsModalOpen(true);
            }}
          >
            <FiCalendar className="mr-2" />
            Add Leave Request
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        data={leaves}
        loading={loading}
        emptyMessage="No leave requests found"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentLeave(null);
        }}
        title={currentLeave ? 'Leave Request Details' : 'Create New Leave Request'}
        size="lg"
      >
        <LeaveForm
          initialData={currentLeave}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setCurrentLeave(null);
          }}
          readOnly={!!currentLeave}
        />
      </Modal>
    </div>
  );
};

export default Leaves;