'use client';

import { useState } from 'react';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiSave, 
  FiCamera, 
  FiShield, 
  FiAlertCircle,
  FiClock,
  FiBriefcase,
  FiCheckCircle
} from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { usePermissions } from '@/hooks/usePermissions';
import { PermissionGate } from '@/components/PermissionGate';

interface ResponderDetails {
  department?: string;
  specialization?: string;
  certifications?: string[];
  availability?: 'on-duty' | 'off-duty' | 'on-call';
  responseTime?: string;
  successfulResponses?: number;
}

interface ResidentDetails {
  emergencyContact?: string;
  medicalConditions?: string[];
  preferredHospital?: string;
  lastIncidentReport?: string;
}

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const { role } = usePermissions();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    avatar: user?.avatar || '',
    responderDetails: user?.responderDetails as ResponderDetails || {},
    residentDetails: user?.residentDetails as ResidentDetails || {}
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await updateProfile(formData);
      // Show success message or notification
    } catch (error) {
      setError('Failed to update profile. Please try again.');
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      case 'responder':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'System Administrator';
      case 'manager':
        return 'Emergency Manager';
      case 'responder':
        return 'Emergency Responder';
      case 'resident':
        return 'Resident';
      default:
        return role;
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Profile Settings</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar and Role Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                {formData.avatar ? (
                  <img src={formData.avatar} alt={formData.name} className="w-full h-full object-cover" />
                ) : (
                  <FiUser className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white cursor-pointer hover:bg-blue-700">
                <FiCamera className="w-4 h-4" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
              <div className="mt-1 flex items-center gap-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(role)}`}>
                  {getRoleLabel(role)}
                </span>
                {role === 'responder' && formData.responderDetails?.availability && (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    formData.responderDetails.availability === 'on-duty' 
                      ? 'bg-green-100 text-green-800' 
                      : formData.responderDetails.availability === 'on-call'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {formData.responderDetails.availability.replace('-', ' ').toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Basic Information</h2>
          
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Responder-specific Section */}
        <PermissionGate permissions={['view:incidents']}>
          {role === 'responder' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
              <h2 className="text-lg font-medium text-gray-900">Responder Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Department
                  </label>
                  <div className="relative">
                    <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="department"
                      value={formData.responderDetails?.department || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        responderDetails: { ...prev.responderDetails, department: e.target.value }
                      }))}
                      className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="availability" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Availability Status
                  </label>
                  <div className="relative">
                    <FiClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      id="availability"
                      value={formData.responderDetails?.availability || 'off-duty'}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        responderDetails: { 
                          ...prev.responderDetails, 
                          availability: e.target.value as ResponderDetails['availability']
                        }
                      }))}
                      className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="on-duty">On Duty</option>
                      <option value="off-duty">Off Duty</option>
                      <option value="on-call">On Call</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Specialization
                  </label>
                  <div className="relative">
                    <FiShield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="specialization"
                      value={formData.responderDetails?.specialization || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        responderDetails: { ...prev.responderDetails, specialization: e.target.value }
                      }))}
                      className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="responseTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Average Response Time
                  </label>
                  <div className="relative">
                    <FiClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="responseTime"
                      value={formData.responderDetails?.responseTime || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        responderDetails: { ...prev.responderDetails, responseTime: e.target.value }
                      }))}
                      className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 5-10 minutes"
                    />
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <FiCheckCircle className="w-5 h-5 text-green-500" />
                    <span className="ml-2 text-sm font-medium text-green-700">Successful Responses</span>
                  </div>
                  <p className="mt-2 text-2xl font-semibold text-green-800">
                    {formData.responderDetails?.successfulResponses || 0}
                  </p>
                </div>
                {/* Add more statistics as needed */}
              </div>
            </div>
          )}
        </PermissionGate>

        {/* Resident-specific Section */}
        {role === 'resident' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
            <h2 className="text-lg font-medium text-gray-900">Emergency Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Emergency Contact
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="emergencyContact"
                    value={formData.residentDetails?.emergencyContact || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      residentDetails: { ...prev.residentDetails, emergencyContact: e.target.value }
                    }))}
                    className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Name and phone number"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="preferredHospital" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Preferred Hospital
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="preferredHospital"
                    value={formData.residentDetails?.preferredHospital || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      residentDetails: { ...prev.residentDetails, preferredHospital: e.target.value }
                    }))}
                    className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="medicalConditions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Medical Conditions
                </label>
                <div className="relative">
                  <FiAlertCircle className="absolute left-3 top-3 text-gray-400" />
                  <textarea
                    id="medicalConditions"
                    value={formData.residentDetails?.medicalConditions?.join(', ') || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      residentDetails: { 
                        ...prev.residentDetails, 
                        medicalConditions: e.target.value.split(',').map(s => s.trim()) 
                      }
                    }))}
                    className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="List any medical conditions, allergies, or special needs"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <FiSave className="w-4 h-4" />
            )}
            <span>{loading ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
} 