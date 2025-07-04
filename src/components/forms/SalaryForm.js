import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../Input';
import Button from '../Button';

const SalaryForm = ({ initialData, onSubmit, onCancel }) => {
  const formik = useFormik({
    initialValues: {
      employee_id: initialData?.employee_id || '',
      basic_salary: initialData?.basic_salary || '',
      allowance: initialData?.allowance || '',
      tax: initialData?.tax || '',
      bonus: initialData?.bonus || '',
      payment_date: initialData?.payment_date || '',
      status: initialData?.status || 'pending',
      notes: initialData?.notes || ''
    },
    validationSchema: Yup.object({
      employee_id: Yup.number().required('Employee is required'),
      basic_salary: Yup.number().required('Basic salary is required').min(0),
      allowance: Yup.number().min(0),
      tax: Yup.number().min(0),
      bonus: Yup.number().min(0),
      payment_date: Yup.date().required('Payment date is required'),
      status: Yup.string().required('Status is required')
    }),
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <Input
        label="Employee ID"
        name="employee_id"
        type="number"
        value={formik.values.employee_id}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.employee_id && formik.errors.employee_id}
        required
      />
      
      <Input
        label="Basic Salary"
        name="basic_salary"
        type="number"
        value={formik.values.basic_salary}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.basic_salary && formik.errors.basic_salary}
        required
      />
      
      <Input
        label="Allowance"
        name="allowance"
        type="number"
        value={formik.values.allowance}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.allowance && formik.errors.allowance}
      />
      
      <Input
        label="Tax"
        name="tax"
        type="number"
        value={formik.values.tax}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.tax && formik.errors.tax}
      />
      
      <Input
        label="Bonus"
        name="bonus"
        type="number"
        value={formik.values.bonus}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.bonus && formik.errors.bonus}
      />
      
      <Input
        label="Payment Date"
        name="payment_date"
        type="date"
        value={formik.values.payment_date}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.payment_date && formik.errors.payment_date}
        required
      />
      
      <Input
        label="Status"
        name="status"
        as="select"
        value={formik.values.status}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.status && formik.errors.status}
        required
      >
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
        <option value="cancelled">Cancelled</option>
      </Input>
      
      <Input
        label="Notes"
        name="notes"
        as="textarea"
        rows={3}
        value={formik.values.notes}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.notes && formik.errors.notes}
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
          {initialData ? 'Update Salary' : 'Create Salary'}
        </Button>
      </div>
    </form>
  );
};

export default SalaryForm;