import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../Input';
import Button from '../Button';

const EmployeeForm = ({ initialData, onSubmit, onCancel }) => {
  const isEdit = Boolean(initialData);

  const formik = useFormik({
    initialValues: isEdit
      ? {
          position: initialData?.User?.position || '',
          department: initialData?.User?.department || ''
        }
      : {
          // Full input for create
          name: '',
          email: '',
          password: '',
          position: '',
          department: '',
          nik: '',
          gender: 'male',
          birth_date: '',
          address: '',
          phone: '',
          emergency_contact: '',
          emergency_phone: ''
        },
    validationSchema: Yup.object(
      isEdit
        ? {
            position: Yup.string().required('Position is required'),
            department: Yup.string().required('Department is required')
          }
        : {
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string().required('Password is required'),
            position: Yup.string().required('Position is required'),
            department: Yup.string().required('Department is required'),
            nik: Yup.string().required('NIK is required'),
            gender: Yup.string().required('Gender is required'),
            birth_date: Yup.date().required('Birth date is required'),
            address: Yup.string().required('Address is required'),
            phone: Yup.string().required('Phone is required'),
            emergency_contact: Yup.string().required('Emergency contact is required'),
            emergency_phone: Yup.string().required('Emergency phone is required')
          }
    ),
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
        {isEdit ? 'Update Position & Department' : 'Create New Employee'}
      </h2>

      {/* ONLY CREATE MODE */}
      {!isEdit && (
        <>
          <Input label="Full Name" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.name && formik.errors.name} required />
          <Input label="Email" name="email" type="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.email && formik.errors.email} required />
          <Input label="Password" name="password" type="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.password && formik.errors.password} required />
        </>
      )}

      <Input label="Position" name="position" value={formik.values.position} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.position && formik.errors.position} required />
      <Input label="Department" name="department" value={formik.values.department} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.department && formik.errors.department} required />

      {/* ONLY CREATE MODE */}
      {!isEdit && (
        <>
          <Input label="NIK" name="nik" value={formik.values.nik} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.nik && formik.errors.nik} required />
          <Input label="Gender" name="gender" as="select" value={formik.values.gender} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.gender && formik.errors.gender} required>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Input>
          <Input label="Birth Date" name="birth_date" type="date" value={formik.values.birth_date} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.birth_date && formik.errors.birth_date} required />
          <Input label="Address" name="address" as="textarea" rows={3} value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.address && formik.errors.address} required />
          <Input label="Phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.phone && formik.errors.phone} required />
          <Input label="Emergency Contact" name="emergency_contact" value={formik.values.emergency_contact} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.emergency_contact && formik.errors.emergency_contact} required />
          <Input label="Emergency Phone" name="emergency_phone" value={formik.values.emergency_phone} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.emergency_phone && formik.errors.emergency_phone} required />
        </>
      )}

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{isEdit ? 'Update' : 'Create Employee'}</Button>
      </div>
    </form>
  );
};

export default EmployeeForm;
