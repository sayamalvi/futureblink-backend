export async function loginEmail(
    userName: string,
    magicLink: string,
    email: string,
) {
    const html = `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #4CAF50; text-align: center;">Welcome to Saudebazi!</h2>
          <p>Hello ${userName},</p>
          <p>You requested to log in to your Saudebazi dashboard. Click the button below to securely access your account:</p>
          
          <div style="text-align: center; margin: 20px 0;">
            <a href="${magicLink}" style="padding: 12px 24px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">
              Log in to Dashboard
            </a>
          </div>
          
          <p>If the button above doesn't work, you can also click the following link or paste it into your browser:</p>
          <p><a href="${magicLink}" style="color: #4CAF50;">${magicLink}</a></p>
          
          <p>Thank you for choosing Saudebazi. If you did not request this email, please ignore it.</p>
          <p>Best regards,<br />The Saudebazi Team</p>
        </div>
      </body>
    </html>
  `;
    const subject = 'Log in to your Saudebazi dashboard';
    const to = email;
    return {
        html,
        subject,
        to,
    };
}
