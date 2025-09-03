import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { registerUser } from '../store/slices/authSlice';
import { useTheme } from '../contexts/ThemeContext';

const SignupPage = () => {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (values) => {
    setLoading(true);
    
    try {
      const result = await dispatch(registerUser(values));
      if (result.type === 'auth/registerUser/fulfilled') {
        message.success('Account created successfully!');
        navigate('/');
      } else {
        message.error(result.payload || 'Registration failed');
      }
    } catch (error) {
      message.error('Registration failed');
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
            }`}>Create Account</h2>
            <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>
              Join us today and start your fashion journey
            </p>
          </div>

          <Form onFinish={handleSignup} layout="vertical" className="space-y-6">
            <Form.Item
              name="name"
              label={<span className={isDarkMode ? 'text-gray-300' : 'text-slate-700'}>Full Name</span>}
              rules={[{ required: true, message: 'Please enter your full name' }]}
            >
              <Input 
                prefix={<User className={`w-4 h-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-slate-400'
                }`} />}
                placeholder="Enter your full name"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

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
              rules={[
                { required: true, message: 'Please enter your password' },
                { min: 6, message: 'Password must be at least 6 characters' }
              ]}
            >
              <Input.Password
                prefix={<Lock className={`w-4 h-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-slate-400'
                }`} />}
                placeholder="Create a password"
                size="large"
                className="rounded-lg"
                iconRender={(visible) => (visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />)}
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label={<span className={isDarkMode ? 'text-gray-300' : 'text-slate-700'}>Confirm Password</span>}
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<Lock className={`w-4 h-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-slate-400'
                }`} />}
                placeholder="Confirm your password"
                size="large"
                className="rounded-lg"
                iconRender={(visible) => (visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />)}
              />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[{ required: true, message: 'Please accept the terms and conditions' }]}
            >
              <Checkbox className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>
                I agree to the{' '}
                <Link to="/terms" className="text-amber-600 hover:text-amber-700">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-amber-600 hover:text-amber-700">Privacy Policy</Link>
              </Checkbox>
            </Form.Item>

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
                Create Account
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center mt-6">
            <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;