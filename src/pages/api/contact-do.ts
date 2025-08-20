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

    // Store the submission data
    const submission = {
      name,
      email,
      phone,
      company,
      interest,
      message,
      timestamp: new Date().toISOString(),
      source: 'landing-page'
    };

    // For DigitalOcean App Platform, we can:
    // 1. Log to the console (visible in DO logs)
    // 2. Store in environment variable or database
    // 3. Send to a webhook endpoint
    
    console.log('=== NEW CONTACT FORM SUBMISSION ===');
    console.log(JSON.stringify(submission, null, 2));
    console.log('=====================================');

    // If you have a DO Managed Database, you could store it there
    // Or send to a DO Spaces bucket, etc.

    // For now, we'll return success and log it
    // You can view these logs in DigitalOcean App Platform console
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you for your enquiry! We have received your message and will respond within 24 hours.',
        data: submission
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
        message: 'Sorry, there was an error submitting your form. Please try again or contact us directly at terry@thereluctantsalesman.com'
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