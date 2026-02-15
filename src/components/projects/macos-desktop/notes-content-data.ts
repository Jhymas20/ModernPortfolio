/**
 * Notes section content - edit the text here to update the Notes app on the Projects page.
 * Section names (keys) appear in the Notes sidebar. The "count" is shown next to each section name.
 */

export const notesSections = {
  'About me': {
    count: 13,
    paragraphs: [
      "I'm a Full-Stack Developer and IT Technician with a background in Computer Science and Cybersecurity. I enjoy building practical software and systems that solve real problems.",
      "I work on everything from mobile and web apps to AI assistants, home automation, and custom tech projects. I currently work in IT while building personal projects on the side, and I love turning ideas into working, real-world solutions.",
    ],
    subsections: [
      {
        heading: 'I can...',
        items: [
          'Design and build full-stack web and mobile applications',
          'Develop AI-powered tools and assistants (local LLMs, voice systems, automation)',
          'Architect backend systems and APIs',
          'Build and manage Linux servers and homelab environments',
          'Design and deploy UniFi (Ubiquiti) network environments',
          'Configure routing, VLANs, firewalls, switching, and Wi-Fi systems',
          'Implement cybersecurity fundamentals (vulnerability scanning, access control, hardening)',
          'Create automation workflows for real businesses',
          'Deploy and manage self-hosted services',
          'Troubleshoot hardware, operating systems, and networks end-to-end',
          'Lead technical projects from idea to implementation',
        ],
      },
    ],
  },
  Skills: {
    count: 42,
    subsections: [
      {
        heading: 'Programming & Development',
        items: [
          'JavaScript / TypeScript',
          'Python',
          'C',
          'C++',
          'C#',
          'Bash',
          'SQL',
        ],
      },
      {
        heading: 'Frameworks & Platforms',
        items: [
          'React',
          'React Native (Expo)',
          'Next.js',
          'Node.js',
          'Supabase / PostgreSQL',
          'NPM',
        ],
      },
      {
        heading: 'AI / Machine Learning',
        items: [
          'Local LLM deployment (LM Studio, DeepSeek, Llama)',
          'AI assistant development (Nova / Atlas)',
          'Speech-to-Text & Text-to-Speech pipelines',
          'OpenAI / Claude integrations',
          'ElevenLabs voice agents',
          'AnythingLLM',
          'Retrieval-Augmented Generation (RAG)',
          'Automation agents',
        ],
      },
      {
        heading: 'IT, Networking & Infrastructure',
        items: [
          'Linux servers (Ubuntu, Kali, Raspberry Pi OS)',
          'Windows & macOS administration',
          'Active Directory user management',
          'UniFi (Ubiquiti) routing, switching & wireless infrastructure',
          'VLAN segmentation & network architecture',
          'DHCP, DNS, subnetting',
          'SSH & secure remote access',
          'VPNs (Tailscale)',
          'Proxmox virtualization',
          'ZFS storage pools',
          'Home Assistant integrations',
        ],
      },
      {
        heading: 'Cybersecurity',
        items: [
          'Vulnerability scanning',
          'Network monitoring',
          'Packet analysis (Wireshark)',
          'Password auditing tools',
          'Security hardening',
          'Ethical hacking labs',
          'Threat modeling fundamentals',
          'Endpoint security',
        ],
      },
      {
        heading: 'DevOps & Deployment',
        items: [
          'Git / GitHub',
          'VPS hosting (Nginx)',
          'Docker basics',
        ],
      },
    ],
  },
  Interests: {
    count: 18,
    subsections: [
      {
        heading: 'Technical',
        items: [
          'Homelabs and server clusters',
          'AI assistants & automation systems',
          'Full-stack app development (mobile + web)',
          'Cybersecurity research',
          'Networking labs',
          'Home automation',
          'Open-source projects',
          'Custom dashboards',
          'System optimization',
        ],
      },
      {
        heading: 'Personal',
        items: [
          'Working out',
          'Basketball',
          'Spending time with friends',
          'Creative coding',
          'Learning new technologies',
          'Entrepreneurship',
          'Content creation',
          'Design exploration',
          'Problem-solving',
        ],
      },
    ],
  },
} as const;
