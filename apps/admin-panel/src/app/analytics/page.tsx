'use client';

import { useState } from 'react';
import { FiDownload } from 'react-icons/fi';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FiDownload className="h-5 w-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Content will be added later */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-500">Analytics dashboard content will be implemented here.</p>
      </div>
    </div>
  );
} 