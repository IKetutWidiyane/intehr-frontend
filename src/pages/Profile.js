import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  FiUser, FiMail, FiBriefcase, FiCalendar, FiEdit2, FiX, FiSave
} from 'react-icons/fi';
import Input from '../components/Input';
import Button from '../components/Button';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    position: user?.position || '',
    department: user?.department || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <div className="flex items-center space-x-3">
          <FiUser className="text-indigo-600 dark:text-indigo-400 h-6 w-6" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
          >
            <FiEdit2 className="mr-2" />
            Edit
          </button>
        )}
      </div>

      {/* Form / Display */}
      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 space-y-5"
        >
          <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
          <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required disabled />

          {/* Hanya tampil kalau bukan employee */}
          {user?.role !== 'employee' && (
            <>
              <Input label="Position" name="position" value={formData.position} onChange={handleChange} />
              <Input label="Department" name="department" value={formData.department} onChange={handleChange} />
            </>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsEditing(false)}
              icon={<FiX />}
            >
              Cancel
            </Button>
            <Button type="submit" icon={<FiSave />}>
              Save
            </Button>
          </div>
        </form>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden divide-y divide-gray-200 dark:divide-gray-700">
          {/* Top Section */}
          <div className="flex items-center space-x-4 px-6 py-6">
            <div className="bg-indigo-100 dark:bg-indigo-700 p-3 rounded-full">
              <FiUser className="h-6 w-6 text-indigo-600 dark:text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user?.name}</h2>
              {user?.role !== 'employee' && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {user?.position || '-'} &bull; {user?.department || '-'}
                </p>
              )}
            </div>
          </div>

          {/* Details Section */}
          <dl className="text-sm divide-y divide-gray-200 dark:divide-gray-700">
            <div className="grid grid-cols-3 px-6 py-4 bg-gray-50 dark:bg-gray-900">
              <dt className="font-medium text-gray-600 dark:text-gray-300 flex items-center">
                <FiMail className="mr-2" /> Email
              </dt>
              <dd className="col-span-2 text-gray-900 dark:text-gray-100">{user?.email}</dd>
            </div>

            {/* Hanya tampil kalau bukan employee */}
            {user?.role !== 'employee' && (
              <>
                <div className="grid grid-cols-3 px-6 py-4">
                  <dt className="font-medium text-gray-600 dark:text-gray-300 flex items-center">
                    <FiBriefcase className="mr-2" /> Position
                  </dt>
                  <dd className="col-span-2 text-gray-900 dark:text-gray-100">{user?.position || '-'}</dd>
                </div>
                <div className="grid grid-cols-3 px-6 py-4 bg-gray-50 dark:bg-gray-900">
                  <dt className="font-medium text-gray-600 dark:text-gray-300 flex items-center">
                    <FiBriefcase className="mr-2" /> Department
                  </dt>
                  <dd className="col-span-2 text-gray-900 dark:text-gray-100">{user?.department || '-'}</dd>
                </div>
              </>
            )}

            {user?.join_date && (
              <div className="grid grid-cols-3 px-6 py-4">
                <dt className="font-medium text-gray-600 dark:text-gray-300 flex items-center">
                  <FiCalendar className="mr-2" /> Join Date
                </dt>
                <dd className="col-span-2 text-gray-900 dark:text-gray-100">
                  {new Date(user.join_date).toLocaleDateString()}
                </dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </div>
  );
};

export default Profile;
