import { client_url } from "@/config";

export const resetPasswordEmail = (email: string, token: string) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f3f4f6;
        color: #333;
      }
      .email-container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .email-header {
        background: linear-gradient(90deg, #4caf50, #81c784);
        color: #ffffff;
        padding: 25px;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
      }
      .email-body {
        padding: 20px;
      }
      .email-body h2 {
        color: #2e7d32;
        font-size: 20px;
        margin-bottom: 15px;
      }
      .email-body p {
        color: #555;
        line-height: 1.6;
        margin-bottom: 15px;
      }
      .reset-link {
        margin: 20px 0;
        padding: 15px;
        background: #f1f1f1;
        border: 1px dashed #ccc;
        border-radius: 5px;
        font-size: 14px;
        word-break: break-all;
        text-align: center;
        color: #2e7d32;
        font-family: monospace;
      }
      .btn {
        display: inline-block;
        margin: 20px auto;
        padding: 10px 20px;
        color: #ffffff;
        background: #4caf50;
        border-radius: 5px;
        text-decoration: none;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
      }
      .btn:hover {
        background: #388e3c;
      }
      .email-footer {
        text-align: center;
        padding: 15px;
        font-size: 14px;
        color: #888;
        background: #f9f9f9;
      }
      .email-footer a {
        color: #2e7d32;
        text-decoration: none;
      }
      .email-footer a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        Reset Your Password
      </div>
      <div class="email-body">
        <h2>Hello ${email},</h2>
        <p>We received a request to reset your password. You can reset your password by clicking the button below:</p>
        <a href="${client_url}/reset-password?token=${token}" class="btn">Reset Your Password</a>
        <p>If the button above doesn't work, you can copy and paste the following link into your browser:</p>
        <div class="reset-link">
          ${client_url}/reset-password?token=${token}
        </div>
        <p>If you did not request a password reset, please ignore this email or contact our support team for assistance.</p>
        <p>This link will expire in 10m for security reasons.</p>
      </div>
      <div class="email-footer">
        <p>Thank you,<a href="https://www.demo.com">https://www.demo.com</p>
        <p>Need help? Contact us at <a href="mailto:info@demo.com">info@demo.com</a></p>
      </div>
    </div>
  </body>
  </html>
`;
