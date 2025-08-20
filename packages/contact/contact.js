// DigitalOcean Function for handling contact form
// This can be deployed as a DigitalOcean Function

exports.main = async (args) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (args.__ow_method === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Extract form data
    const { name, email, phone, company, interest, message } = args;

    // Validate required fields
    if (!name || !email || !interest) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Please fill in all required fields.'
        })
      };
    }

    // Format email content
    const emailContent = `
New Contact Form Submission from The Reluctant Salesman Website

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Company: ${company || 'Not provided'}
Interest: ${interest}

Message:
${message || 'No message provided'}

---
Submitted: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
    `;

    // Using DigitalOcean's built-in email capabilities
    // You can use SendGrid, Mailgun, or SMTP with environment variables
    
    // Option 1: Using node-mailer with SMTP (recommended for DigitalOcean)
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@thereluctantsalesman.com',
      to: process.env.EMAIL_TO || 'terry@thereluctantsalesman.com',
      subject: `New Contact Form Submission - ${interest}`,
      text: emailContent,
      replyTo: email
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Thank you for your enquiry! We will respond within 24 hours.'
      })
    };

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Sorry, there was an error submitting your form. Please call us on 07795 835110.'
      })
    };
  }
};