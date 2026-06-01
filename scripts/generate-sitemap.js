const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const BASE_URL = 'https://www.wysele.com';
const API_URL = 'https://wysele-backend.vercel.app/api/v1/blogs/';
const TODAY = new Date().toISOString().split('T')[0];

// Static pages configuration
const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/industries', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/careers', priority: '0.8', changefreq: 'weekly' },
  { path: '/blogs', priority: '0.9', changefreq: 'daily' },
  { path: '/sitemap', priority: '0.5', changefreq: 'monthly' },
  { path: '/sap-services', priority: '0.9', changefreq: 'monthly' },
  { path: '/services/sap-consulting', priority: '0.85', changefreq: 'monthly' },
  { path: '/services/sap-signavio', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/sap-datasphere', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/rise-with-sap', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/sap-btp', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/sap-integration', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/sap-vim-brim', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/sap-migration', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/sap-s4hana', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/sap-genai', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/sap-masterdata', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/sap-btp-api-management', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/sap-technical-consulting', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/sap-opentext', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/salesforce', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/cybersecurityhome', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/itinfrastructure', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/web-development', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/app-development', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/iot-services', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/aiml-services', priority: '0.8', changefreq: 'monthly' }
];

// Helper to fetch blogs from API using standard https module
function fetchBlogs() {
  return new Promise((resolve, reject) => {
    https.get(API_URL, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          // Handle response formats: { blogs: [...] } or { data: [...] } or direct array
          const blogList = parsed.blogs || parsed.data || parsed || [];
          resolve(Array.isArray(blogList) ? blogList : []);
        } catch (e) {
          reject(new Error(`Failed to parse blogs API response: ${e.message}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Generate XML sitemap content
function generateSitemapXml(blogs) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Core & Static Pages -->\n`;

  // Add static pages
  staticPages.forEach((page) => {
    xml += `  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>\n`;
  });

  if (blogs.length > 0) {
    xml += `\n  <!-- Dynamic Blog Posts -->\n`;
    blogs.forEach((blog) => {
      const blogId = blog._id || blog.id || blog.slug;
      if (!blogId) return;
      
      // Determine dynamic last modification date
      let lastmod = TODAY;
      if (blog.updated_at || blog.updatedAt) {
        lastmod = new Date(blog.updated_at || blog.updatedAt).toISOString().split('T')[0];
      } else if (blog.created_at || blog.createdAt || blog.date) {
        lastmod = new Date(blog.created_at || blog.createdAt || blog.date).toISOString().split('T')[0];
      }

      xml += `  <url>
    <loc>${BASE_URL}/blogs/${blogId}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
    });
  }

  xml += `\n</urlset>\n`;
  return xml;
}

async function run() {
  console.log('Generating dynamic sitemap...');
  let blogs = [];
  try {
    blogs = await fetchBlogs();
    console.log(`Successfully fetched ${blogs.length} blog posts from API.`);
  } catch (error) {
    console.error('Warning: Failed to fetch blogs. Generating sitemap with static pages only.', error.message);
  }

  const xmlContent = generateSitemapXml(blogs);
  
  // Write to public directory (for dev and future builds)
  const publicPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(publicPath, xmlContent, 'utf8');
  console.log(`Sitemap written to public/sitemap.xml`);

  // Write to build directory if it exists (for current build output)
  const buildPath = path.join(__dirname, '../build/sitemap.xml');
  if (fs.existsSync(path.dirname(buildPath))) {
    fs.writeFileSync(buildPath, xmlContent, 'utf8');
    console.log(`Sitemap written to build/sitemap.xml`);
  }
  
  console.log('Sitemap generation complete!');
}

run();
