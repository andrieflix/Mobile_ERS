'use client';

import { useState, useEffect } from 'react';
import { FiDownload, FiRefreshCw } from 'react-icons/fi';
import type { AnalyticsData } from '@/types';

// Mock analytics data - In a real app, this would come from an API
const mockAnalytics: AnalyticsData = {
  activeEmergencies: 12,
  totalUsers: 156,
  responseRate: 94.5,
  avgResponseTime: 7.3,
  emergenciesByType: [
    { type: 'Fire', count: 45 },
    { type: 'Medical', count: 78 },
    { type: 'Police', count: 34 },
    { type: 'Natural Disaster', count: 12 }
  ],
  responseTimeHistory: [
    // Pre-system (Manual Process) - 2022
    { date: '2022-01-01', time: 15.8, system: 'manual' },
    { date: '2022-02-01', time: 16.2, system: 'manual' },
    { date: '2022-03-01', time: 15.9, system: 'manual' },
    { date: '2022-04-01', time: 16.5, system: 'manual' },
    { date: '2022-05-01', time: 15.7, system: 'manual' },
    { date: '2022-06-01', time: 16.1, system: 'manual' },
    { date: '2022-07-01', time: 16.3, system: 'manual' },
    { date: '2022-08-01', time: 15.9, system: 'manual' },
    { date: '2022-09-01', time: 16.4, system: 'manual' },
    { date: '2022-10-01', time: 16.0, system: 'manual' },
    { date: '2022-11-01', time: 15.8, system: 'manual' },
    { date: '2022-12-01', time: 16.2, system: 'manual' },
    // System Implementation and Improvement - 2023
    { date: '2023-01-01', time: 12.2, system: 'automated' },
    { date: '2023-02-01', time: 11.1, system: 'automated' },
    { date: '2023-03-01', time: 10.3, system: 'automated' },
    { date: '2023-04-01', time: 9.5, system: 'automated' },
    { date: '2023-05-01', time: 8.9, system: 'automated' },
    { date: '2023-06-01', time: 8.4, system: 'automated' },
    { date: '2023-07-01', time: 8.0, system: 'automated' },
    { date: '2023-08-01', time: 7.8, system: 'automated' },
    { date: '2023-09-01', time: 7.5, system: 'automated' },
    { date: '2023-10-01', time: 7.2, system: 'automated' },
    { date: '2023-11-01', time: 7.0, system: 'automated' },
    { date: '2023-12-01', time: 6.8, system: 'automated' },
    // Optimized System - 2024
    { date: '2024-01-01', time: 6.7, system: 'automated' },
    { date: '2024-02-01', time: 6.5, system: 'automated' },
    { date: '2024-03-01', time: 6.4, system: 'automated' },
    { date: '2024-04-01', time: 6.3, system: 'automated' },
    { date: '2024-05-01', time: 6.2, system: 'automated' },
    { date: '2024-06-01', time: 6.1, system: 'automated' },
    { date: '2024-07-01', time: 6.0, system: 'automated' },
    { date: '2024-08-01', time: 5.9, system: 'automated' },
    { date: '2024-09-01', time: 5.8, system: 'automated' },
    { date: '2024-10-01', time: 5.7, system: 'automated' },
    { date: '2024-11-01', time: 5.6, system: 'automated' },
    { date: '2024-12-01', time: 5.5, system: 'automated' }
  ]
};

