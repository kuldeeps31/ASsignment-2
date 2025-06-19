import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FcGoogle } from 'react-icons/fc';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiX } from 'react-icons/fi';
import '../styles/Auth.css';

type Props = {
  onClose: () => void;
};

const SigninPopup: React.FC<Props> = ({ onClose }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!form.email.includes('@')) newErrors.email = 'Invalid email';
    if (form.password.length < 6) newErrors.password = 'Password must be 6+ characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await fetch('http://localhost:9000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          rememberMe: form.remember,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Login failed');
        return;
      }

      toast.success('Login successful');
      localStorage.setItem('token', data.token);
      setTimeout(() => {
        onClose();
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Login Error:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="popup-overlay">
      <ToastContainer />
      <div className="signin-popup">
        <button className="close-btn" onClick={onClose}><FiX /></button>
        <div className="logo-header"><span className="logo-text">HD</span></div>
        <h2>Sign in</h2>
        <p>Please login to continue to your account</p>

        <form onSubmit={handleSubmit}>
          <div className={`input-group ${errors.email ? 'error' : ''}`}>
            <FiMail className="input-icon" />
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className={`input-group ${errors.password ? 'error' : ''}`}>
            <FiLock className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" name="remember" checked={form.remember} onChange={handleChange} />
              <span>Keep me logged in</span>
            </label>
            <a href="#forgot" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="primary-btn">
            Sign In <FiArrowRight />
          </button>
        </form>

        <div className="divider"><span>or</span></div>

        <a href="http://localhost:9000/api/auth/google">
          <button className="google-btn">
            <FcGoogle /> Sign in with Google
          </button>
        </a>

        <p className="auth-footer">
          Need an account?{' '}
          <a href="#signup" className="auth-link">Create one</a>
        </p>
      </div>
    </div>
  );
};

export default SigninPopup;
