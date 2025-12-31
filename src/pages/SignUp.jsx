import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './SignUp.module.css';

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      const result = signUp(formData.email, formData.password, formData.name);
      if (result.success) {
        navigate('/browse');
      }
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.navbar}>
        <div className={styles.logo}>NETFLIX</div>
        <Link to="/login" className={styles.signinBtn}>Sign In</Link>
      </div>

      <div className={styles.signupContent}>
        <div className={styles.signupBox}>
          <h1 className={styles.title}>Create Your Account</h1>
          <p className={styles.subtitle}>
            Join millions of users watching unlimited movies and TV shows.
          </p>
          
          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                autoComplete="name"
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                autoComplete="email"
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="password"
                name="password"
                placeholder="Password (min. 6 characters)"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                autoComplete="new-password"
              />
            </div>

            <button 
              type="submit" 
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className={styles.loginPrompt}>
            <span className={styles.existingText}>Already have an account? </span>
            <Link to="/login" className={styles.loginLink}>
              Sign in now
            </Link>
          </div>

          <div className={styles.terms}>
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <p>Questions? Call 000-800-919-1694</p>
          <div className={styles.footerLinks}>
            <a href="#">FAQ</a>
            <a href="#">Help Centre</a>
            <a href="#">Terms of Use</a>
            <a href="#">Privacy</a>
            <a href="#">Cookie Preferences</a>
            <a href="#">Corporate Information</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
