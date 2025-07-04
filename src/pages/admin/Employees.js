import React from 'react';
import { Table, Button, Modal } from '../../components';
import EmployeeForm from '../../components/forms/EmployeeForm';
import api from '../../services/api';
import { toast } from 'react-toastify';

const Employees = () => {
  const [employees, setEmployees] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentEmployee, setCurrentEmployee] = React.useState(null);

  React.useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await api.get('/employees');
      setEmployees(response.data);
    } catch (err) {
      toast.error('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: 'Name', accessor: 'User.name' },
    { header: 'Email', accessor: 'User.email' },
    { header: 'Position', accessor: 'User.position' },
    { header: 'NIK', accessor: 'nik' },
    { header: 'Gender', accessor: 'gender' },
    { header: 'Phone', accessor: 'phone' },
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

  const handleEdit = (employee) => {
    setCurrentEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await api.delete(`/employees/${id}`);
        toast.success('Employee deleted successfully');
        fetchEmployees();
      } catch (err) {
        toast.error('Failed to delete employee');
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (currentEmployee) {
        // 🟢 Pisahkan data user dan employee
        const employeePayload = {
          nik: formData.nik,
          gender: formData.gender,
          birth_date: formData.birth_date,
          address: formData.address,
          phone: formData.phone,
          emergency_contact: formData.emergency_contact,
          emergency_phone: formData.emergency_phone
        };
  
        // 🔁 Update employee
        await api.put(`/employees/${currentEmployee.id}`, employeePayload);
        toast.success('Employee updated successfully');
  
        // (opsional) Tambahkan endpoint update user jika kamu mau update juga data user-nya
      } else {
        // 🟢 Buat employee + user sekaligus
        await api.post('/employees/full', formData);
        toast.success('Employee created successfully');
      }
  
      setIsModalOpen(false);
      setCurrentEmployee(null);
      fetchEmployees();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };
  

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employees Management</h1>
        <Button
          onClick={() => {
            setCurrentEmployee(null);
            setIsModalOpen(true);
          }}
        >
          Add Employee
        </Button>
      </div>

      <Table columns={columns} data={employees} loading={loading} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentEmployee(null);
        }}
        title={currentEmployee ? 'Edit Employee' : 'Add New Employee'}
      >
        <EmployeeForm
          initialData={currentEmployee}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setCurrentEmployee(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default Employees;
