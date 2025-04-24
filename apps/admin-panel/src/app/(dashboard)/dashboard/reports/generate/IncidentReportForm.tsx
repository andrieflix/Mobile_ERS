'use client';

import { useState, useEffect } from 'react';
import { Emergency, Report, ReportType, ReportStatus } from '@/types';
import { reportService } from '@/services/reportService';
import { toast } from 'react-hot-toast';
import { FiUpload, FiX } from 'react-icons/fi';

interface IncidentReportFormProps {
  userRole: string;
  activeEmergencies: Emergency[];
  onSubmit: (report: Partial<Report>) => Promise<void>;
}

export default function IncidentReportForm({ userRole, activeEmergencies, onSubmit }: IncidentReportFormProps) {
  const [selectedEmergency, setSelectedEmergency] = useState<Emergency | null>(null);
  const [formData, setFormData] = useState({
    cause: '',
    casualties: {
      fatalities: 0,
      injuries: 0,
      missing: 0
    },
    propertyDamage: {
      description: '',
      estimatedCost: 0,
      affectedAreas: ''
    },
    actionsTaken: '',
    recommendations: '',
    weatherConditions: '',
    responseTime: '',
    resourcesDeployed: '',
    challengesFaced: '',
    lessonsLearned: '',
    attachments: [] as File[]
  });

  // Only responding officer heads can access this form
  if (userRole !== 'Responder') {
    return (
      <div className="p-4 bg-yellow-50 rounded-lg">
        <p className="text-yellow-700">
          Only responding officer heads can generate incident reports.
        </p>
      </div>
    );
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles]
      }));
    }
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmergency) {
      toast.error('Please select an emergency incident');
      return;
    }

    try {
      const reportData: Partial<Report> = {
        name: `Incident Report - ${selectedEmergency.type} at ${selectedEmergency.location}`,
        type: ReportType.INCIDENT_REPORT,
        dateRange: {
          start: selectedEmergency.createdAt,
          end: new Date().toISOString()
        },
        status: ReportStatus.PROCESSING,
        format: 'PDF',
        incidentDetails: {
          incidentId: selectedEmergency.id,
          ...formData
        }
      };

      await onSubmit(reportData);
      toast.success('Incident report submitted successfully');
    } catch (error) {
      toast.error('Failed to submit incident report');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Select Emergency Incident</label>
        <select
          value={selectedEmergency?.id || ''}
          onChange={(e) => setSelectedEmergency(activeEmergencies.find(em => em.id === Number(e.target.value)) || null)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          required
        >
          <option value="">Select an emergency</option>
          {activeEmergencies.map((emergency) => (
            <option key={emergency.id} value={emergency.id}>
              {emergency.type} - {emergency.location} ({new Date(emergency.createdAt).toLocaleDateString()})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Cause of Incident</label>
        <textarea
          value={formData.cause}
          onChange={(e) => setFormData(prev => ({ ...prev, cause: e.target.value }))}
          rows={3}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Fatalities</label>
          <input
            type="number"
            min="0"
            value={formData.casualties.fatalities}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              casualties: { ...prev.casualties, fatalities: parseInt(e.target.value) }
            }))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Injuries</label>
          <input
            type="number"
            min="0"
            value={formData.casualties.injuries}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              casualties: { ...prev.casualties, injuries: parseInt(e.target.value) }
            }))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Missing Persons</label>
          <input
            type="number"
            min="0"
            value={formData.casualties.missing}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              casualties: { ...prev.casualties, missing: parseInt(e.target.value) }
            }))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Property Damage Description</label>
        <textarea
          value={formData.propertyDamage.description}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            propertyDamage: { ...prev.propertyDamage, description: e.target.value }
          }))}
          rows={3}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Estimated Cost of Damage</label>
          <input
            type="number"
            min="0"
            value={formData.propertyDamage.estimatedCost}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              propertyDamage: { ...prev.propertyDamage, estimatedCost: parseInt(e.target.value) }
            }))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Affected Areas</label>
          <input
            type="text"
            value={formData.propertyDamage.affectedAreas}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              propertyDamage: { ...prev.propertyDamage, affectedAreas: e.target.value }
            }))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Weather Conditions</label>
        <input
          type="text"
          value={formData.weatherConditions}
          onChange={(e) => setFormData(prev => ({ ...prev, weatherConditions: e.target.value }))}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Response Time</label>
        <input
          type="text"
          value={formData.responseTime}
          onChange={(e) => setFormData(prev => ({ ...prev, responseTime: e.target.value }))}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Resources Deployed</label>
        <textarea
          value={formData.resourcesDeployed}
          onChange={(e) => setFormData(prev => ({ ...prev, resourcesDeployed: e.target.value }))}
          rows={3}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Challenges Faced</label>
        <textarea
          value={formData.challengesFaced}
          onChange={(e) => setFormData(prev => ({ ...prev, challengesFaced: e.target.value }))}
          rows={3}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Actions Taken</label>
        <textarea
          value={formData.actionsTaken}
          onChange={(e) => setFormData(prev => ({ ...prev, actionsTaken: e.target.value }))}
          rows={4}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Lessons Learned</label>
        <textarea
          value={formData.lessonsLearned}
          onChange={(e) => setFormData(prev => ({ ...prev, lessonsLearned: e.target.value }))}
          rows={3}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Recommendations</label>
        <textarea
          value={formData.recommendations}
          onChange={(e) => setFormData(prev => ({ ...prev, recommendations: e.target.value }))}
          rows={3}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Attachments</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
              >
                <span>Upload files</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  multiple
                  className="sr-only"
                  onChange={handleFileUpload}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PDF, DOC, JPG, PNG up to 10MB</p>
          </div>
        </div>
        {formData.attachments.length > 0 && (
          <div className="mt-2 space-y-2">
            {formData.attachments.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <span className="text-sm text-gray-600">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeAttachment(index)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Generate Incident Report
        </button>
      </div>
    </form>
  );
} 