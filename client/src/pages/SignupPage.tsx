import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCalendar, FiArrowRight } from 'react-icons/fi';
import SigninPopup from './SigninPage';
import '../styles/Auth.css'

const SignupPage = () => {
  const [form, setForm] = useState({
    name: '',
    dob: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSignin, setShowSignin] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!form.name) newErrors.name = 'Name is required';
    if (!form.dob) newErrors.dob = 'Date of birth is required';
    if (!form.email.includes('@')) newErrors.email = 'Invalid email';
    if (form.password.length < 6) newErrors.password = 'Password must be 6+ characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Signup form submitted:', form);
    // API call would go here
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        {/* Header */}
        <div className="logo-header">
          <span className="logo-text">HD</span>
        </div>

        <h1 className="auth-heading">Sign up</h1>
        <p className="auth-subtext">Sign up to enjoy the features of HD</p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className={`input-group ${errors.name ? 'error' : ''}`}>
            <FiUser className="input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          {/* Date of Birth */}
          <div className={`input-group ${errors.dob ? 'error' : ''}`}>
            <FiCalendar className="input-icon" />
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
            />
            {errors.dob && <span className="error-text">{errors.dob}</span>}
          </div>

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

          {/* Submit Button */}
          <button type="submit" className="primary-btn">
            Sign Up <FiArrowRight />
          </button>
        </form>

        {/* Divider */}
        <div className="divider">
          <span>or</span>
        </div>

        {/* Google Signup */}
        <button className="google-btn">
          <FcGoogle /> Continue with Google
        </button>

        {/* Signin Link */}
        <p className="auth-footer">
          Already have an account?{' '}
          <button 
            type="button" 
            className="auth-link"
            onClick={() => setShowSignin(true)}
          >
            Sign in
          </button>
        </p>
      </div>

      {/* Signin Popup */}
      {showSignin && <SigninPopup onClose={() => setShowSignin(false)} />}
    </div>
  );
};

export default SignupPage;