/* The Editorial page.

   services   the four "What I do" cards
   timeline   the career steps, in order
   consulting the three "Currently" cards
   bylines    published work. `featured: true` puts a piece on the page;
              the rest stay here for later. Fields:
                pub    the client or publication
                short  the short label shown on the card
                cta    'Read' or 'Listen'
                title  the full headline (used for the link's title text)
                blurb  a sentence about the work
                href   where it lives — opens in a new tab
                image  thumbnail, relative to assets/editorial/work/
                mark   true when the image is a logo, so it sits inside the frame
                alt    image description
   brands     the logo cloud. logo is a file in assets/editorial/brands/ —
              a flat ink silhouette, so the row stays quiet

   Order here is the order on the page. */

module.exports = {
  services: [
    { title: 'Research & synthesis', text: 'Turning unwieldy research, interviews, and source material into frameworks, reports, briefs, guides, and recommendations.' },
    { title: 'Editorial & thought leadership', text: 'Long-form writing, interviewing, ghostwriting, SEO and AEO, podcast production, and subject-matter-expert storytelling.' },
    { title: 'Campaigns & strategy', text: 'Audience insight, messaging, launches, social strategy, integrated campaigns, and creative execution.' },
    { title: 'Systems & operations', text: 'Workflows, templates, processes, content operations, and thoughtful uses of AI to make complicated work run better.' },
  ],

  timeline: [
    { step: 'Newsroom', role: 'Broadcaster + field reporter', where: 'Radio Television Hong Kong — medical and political beat' },
    { step: 'Agency', role: 'PR & brand storytelling', where: 'Ogilvy' },
    { step: 'Tech + content', role: 'Editorial strategy', where: 'B2B · SaaS · future of work' },
    { step: 'Content operations', role: 'Systems · audience · community', where: 'AI workflows' },
    { step: 'Now', role: 'Independent research & consulting', where: 'Wine · trade · organisational strategy' },
  ],

  consulting: [
    { title: 'Interprovincial trade', text: 'Research + synthesis' },
    { title: 'Export markets', text: 'Market intelligence + guides' },
    { title: 'Organisational scans', text: 'Comparative research + strategic analysis' },
  ],


  bylines: [
    {
      pub: 'The Digital Project Manager',
      short: 'Zapier’s cofounder Wade Foster on AI in project management',
      cta: 'Read',
      featured: true,
      title: 'Wade Foster — The Digital Project Manager',
      blurb: 'Interview and feature for The Digital Project Manager.',
      href: 'https://thedigitalprojectmanager.com/productivity/wade-foster/',
      image: 'wade-foster.jpg',
      alt: 'Neon isometric illustration of a project planning board',
    },
    {
      pub: 'People Managing People',
      short: 'Ask the HR experts: what did you get wrong about AI?',
      cta: 'Read',
      featured: true,
      title: 'Ask the HR experts: what did you get wrong about AI?',
      blurb: 'Expert round-up on AI in the workplace for People Managing People.',
      href: 'https://peoplemanagingpeople.com/hr-strategy/ask-the-hr-experts-what-did-you-get-wrong-about-ai/',
      image: 'pmp-ai.jpg',
      alt: 'Illustration of two colleagues on a staircase comparing laptops',
    },
    {
      pub: 'People at Work Podcast',
      short: 'Elevate your employee experience',
      cta: 'Listen on Spotify',
      featured: true,
      title: 'Elevate your employee experience',
      blurb: 'Podcast host and producer of the People at Work podcast, for leaders and managers.',
      href: 'https://open.spotify.com/episode/2VKvRmh8acRdHtLYlugsP6',
      image: 'spotify.jpg',
      alt: 'Cover art for the People at Work podcast',
    },
    {
      pub: 'Jostle',
      short: 'Why breaking down silos is critical to working better together',
      cta: 'Read',
      featured: true,
      title: 'Why breaking down silos is critical to working better together',
      blurb: 'Silos cause communication breakdowns, hinder productivity, and turn employees into narrow-minded thinkers. A thought leadership piece on breaking them down for good.',
      href: 'https://blog.jostle.me/blog/breaking-down-silos',
      image: 'jostle-silos.jpg',
      alt: 'Illustration of people isolated under separate bell jars',
    },
    {
      pub: 'Zavvy',
      title: 'How to achieve success with an effective customer marketing manager onboarding plan',
      blurb: 'Onboarding playbook for Zavvy’s people enablement platform.',
      href: 'https://www.zavvy.io/blog/customer-marketing-manager-onboarding-plan',
      image: 'logo-zavvy.png',
      mark: true,
      alt: 'Zavvy logo',
    },
    {
      pub: 'Gomada',
      title: '8 virtual leadership activities to develop your remote team',
      blurb: 'As virtual workplaces become common, leaders have to connect with their teams online. Activities that build community and collaboration at a distance.',
      href: 'https://www.gomada.co/blog/virtual-leadership-activities',
      image: 'gomada.jpg',
      alt: 'Remote team on a video call',
    },
    {
      pub: 'Hive',
      short: '9 remote leadership skills to manage your team',
      cta: 'Read',
      featured: true,
      title: '9 remote leadership skills to manage your team',
      blurb: 'SEO long-form for Hive, written for HR leaders on the subject of remote work.',
      href: 'https://hive.com/blog/remote-leadership-skills/',
      image: 'hive.jpg',
      alt: 'Illustration of a manager leading a remote team',
    },
    {
      pub: 'Near',
      title: 'Outsourcing BDR and SDR roles: a comprehensive guide',
      blurb: 'Hiring outsourced BDR and SDR roles is complicated. A guide to everything sales development outsourcing involves.',
      href: 'https://www.hirewithnear.com/blog/outsourcing-bdr-and-sdr-roles-a-comprehensive-guide',
      image: 'logo-near.png',
      mark: true,
      alt: 'Near logo',
    },
    {
      pub: 'Newswire',
      title: 'Jostle unveils simple employee success framework',
      blurb: 'Press release on Newswire announcing Jostle’s employee success framework.',
      href: 'https://www.newswire.com/news/jostle-unveils-simple-employee-success-framework-21872661',
      image: 'newswire.jpg',
      alt: 'Jostle employee success framework announcement',
    },
    {
      pub: 'SnackNation',
      short: '18 best performance review templates for managers',
      cta: 'Read',
      featured: true,
      title: '18 best performance review templates for managers',
      blurb: 'Long-form resource on running performance reviews, for SnackNation.',
      href: 'https://snacknation.com/blog/performance-review-templates/',
      image: 'snacknation.jpg',
      alt: 'Illustration of charts, checklists and awards for performance reviews',
    },
  ],

  brands: [
    { name: 'Netflix', logo: 'netflix.png', href: 'https://www.netflix.com/' },
    { name: 'Deliveroo', logo: 'deliveroo.png', href: 'https://deliveroo.co.uk/' },
    { name: 'Ogilvy', logo: 'ogilvy.png', href: 'https://www.ogilvy.com/' },
    { name: 'Chanel', logo: 'chanel.png', href: 'https://www.chanel.com/' },
    { name: 'UGG', logo: 'ugg.png', href: 'https://www.ugg.com/' },
    { name: 'NÜTRL Vodka', logo: 'nutrl.png', href: 'https://nutrl.com/' },
    { name: 'monday.com', logo: 'monday.png', href: 'https://monday.com/' },
    { name: 'Air New Zealand', logo: 'air-new-zealand.png', href: 'https://www.airnewzealand.com/' },
    { name: 'Brand Hong Kong', logo: 'brand-hong-kong.png', href: 'https://www.brandhk.gov.hk/' },
  ],
};
