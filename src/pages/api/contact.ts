import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// Initialize Resend with API key from environment variable
const resend = new Resend(import.meta.env.RESEND_API_KEY || 'your-resend-api-key');

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    
    const name = data.get('name');
    const email = data.get('email');
    const phone = data.get('phone') || 'Not provided';
    const company = data.get('company') || 'Not provided';
    const interest = data.get('interest');
    const message = data.get('message') || 'No message';

    // For production, you would integrate with an email service like:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Resend
    // - Or use a form service like Formspree, Netlify Forms, etc.

    // For now, we'll create a simple email template
    const emailBody = `
New Contact Form Submission from The Reluctant Salesman Website

Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${company}
Interest: ${interest}

Message:
${message}

---
Sent from: ${new Date().toLocaleString()}
    `;

    // Send email using Resend
    try {
      await resend.emails.send({
        from: 'The Reluctant Salesman <onboarding@resend.dev>', // Use your verified domain when in production
        to: 'terry@thereluctantsalesman.com',
        subject: `New Contact Form Submission - ${interest}`,
        text: emailBody,
        reply_to: email as string,
      });
      
      console.log('Email sent successfully to terry@thereluctantsalesman.com');
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue even if email fails - we've logged it
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you for your enquiry! We will respond within 24 hours.'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Form submission error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Sorry, there was an error submitting your form. Please try again or contact us directly.'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};