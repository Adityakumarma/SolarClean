import React, { useState, useMemo } from 'react';
import { changePassword } from '../services/api';

export default function FirstLoginModal({ open, onClose, onSuccess }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const checks = useMemo(() => {
    return {
      len: newPassword.length >= 8,
      upper: /[A-Z]/.test(newPassword),
      num: /[0-9]/.test(newPassword),
      match: newPassword && newPassword === confirmPassword,
    };
  }, [newPassword, confirmPassword]);

  const strength = useMemo(() => {
    const pass = Object.values(checks).filter(Boolean).length;
    const levels = [
      { val: 0, label: '', color: '#ef4444' },
      { val: 25, label: 'Weak', color: '#f97316' },
      { val: 50, label: 'Fair', color: '#eab308' },
      { val: 75, label: 'Good', color: '#84cc16' },
      { val: 100, label: 'Strong', color: '#22c55e' },
    ];
    return levels[pass] || levels[0];
  }, [checks]);

  const canSubmit = currentPassword && Object.values(checks).every(Boolean);

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError('');
    try {
      await changePassword(currentPassword, newPassword);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Password change failed');
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1300,
        padding: '16px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '360px',
          boxShadow: '0 20px 25px rgba(0,0,0,0.15)',
          overflow: 'hidden',
          animation: 'slideUp 0.2s ease-out',
        }}
      >
        <style>{`
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          input {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }
          input::placeholder { color: #9ca3af; }
          input:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
        `}</style>

        {/* Header */}
        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ margin: '0 0 6px', fontSize: '20px', fontWeight: '600', color: '#1f2937' }}>
            Secure your account
          </h2>
          <p style={{ margin: 0, fontSize: '13px', color: '#6b7280', lineHeight: '1.4' }}>
            Create a strong password
          </p>
        </div>

        {/* Content */}
        <div style={{ padding: '16px 24px', overflow: 'auto', flex: 1 }}>
          {error && (
            <div
              style={{
                background: '#fee2e2',
                border: '1px solid #fecaca',
                color: '#991b1b',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                marginBottom: '12px',
              }}
            >
              {error}
            </div>
          )}

          {/* Current Password */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
              Current password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  setError('');
                }}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '8px 10px 8px 10px',
                  fontSize: '14px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  boxSizing: 'border-box',
                  background: loading ? '#f3f4f6' : 'white',
                  color: loading ? '#9ca3af' : '#1f2937',
                  paddingRight: '36px',
                }}
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                disabled={loading}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '18px',
                  padding: '4px',
                  opacity: loading ? 0.5 : 0.6,
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => !loading && (e.target.style.opacity = '1')}
                onMouseLeave={(e) => !loading && (e.target.style.opacity = '0.6')}
              >
                {showCurrent ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
              New password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setError('');
                }}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '8px 10px 8px 10px',
                  fontSize: '14px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  boxSizing: 'border-box',
                  background: loading ? '#f3f4f6' : 'white',
                  color: loading ? '#9ca3af' : '#1f2937',
                  paddingRight: '36px',
                }}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                disabled={loading}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '18px',
                  padding: '4px',
                  opacity: loading ? 0.5 : 0.6,
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => !loading && (e.target.style.opacity = '1')}
                onMouseLeave={(e) => !loading && (e.target.style.opacity = '0.6')}
              >
                {showNew ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>

            {/* Strength Meter */}
            {newPassword && (
              <div style={{ marginTop: '8px' }}>
                <div style={{ display: 'flex', justify: 'space-between', align: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: '500' }}>Strength</span>
                  <span style={{ fontSize: '11px', fontWeight: '600', color: strength.color }}>
                    {strength.label}
                  </span>
                </div>
                <div style={{ height: '5px', background: '#e5e7eb', borderRadius: '2px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${strength.val}%`,
                      background: strength.color,
                      transition: 'width 0.2s ease',
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
              Confirm password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError('');
                }}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '8px 10px 8px 10px',
                  fontSize: '14px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  boxSizing: 'border-box',
                  background: loading ? '#f3f4f6' : 'white',
                  color: loading ? '#9ca3af' : '#1f2937',
                  paddingRight: '36px',
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                disabled={loading}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '18px',
                  padding: '4px',
                  opacity: loading ? 0.5 : 0.6,
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => !loading && (e.target.style.opacity = '1')}
                onMouseLeave={(e) => !loading && (e.target.style.opacity = '0.6')}
              >
                {showConfirm ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Requirements */}
          {newPassword && (
            <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '12px' }}>
              <p style={{ margin: '0 0 10px', fontSize: '11px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                Requirements
              </p>
              <div style={{ display: 'grid', gap: '6px' }}>
                {[
                  { check: checks.len, label: '8+ characters' },
                  { check: checks.upper, label: 'Uppercase letter' },
                  { check: checks.num, label: 'Number (0-9)' },
                  { check: checks.match, label: 'Passwords match' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', align: 'center', gap: '6px' }}>
                    <span
                      style={{
                        width: '16px',
                        height: '16px',
                        display: 'flex',
                        align: 'center',
                        justify: 'center',
                        fontSize: '12px',
                        color: item.check ? '#22c55e' : '#d1d5db',
                        fontWeight: 'bold',
                        flexShrink: 0,
                      }}
                    >
                      {item.check ? '✓' : '○'}
                    </span>
                    <span
                      style={{
                        fontSize: '12px',
                        color: item.check ? '#374151' : '#9ca3af',
                        fontWeight: item.check ? '500' : '400',
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 24px 16px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '10px', justify: 'flex-end' }}>
          <button
            onClick={onClose}
            disabled={loading}
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: '500',
              border: '1px solid #d1d5db',
              background: 'white',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              color: loading ? '#9ca3af' : '#374151',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!loading) e.target.style.background = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              if (!loading) e.target.style.background = 'white';
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || loading}
            style={{
              padding: '8px 18px',
              fontSize: '13px',
              fontWeight: '600',
              border: 'none',
              background: canSubmit && !loading ? '#059669' : '#d1d5db',
              color: 'white',
              borderRadius: '6px',
              cursor: canSubmit && !loading ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (canSubmit && !loading) e.target.style.background = '#047857';
            }}
            onMouseLeave={(e) => {
              if (canSubmit && !loading) e.target.style.background = '#059669';
            }}
          >
            {loading ? 'Setting...' : 'Set password'}
          </button>
        </div>
      </div>
    </div>
  );
}