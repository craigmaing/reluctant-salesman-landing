import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    
    const name = data.get('name');
    const email = data.get('email');
    const phone = data.get('phone') || 'Not provided';
    const company = data.get('company') || 'Not provided';
    const interest = data.get('interest');
    const message = data.get('message') || 'No message';

    // Create email content
    const emailContent = `
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
    `.trim();

    // Log to DigitalOcean console (you can see this in Runtime Logs)
    console.log('=== NEW CONTACT FORM SUBMISSION ===');
    console.log(emailContent);
    console.log('=====================================');

    // Use Web3Forms API (free, no account needed for basic use)
    // Or replace with your preferred email service
    const web3FormsEndpoint = 'https://api.web3forms.com/submit';
    
    // You need to get a free access key from https://web3forms.com
    // For now, using a temporary solution
    const web3FormsData = {
      access_key: process.env.WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE',
      to_email: 'terry@thereluctantsalesman.com',
      subject: `New Contact Form Submission - ${interest}`,
      from_name: name,
      from_email: email,
      message: emailContent,
      redirect: '',
      botcheck: false
    };

    // Try to send email
    if (process.env.WEB3FORMS_KEY) {
      try {
        const emailResponse = await fetch(web3FormsEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(web3FormsData)
        });

        const emailResult = await emailResponse.json();
        console.log('Email send result:', emailResult);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Continue even if email fails - we still have the log
      }
    }

    // Alternative: Send to a webhook (if you have Zapier, Make, or IFTTT)
    if (process.env.WEBHOOK_URL) {
      try {
        await fetch(process.env.WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            phone,
            company,
            interest,
            message,
            timestamp: new Date().toISOString()
          })
        });
      } catch (webhookError) {
        console.error('Webhook failed:', webhookError);
      }
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you for your enquiry! We have received your message and will respond within 24 hours.'
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
        message: 'Sorry, there was an error submitting your form. Please call us directly at 07795 835110.'
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