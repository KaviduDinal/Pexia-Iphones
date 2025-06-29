import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Mail, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface EmailVerificationProps {
  email: string;
  onClose: () => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ email, onClose }) => {
  const { verifyEmail, resendVerification, isLoading } = useAuth();
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [message, setMessage] = useState('');
  const [canResend, setCanResend] = useState(true);
  const [countdown, setCountdown] = useState(0);

  // Check for verification token in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      handleVerifyEmail(token);
    }
  }, []);

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleVerifyEmail = async (token: string) => {
    try {
      await verifyEmail(token);
      setVerificationStatus('success');
      setMessage('Email verified successfully! You can now access all features.');
      
      // Clear token from URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Auto close after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      setVerificationStatus('error');
      setMessage(error instanceof Error ? error.message : 'Verification failed');
    }
  };

  const handleResendVerification = async () => {
    try {
      await resendVerification(email);
      setMessage('Verification email sent! Please check your inbox.');
      setCanResend(false);
      setCountdown(60); // 60 seconds cooldown
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to resend verification email');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform animate-scale-in">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {verificationStatus === 'success' ? (
              <CheckCircle className="h-8 w-8 text-green-600" />
            ) : verificationStatus === 'error' ? (
              <AlertCircle className="h-8 w-8 text-red-600" />
            ) : (
              <Mail className="h-8 w-8 text-blue-600" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {verificationStatus === 'success' ? 'Email Verified!' : 'Verify Your Email'}
          </h2>
        </div>

        {/* Content */}
        <div className="p-6">
          {verificationStatus === 'pending' && (
            <>
              <p className="text-gray-600 text-center mb-6">
                We've sent a verification email to:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="font-semibold text-gray-900 text-center">{email}</p>
              </div>
              <p className="text-sm text-gray-500 text-center mb-6">
                Click the link in the email to verify your account. 
                If you don't see it, check your spam folder.
              </p>
            </>
          )}

          {message && (
            <div className={`p-4 rounded-lg mb-6 ${
              verificationStatus === 'success' 
                ? 'bg-green-50 text-green-800' 
                : verificationStatus === 'error'
                ? 'bg-red-50 text-red-800'
                : 'bg-blue-50 text-blue-800'
            }`}>
              <p className="text-sm text-center">{message}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {verificationStatus === 'pending' && (
              <button
                onClick={handleResendVerification}
                disabled={!canResend || isLoading}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                {canResend 
                  ? 'Resend Verification Email' 
                  : `Resend in ${countdown}s`
                }
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              {verificationStatus === 'success' ? 'Continue' : 'Close'}
            </button>
          </div>

          {verificationStatus === 'pending' && (
            <p className="text-xs text-gray-400 text-center mt-4">
              Verification link expires in 24 hours
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;