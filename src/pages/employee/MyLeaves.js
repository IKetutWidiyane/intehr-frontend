import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Table, Button, Modal } from '../../components';
import LeaveForm from '../../components/forms/LeaveForm';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { FiCalendar, FiPlus } from 'react-icons/fi';

const MyLeaves = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLeave, setCurrentLeave] = useState(null);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const response = await api.get('/leaves/my-leaves');
      setLeaves(response.data);
    } catch (err) {
      toast.error('Failed to fetch your leave requests');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
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
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
          status === 'approved' ? 'bg-success/10 text-success' :
          status === 'rejected' ? 'bg-danger/10 text-danger' :
          'bg-warning/10 text-warning'
        }`}>
          {status}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (id, row) => (
        <button
          onClick={() => {
            setCurrentLeave(row);
            setIsModalOpen(true);
          }}
          className="text-muted hover:text-ink dark:text-muted-dark dark:hover:text-ink-dark"
        >
          View
        </button>
      )
    }
  ];

  const handleSubmit = async (formData) => {
    try {
      if (currentLeave) {
        await api.put(`/leaves/${currentLeave.id}`, formData);
        toast.success('Leave request updated successfully');
      } else {
        await api.post('/leaves', formData);
        toast.success('Leave request submitted successfully');
      }
      setIsModalOpen(false);
      setCurrentLeave(null);
      fetchLeaves();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleCancelLeave = async (id) => {
    if (window.confirm('Are you sure you want to cancel this leave request?')) {
      try {
        await api.delete(`/leaves/${id}`);
        toast.success('Leave request cancelled successfully');
        fetchLeaves();
      } catch (err) {
        toast.error('Failed to cancel leave request');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink dark:text-ink-dark">
            My Leave Requests
          </h1>
          <p className="mt-1 text-sm text-muted dark:text-muted-dark">
            Track and submit your time off.
          </p>
        </div>
        <Button
          onClick={() => {
            setCurrentLeave(null);
            setIsModalOpen(true);
          }}
        >
          <FiPlus className="mr-2" />
          New Leave Request
        </Button>
      </div>

      <Table
        columns={columns}
        data={leaves}
        loading={loading}
        emptyMessage="You haven't submitted any leave requests yet"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentLeave(null);
        }}
        title={currentLeave ? 'Leave Request Details' : 'New Leave Request'}
        size="lg"
      >
        <LeaveForm
          initialData={currentLeave}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setCurrentLeave(null);
          }}
          onDelete={currentLeave?.status === 'pending' ? 
            () => handleCancelLeave(currentLeave.id) : null
          }
          readOnly={!!currentLeave}
        />
      </Modal>
    </div>
  );
};

export default MyLeaves;