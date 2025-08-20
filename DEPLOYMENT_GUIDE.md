# Deployment Guide for The Reluctant Salesman Landing Page

## ✅ What's Complete

### 1. SEO Setup
- ✅ Robots.txt configured for search engines
- ✅ Sitemap.xml automatically generated
- ✅ Structured data (Schema.org) for rich snippets
- ✅ Meta tags for social media sharing
- ✅ Open Graph and Twitter Card tags

### 2. Email Backend
- ✅ Contact form API endpoint created
- ✅ Resend integration configured
- ✅ Form validation and error handling
- ✅ Email templates ready

### 3. GitHub Repository
- ✅ Code pushed to: https://github.com/craigmaing/reluctant-salesman-landing
- ✅ All components and pages included
- ✅ Ready for deployment

## 🚀 Deploy to DigitalOcean App Platform

### Step 1: Access DigitalOcean
1. Go to https://cloud.digitalocean.com/apps
2. Click "Create App"

### Step 2: Connect GitHub Repository
1. Select "GitHub" as source
2. Authorize DigitalOcean to access your GitHub
3. Select repository: `craigmaing/reluctant-salesman-landing`
4. Branch: `master`
5. Enable "Autodeploy" for automatic updates

### Step 3: Configure Build Settings
- **Type**: Static Site
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Step 4: Environment Variables
Add these in the DigitalOcean dashboard:

```
RESEND_API_KEY=<get-from-resend.com>
PUBLIC_SITE_URL=https://thereluctantsalesman.com
```

### Step 5: Review and Deploy
1. Select region: London (LON)
2. Choose plan: Basic ($0/month for static sites)
3. Name your app: `reluctant-salesman`
4. Click "Create Resources"

## 📧 Setting Up Email (Resend)

### Step 1: Create Resend Account
1. Go to https://resend.com/signup
2. Sign up for free account (100 emails/day free)

### Step 2: Verify Domain
1. Add your domain: thereluctantsalesman.com
2. Add DNS records as shown by Resend:
   - SPF record
   - DKIM records
   - Optional: DMARC record

### Step 3: Get API Key
1. Go to API Keys section
2. Create new API key
3. Copy and save securely

### Step 4: Update DigitalOcean
1. Go to your app settings
2. Add environment variable:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```
3. Redeploy app

## 🌐 Custom Domain Setup

### In DigitalOcean:
1. Go to your app's Settings
2. Click "Domains"
3. Add domain: `thereluctantsalesman.com`
4. Add domain: `www.thereluctantsalesman.com`

### In Your Domain Provider:
Add these DNS records:

```
Type: A
Name: @
Value: <DigitalOcean provides this>

Type: CNAME
Name: www
Value: <DigitalOcean provides this>
```

### SSL Certificate
- DigitalOcean automatically provisions Let's Encrypt SSL
- Takes 5-10 minutes after domain verification

## 📊 Analytics Setup (Optional)

### Google Analytics
1. Get tracking ID from Google Analytics
2. Add to Layout.astro before </head>:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔍 Post-Deployment Checklist

### Testing
- [ ] Contact form sends emails to terry@thereluctantsalesman.com
- [ ] All pages load correctly
- [ ] Mobile responsive design works
- [ ] Images load properly
- [ ] SSL certificate active

### SEO Verification
- [ ] Submit sitemap to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Verify robots.txt is accessible
- [ ] Check structured data with Google's testing tool

### Performance
- [ ] Run Google PageSpeed Insights
- [ ] Check Core Web Vitals
- [ ] Verify fast loading times

## 🛠 Maintenance

### Updating Content
1. Make changes locally
2. Test with `npm run dev`
3. Commit and push to GitHub
4. DigitalOcean auto-deploys within 2-3 minutes

### Monitoring
- DigitalOcean provides basic monitoring
- Set up uptime monitoring (e.g., UptimeRobot)
- Monitor email delivery in Resend dashboard

## 📞 Support Contacts

### DigitalOcean
- Dashboard: https://cloud.digitalocean.com
- Support: https://www.digitalocean.com/support

### Resend
- Dashboard: https://resend.com/emails
- Documentation: https://resend.com/docs

### GitHub Repository
- https://github.com/craigmaing/reluctant-salesman-landing

## 💰 Costs

### Current Setup (Minimal)
- DigitalOcean Static Site: FREE
- Resend Email: FREE (100 emails/day)
- GitHub: FREE
- **Total: £0/month**

### Scaling Options
- Resend Pro: $20/month (3,000 emails/month)
- DigitalOcean App Platform: $5/month (if adding backend)
- Custom domain: ~£10-15/year

## 🚨 Important Notes

1. **Email Limits**: Free Resend tier = 100 emails/day
2. **Build Minutes**: DigitalOcean free tier = 100 build minutes/month
3. **Traffic**: No limits on static site traffic
4. **Storage**: 1GB free for static assets

## 📝 Next Steps

1. Sign up for Resend account
2. Deploy to DigitalOcean App Platform
3. Configure custom domain
4. Test contact form
5. Submit to search engines

---

**Site is ready for deployment!** Follow the steps above to go live.