const COLORS = {
  Fire: '#EF4444',
  Medical: '#3B82F6',
  Police: '#F59E0B',
  'Natural Disaster': '#8B5CF6'
} as const;

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData>(mockAnalytics);
  const [selectedYear, setSelectedYear] = useState('2024');
  const [isLoading, setIsLoading] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics(prev => ({
        ...prev,
        activeEmergencies: prev.activeEmergencies + Math.floor(Math.random() * 3) - 1,
        responseRate: Math.min(100, prev.responseRate + (Math.random() * 0.4 - 0.2)),
        avgResponseTime: Math.max(1, prev.avgResponseTime + (Math.random() * 0.4 - 0.2))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>
          <button
            onClick={handleRefresh}
            className={`p-2 text-gray-500 hover:text-gray-700 rounded-full transition-colors ${
              isLoading ? 'animate-spin' : ''
            }`}
          >
            <FiRefreshCw className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Emergencies</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{analytics.activeEmergencies}</p>
          <div className="mt-2 text-sm text-green-600">+2.5% from last period</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{analytics.totalUsers}</p>
          <div className="mt-2 text-sm text-blue-600">+5 new this week</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500">Response Rate</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{analytics.responseRate.toFixed(1)}%</p>
          <div className="mt-2 text-sm text-green-600">+1.2% from last period</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500">Avg. Response Time</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{analytics.avgResponseTime.toFixed(1)} min</p>
          <div className="mt-2 text-sm text-green-600">-0.3 min improvement</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emergencies Distribution */}
        <div className="bg-white rounded-lg shadow-sm py-6">
          <div className="flex justify-between items-center mb-6 w-full">
            <h3 className="text-lg font-medium text-gray-900 px-6">Emergencies by Type</h3>
            <div className="flex gap-2 w-full flex-wrap">
              {analytics.emergenciesByType.map(({ type }) => (
                <div key={type} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[type as keyof typeof COLORS] }}
                  />
                  <span className="text-sm text-gray-600">{type}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-80">
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative w-64 h-64">
                {/* Base pie chart */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: analytics.emergenciesByType.reduce((gradient, { type, count }, index, array) => {
                      const total = array.reduce((sum, item) => sum + item.count, 0);
                      const percentage = (count / total) * 100;
                      const color = COLORS[type as keyof typeof COLORS];
                      const prevPercentage = array
                        .slice(0, index)
                        .reduce((sum, item) => sum + (item.count / total) * 100, 0);

                      return `${gradient}${color} ${prevPercentage}% ${prevPercentage + percentage}%${
                        index === array.length - 1 ? '' : ','
                      }`;
                    }, 'conic-gradient(')
                  }}
                />

                {/* Labels */}
                {analytics.emergenciesByType.map(({ type, count }, index, array) => {
                  const total = array.reduce((sum, item) => sum + item.count, 0);
                  const percentage = (count / total) * 100;
                  const prevPercentage = array
                    .slice(0, index)
                    .reduce((sum, item) => sum + (item.count / total) * 100, 0);
                  
                  // Calculate the middle angle in radians
                  const startAngle = (prevPercentage / 100) * 2 * Math.PI;
                  const endAngle = ((prevPercentage + percentage) / 100) * 2 * Math.PI;
                  const middleAngle = (startAngle + endAngle) / 2;

                  // Calculate position (32 is the distance from center)
                  const x = Math.cos(middleAngle - Math.PI / 2) * 64;
                  const y = Math.sin(middleAngle - Math.PI / 2) * 64;

                  return (
                    <div
                      key={type}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
                      style={{
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      }}
                    >
                      <div
                        className="bg-white/90 px-1.5 py-0.5 rounded shadow-sm text-center min-w-[40px]"
                      >
                        <div 
                          className="text-xs font-medium" 
                          style={{ color: COLORS[type as keyof typeof COLORS] }}
                        >
                          {percentage.toFixed(0)}%
                          <br />
                          {count} counts 
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Response Time Trend */}
        <div className="bg-white rounded-lg shadow-sm py-6">
          <div className="space-y-1 flex flex-row justify-between gap-10 items-center px-6 mb-2 w-full">
            <h3 className="text-lg font-medium text-gray-900">Response Time Trend</h3>
            <p className="text-sm text-gray-500 flex-1 justify-end items-center">Manual vs. Automated System Response Times</p>
          </div>
          <div className="flex justify-between items-center px-6 mb-6 w-full">
            <div className="flex items-center gap-6 flex-row">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F59E0B' }} />
                <span className="text-sm text-gray-600">Manual Process</span>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3B82F6' }} />
                <span className="text-sm text-gray-600">Automated System</span>
              </div>
              <div>
                <label htmlFor="year-select" className="text-sm font-medium text-gray-700 mr-2">Select Year:</label>
                <select
                  id="year-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="2024">2024 - Optimized System</option>
                  <option value="2023">2023 - System Implementation</option>
                  <option value="2022">2022 - Manual Process</option>
                </select>
              </div>
            </div>
          </div>
          <div className="h-80 px-6">
            <div className="w-full h-full relative">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between border-l border-gray-200">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-full border-b border-gray-200 flex items-center"
                  >
                    <span className="text-xs text-gray-500 transform -translate-x-2 -translate-y-1/2">
                      {(20 - i * 3).toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Chart area */}
              <div className="absolute inset-0 ml-8">
                <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gradient-manual" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.02" />
                    </linearGradient>
                    <linearGradient id="gradient-automated" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>

                  {/* Main line */}
                  {(() => {
                    const yearData = analytics.responseTimeHistory.filter(
                      point => point.date.startsWith(selectedYear)
                    );

                    if (yearData.length === 0) return null;

                    const isManual = selectedYear === '2022';

                    const path = yearData.map((point, i, arr) => {
                      const x = (i / 11) * 1000;
                      const y = 400 - ((point.time / 20) * 400);
                      
                      if (i === 0) return `M ${x} ${y}`;
                      
                      const prevX = ((i - 1) / 11) * 1000;
                      const prevY = 400 - ((arr[i - 1].time / 20) * 400);
                      
                      const smoothing = 0.2;
                      const deltaX = x - prevX;
                      
                      const cp1x = prevX + deltaX * smoothing;
                      const cp1y = prevY;
                      const cp2x = x - deltaX * smoothing;
                      const cp2y = y;
                      
                      return `C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${x} ${y}`;
                    }).join(' ');

                    return (
                      <>
                        <path
                          d={path}
                          stroke={isManual ? '#F59E0B' : '#3B82F6'}
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                          className="transition-all duration-500"
                        />
                        <path
                          d={`${path} L 1000 400 L 0 400 Z`}
                          fill={`url(#gradient-${isManual ? 'manual' : 'automated'})`}
                          className="transition-all duration-500"
                        />
                      </>
                    );
                  })()}

                  {/* Data points */}
                  {analytics.responseTimeHistory
                    .filter(point => point.date.startsWith(selectedYear))
                    .map((point, i) => {
                      const x = (i / 11) * 1000;
                      const y = 400 - ((point.time / 20) * 400);
                      const isManual = selectedYear === '2022';
                      
                      return (
                        <g key={i} transform={`translate(${x}, ${y})`}>
                          <circle
                            r="6"
                            fill="white"
                            stroke={isManual ? '#F59E0B' : '#3B82F6'}
                            strokeWidth="3"
                            className="transition-all duration-200"
                          />
                          <g className="transition-opacity duration-200">
                            <rect
                              x="-24"
                              y="-35"
                              width="48"
                              height="24"
                              rx="4"
                              fill="white"
                              stroke="#e2e8f0"
                              strokeWidth="1"
                            />
                            <text
                              x="0"
                              y="-18"
                              textAnchor="middle"
                              className="text-xs fill-gray-700 font-medium"
                            >
                              {point.time}min
                            </text>
                          </g>
                        </g>
                      );
                  })}
                </svg>

                {/* X-axis labels */}
                <div className="absolute bottom-0 left-0 right-0 h-6 border-t border-gray-200">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
                    <div
                      key={i}
                      className="absolute text-xs text-gray-500 transform -translate-x-1/2 pt-2 font-medium"
                      style={{
                        left: `${(i / 11) * 100}%`,
                      }}
                    >
                      {month}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Stats Table */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Detailed Statistics</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Previous</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-gray-900">Response Rate</td>
                <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">{analytics.responseRate.toFixed(1)}%</td>
                <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">93.3%</td>
                <td className="px-6 py-4 whitespace-wrap text-sm text-green-600">+1.2%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-gray-900">Avg Response Time</td>
                <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">{analytics.avgResponseTime.toFixed(1)} min</td>
                <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">8.5 min</td>
                <td className="px-6 py-4 whitespace-wrap text-sm text-green-600">-0.3 min</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-gray-900">Active Users</td>
                <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">{analytics.totalUsers}</td>
                <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">151</td>
                <td className="px-6 py-4 whitespace-wrap text-sm text-green-600">+5</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 