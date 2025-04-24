'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiPhone, FiMapPin, FiBriefcase, FiHome, FiAlertCircle } from 'react-icons/fi';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  designation: string;
  responderType: 'RESCUE' | 'FIREFIGHTER' | 'MEDIC';
  organization: 'BFP' | 'MDRRMO';
  status: 'ACTIVE' | 'INACTIVE';
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  role?: string;
  designation?: string;
  responderType?: string;
  organization?: string;
}

export default function AddResponderPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    role: '',
    designation: '',
    responderType: 'RESCUE',
    organization: 'BFP',
    status: 'ACTIVE'
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }

    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Show success message and redirect
      alert('Responder added successfully');
      router.push('/users?type=responder');
    } catch (error) {
      console.error('Error creating responder:', error);
      alert('Failed to create responder. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Add New Responder</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`block w-full pl-10 pr-3 py-2 text-sm border rounded-lg focus:ring-1 focus:outline-none ${
                errors.name
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder="Enter full name"
            />
          </div>
          {errors.name && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <FiAlertCircle className="h-4 w-4" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`block w-full pl-10 pr-3 py-2 text-sm border rounded-lg focus:ring-1 focus:outline-none ${
                errors.email
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder="Enter email address"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <FiAlertCircle className="h-4 w-4" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiPhone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`block w-full pl-10 pr-3 py-2 text-sm border rounded-lg focus:ring-1 focus:outline-none ${
                errors.phone
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder="Enter phone number"
            />
          </div>
          {errors.phone && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <FiAlertCircle className="h-4 w-4" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Address Field */}
        <div className="space-y-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className={`block w-full pl-10 pr-3 py-2 text-sm border rounded-lg focus:ring-1 focus:outline-none ${
                errors.address
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder="Enter address"
            />
          </div>
          {errors.address && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <FiAlertCircle className="h-4 w-4" />
              {errors.address}
            </p>
          )}
        </div>

        {/* Role Field */}
        <div className="space-y-2">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiBriefcase className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className={`block w-full pl-10 pr-3 py-2 text-sm border rounded-lg focus:ring-1 focus:outline-none ${
                errors.role
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder="Enter role (e.g., Fire Captain, EMT)"
            />
          </div>
          {errors.role && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <FiAlertCircle className="h-4 w-4" />
              {errors.role}
            </p>
          )}
        </div>

        {/* Designation Field */}
        <div className="space-y-2">
          <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
            Designation
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiBriefcase className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="designation"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              className={`block w-full pl-10 pr-3 py-2 text-sm border rounded-lg focus:ring-1 focus:outline-none ${
                errors.designation
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder="Enter designation (e.g., Team Leader, First Responder)"
            />
          </div>
          {errors.designation && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <FiAlertCircle className="h-4 w-4" />
              {errors.designation}
            </p>
          )}
        </div>

        {/* Responder Type Field */}
        <div className="space-y-2">
          <label htmlFor="responderType" className="block text-sm font-medium text-gray-700">
            Responder Type
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="responderType"
              value={formData.responderType}
              onChange={(e) => setFormData({ ...formData, responderType: e.target.value as 'RESCUE' | 'FIREFIGHTER' | 'MEDIC' })}
              className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="RESCUE">Rescue</option>
              <option value="FIREFIGHTER">Firefighter</option>
              <option value="MEDIC">Medic</option>
            </select>
          </div>
        </div>

        {/* Organization Field */}
        <div className="space-y-2">
          <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
            Organization
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiHome className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="organization"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value as 'BFP' | 'MDRRMO' })}
              className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="BFP">Bureau of Fire Protection (BFP)</option>
              <option value="MDRRMO">Municipal Disaster Risk Reduction and Management Office (MDRRMO)</option>
            </select>
          </div>
        </div>

        {/* Status Field */}
        <div className="space-y-2">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'ACTIVE' | 'INACTIVE' })}
              className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating...
              </>
            ) : (
              'Create Responder'
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 