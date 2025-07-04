import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import RoleRoute from './components/RoleRoute';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Companies from './pages/superadmin/Companies';
import Users from './pages/superadmin/Users';
import Employees from './pages/admin/Employees';
import Salaries from './pages/admin/Salaries';
import Leaves from './pages/admin/Leaves';
import MySalaries from './pages/employee/MySalaries';
import MyLeaves from './pages/employee/MyLeaves';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          
          <Route element={<RoleRoute allowedRoles={['super_admin']} />}>
            <Route path="/companies" element={<Companies />} />
            <Route path="/users" element={<Users />} />
          </Route>

          <Route element={<RoleRoute allowedRoles={['admin']} />}>
            <Route path="/employees" element={<Employees />} />
            <Route path="/salaries" element={<Salaries />} />
            <Route path="/leaves" element={<Leaves />} />
          </Route>

          <Route element={<RoleRoute allowedRoles={['employee']} />}>
            <Route path="/my-salaries" element={<MySalaries />} />
            <Route path="/my-leaves" element={<MyLeaves />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
