import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Table } from '../../components';
import api from '../../services/api';

const MySalaries = () => {
  const { user } = useAuth();
  const [salaries, setSalaries] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchSalaries();
  }, []);

  const fetchSalaries = async () => {
    try {
      setLoading(true);
      const response = await api.get('/salaries');
      setSalaries(response.data);
    } catch (err) {
      console.error('Failed to fetch salaries', err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: 'Month', accessor: 'payment_date', render: (date) => new Date(date).toLocaleDateString() },
    { header: 'Basic Salary', accessor: 'basic_salary', render: (amount) => `Rp ${amount.toLocaleString()}` },
    { header: 'Allowance', accessor: 'allowance', render: (amount) => `Rp ${amount.toLocaleString()}` },
    { header: 'Bonus', accessor: 'bonus', render: (amount) => `Rp ${amount.toLocaleString()}` },
    { header: 'Tax', accessor: 'tax', render: (amount) => `Rp ${amount.toLocaleString()}` },
    { header: 'Status', accessor: 'status' }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Salary History</h1>
      <Table 
        columns={columns} 
        data={salaries} 
        loading={loading}
        emptyMessage="No salary records found"
      />
    </div>
  );
};

export default MySalaries;