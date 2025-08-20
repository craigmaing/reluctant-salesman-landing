# Deployment Instructions for DigitalOcean

## Prerequisites
1. GitHub repository is set up at: `craigmaing/reluctant-salesman-landing`
2. DigitalOcean account with API token
3. Resend account for email forwarding (or alternative email service)

## Step 1: Set up Email Service (Resend)

1. Sign up for Resend at https://resend.com
2. Verify your domain (thereluctantsalesman.com)
3. Get your API key from https://resend.com/api-keys
4. Update the `.env.production` file with your Resend API key

## Step 2: Deploy to DigitalOcean App Platform

### Option A: Using DigitalOcean Dashboard (Recommended)

1. Go to https://cloud.digitalocean.com/apps
2. Click "Create App"
3. Choose "GitHub" as source
4. Authorize DigitalOcean to access your GitHub
5. Select repository: `craigmaing/reluctant-salesman-landing`
6. Select branch: `master`
7. Configure the app:
   - **App name**: reluctant-salesman
   - **Region**: London (lon)
   - **Type**: Static Site
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
8. Add Environment Variables:
   - `RESEND_API_KEY`: Your Resend API key (mark as secret)
   - `PUBLIC_SITE_URL`: https://thereluctantsalesman.com
9. Click "Create Resources"

### Option B: Using doctl CLI

```bash
# Install doctl from: https://docs.digitalocean.com/reference/doctl/how-to/install/

# Authenticate
doctl auth init -t YOUR_DIGITALOCEAN_API_TOKEN

# Create the app
doctl apps create --spec app-spec.yaml
```

## Step 3: Configure Custom Domain

1. In DigitalOcean App Platform:
   - Go to Settings → Domains
   - Add domain: thereluctantsalesman.com
   - Add domain: www.thereluctantsalesman.com

2. Update DNS records at your domain registrar:
   - Add CNAME record: `@` → `your-app.ondigitalocean.app`
   - Add CNAME record: `www` → `your-app.ondigitalocean.app`

## Step 4: Set up Contact Form

The contact form uses Resend for email forwarding. Make sure:

1. Resend API key is set in environment variables
2. Domain is verified in Resend
3. Update `src/pages/api/contact.ts` if needed:
   - Change `from` email to use your verified domain
   - Update `to` email if needed

## Step 5: Test the Deployment

1. Visit your app URL
2. Test the contact form
3. Check that emails are being received
4. Verify all pages load correctly

## Monitoring

- View app logs: https://cloud.digitalocean.com/apps/[app-id]/logs
- Monitor deployments: https://cloud.digitalocean.com/apps/[app-id]/deployments
- Check metrics: https://cloud.digitalocean.com/apps/[app-id]/insights

## Automatic Deployments

With `deploy_on_push: true`, any push to the `master` branch will automatically trigger a new deployment.

## Troubleshooting

### Contact form not working
1. Check Resend API key is correct
2. Verify domain in Resend dashboard
3. Check app logs for errors

### Build failures
1. Check build logs in DigitalOcean dashboard
2. Ensure all dependencies are in package.json
3. Test build locally with `npm run build`

### Domain not working
1. Allow 24-48 hours for DNS propagation
2. Verify DNS records are correct
3. Check SSL certificate status in app settings