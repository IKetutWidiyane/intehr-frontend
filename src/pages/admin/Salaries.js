import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Table, Button, Modal } from '../../components';
import SalaryForm from '../../components/forms/SalaryForm';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { FiDownload, FiPrinter } from 'react-icons/fi';

const Salaries = () => {
  const { user } = useAuth();
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSalary, setCurrentSalary] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    fetchSalaries();
  }, []);

  const fetchSalaries = async () => {
    try {
      setLoading(true);
      const response = await api.get('/salaries');
      setSalaries(response.data);
    } catch (err) {
      toast.error('Failed to fetch salaries');
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePayslips = async () => {
    if (!selectedMonth) {
      toast.error('Please select a month first');
      return;
    }
    
    try {
      const response = await api.get(`/salaries/generate-payslips?month=${selectedMonth}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `payslips_${selectedMonth}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success('Payslips generated successfully');
    } catch (err) {
      toast.error('Failed to generate payslips');
    }
  };

  const columns = [
    { header: 'Employee', accessor: 'Employee.User.name' },
    { header: 'Payment Date', accessor: 'payment_date', render: (date) => new Date(date).toLocaleDateString() },
    { header: 'Basic Salary', accessor: 'basic_salary', render: (amount) => `Rp ${amount.toLocaleString('id-ID')}` },
    { header: 'Allowance', accessor: 'allowance', render: (amount) => `Rp ${amount.toLocaleString('id-ID')}` },
    { header: 'Bonus', accessor: 'bonus', render: (amount) => `Rp ${amount.toLocaleString('id-ID')}` },
    { header: 'Tax', accessor: 'tax', render: (amount) => `Rp ${amount.toLocaleString('id-ID')}` },
    { header: 'Status', accessor: 'status' },
    {
      header: 'Actions',
      accessor: 'id',
      render: (id, row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setCurrentSalary(row);
              setIsModalOpen(true);
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(id)}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this salary record?')) {
      try {
        await api.delete(`/salaries/${id}`);
        toast.success('Salary record deleted successfully');
        fetchSalaries();
      } catch (err) {
        toast.error('Failed to delete salary record');
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (currentSalary) {
        await api.put(`/salaries/${currentSalary.id}`, formData);
        toast.success('Salary updated successfully');
      } else {
        await api.post('/salaries', formData);
        toast.success('Salary created successfully');
      }
      setIsModalOpen(false);
      setCurrentSalary(null);
      fetchSalaries();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Salary Management</h1>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border rounded px-2 py-1"
            />
            <Button
              onClick={handleGeneratePayslips}
              variant="secondary"
              className="flex items-center"
            >
              <FiDownload className="mr-2" />
              Generate Payslips
            </Button>
          </div>
          <Button
            onClick={() => {
              setCurrentSalary(null);
              setIsModalOpen(true);
            }}
          >
            Add Salary Record
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        data={salaries}
        loading={loading}
        emptyMessage="No salary records found"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentSalary(null);
        }}
        title={currentSalary ? 'Edit Salary Record' : 'Add New Salary Record'}
      >
        <SalaryForm
          initialData={currentSalary}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setCurrentSalary(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default Salaries;