import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Form, Input, Button, Tabs, message } from 'antd';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { loginUser, registerUser } from '../../store/slices/authSlice';
import { useTheme } from '../../contexts/ThemeContext';

const AuthModals = ({ isOpen, onClose, defaultTab = 'login' }) => {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    setLoading(true);
    
    try {
      const result = await dispatch(loginUser(values));
      if (result.type === 'auth/loginUser/fulfilled') {
        message.success('Login successful!');
        onClose();
      } else {
        message.error(result.payload || 'Login failed');
      }
    } catch (error) {
      message.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (values) => {
    setLoading(true);
    
    try {
      const result = await dispatch(registerUser(values));
      if (result.type === 'auth/registerUser/fulfilled') {
        message.success('Account created successfully!');
        onClose();
      } else {
        message.error(result.payload || 'Registration failed');
      }
    } catch (error) {
      message.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const loginForm = (
    <Form onFinish={handleLogin} layout="vertical" className="space-y-4">
      <Form.Item
        name="email"
        label="Email"
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
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please enter your password' }]}
      >
        <Input.Password
          prefix={<Lock className={`w-4 h-4 ${
            isDarkMode ? 'text-gray-400' : 'text-slate-400'
          }`} />}
          placeholder="Enter your password"
          size="large"
          iconRender={(visible) => (visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />)}
        />
      </Form.Item>

      <div className="flex items-center justify-between mb-4">
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <input type="checkbox" className="rounded border-gray-300 text-amber-500 focus:ring-amber-500" />
          <span className={`ml-2 text-sm transition-colors ${
            isDarkMode ? 'text-gray-300' : 'text-slate-600'
          }`}>Remember me</span>
        </Form.Item>
        <Link 
          to="/forgot-password" 
          onClick={onClose}
          className="text-sm text-amber-600 hover:text-amber-700 font-medium"
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
          className={`w-full ${
            isDarkMode 
              ? 'bg-amber-600 hover:bg-amber-700 border-amber-600' 
              : 'bg-slate-800 hover:bg-slate-900 border-slate-800'
          }`}
        >
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );

  const signupForm = (
    <Form onFinish={handleSignup} layout="vertical" className="space-y-4">
      <Form.Item
        name="name"
        label="Full Name"
        rules={[{ required: true, message: 'Please enter your full name' }]}
      >
        <Input 
          prefix={<User className={`w-4 h-4 ${
            isDarkMode ? 'text-gray-400' : 'text-slate-400'
          }`} />}
          placeholder="Enter your full name"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
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
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
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
          iconRender={(visible) => (visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />)}
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
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
          iconRender={(visible) => (visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />)}
        />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[{ required: true, message: 'Please accept the terms and conditions' }]}
      >
        <div className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-amber-500 focus:ring-amber-500" />
          <span className={`ml-2 text-sm transition-colors ${
            isDarkMode ? 'text-gray-300' : 'text-slate-600'
          }`}>
            I agree to the <a href="#" className="text-amber-600 hover:text-amber-700">Terms</a> and{' '}
            <a href="#" className="text-amber-600 hover:text-amber-700">Privacy Policy</a>
          </span>
        </div>
      </Form.Item>

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          loading={loading}
          size="large"
          className={`w-full ${
            isDarkMode 
              ? 'bg-amber-600 hover:bg-amber-700 border-amber-600' 
              : 'bg-slate-800 hover:bg-slate-900 border-slate-800'
          }`}
        >
          Create Account
        </Button>
      </Form.Item>
    </Form>
  );

  const tabItems = [
    {
      key: 'login',
      label: 'Sign In',
      children: (
        <div>
          <div className="text-center mb-6">
            <h2 className={`text-2xl font-bold mb-2 transition-colors ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>Welcome Back</h2>
            <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>Sign in to your account</p>
          </div>
          {loginForm}
        </div>
      ),
    },
    {
      key: 'signup',
      label: 'Sign Up',
      children: (
        <div>
          <div className="text-center mb-6">
            <h2 className={`text-2xl font-bold mb-2 transition-colors ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>Create Account</h2>
            <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>Join us today</p>
          </div>
          {signupForm}
        </div>
      ),
    },
  ];

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={500}
      centered
      className="auth-modal"
    >
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        items={tabItems}
        centered
        className="auth-tabs"
      />
    </Modal>
  );
};

export default AuthModals;