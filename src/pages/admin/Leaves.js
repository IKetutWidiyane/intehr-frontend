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
        <div className="flex space-x-2">
          {row.status === 'pending' && (
            <>
              <button
                onClick={() => handleApprove(id)}
                className="text-success hover:text-success/80"
                title="Approve"
              >
                <FiCheck />
              </button>
              <button
                onClick={() => handleReject(id)}
                className="text-danger hover:text-danger/80"
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
            className="text-muted hover:text-ink dark:text-muted-dark dark:hover:text-ink-dark"
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
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink dark:text-ink-dark">
            Leaves
          </h1>
          <p className="mt-1 text-sm text-muted dark:text-muted-dark">
            Review and approve leave requests.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-accent focus:ring-1 focus:ring-accent/30 dark:border-line-dark dark:bg-surface-dark dark:text-ink-dark"
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