import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiX } from 'react-icons/fi';
import '../styles/Auth.css'
const SigninPopup = ({ onClose }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: false

  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!form.email.includes('@')) newErrors.email = 'Invalid email';
    if (form.password.length < 6) newErrors.password = 'Password must be 6+ characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Signin form submitted:', form);
    onClose(); // Close popup after successful login
  };

  return (
    <div className="popup-overlay">
      <div className="signin-popup">
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>
          <FiX />
        </button>

        {/* Header */}
        <div className="logo-header">
          <span className="logo-text">HD</span>
        </div>

        <h2>Sign in</h2>
        <p>Please login to continue to your account</p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className={`input-group ${errors.email ? 'error' : ''}`}>
            <FiMail className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className={`input-group ${errors.password ? 'error' : ''}`}>
            <FiLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <button 
              type="button" 
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          {/* Options */}
          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
              />
              <span>Keep me logged in</span>
            </label>
            <a href="#forgot" className="forgot-password">Forgot password?</a>
          </div>

          {/* Submit Button */}
          <button type="submit" className="primary-btn">
            Sign In <FiArrowRight />
          </button>
        </form>

        {/* Divider */}
        <div className="divider">
          <span>or</span>
        </div>

        {/* Google Signin */}
        <button className="google-btn">
          <FcGoogle /> Sign in with Google
        </button>

        {/* Signup Link */}
        <p className="auth-footer">
          Need an account?{' '}
          <a href="#signup" className="auth-link">Create one</a>
        </p>
      </div>
    </div>
  );
};

export default SigninPopup;