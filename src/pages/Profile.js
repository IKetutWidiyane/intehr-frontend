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
      <div className="flex items-center justify-between gap-4 border-b border-line pb-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <FiUser className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-ink dark:text-ink-dark">
              My Profile
            </h1>
            <p className="text-sm text-muted dark:text-muted-dark">
              Manage your account details.
            </p>
          </div>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40"
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
          className="rounded-2xl border border-line bg-surface p-6 space-y-5 dark:border-line-dark dark:bg-surface-dark"
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

          <div className="flex justify-end gap-3 pt-4">
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
        <div className="rounded-2xl border border-line bg-surface overflow-hidden divide-y divide-line dark:border-line-dark dark:bg-surface-dark dark:divide-line-dark">
          {/* Top Section */}
          <div className="flex items-center gap-4 px-6 py-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <FiUser className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-ink dark:text-ink-dark">{user?.name}</h2>
              {user?.role !== 'employee' && (
                <p className="text-sm text-muted dark:text-muted-dark">
                  {user?.position || '-'} &bull; {user?.department || '-'}
                </p>
              )}
            </div>
          </div>

          {/* Details Section */}
          <dl className="text-sm divide-y divide-line dark:divide-line-dark">
            <div className="grid grid-cols-3 px-6 py-4 bg-subtle dark:bg-subtle-dark">
              <dt className="font-medium text-muted dark:text-muted-dark flex items-center">
                <FiMail className="mr-2" /> Email
              </dt>
              <dd className="col-span-2 text-ink dark:text-ink-dark">{user?.email}</dd>
            </div>

            {user?.role !== 'employee' && (
              <>
                <div className="grid grid-cols-3 px-6 py-4">
                  <dt className="font-medium text-muted dark:text-muted-dark flex items-center">
                    <FiBriefcase className="mr-2" /> Position
                  </dt>
                  <dd className="col-span-2 text-ink dark:text-ink-dark">{user?.position || '-'}</dd>
                </div>
                <div className="grid grid-cols-3 px-6 py-4 bg-subtle dark:bg-subtle-dark">
                  <dt className="font-medium text-muted dark:text-muted-dark flex items-center">
                    <FiBriefcase className="mr-2" /> Department
                  </dt>
                  <dd className="col-span-2 text-ink dark:text-ink-dark">{user?.department || '-'}</dd>
                </div>
              </>
            )}

            {user?.join_date && (
              <div className="grid grid-cols-3 px-6 py-4">
                <dt className="font-medium text-muted dark:text-muted-dark flex items-center">
                  <FiCalendar className="mr-2" /> Join Date
                </dt>
                <dd className="col-span-2 text-ink dark:text-ink-dark">
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
