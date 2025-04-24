'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function TestAuth() {
  const { user, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [testResults, setTestResults] = useState<Array<{ action: string; success: boolean; message: string }>>([]);
  const [loading, setLoading] = useState(false);

  const addTestResult = (action: string, success: boolean, message: string) => {
    setTestResults(prev => [...prev, { action, success, message }]);
  };

  const handleLogin = async (testEmail: string, testPassword: string) => {
    setLoading(true);
    try {
      await login(testEmail, testPassword);
      addTestResult('Login', true, `Successfully logged in as ${testEmail}`);
    } catch (error) {
      addTestResult('Login', false, `Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      addTestResult('Logout', true, 'Successfully logged out');
    } catch (error) {
      addTestResult('Logout', false, `Logout failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const checkSession = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/me');
      const data = await response.json();
      
      if (response.ok) {
        addTestResult('Session Check', true, `Active session found for user: ${data.email}`);
      } else {
        addTestResult('Session Check', false, `No active session: ${data.error}`);
      }
    } catch (error) {
      addTestResult('Session Check', false, `Session check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const testAllUsers = async () => {
    const testUsers = [
      { email: 'admin@example.com', password: 'admin123' },
      { email: 'manager@example.com', password: 'manager123' },
      { email: 'responder@example.com', password: 'responder123' }
    ];

    for (const testUser of testUsers) {
      // Login
      await handleLogin(testUser.email, testUser.password);
      // Check session
      await checkSession();
      // Logout
      await handleLogout();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Authentication Test Page</h1>
      
      {/* Current User Status */}
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="font-semibold mb-2">Current User Status:</h2>
        <pre className="whitespace-pre-wrap">
          {user ? JSON.stringify(user, null, 2) : 'Not logged in'}
        </pre>
      </div>

      {/* Manual Test Controls */}
      <div className="mb-6 space-y-4">
        <h2 className="font-semibold">Manual Testing:</h2>
        <div className="space-y-2">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-2 border rounded"
          />
          <button
            onClick={() => handleLogin(email, password)}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Login
          </button>
        </div>
        
        <div className="space-x-2">
          <button
            onClick={checkSession}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            Check Session
          </button>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Automated Test */}
      <div className="mb-6">
        <button
          onClick={testAllUsers}
          disabled={loading}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
        >
          Test All Users
        </button>
      </div>

      {/* Test Results */}
      <div className="space-y-2">
        <h2 className="font-semibold">Test Results:</h2>
        {testResults.map((result, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            <strong>{result.action}:</strong> {result.message}
          </div>
        ))}
      </div>
    </div>
  );
} 