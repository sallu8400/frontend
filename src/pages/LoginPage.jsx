import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { loginUser } from '../store/slices/authSlice';
import { useTheme } from '../contexts/ThemeContext';

const LoginPage = () => {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleLogin = async (values) => {
  setLoading(true);
  
  try {
    const result = await dispatch(loginUser(values));
    console.log(result,"fff")
    if (result.type === 'auth/loginUser/fulfilled') {
      const userRole = result.payload.role; // <-- Extract role


      message.success('Login successful!');

      // ✅ Navigate based on role
      if (userRole === 'admin') {
        alert("admin")
        navigate('/home/admin');  // admin page
      } else {
                alert("uswre")
        navigate('/'); // normal user
      }

    } else {
      message.error(result.payload || 'Login failed');
    }
  } catch (error) {
    console.log(error,"ss")
    message.error('Login failed');
    console.log()
  } finally {
    setLoading(false);
  }
};

  return (
    <div className={`min-h-screen bg-gradient-to-br flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isDarkMode 
        ? 'from-gray-900 to-gray-800' 
        : 'from-slate-50 to-slate-100'
    }`}>
      <div className="max-w-md w-full space-y-8">
        <div className={`rounded-2xl shadow-xl p-8 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <Link 
            to="/"
            className={`flex items-center mb-8 transition-colors ${
              isDarkMode 
                ? 'text-gray-400 hover:text-white' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center mb-8">
            <Link to="/" className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-600 rounded-xl flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className={`text-3xl font-bold transition-colors ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>Couture</span>
            </Link>
            <h2 className={`text-3xl font-bold mb-2 transition-colors ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>Welcome Back</h2>
            <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>
              Sign in to your account to continue shopping
            </p>
          </div>

          <Form onFinish={handleLogin} layout="vertical" className="space-y-6">
            <Form.Item
              name="email"
              label={<span className={isDarkMode ? 'text-gray-300' : 'text-slate-700'}>Email Address</span>}
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input 
                prefix={<Mail className={`w-4 h-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-slate-400'
                }`} />}
                placeholder="Enter your email"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span className={isDarkMode ? 'text-gray-300' : 'text-slate-700'}>Password</span>}
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password
                prefix={<Lock className={`w-4 h-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-slate-400'
                }`} />}
                placeholder="Enter your password"
                size="large"
                className="rounded-lg"
                iconRender={(visible) => (visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />)}
              />
            </Form.Item>

            <div className="flex items-center justify-between">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>
                  Remember me
                </Checkbox>
              </Form.Item>
              <Link 
                to="/forgot-password" 
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                size="large"
                className={`w-full rounded-lg ${
                  isDarkMode 
                    ? 'bg-amber-600 hover:bg-amber-700 border-amber-600' 
                    : 'bg-slate-800 hover:bg-slate-900 border-slate-800'
                }`}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center mt-6">
            <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                Sign up here
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className={`mt-6 p-4 rounded-lg border transition-colors ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600' 
              : 'bg-gray-50 border-gray-200'
          }`}>
            <p className={`text-sm font-medium mb-2 transition-colors ${
              isDarkMode ? 'text-gray-300' : 'text-slate-700'
            }`}>Demo Credentials:</p>
            <p className={`text-xs transition-colors ${
              isDarkMode ? 'text-gray-400' : 'text-slate-500'
            }`}>
              Email: demo@couture.com<br />
              Password: demo123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;