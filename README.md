# ShivmahimaFarm

Static farm website with a small Node/Express API for contact form inquiries.

## Frontend

Deploy the repo root on Vercel.

- Root Directory: `.`
- Framework Preset: Other
- Build Command: leave empty
- Output Directory: leave empty or `.`

## Backend

Deploy the `server` folder on Render as a Web Service.

- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`

Render environment variables:

```text
MONGODB_URI=your_mongodb_atlas_connection_string
CLIENT_ORIGIN=your_vercel_site_url
```

After Render deploys, copy the API endpoint into `contact.html`:

```html
<form class="support-form reveal-card" id="help-form" data-api-url="https://your-render-service.onrender.com/api/inquiries">
```
