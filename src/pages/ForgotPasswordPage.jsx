import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [sent, setSent] = useState(false); // true = show email form, false = show reset form
  const [tokenInvalid, setTokenInvalid] = useState(false);

  // ✅ 1. Send reset email
  const handleSubmit = async (values) => {
    const { email } = values;

    try {
      setLoading(true);

      const response = await axios.post("http://localhost:5000/api/auth/forget-password", {
        email,
      });

      if (response.data?.success || response.status === 200) {
        message.success("Password reset email sent successfully!");
        setEmailSent(true);
      } else {
        message.warning(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error sending reset email:", error);
      message.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ 2. Reset password with token
// ✅ 2. Reset password with token (FIXED)
const resetPassword = async (values) => {
  const { password } = values;
  const token = searchParams.get("token"); // from URL

  if (!token) {
    return message.error("Reset token missing from URL");
  }

  try {
    setLoading(true);

    // 👇 *** THE MAIN CHANGE IS HERE ***
    // Send both the password AND the token in the request body.
    // Remove the separate "headers" object.
    await axios.post(
      "http://localhost:5000/api/auth/reset-password",
      { password, token } // <-- Add the token to the body
    );

    message.success("Password reset successful!");
    navigate("/login");
  } catch (error) {
    console.error("Reset error:", error);
    // Now, if the token is invalid, this error message from the backend will show
    message.error(error?.response?.data?.message || "Reset failed");
  } finally {
    console.log("Hogya ")
    setLoading(false);
  }
};  


  // ✅ 3. Validate token on load
  useEffect(() => {
    if (token) {


      checkToken(token);
      console.log(token,"yyy")
      setSent(false); // show reset form
    } else {
console.log("no")
      setSent(true);
      // navigate("/login") // show email form
    }
  }, [token]);

 const checkToken = async () => {
  const token = searchParams.get("token");

  if (!token) {
    setSent(true);
    return;
  }

  try {
    await axios.post(
      "https://backend-2-rngp.onrender.com/api/auth/forget-session",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSent(false); // token valid
  } catch (error) {
    setSent(true); // invalid or expired
    console.error("Token invalid or expired:", error);
  }
};


  // ✅ 4. After sending reset email
  if (emailSent) {
    return (
      <div className={`min-h-screen flex items-center justify-center py-12 px-4 transition-colors duration-300 ${
        isDarkMode ? 'from-gray-900 to-gray-800' : 'from-slate-50 to-slate-100'
      }`}>
        <div className="max-w-md w-full space-y-8">
          <div className={`rounded-2xl shadow-xl p-8 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Check Your Email
            </h2>
            <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>
              We've sent a password reset link to your email address. Please check your inbox.
            </p>

            <div className="space-y-4 mt-6">
              <Link to="/">
                <Button type="primary" size="large" className={`w-full ${
                  isDarkMode ? 'bg-amber-600 hover:bg-amber-700 border-amber-600' : 'bg-slate-800 hover:bg-slate-900 border-slate-800'
                }`}>
                  Back to Home
                </Button>
              </Link>
              <button onClick={() => setEmailSent(false)} className="w-full text-amber-600 hover:text-amber-700 font-medium">
                Didn't receive email? Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ 5. Render Email Form or Reset Password Form
  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 transition-colors duration-300 ${
      isDarkMode ? 'from-gray-900 to-gray-800' : 'from-slate-50 to-slate-100'
    }`}>
      <div className="max-w-md w-full space-y-8">
        <div className={`rounded-2xl shadow-xl p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <Link to="/" className={`flex items-center mb-8 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-amber-600" />
            </div>
            <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Forgot Password?
            </h2>
            <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>
              {sent ? 'Enter your email to receive reset link.' : 'Enter a new password.'}
            </p>

            {tokenInvalid && (
              <div className="text-red-500 text-sm mt-2">
                The reset link is invalid or expired. Please try again.
              </div>
            )}
          </div>

          <Form
            onFinish={sent ? handleSubmit : resetPassword}
            layout="vertical"
            className="space-y-6"
          >
            {sent ? (
              <>
                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input 
                    prefix={<Mail className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-slate-400'}`} />}
                    placeholder="Enter your email"
                    size="large"
                    className="rounded-lg"
                  />
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item
                  name="password"
                  label="New Password"
                  rules={[{ required: true, message: 'Please enter your new password' }]}
                  hasFeedback
                >
                  <Input.Password placeholder="Enter new password" size="large" className="rounded-lg" />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    { required: true, message: 'Please confirm your password' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Passwords do not match!'));
                      }
                    })
                  ]}
                >
                  <Input.Password placeholder="Confirm your password" size="large" className="rounded-lg" />
                </Form.Item>
              </>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                className={`w-full rounded-lg ${isDarkMode ? 'bg-amber-600 hover:bg-amber-700 border-amber-600' : 'bg-slate-800 hover:bg-slate-900 border-slate-800'}`}
              >
                {loading ? 'Processing...' : sent ? 'Send Reset Link' : 'Reset Password'}
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center mt-6">
            <p className={isDarkMode ? 'text-gray-300' : 'text-slate-600'}>
              Remember your password?{' '}
              <button onClick={() => navigate("/login")} className="text-amber-600 hover:text-amber-700 font-medium">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
