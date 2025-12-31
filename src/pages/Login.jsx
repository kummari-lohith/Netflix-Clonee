import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
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
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const result = login(formData.email, formData.password);
      if (result.success) {
        navigate('/browse');
      }
    } catch (err) {
      setError('Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.navbar}>
        <div className={styles.logo}>NETFLIX</div>
      </div>

      <div className={styles.loginContent}>
        <div className={styles.loginBox}>
          <h1 className={styles.title}>Sign In</h1>
          
          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                placeholder="Email or phone number"
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
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                autoComplete="current-password"
              />
            </div>

            <button 
              type="submit" 
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className={styles.rememberMe}>
              <label>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className={styles.needHelp}>Need help?</a>
            </div>
          </form>

          <div className={styles.signupPrompt}>
            <span className={styles.newText}>New to Netflix? </span>
            <Link to="/signup" className={styles.signupLink}>
              Sign up now
            </Link>
          </div>

          <div className={styles.recaptcha}>
            This page is protected by Google reCAPTCHA to ensure you're not a bot.
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

export default Login;
