/* The two lists on the Editorial page: published pieces, and brands worked with.
   Add a byline: { pub, title, note (optional, shown small after the title), href }.
   Add a brand:  { name, href }.
   Order here is the order on the page. */

module.exports = {
  bylines: [
    { pub: 'monday.com', title: 'How to use recognition to strengthen your team', href: 'https://monday.com/blog/teamwork/how-to-use-recognition-to-strengthen-your-team/' },
    { pub: 'Spotify', title: 'Elevate your employee experience', note: '— host & producer, People at Work', href: 'https://open.spotify.com/episode/2VKvRmh8acRdHtLYlugsP6' },
    { pub: 'Fluid', title: 'MS Project vs Asana vs Fluid: comparison 2024', href: 'https://www.fluid.work/blog/ms-project-vs-asana-vs-fluid-comparison-2024' },
    { pub: 'Beacon HR', title: 'Communication is key: supporting employees during uncertainty and change', href: 'https://www.beacon-hr.com/blog/supporting-employees-during-uncertainty-and-change' },
    { pub: 'Jostle', title: 'Why breaking down silos is critical to working better together', href: 'https://blog.jostle.me/blog/breaking-down-silos' },
    { pub: 'Zavvy', title: 'How to achieve success with an effective customer marketing manager onboarding plan', href: 'https://www.zavvy.io/blog/customer-marketing-manager-onboarding-plan' },
    { pub: 'Gomada', title: '8 virtual leadership activities to develop your remote team', href: 'https://www.gomada.co/blog/virtual-leadership-activities' },
    { pub: 'Hive', title: '9 remote leadership skills to manage your team', href: 'https://hive.com/blog/remote-leadership-skills/' },
    { pub: 'Near', title: 'Outsourcing BDR and SDR roles: a comprehensive guide', href: 'https://www.hirewithnear.com/blog/outsourcing-bdr-and-sdr-roles-a-comprehensive-guide' },
    { pub: 'Newswire', title: 'Jostle unveils simple employee success framework', href: 'https://www.newswire.com/news/jostle-unveils-simple-employee-success-framework-21872661' },
  ],

  brands: [
    { name: 'Brand Hong Kong', href: 'https://www.brandhk.gov.hk/' },
    { name: 'Chanel', href: 'https://www.chanel.com/' },
    { name: 'UGG', href: 'https://www.ugg.com/' },
    { name: 'Ogilvy', href: 'https://www.ogilvy.com/' },
    { name: 'Deliveroo', href: 'https://deliveroo.co.uk/' },
    { name: 'Netflix', href: 'https://www.netflix.com/' },
  ],
};
