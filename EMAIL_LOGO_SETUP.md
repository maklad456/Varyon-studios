# Email Logo Setup for EmailJS Templates

## Recommended Logo URLs

For best email client compatibility, use these direct, HTTPS URLs:

### Primary Logo (Light Background)
```
https://varyonstudios.com/branding/vs-logo-light.png
```

### Alternative Logo (Dark Background)
```
https://varyonstudios.com/branding/vs-logo-dark.png
```

## HTML Snippet for EmailJS Templates

Copy and paste this into your EmailJS template:

### For Customer Email (template_o2u23o6):
```html
<img src="https://varyonstudios.com/branding/vs-logo-light.png" alt="Varyon Studios" width="200" style="display: block; margin: 0 auto; max-width: 200px; height: auto;" />
```

### For Admin Email (template_0wy5yrf):
```html
<img src="https://varyonstudios.com/branding/vs-logo-light.png" alt="Varyon Studios" width="200" style="display: block; margin: 0 auto; max-width: 200px; height: auto;" />
```

## Best Practices

✅ **DO:**
- Use HTTPS URLs
- Include `width` attribute (email clients prefer explicit sizing)
- Include `alt` text for accessibility
- Use inline styles (email clients strip CSS)
- Use PNG format (most reliable for email)

❌ **DON'T:**
- Use relative paths (`/branding/logo.png`)
- Use SVG format (Outlook issues)
- Use WebP format (limited email support)
- Rely on external CSS for styling
- Use URLs that redirect (301/302)

## Verification

Test the logo URL by:
1. Visiting: https://varyonstudios.com/branding/vs-logo-light.png
2. Should return 200 OK with image/png content-type
3. Should display the logo directly (no redirect)

## Notes

- The logo files are already in `/public/branding/` and will be served statically
- Next.js automatically serves files from `/public` at the root URL
- The domain `varyonstudios.com` must be your production domain
- For development, use: `http://localhost:3000/branding/vs-logo-light.png` (test only)
