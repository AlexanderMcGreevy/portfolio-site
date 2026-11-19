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
    why: ''
  },

  links: {
    github: 'https://github.com/AlexanderMcGreevy',
    linkedin: 'https://www.linkedin.com/in/alexander-mcgreevy',
    resume: '',                    /* TODO: drop the resume PDF next to index.html, then set 'resume.pdf' (blank hides every Resume link) */
    email: ''                      /* TODO: the address you want public */
  },

  /* ② JOURNEY: places, in order. No builds here: `trail` points at the trail branch instead. */
  journey: [
    { id: 'psu', place: 'Penn State', role: 'Computer science · IT Consultant', dates: '2023 – 2025', where: 'State College, PA',
      line: 'Where I started computer science, and my first tech job, on the IT help desk.' },            /* DRAFT */
    { id: 'tch', place: 'The Clearing House', role: 'Software Engineering Intern', dates: 'Summer 2025', where: 'New York, NY',
      line: 'First real engineering team, first production codebase.', trail: 'clearinghouse' },        /* DRAFT; TODO confirm city */
    { id: 'neu', place: 'Northeastern University', role: 'B.S. Computer Science (Khoury, software concentration)', dates: '2025 – May 2028', where: 'Boston, MA',
      line: 'Transferred in. Director of Growth for the Northeastern Claude Club (150+ members).' },      /* DRAFT */
    { id: 'wsg', place: 'Waterside Group', role: 'Software Engineering Co-op', dates: 'Jul – Dec 2026', where: 'Boston, MA',
      line: 'Hospitality and real-estate group with a dozen brands. Shipped three public sites and two internal tools.', trail: 'coop' }  /* DRAFT */
  ],

  /* ③ GEAR: each gear item is a skill group. level: 3 = every day, 2 = comfortable, 1 = have used. DRAFT levels. */
  skills: [
    { id: 'map', gear: 'Trail map', group: 'Frontend', items: [
      ['TypeScript', 3], ['React', 3], ['Next.js', 3], ['Tailwind', 2], ['HTML / CSS', 3], ['JavaScript', 3] ], used: ['fbm', 'southpeak', 'harborlights'] },
    { id: 'headlamp', gear: 'Headlamp', group: 'iOS', items: [
      ['Swift', 3], ['SwiftUI', 3], ['Core ML', 2], ['Vision', 2], ['MapKit', 2], ['SwiftData', 1] ], used: ['obscurafy', 'clast', 'whoosh'] },
    { id: 'stove', gear: 'Stove', group: 'Backend & cloud', items: [
      ['Node.js', 2], ['Supabase', 3], ['PostgreSQL', 3], ['REST APIs', 3], ['Vercel', 3], ['AWS (EC2, RDS)', 1], ['Google Cloud Run', 1] ], used: ['platform', 'fbm', 'hilabels'] },
    { id: 'radio', gear: 'Radio', group: 'AI', items: [
      ['Claude API', 3], ['Gemini API', 2], ['RAG (pgvector)', 2], ['Voyage embeddings', 2], ['Vercel AI SDK', 2] ], used: ['platform', 'fbm', 'clast'] },
    { id: 'compass', gear: 'Compass', group: 'CMS & editors', items: [
      ['Payload CMS', 2], ['Custom Supabase CMS', 3], ['Lexical', 2], ['TipTap / ProseMirror', 2] ], used: ['harborlights', 'southpeak'] },
    { id: 'multitool', gear: 'Multitool', group: 'Languages', items: [
      ['Python', 2], ['Java', 2], ['SQL', 3], ['OCaml', 1], ['RISC-V', 1] ], used: ['hilabels', 'looksmith'] },
    { id: 'firstaid', gear: 'Repair kit', group: 'Testing & tooling', items: [
      ['Vitest', 2], ['GitHub Actions', 2], ['Git', 3], ['pnpm / Turborepo', 2], ['Claude Code', 3] ], used: ['fbm'] }
  ],
  /* sewn onto the pack */
  softSkills: ['Teaching', 'Explaining tech to non-engineers', 'Shipping fast', 'Owning a codebase end to end'], /* DRAFT */

  /* ④ TRAIL: the only place builds are described. branch: wins | coop | projects
     public:false = describe only, no screenshots or links. link:'' = add once confirmed live. */
  projects: [
    { id: 'obscurafy', branch: 'wins', title: 'Obscurafy', award: 'Winner · HackUMass 2025', dist: '0.4 mi',
      one: 'Finds IDs, cards and documents hiding in your photo library before you share them.',
      what: 'An iOS app that scans your whole photo library on-device, flags sensitive photos, and lets you swipe to keep, redact or delete them. Optional Gemini explains why each one was flagged.',
      stack: ['Swift', 'SwiftUI', 'Core ML (YOLO)', 'Vision OCR', 'Gemini', 'Background Tasks'], role: 'Hackathon team',
      links: [['GitHub', 'https://github.com/AlexanderMcGreevy/Obscurafy']], public: true },
    { id: 'ecoprompt', branch: 'wins', title: 'EcoPrompt', award: '3rd · HackMIT 2025 (Infosys Carbon-Conscious AI)', dist: '0.9 mi',
      one: 'Shows the CO₂ cost of every AI prompt as you type it.',
      what: 'A browser extension that estimates the energy and CO₂ of each AI prompt in real time, turns watt-hours into everyday comparisons, and trims wasted tokens.',
      stack: ['TypeScript', 'Plasmo', 'Chrome extension'], role: 'Hackathon team',
      links: [['GitHub', 'https://github.com/AlexanderMcGreevy/EcoPrompt-Extension']], public: true },

    { id: 'fbm', branch: 'coop', title: 'Flying Bridge Marina', award: 'Waterside co-op', dist: '1.2 mi',
      one: 'A boat dealer\'s new website and the CMS behind it, built almost entirely by me.',
      what: 'Block-based CMS with about 50 section types and live draft preview; a boat inventory finder with side-by-side compare; "Tucker", a Claude assistant grounded in live inventory; and an AI trade-in estimator that throws out any comparable it can\'t match to a real search result.',
      stack: ['Next.js 16', 'TypeScript', 'Supabase', 'Lexical', 'Claude API', 'HubSpot', 'Vitest'], role: 'Main developer',
      links: [], public: true },                                   /* TODO: link once the new build is live */
    { id: 'southpeak', branch: 'coop', title: 'South Peak Resort', award: 'Waterside co-op', dist: '1.6 mi',
      one: 'Moved a ski resort\'s site off WordPress onto Next.js and a shared CMS.',
      what: 'Rebuilt the site to match the live one, wrote about 20 repeatable migration scripts, built the homes and homesites listings with an interactive map, connected the "Gus" RAG chatbot, and moved pages from dynamic rendering to ISR.',
      stack: ['Next.js 16', 'Payload CMS 3', 'Neon Postgres', 'pgvector', 'Turborepo'], role: 'Lead on the migration',
      links: [], public: true },                                   /* TODO: link once confirmed live */
    { id: 'harborlights', branch: 'coop', title: 'Harbor Lights → cms-kit', award: 'Waterside co-op', dist: '1.9 mi',
      one: 'Built one venue\'s CMS, then turned it into a package every company site can install.',
      what: 'A Supabase CMS for an event venue, then extracted into a reusable package with its own admin, read API, safety-railed database scripts and a second example site to prove it works beyond the first.',
      stack: ['Next.js 16', 'React 19', 'Supabase', 'Tailwind v4', 'MapLibre'], role: 'Main developer',
      links: [], public: true },                                   /* TODO: harborlightsri.com once confirmed */
    { id: 'platform', branch: 'coop', title: 'Document Archive & Editor', award: 'Waterside co-op · internal', dist: '2.3 mi',
      one: 'The company\'s document library and a Word-grade editor, searchable by AI.',
      what: 'A versioned archive with permissions enforced in the database, a collaborative editor with tracked changes and review rounds, Word and PDF import that keeps the formatting, and RAG indexing so the company assistant can answer from every document.',
      stack: ['Next.js', 'Supabase (RLS)', 'TipTap', 'Claude', 'Voyage + pgvector'], role: 'Main author',
      links: [], public: false },
    { id: 'clearinghouse', branch: 'coop', title: 'CHIPS Simulation', award: 'The Clearing House internship · internal', dist: '2.6 mi',
      one: 'Rebuilt the frontend of a payments simulation in React.',
      what: 'A React rebuild of the CHIPS simulation frontend, wired to RDS, plus a new analytics page.',
      stack: ['React', 'AWS RDS'], role: 'Intern',
      links: [], public: false },

    { id: 'clast', branch: 'projects', title: 'Clast', award: '', dist: '3.0 mi',
      one: 'Locks your distracting apps until you prove you did the work.',
      what: 'A Screen Time app with no timers and no bypass: you unlock apps by submitting text or photo proof, Gemini checks it, and progress grows a collection of planets.',
      stack: ['Swift', 'SwiftUI', 'Screen Time API', 'Gemini', 'Cloud Run'], role: 'Solo',
      links: [], public: true },
    { id: 'looksmith', branch: 'projects', title: 'LookSmith', award: 'HackHarvard 2025', dist: '3.4 mi',
      one: '3D modeling with your face instead of your hands.',
      what: 'Accessible 3D modeling: head and facial gestures tracked in real time drive a Godot sculpting tool over a WebSocket, with one-click export to a marketplace.',
      stack: ['Python', 'OpenCV', 'MediaPipe', 'Godot', 'WebSockets'], role: 'Hackathon team',
      links: [], public: true },
    { id: 'hilabels', branch: 'projects', title: 'HiLabels Blog Engine', award: '', dist: '3.7 mi',
      one: 'An AI pipeline that writes and queues SEO blog posts from a spreadsheet.',
      what: 'Topics and keywords go into a Google Sheet; the service writes the post, the meta description and tracks keyword performance for the next round.',
      stack: ['Python', 'Claude / LLM APIs', 'Google Sheets API', 'Docker'], role: 'Solo, for a client',
      links: [], public: true },
    { id: 'whoosh', branch: 'projects', title: 'Whoosh', award: '⚠ Trail work ahead', dist: '4.1 mi', wip: true,
      one: 'Cycling safety for iPhone: ride recording now, hazard detection next.',
      what: 'Records rides with GPS and keeps history on-device with no account. Built around service protocols and state machines so camera hazard detection and haptic alerts slot in next.',
      stack: ['Swift 6', 'SwiftUI', 'MapKit', 'Core Location', 'SwiftData'], role: 'Solo · in progress',
      links: [], public: true },
    { id: 'moovie', branch: 'projects', title: 'Moovie', award: '', dist: 'side trail', small: true,
      one: 'Share and rank movies with friends.', stack: ['Swift'], links: [['GitHub', 'https://github.com/AlexanderMcGreevy/Moovie']], public: true },
    { id: 'petaid', branch: 'projects', title: 'PetAid', award: '', dist: 'side trail', small: true,
      one: 'An AI vet assistant and vet finder for busy pet owners.', stack: ['Swift', 'Python', 'Gemini', 'Google Places'], links: [['GitHub', 'https://github.com/AlexanderMcGreevy/PetAid']], public: true },
    { id: 'cardinal', branch: 'projects', title: 'CARDinal', award: '', dist: 'side trail', small: true,
      one: 'Tap phones to swap business cards and resumes.', stack: ['SwiftUI', 'Multipeer'], links: [['GitHub', 'https://github.com/AlexanderMcGreevy/CARDinal']], public: true }
  ],
  branches: { wins: 'Wins', coop: 'Co-ops & Internships', projects: 'Projects' },

  /* ⑤ HUT: life outside code. Each entry is an object in the room. All DRAFT copy. */
  hut: [
    { id: 'sabre', object: 'Fencing sabre & mask', title: 'Fencing',
      text: 'Sabre fencer. Lead Fencing Instructor at Camp Mowglis, 2021–2024.' },
    { id: 'photo', object: 'Camp photo', title: 'Camp Mowglis',
      text: 'Summers on Newfound Lake in New Hampshire, first as a camper, then on staff.' },          /* TODO confirm camper years */
    { id: 'boot', object: 'Trail-worn boot', title: 'Hiking',
      text: 'White Mountains backpacker. Hiking with NUHOC, the Northeastern outing club.' },
    { id: 'firstaid', object: 'First-aid kit', title: 'Wilderness First Aid',
      text: 'Certified, because the nearest road is usually a long way down.' },
    { id: 'guitar', object: 'Guitar', title: 'Guitar', text: 'Strum it.' },
    { id: 'mead', object: 'Mead jug', title: 'Mead', text: 'Brewing mead. It takes months. Patience is the main ingredient.' },
    { id: 'logbook', object: 'Hut logbook', title: 'Hackathons', text: '8 attended. I go for the 3 a.m. part.' }
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
