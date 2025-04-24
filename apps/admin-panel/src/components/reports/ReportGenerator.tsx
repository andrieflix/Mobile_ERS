'use client';

import { useState } from 'react';
import { FiDownload, FiFileText, FiCalendar } from 'react-icons/fi';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: 'emergency' | 'response' | 'user' | 'summary';
}

const reportTemplates: ReportTemplate[] = [
  {
    id: 'emergency-summary',
    name: 'Emergency Summary Report',
    description: 'Detailed analysis of emergency incidents, response times, and outcomes',
    type: 'emergency'
  },
  {
    id: 'response-performance',
    name: 'Response Performance Report',
    description: 'Analysis of response times, efficiency metrics, and performance indicators',
    type: 'response'
  },
  {
    id: 'user-activity',
    name: 'User Activity Report',
    description: 'Overview of user actions, login patterns, and system usage',
    type: 'user'
  },
  {
    id: 'monthly-summary',
    name: 'Monthly Summary Report',
    description: 'Comprehensive monthly overview of all system activities and metrics',
    type: 'summary'
  }
];

export default function ReportGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    // In a real app, this would call an API endpoint to generate the report
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-gray-900">Generate Reports</h3>
          <p className="text-sm text-gray-500">Select a template and date range to generate a report</p>
        </div>

        {/* Report Templates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTemplates.map((template) => (
            <div
              key={template.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedTemplate === template.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 p-2 rounded-lg ${
                  selectedTemplate === template.id ? 'bg-blue-500' : 'bg-gray-100'
                }`}>
                  <FiFileText className={`w-4 h-4 ${
                    selectedTemplate === template.id ? 'text-white' : 'text-gray-500'
                  }`} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{template.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Date Range Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="start-date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              <FiCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="end-date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              <FiCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-end">
          <button
            onClick={handleGenerateReport}
            disabled={!selectedTemplate || isGenerating}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors ${
              !selectedTemplate || isGenerating
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <FiDownload className="w-4 h-4" />
            {isGenerating ? 'Generating...' : 'Generate Report'}
          </button>
        </div>
      </div>
    </div>
  );
} 