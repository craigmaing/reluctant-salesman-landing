# Email Setup Instructions

The contact form is currently set up to handle submissions, but needs an email service configured to actually send emails to Terry's email address.

## Current Setup
- Form submissions are handled via `/api/contact` endpoint
- Form data is validated and formatted
- Currently logs submissions to console (for testing)

## To Enable Email Delivery

### Option 1: Formspree (Easiest - No Code Required)
1. Go to https://formspree.io
2. Sign up for free account
3. Create a new form
4. Replace the form action in ContactForm.astro:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
5. Formspree will handle sending emails to terry@thereluctantsalesman.com

### Option 2: Netlify Forms (If hosting on Netlify)
1. Add `netlify` attribute to form:
   ```html
   <form name="contact" method="POST" data-netlify="true">
   ```
2. Netlify automatically handles form submissions
3. Configure notifications in Netlify dashboard to send to terry@thereluctantsalesman.com

### Option 3: SendGrid (More Control)
1. Install SendGrid:
   ```bash
   npm install @sendgrid/mail
   ```
2. Sign up at https://sendgrid.com
3. Get API key
4. Create `.env` file:
   ```
   SENDGRID_API_KEY=your_api_key_here
   ```
5. Uncomment the SendGrid code in `/src/pages/api/contact.ts`

### Option 4: Resend (Modern Alternative)
1. Install Resend:
   ```bash
   npm install resend
   ```
2. Sign up at https://resend.com
3. Get API key
4. Update `/src/pages/api/contact.ts`:
   ```typescript
   import { Resend } from 'resend';
   const resend = new Resend(process.env.RESEND_API_KEY);
   
   await resend.emails.send({
     from: 'onboarding@resend.dev',
     to: 'terry@thereluctantsalesman.com',
     subject: 'New Contact Form Submission',
     text: emailBody,
   });
   ```

## Testing
Currently, form submissions will:
1. Show a loading state
2. Log to browser console
3. Display success message
4. Clear the form

## Security Notes
- Never commit API keys to git
- Use environment variables for sensitive data
- Consider adding reCAPTCHA for spam protection