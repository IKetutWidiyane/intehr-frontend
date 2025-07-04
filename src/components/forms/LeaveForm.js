import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../Input';
import Button from '../Button';

const LeaveForm = ({ initialData, onSubmit, onCancel, onDelete, readOnly }) => {
  const formik = useFormik({
    initialValues: {
      type: initialData?.type || 'annual',
      start_date: initialData?.start_date || '',
      end_date: initialData?.end_date || '',
      reason: initialData?.reason || '',
      notes: initialData?.notes || ''
    },
    validationSchema: Yup.object({
      type: Yup.string().required('Leave type is required'),
      start_date: Yup.date().required('Start date is required'),
      end_date: Yup.date()
        .required('End date is required')
        .min(Yup.ref('start_date'), 'End date must be after start date'),
      reason: Yup.string().required('Reason is required').min(10, 'Reason must be at least 10 characters')
    }),
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <Input
        label="Leave Type"
        name="type"
        as="select"
        value={formik.values.type}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.type && formik.errors.type}
        required
        disabled={readOnly}
      >
        <option value="annual">Annual Leave</option>
        <option value="sick">Sick Leave</option>
        <option value="personal">Personal Leave</option>
        <option value="other">Other</option>
      </Input>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Start Date"
          name="start_date"
          type="date"
          value={formik.values.start_date}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.start_date && formik.errors.start_date}
          required
          disabled={readOnly}
        />
        
        <Input
          label="End Date"
          name="end_date"
          type="date"
          value={formik.values.end_date}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.end_date && formik.errors.end_date}
          required
          disabled={readOnly}
        />
      </div>
      
      <Input
        label="Reason"
        name="reason"
        as="textarea"
        rows={3}
        value={formik.values.reason}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.reason && formik.errors.reason}
        required
        disabled={readOnly}
      />
      
      {initialData && (
        <Input
          label="Status"
          name="status"
          value={initialData.status}
          disabled
        />
      )}
      
      {initialData && initialData.notes && (
        <Input
          label="Approver Notes"
          name="approver_notes"
          value={initialData.notes}
          as="textarea"
          rows={2}
          disabled
        />
      )}

      <div className="flex justify-between pt-4">
        <div>
          {onDelete && (
            <Button
              type="button"
              variant="danger"
              onClick={onDelete}
            >
              Cancel Request
            </Button>
          )}
        </div>
        <div className="flex space-x-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            {readOnly ? 'Close' : 'Cancel'}
          </Button>
          {!readOnly && (
            <Button
              type="submit"
            >
              {initialData ? 'Update Leave' : 'Submit Leave'}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default LeaveForm;