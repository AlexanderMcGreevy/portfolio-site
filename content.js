/* =====================================================================
   THE CLIMB · content.js
   The single source of truth for every word on the site (the hike AND the classic portfolio).
   Rule: every fact has exactly ONE home. Other stops may link to it by id, never restate it.
     person / links ...... ① Home (name, tagline) + ⑦ Range (contact)
     journey ............. ② Journey  (where & when: role, dates, one line)
     skills .............. ③ Gear     (skills + comfort level; projects only by id)
     projects ............ ④ Trail    (the ONLY place builds and awards are described)
     hut ................. ⑤ Hut      (life outside code)
     summit .............. ⑥ Summit   (where I'm headed)
     contact ............. ⑦ Range
   Everything marked DRAFT is Claude's wording for Alexander to edit. TODO = needs a real value.
   ===================================================================== */
window.CONTENT = {
  person: {
    name: 'Alexander McGreevy',
    short: 'Alex',
    tagline: 'Software Engineer',
    place: 'White Mountains · N.H.',
    /* DRAFT: one line, shown on the Home poster */
    oneLiner: 'I build apps and websites people actually use: iOS, full-stack, and AI that checks its own work.',
    /* TODO: the one thing a recruiter should remember that isn\'t a job or a project */
    why: '',
    based: 'Boston, MA & Doylestown, PA',
    workAuth: 'Authorized to work in the USA, UK and Brazil'
  },

  links: {
    github: 'https://github.com/AlexanderMcGreevy',
    linkedin: 'https://www.linkedin.com/in/alexander-mcgreevy',
    resume: 'resume.pdf',          /* the PDF next to index.html (blank hides every Resume link) */
    email: ''                      /* TODO: the address you want public */
  },

  /* ② JOURNEY: places, in order. No builds here: `trail` points at the trail branch instead.
     hike:false = classic page only (not a waypoint on the Journey map). */
  journey: [
    { id: 'mowglis', hike: false, place: 'Mowglis: School of the Open', role: 'Lead Fencing Instructor & Senior Counselor', dates: 'Summers 2021 – 2024', where: 'Hebron, NH',
      line: 'Ran the fencing program and led a cabin of campers.' },                                       /* DRAFT */
    { id: 'psu', place: 'Penn State', role: 'Computer science · IT Consultant (Altoona, Aug 2024 – May 2025)', dates: 'Aug 2023 – May 2025', where: 'State College, PA',
      line: 'Where I started computer science, and my first tech job, on the IT help desk.' },            /* DRAFT */
    { id: 'tch', place: 'The Clearing House', role: 'Software Engineering Intern', dates: 'Jun – Aug 2025', where: 'New York, NY',
      line: 'First real engineering team, first production codebase.', trail: 'clearinghouse' },        /* DRAFT */
    { id: 'neu', place: 'Northeastern University', role: 'B.S. Computer Science, software concentration (Khoury) · GPA 3.5', dates: 'Aug 2025 – May 2028', where: 'Boston, MA',
      line: 'Transferred in. Director of Growth for the Northeastern Claude Club (150+ members). NUHOC Lodge Committee trainee.' },      /* DRAFT */
    { id: 'wsg', place: 'Waterside Group', role: 'Software Engineering Co-op', dates: 'Jul – Dec 2026', where: 'Boston, MA',
      line: 'Hospitality and real-estate group with a dozen brands. Shipped three public sites, a reusable CMS package that now runs two of them, and features in the internal company portal.', trail: 'coop' }  /* DRAFT */
  ],

  /* ③ GEAR: each gear item is a skill group. level: 3 = every day, 2 = comfortable, 1 = have used. DRAFT levels. */
  skills: [
    { id: 'map', gear: 'Trail map', group: 'Frontend', items: [
      ['TypeScript', 3], ['React', 3], ['Next.js', 3], ['Tailwind', 2], ['HTML / CSS', 3], ['JavaScript', 3], ['Material UI', 2] ], used: ['fbm', 'southpeak', 'harborlights'] },
    { id: 'headlamp', gear: 'Headlamp', group: 'iOS', items: [
      ['Swift', 3], ['SwiftUI', 3], ['Core ML', 2], ['Vision', 2], ['MapKit', 2], ['SwiftData', 1], ['Xcode / TestFlight', 3] ], used: ['obscurafy', 'clast', 'whoosh'] },
    { id: 'stove', gear: 'Stove', group: 'Backend & cloud', items: [
      ['Node.js', 2], ['Supabase', 3], ['PostgreSQL', 3], ['REST APIs', 3], ['Vercel', 3], ['AWS (EC2, RDS)', 1], ['Google Cloud Run', 1] ], used: ['platform', 'fbm', 'hilabels'] },
    { id: 'radio', gear: 'Radio', group: 'AI', items: [
      ['Claude API', 3], ['Gemini API', 2], ['RAG (pgvector)', 2], ['Voyage embeddings', 2], ['Vercel AI SDK', 2] ], used: ['platform', 'fbm', 'clast'] },
    { id: 'compass', gear: 'Compass', group: 'CMS & editors', items: [
      ['Payload CMS', 2], ['Custom Supabase CMS', 3], ['Lexical', 2], ['TipTap / ProseMirror', 2] ], used: ['harborlights', 'southpeak'] },
    { id: 'multitool', gear: 'Multitool', group: 'Languages', items: [
      ['Python', 2], ['Java', 2], ['SQL', 3], ['Bash', 2], ['OCaml', 1], ['RISC-V', 1] ], used: ['hilabels', 'looksmith'] },
    { id: 'firstaid', gear: 'Repair kit', group: 'Testing & tooling', items: [
      ['Vitest', 2], ['GitHub Actions', 2], ['Git', 3], ['pnpm / Turborepo', 2], ['Claude Code', 3] ], used: ['fbm'] }
  ],
  /* sewn onto the pack */
  softSkills: ['Teaching', 'Explaining tech to non-engineers', 'Shipping fast', 'Owning a codebase end to end'], /* DRAFT */

  /* ④ TRAIL: the only place builds are described. branch: wins | coop | projects
     public:false = describe only, no screenshots or links. link:'' = add once confirmed live.
     shot: { src, kind: 'phone' | 'browser', alt } = a screenshot shown in a device frame (files in img/projects/). */
  projects: [
    { id: 'obscurafy', branch: 'wins', title: 'Obscurafy', award: 'Winner · HackUMass 2025', when: 'Nov 2025', dist: '0.4 mi',
      one: 'Finds IDs, cards and documents hiding in your photo library before you share them.',
      what: 'An iOS app that scans your whole photo library on-device, flags sensitive photos, and lets you swipe to keep, redact or delete them. Optional Gemini explains why each one was flagged.',
      stack: ['Swift', 'SwiftUI', 'Core ML (YOLO)', 'Vision OCR', 'Gemini', 'Background Tasks'], role: 'Hackathon team',
      links: [['GitHub', 'https://github.com/AlexanderMcGreevy/Obscurafy'], ['Devpost', 'https://devpost.com/software/vaulteye']], public: true,
      shot: { src: 'img/projects/obscurafy.jpg', kind: 'phone', alt: 'Obscurafy review screen flagging a photo of an ID as high risk' } },
    { id: 'ecoprompt', branch: 'wins', title: 'EcoPrompt', award: '3rd · HackMIT 2025 (Infosys Carbon-Conscious AI)', when: 'Sep – Oct 2025', dist: '0.9 mi',
      one: 'Shows the CO₂ cost of every AI prompt as you type it.',
      what: 'A browser extension that estimates the energy and CO₂ of each AI prompt in real time, turns watt-hours into everyday comparisons, and trims wasted tokens.',
      stack: ['React', 'TypeScript', 'Plasmo', 'Chrome extension'], role: 'Hackathon team',
      links: [['GitHub', 'https://github.com/AlexanderMcGreevy/EcoPrompt-Extension'], ['Full hackathon build', 'https://github.com/davidaponce/EcoPrompt']], public: true,
      shot: { src: 'img/projects/ecoprompt.jpg', kind: 'browser', alt: 'EcoPrompt panel showing tokens, energy and CO2 on the ChatGPT home screen' } },

    { id: 'fbm', branch: 'coop', at: 'wsg', when: 'Jul – Dec 2026', title: 'Flying Bridge Marina', award: 'Waterside co-op', dist: '1.2 mi',
      one: 'A boat dealer\'s new website and the CMS behind it, built almost entirely by me.',
      what: 'Block-based CMS with about 50 section types and live draft preview; a boat inventory finder with side-by-side compare; "Tucker", a Claude assistant grounded in live inventory; scheduled publishing, a photo library and saved-search alerts; and the trade-in valuation pop-up, built on a teammate\'s AI pricing engine.',
      stack: ['Next.js 16', 'TypeScript', 'Supabase', 'Lexical', 'Claude API', 'HubSpot', 'Vitest'], role: 'Main developer',
      links: [['Live site', 'https://flyingbridgemarina.com']], public: true,
      shot: { src: 'img/projects/fbm.jpg', kind: 'browser', alt: 'Flying Bridge Marina homepage with the Ask Tucker button' } },
    { id: 'southpeak', branch: 'coop', at: 'wsg', when: 'Jul – Dec 2026', title: 'South Peak Resort', award: 'Waterside co-op', dist: '1.6 mi',
      one: 'Moved a ski resort\'s site off WordPress, then rebuilt it again on the company\'s own CMS kit.',
      what: 'Rebuilt the site to match the live one, wrote about 20 repeatable migration scripts, built the homes and homesites listings with an interactive map, connected the "Gus" RAG chatbot, and moved pages from dynamic rendering to ISR. Now rebuilding it a second time on cms-kit and Supabase, which I lead with a teammate: I own the layout, content plumbing, CMS and infrastructure.',
      stack: ['Next.js 16', 'Payload CMS 3', 'cms-kit', 'Supabase', 'Neon Postgres', 'pgvector', 'Turborepo'], role: 'Lead on the migration and the cms-kit rebuild',
      links: [], public: true },                                   /* TODO: link once confirmed live */
    { id: 'harborlights', branch: 'coop', at: 'wsg', when: 'Jul – Dec 2026', title: 'Harbor Lights → cms-kit', award: 'Waterside co-op', dist: '1.9 mi',
      one: 'Built one venue\'s CMS, then turned it into a package every company site can install.',
      what: 'A Supabase CMS for an event venue, then extracted into a reusable package with its own admin, read API, safety-railed database scripts, a command-line tool for scaffolding and migrating sites, three versioned releases, and a second example site to prove it works beyond the first. It now runs Harbor Lights and South Peak.',
      stack: ['Next.js 16', 'React 19', 'Supabase', 'Tailwind v4', 'MapLibre'], role: 'Main developer',
      links: [], public: true },                                   /* TODO: harborlightsri.com once confirmed */
    { id: 'platform', branch: 'coop', at: 'wsg', when: 'Jul – Dec 2026', title: 'Document Archive & Editor', award: 'Waterside co-op · internal', dist: '2.3 mi',
      one: 'The company\'s document library and a Word-grade editor, searchable by AI.',
      what: 'A versioned archive for 1,000+ files with access rules per business enforced in the database, a collaborative editor with tracked changes and review rounds, Word and PDF import that keeps the formatting, and RAG indexing so the company assistant can answer from every document. Also built the flipbook studio that turns PDFs into page-flip books for the brand sites, and "Sign in with Waterside", which lets staff log in to each site\'s CMS with their portal account.',
      stack: ['Next.js', 'Supabase (RLS)', 'TipTap', 'Claude', 'Voyage + pgvector'], role: 'One of four core contributors',
      links: [], public: false },
    { id: 'clearinghouse', branch: 'coop', at: 'tch', when: 'Jun – Aug 2025', title: 'CHIPS Simulation', award: 'The Clearing House internship · internal', dist: '2.6 mi',
      one: 'Rebuilt the frontend of a payments data simulation platform in React.',
      what: 'Rebuilt the CHIPS data simulation frontend in React and Material UI on AWS EC2, wired it to Amazon RDS for live queries, and added an analytics page covering 12+ months of simulation data for faster trend analysis.',
      stack: ['React', 'Material UI', 'AWS EC2', 'Amazon RDS'], role: 'Intern',
      links: [], public: false },

    { id: 'clast', branch: 'projects', title: 'Clast', award: '', when: 'Aug 2025 – present', dist: '3.0 mi',
      one: 'Locks your distracting apps until you prove you did the work.',
      what: 'A Screen Time app with no timers and no bypass: you unlock apps by submitting text or photo proof, Gemini checks it, and progress grows a collection of planets.',
      stack: ['Swift', 'SwiftUI', 'Screen Time API', 'Gemini', 'Cloud Run'], role: 'Solo',
      links: [['LinkedIn', 'https://www.linkedin.com/in/alexander-mcgreevy/details/projects/']], public: true,
      shot: { src: 'img/projects/clast.jpg', kind: 'phone', alt: 'Clast shield over a blocked app: Stay Focused, Build On or Give Up' } },   /* repo is private; swap in the post URL if you write a Clast post */
    { id: 'looksmith', branch: 'projects', title: 'LookSmith', award: '', when: 'Oct 2025', dist: '3.4 mi',
      one: '3D modeling with your face instead of your hands.',
      what: 'Accessible 3D modeling: head and facial gestures tracked in real time drive a Godot sculpting tool over a WebSocket, with one-click export to a marketplace.',
      stack: ['Python', 'OpenCV', 'MediaPipe', 'Godot', 'WebSockets'], role: 'Hackathon team · built at HackHarvard 2025',
      links: [['GitHub', 'https://github.com/Vegito2367/LookSmith'], ['Devpost', 'https://devpost.com/software/looksmith']], public: true,
      shot: { src: 'img/projects/looksmith.jpg', kind: 'browser', alt: 'LookSmith sculpting window in Godot with cube, sphere and prism tools' } },
    { id: 'blescanner', branch: 'projects', title: 'BLE Scanner', award: '', when: 'Nov 2026', dist: '3.5 mi',
      one: 'A personal iPhone app that works out what the Bluetooth devices around the house are saying.',
      what: 'Scans nearby BLE devices, saves a profile for each, and decodes what they broadcast and expose, highlighting the bytes that change. It follows devices that rotate their address, finds one with beeps and a compass sweep, and is read-only by default, with writes behind a gated experiment mode. Everything stays on the phone.',
      stack: ['Swift', 'SwiftUI', 'CoreBluetooth', 'SwiftData', 'Swift Charts', 'MapKit'], role: 'Solo · 100+ tests',
      links: [], public: true },                                   /* TODO: add ['GitHub', ...] if the BLEScanner repo is made public */
    { id: 'hilabels', branch: 'projects', title: 'AI SEO Content Platform', award: '', when: 'May – Jul 2026', dist: '3.7 mi',
      one: 'An AI pipeline that writes, schedules and tunes SEO blog posts for HiLabels.',
      what: 'Topics and keywords go into a Google Sheet; the service writes each post with Gemini, schedules it on WordPress, and reads Search Console data to pick the next round of keywords.',
      stack: ['Python', 'Flask', 'Gemini', 'Google Cloud Run', 'Search Console', 'Google Sheets', 'WordPress'], role: 'Solo, for HiLabels',
      links: [], public: true,
      shot: { src: 'img/projects/hilabels.svg', kind: 'browser', alt: 'Diagram of the content loop: Google Sheet, Gemini, WordPress, Search Console' } },
    { id: 'whoosh', branch: 'projects', title: 'Whoosh', award: '⚠ Trail work ahead', when: 'Oct 2026 · Hackachusetts', dist: '4.1 mi', wip: true,
      one: 'A rear camera that spots cars closing in on a cyclist and warns them on their wrist.',
      what: 'Turns the phone a rider already owns into a rear-facing safety system. An on-device YOLO model finds approaching vehicles, an Apple Watch app taps the rider, and opt-in crash response texts emergency contacts. Rides stay on the phone, and a web map combines shared near misses with Boston crash data.',
      stack: ['Swift 6', 'SwiftUI', 'Core ML (YOLO)', 'Apple Watch', 'Supabase', 'Next.js'], role: 'Launch lead · iOS, Watch, orchestration · team of 3',
      links: [['GitHub', 'https://github.com/matte-realize/whoosh'], ['Demo video', 'https://youtu.be/DGP6ZZY3hws'], ['Sundai page', 'https://www.sundai.club/projects/881aa141-d256-495e-a522-e1316032842a']], public: true,
      shot: { src: 'img/projects/whoosh.jpg', kind: 'phone', alt: 'Whoosh ride screen with the rear camera boxing two approaching cars' } },
    { id: 'moovie', branch: 'projects', title: 'Moovie', award: '', dist: 'side trail', small: true,
      one: 'Share and rank movies with friends.', stack: ['Swift'], links: [['GitHub', 'https://github.com/AlexanderMcGreevy/Moovie']], public: true },
    { id: 'petaid', branch: 'projects', title: 'PetAid', award: '', dist: 'side trail', small: true,
      one: 'An AI vet assistant and vet finder for busy pet owners.', stack: ['Swift', 'Python', 'Gemini', 'Google Places'], links: [['GitHub', 'https://github.com/AlexanderMcGreevy/PetAid'], ['Devpost', 'https://devpost.com/software/petvitals']], public: true,
      shot: { src: 'img/projects/petaid.jpg', kind: 'phone', alt: 'PetVitals AI diagnosis result for a cockatoo' } },
    { id: 'cardinal', branch: 'projects', title: 'CARDinal', award: '', dist: 'side trail', small: true,
      one: 'Tap phones to swap business cards and resumes.', stack: ['SwiftUI', 'Multipeer'], links: [['GitHub', 'https://github.com/AlexanderMcGreevy/CARDinal']], public: true,
      shot: { src: 'img/projects/cardinal.svg', kind: 'browser', alt: 'Diagram of two phones swapping a business card nearby or by QR code' } },
    { id: 'gofundtree', branch: 'projects', title: 'GoFundTree', award: '', dist: 'side trail', small: true,
      one: 'Place virtual trees on your own street in AR, then fund real planting. Built at HackPSU Fall 2024; I built the AR and frontend.', stack: ['Python', 'Flask', 'Google Cloud', 'Firebase', 'model-viewer'], links: [['GitHub', 'https://github.com/matt2jog/GoFundTree'], ['Devpost', 'https://devpost.com/software/gofundtree']], public: true,
      shot: { src: 'img/projects/gofundtree.jpg', kind: 'browser', alt: 'Three 3D tree models used in the GoFundTree AR view' } },
    { id: 'outfitmatcher', branch: 'projects', title: 'Colorblind Outfit Matcher', award: '', dist: 'side trail', small: true,
      one: 'Finds a garment\'s dominant color and suggests matching outfits for people who are colorblind.', stack: ['Python', 'OpenCV', 'rembg'], links: [['GitHub', 'https://github.com/AlexanderMcGreevy/Projects/tree/main/Colorblind%20Clothes%20Matcher']], public: true,
      shot: { src: 'img/projects/outfitmatcher.jpg', kind: 'browser', alt: 'A blue shirt photo before and after background removal' } },
    { id: 'hilabelsship', branch: 'projects', title: 'HiLabels shipping rules', award: '', dist: 'side trail', small: true,
      one: 'Reworked the store\'s WooCommerce shipping code: weight-based method switching and handling fees.', stack: ['PHP', 'WooCommerce'], links: [], public: true }
  ],
  branches: { wins: 'Wins', coop: 'Co-ops & Internships', projects: 'Projects' },

  /* ⑤ HUT: life outside code. Each entry is an object in the room. All DRAFT copy. */
  hut: [
    { id: 'sabre', object: 'Fencing sabre & mask', title: 'Fencing',
      text: 'Competitive club sabre fencer. Taught it for four summers at Mowglis.' },
    { id: 'photo', object: 'Camp photo', title: 'Camp Mowglis',
      text: 'Summers on Newfound Lake in New Hampshire, first as a camper, then on staff.' },          /* TODO confirm camper years */
    { id: 'boot', object: 'Trail-worn boot', title: 'Hiking',
      text: 'White Mountains backpacker. Hiking with NUHOC, the Northeastern outing club.' },
    { id: 'firstaid', object: 'First-aid kit', title: 'Wilderness First Aid',
      text: 'WFA and CPR/AED certified, because the nearest road is usually a long way down.' },
    { id: 'guitar', object: 'Guitar by the window', title: 'Guitar', text: 'Strum it.' },
    { id: 'mead', object: 'Mead jug', title: 'Mead', text: 'Brewing mead. It takes months. Patience is the main ingredient.' },
    { id: 'logbook', object: 'Hut logbook', title: 'Hackathons', text: '11 attended, 3 wins. I go for the 3 a.m. part.' }
  ],

  /* ⑥ SUMMIT: where I'm headed. Each is a distant peak you can look at from the summit sign. DRAFT. */
  summit: {
    headline: 'The view from the top',
    sub: 'Where I\'m headed next',
    lookingFor: 'Co-ops and internships, then full-time after I graduate in May 2028.',
    peaks: [
      { id: 'ios', peak: 'Mt. Jefferson', bearing: -24, title: 'iOS', text: 'Native apps with real hardware in the loop: camera, ML on-device, location.' },
      { id: 'ai', peak: 'Mt. Adams', bearing: 14, title: 'Applied AI', text: 'AI features that check their own answers before a user ever sees them.' },
      { id: 'full', peak: 'Mt. Monroe', bearing: 218, title: 'Full-stack', text: 'Owning a product end to end, from the database rules to the last pixel.' },
      { id: 'cloud', peak: 'Carter Dome', bearing: 98, title: 'Backend & cloud', text: 'Systems that stay up and stay cheap: caching, queues, retries.' }
    ]
  },

  /* ⑦ RANGE: contact */
  contact: {
    headline: 'Say hi',
    line: 'Hiring for a co-op, internship or new-grad role? I\'d love to hear about it.'  /* DRAFT */
  }
};
