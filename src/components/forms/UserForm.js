import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../Input';
import Button from '../Button';

const UserForm = ({ initialData, onSubmit, onCancel }) => {
  const formik = useFormik({
    initialValues: {
      company_id: initialData?.company_id || '',
      role: initialData?.role || 'employee',
      name: initialData?.name || '',
      email: initialData?.email || '',
      password: '',
      position: initialData?.position || '',
      department: initialData?.department || ''
    },
    validationSchema: Yup.object({
      company_id: Yup.number().required('Company is required'),
      role: Yup.string().required('Role is required'),
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: initialData ? Yup.string() : Yup.string().required('Password is required'),
      position: Yup.string(),
      department: Yup.string()
    }),
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <Input
        label="Company ID"
        name="company_id"
        type="number"
        value={formik.values.company_id}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.company_id && formik.errors.company_id}
        required
      />
      
      <Input
        label="Role"
        name="role"
        as="select"
        value={formik.values.role}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.role && formik.errors.role}
        required
      >
        <option value="super_admin">Super Admin</option>
        <option value="admin">Admin</option>
        <option value="employee">Employee</option>
      </Input>
      
      <Input
        label="Full Name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && formik.errors.name}
        required
      />
      
      <Input
        label="Email"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && formik.errors.email}
        required
      />
      
      <Input
        label={initialData ? 'New Password (leave blank to keep current)' : 'Password'}
        name="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && formik.errors.password}
        required={!initialData}
      />
      
      <Input
        label="Position"
        name="position"
        value={formik.values.position}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.position && formik.errors.position}
      />
      
      <Input
        label="Department"
        name="department"
        value={formik.values.department}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.department && formik.errors.department}
      />

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
        >
          {initialData ? 'Update User' : 'Create User'}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;