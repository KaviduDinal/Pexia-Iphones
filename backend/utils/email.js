import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send verification email
export const sendVerificationEmail = async (email, name, token) => {
  try {
    const transporter = createTransport();
    
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    
    const mailOptions = {
      from: `"Pexia" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verify Your Email - Pexia',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #3B82F6; margin: 0;">Pexia</h1>
            <p style="color: #6B7280; margin: 5px 0;">India's #1 iPhone Marketplace</p>
          </div>
          
          <div style="background: #F9FAFB; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #1F2937; margin-top: 0;">Welcome to Pexia, ${name}!</h2>
            <p style="color: #4B5563; line-height: 1.6;">
              Thank you for joining Pexia. To complete your registration and start exploring amazing iPhone deals, 
              please verify your email address by clicking the button below.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); 
                        color: white; 
                        padding: 12px 30px; 
                        text-decoration: none; 
                        border-radius: 8px; 
                        font-weight: bold;
                        display: inline-block;">
                Verify Email Address
              </a>
            </div>
            
            <p style="color: #6B7280; font-size: 14px; margin-bottom: 0;">
              If the button doesn't work, copy and paste this link into your browser:<br>
              <a href="${verificationUrl}" style="color: #3B82F6;">${verificationUrl}</a>
            </p>
          </div>
          
          <div style="text-align: center; color: #9CA3AF; font-size: 12px;">
            <p>This verification link will expire in 24 hours.</p>
            <p>If you didn't create an account with Pexia, please ignore this email.</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully to:', email);
    
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};