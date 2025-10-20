import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await api.get('/companies');
      setCompanies(response.data);
    } catch (err) {
      setError('Failed to load companies');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/login', {
        username,
        password,
        company_code: companyCode,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('company', JSON.stringify(response.data.company));

      applyTheme(response.data.company);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // const applyTheme = (company) => {
  //   document.documentElement.style.setProperty('--primary', company.primary_color);
  //   if (company.accent_color) {
  //     document.documentElement.style.setProperty('--accent', company.accent_color);
  //   }
  // };
  const applyTheme = (company) => {
    document.documentElement.style.setProperty('--primary', company.primary_color);
    if (company.accent_color) {
      document.documentElement.style.setProperty('--accent', company.accent_color);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Log in</h1>
          <p className="text-gray-500 text-sm">to start learning</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 text-sm mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              placeholder="Enter password"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-2">
              Company
            </label>
            <select
              value={companyCode}
              onChange={(e) => setCompanyCode(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition bg-white"
              required
            >
              <option value="">Select company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.code}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? 'Logging in...' : 'Log in'}
            {!loading && (
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            )}
          </button>
        </form>

        {/* <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-3">Demo Credentials:</p>
          <div className="space-y-2 text-xs">
            <div className="bg-blue-50 px-3 py-2 rounded">
              <span className="font-mono text-gray-700">alice / Passw0rd! / ACME</span>
            </div>
            <div className="bg-green-50 px-3 py-2 rounded">
              <span className="font-mono text-gray-700">bob / Passw0rd! / BETA</span>
            </div>
            <div className="bg-red-50 px-3 py-2 rounded">
              <span className="font-mono text-gray-700">charlie / Passw0rd! / GAMMA</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Login;
