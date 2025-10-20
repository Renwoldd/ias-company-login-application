import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ModuleTree from '../components/ModuleTree';

function Dashboard() {
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubmodule, setSelectedSubmodule] = useState(null);
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedCompany = localStorage.getItem('company');

    if (!storedUser || !storedCompany) {
      navigate('/');
      return;
    }

    setUser(JSON.parse(storedUser));
    setCompany(JSON.parse(storedCompany));
    fetchModules();
  }, [navigate]);

  const fetchModules = async () => {
    try {
      const response = await api.get('/modules');
      setModules(response.data);
      setFilteredModules(response.data);
    } catch (err) {
      console.error('Failed to fetch modules:', err);
      if (err.response?.status === 401) {
        navigate('/');
      }
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredModules(modules);
      return;
    }

    const ql = query.toLowerCase();
    const filtered = modules
      .map((sys) => {
        const filteredModules = sys.modules
          .map((mod) => {
            const filteredSubs = mod.submodules.filter((sub) =>
              sub.name.toLowerCase().includes(ql)
            );
            return { ...mod, submodules: filteredSubs };
          })
          .filter(
            (m) =>
              m.submodules.length > 0 || m.module_name.toLowerCase().includes(ql)
          );
        return { ...sys, modules: filteredModules };
      })
      .filter(
        (s) =>
          s.modules.length > 0 || s.system_name.toLowerCase().includes(ql)
      );

    setFilteredModules(filtered);
  };

  const handleSubmoduleClick = (submodule) => {
    setSelectedSubmodule(submodule);
  };

  const handleLogout = async () => {
    try {
      await api.post('/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('company');
      navigate('/');
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header
        className="text-white px-6 py-4 shadow flex items-center justify-between"
        style={{ backgroundColor: company?.primary_color || '#233C67' }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded flex items-center justify-center">
            <span className="font-bold text-lg">{company?.code?.charAt(0)}</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">{company?.name}</h1>
            <p className="text-sm opacity-90">{user?.full_name}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:bg-white hover:bg-opacity-10 rounded transition">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="p-2 hover:bg-white hover:bg-opacity-10 rounded transition">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </button>
            <button className="p-2 hover:bg-white hover:bg-opacity-10 rounded transition">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded transition text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              placeholder="Placeholder"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 text-sm"
            />
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            <ModuleTree
              modules={filteredModules}
              onSubmoduleClick={handleSubmoduleClick}
              selectedSubmodule={selectedSubmodule}
              primaryColor={company?.primary_color}
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 overflow-y-auto">
          {selectedSubmodule ? (
            <div className="p-8">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedSubmodule.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Code: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{selectedSubmodule.code}</span>
                  {' '} | Route: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{selectedSubmodule.route}</span>
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-gray-500 text-sm mb-2">Total Reports</p>
                  <p className="text-3xl font-bold text-gray-800">0</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-gray-500 text-sm mb-2">Active Users</p>
                  <p className="text-3xl font-bold text-gray-800">0</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-gray-500 text-sm mb-2">Performance</p>
                  <p className="text-3xl font-bold text-gray-800">0%</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-6">
                {['Total Reports', 'Active Users', 'Performance'].map((title, i) => (
                  <div key={i} className="bg-white rounded-lg shadow p-6">
                    <p className="text-gray-500 text-sm mb-2">{title}</p>
                    <p className="text-3xl font-bold text-gray-800">0</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-lg shadow p-8 text-center">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-500 mb-4">No reports yet created</p>
                <button
                  className="px-6 py-2 rounded text-white font-medium hover:opacity-90 transition"
                  style={{ backgroundColor: company?.primary_color || 'var(--primary)' }}
                >
                  Create new report
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Welcome to {company?.name}
                </h3>
                <p className="text-gray-500">
                  Select a module from the sidebar to get started
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
