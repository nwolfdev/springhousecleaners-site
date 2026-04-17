// Central site config. Update business info here.
export const site = {
  name: 'Spring Cleaning',
  legalName: 'Spring Cleaning',
  tagline: 'Houston-area home and office cleaning, done right.',
  description: 'Top-rated house and office cleaning services in Spring, The Woodlands, Tomball, and surrounding Houston-area cities. Deep cleans, recurring service, move-in/out, and eco-friendly options.',
  url: 'https://springhousecleaners.com',
  email: 'info@springhousecleaners.com',
  phone: '(832) 224-6617',
  phoneTel: '+18322246617', // tel: link format
  hours: 'Mon–Sat 8am–6pm',
  serviceArea: 'Spring, The Woodlands, Tomball, and surrounding Houston-area communities',
  founders: 'Jordan & Sofia',
  yearFounded: 2023,
  foundingDate: '2023-07',
  googleRating: 4.8,
  googleReviewCount: 17,
  social: {
    // facebook: '',
    // instagram: '',
    // google: ''
  }
};

// Contact form submissions are handled by /functions/api/contact.js
// (Cloudflare Pages Function that forwards to SendGrid → info@springhousecleaners.com)
// See README.md for SendGrid setup instructions.

// Services list — single source of truth for nav, grids, and sitemap
export const services = [
  {
    slug: 'maid-cleaning-services',
    title: 'Maid & Recurring',
    shortTitle: 'Maid Cleaning',
    tagline: 'Weekly, bi-weekly, or monthly service that keeps your home consistently beautiful.',
    icon: 'recurring'
  },
  {
    slug: 'deep-cleaning-service',
    title: 'Deep Cleaning',
    shortTitle: 'Deep Cleaning',
    tagline: 'The top-to-bottom reset your home has been asking for.',
    icon: 'deep'
  },
  {
    slug: 'move-in-out-cleaning-service',
    title: 'Move-In / Move-Out',
    shortTitle: 'Move-In/Out',
    tagline: 'Spotless handoff, whether you are arriving or moving on.',
    icon: 'move'
  },
  {
    slug: 'office-cleaning-services',
    title: 'Office & Commercial',
    shortTitle: 'Office Cleaning',
    tagline: 'A clean workplace your team and clients will actually notice.',
    icon: 'office'
  },
  {
    slug: 'nontoxic-cleaning-service',
    title: 'Eco-Friendly Cleaning',
    shortTitle: 'Green Cleaning',
    tagline: 'Plant-based products that are safe for kids, pets, and the planet.',
    icon: 'leaf'
  }
];

// Cities — single source of truth
export const cities = [
  { slug: 'spring-texas-cleaning-services', name: 'Spring', tagline: 'Our hometown, our standard.' },
  { slug: 'the-woodlands-texas-cleaning-services', name: 'The Woodlands', tagline: 'Premium homes deserve premium cleaning.' },
  { slug: 'tomball-texas-cleaning-services', name: 'Tomball', tagline: 'Trusted by Tomball families.' },
  { slug: 'conroe-texas-cleaning-services', name: 'Conroe', tagline: 'Serving Conroe with care.' },
  { slug: 'cypress-texas-cleaning-services', name: 'Cypress', tagline: 'Spotless Cypress homes.' },
  { slug: 'cypress-station-texas-cleaning-services', name: 'Cypress Station', tagline: 'Detail-driven cleaning.' },
  { slug: 'humble-texas-cleaning-services', name: 'Humble', tagline: 'Dependable service in Humble.' },
  { slug: 'magnolia-texas-cleaning-services', name: 'Magnolia', tagline: 'Fresh homes across Magnolia.' },
  { slug: 'montgomery-texas-cleaning-services', name: 'Montgomery', tagline: 'Lakefront clean, every time.' },
  { slug: 'new-caney-texas-cleaning-services', name: 'New Caney', tagline: 'Friendly service in New Caney.' },
  { slug: 'porter-texas-cleaning-services', name: 'Porter', tagline: 'Cleaner homes in Porter.' },
  { slug: 'willis-texas-cleaning-services', name: 'Willis', tagline: 'Serving the Willis community.' },
  { slug: 'egypt-texas-cleaning-services', name: 'Egypt', tagline: 'Rural routes, spotless results.' }
];

export const primaryNav = [
  { href: '/services/', label: 'Services' },
  { href: '/cities/', label: 'Service Area' },
  { href: '/about/', label: 'About' },
  { href: '/blog/', label: 'Journal' },
  { href: '/contact/', label: 'Contact' }
];
