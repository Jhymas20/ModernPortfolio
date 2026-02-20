import Image from 'next/image';
import { Image as Img, ExternalLink } from 'lucide-react';
import { CollapsibleSection } from './CollapsibleSection';

// Enhanced project content array with all projects
const PROJECT_CONTENT = [
  {
    title: 'Liquid Portfolio',
    description:
      'Liquid Portfolio is a modern interactive personal portfolio designed to showcase my skills in cybersecurity, IT, and full-stack development. I built it to deliver a sleek, Apple-inspired experience with animated liquid borders, dark/light mode, and an embedded AI chat assistant that understands my background and projects. This is Mark One of my portfolio site.',
    typeLabel: 'Personal Portfolio > Next.js',
    techStack: [
      'Next.js 15.5.12',
      'React',
      'Node.js',
      'Tailwind CSS',
      'Radix UI',
      'Framer Motion',
      'Lucide Icons',
      'Express',
      'Vite',
      'Turbopack',
      'Open Graph',
      'React Native for Web',
    ],
    date: '2025',
    features: [
      'AI-powered portfolio chat',
      'Animated liquid hover borders',
      'Dark / Light mode',
      'Responsive layout for all devices',
      'Sections: About, Skills, Projects, Contact, Fun',
    ],
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/Jhymas20',
      },
    ],
    images: [
      {
        src: '/Projects/LiquidPortfolio/homePage.mp4',
        alt: 'Liquid Portfolio home page animation',
        type: 'video',
      },
      {
        src: '/Projects/LiquidPortfolio/projects.webp',
        alt: 'Liquid Portfolio projects page',
      },
      {
        src: '/Projects/LiquidPortfolio/me.webp',
        alt: 'Liquid Portfolio me page',
      },
      {
        src: '/Projects/LiquidPortfolio/morePage.mp4',
        alt: 'Liquid Portfolio more page animation',
        type: 'video',
      },
      {
        src: '/Projects/LiquidPortfolio/skills.webp',
        alt: 'Liquid Portfolio skills page',
      },
      {
        src: '/Projects/LiquidPortfolio/contact.webp',
        alt: 'Liquid Portfolio contact page',
      },
    ],
  },
  {
    title: 'CyberCodex.io',
    description:
      "CyberCodex.io is a comprehensive cybersecurity learning platform featuring interactive courses, hands-on labs, and a vibrant community. Master security skills from beginner to advanced with structured pathways and real-world scenarios.",
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    date: '2025',
    links: [
      {
        name: 'website',
        url: 'https://cybercodex.io',
      },
    ],
    images: [
      {
        src: '/Projects/Cybercodex.io/cyberCodex.mp4',
        alt: 'CyberCodex.io demo video',
        type: 'video',
      },
      {
        src: '/Projects/Cybercodex.io/homepage.webp',
        alt: 'CyberCodex.io homepage',
      },
      {
        src: '/Projects/Cybercodex.io/dashboard.webp',
        alt: 'CyberCodex.io dashboard',
      },
      {
        src: '/Projects/Cybercodex.io/community.webp',
        alt: 'CyberCodex.io community',
      },
      {
        src: '/Projects/Cybercodex.io/courses.webp',
        alt: 'CyberCodex.io courses page',
      },
    ],
  },
  {
    title: 'First Portfolio',
    description:
      "This is my very first portfolio website, built from scratch as I was learning web development. Created with pure HTML, CSS, and vanilla JavaScript, this project represents my foundation in web design and development. It features smooth scroll animations powered by Swiper, interactive contact forms using EmailJS for seamless communication, and fast content delivery through jsDelivr CDN. While simple compared to my current work, this portfolio marks the beginning of my journey as a developer and showcases my early understanding of responsive design, DOM manipulation, and user interface principles.",
    techStack: [
      'HTML',
      'CSS',
      'JavaScript',
      'Swiper',
      'EmailJS',
      'jsDelivr',
    ],
    date: '2023',
    links: [
      {
        name: 'Website',
        url: 'https://toukoum.github.io/oldPortfolio/',
      },
      {
        name: 'GitHub',
        url: 'https://github.com/toukoum/portfolio',
      },
    ],
    images: [
      {
        src: '/Projects/OldPortfolio/home.webp',
        alt: 'Old Portfolio homepage',
      },
      {
        src: '/Projects/OldPortfolio/projects.webp',
        alt: 'Old Portfolio projects section',
      },
      {
        src: '/Projects/OldPortfolio/posts.webp',
        alt: 'Old Portfolio blog posts',
      },
      {
        src: '/Projects/OldPortfolio/contact.webp',
        alt: 'Old Portfolio contact page',
      },
      {
        src: '/Projects/OldPortfolio/resume.webp',
        alt: 'Old Portfolio resume section',
      },
    ],
  },
  {
    title: 'Home-Lab',
    description:
      'A full home lab built from the ground up, serving as a practical testbed for enterprise networking, DevOps workflows, AI integration, and infrastructure design. The lab includes a multi-node Proxmox virtualization cluster with shared NAS storage, UniFi managed networking with VLAN segmentation, dedicated Linux servers for backend services and automation, portable Linux access nodes for secure remote connectivity, and edge devices like a Raspberry Pi 5 with a touchscreen, camera, and microphone for hand-tracking experiments and local AI chatbot interfaces.',
    techStack: [
      'Proxmox',
      'Ubuntu Linux',
      'UniFi Networking',
      'Pi-hole',
      'Raspberry Pi',
      'NAS Storage',
      'VLAN Segmentation',
      'Docker',
    ],
    date: '2024-2025',
    links: [],
    images: [
      {
        src: '/Projects/HomeLab/Main.webp',
        alt: 'Home Lab main rack overview',
        orientation: 'vertical' as const,
      },
      {
        src: '/Projects/HomeLab/lower.webp',
        alt: 'Home Lab lower rack section',
        orientation: 'vertical' as const,
      },
      {
        src: '/Projects/HomeLab/Nas.webp',
        alt: 'Home Lab NAS storage array',
        orientation: 'vertical' as const,
      },
      {
        src: '/Projects/HomeLab/network.webp',
        alt: 'Home Lab network diagram',
      },
    ],
    details: {
      equipment: [
        { name: 'Raspberry Pi 5', description: 'Touchscreen-enabled device with an attached camera and microphone, used for hand-tracking experiments and running a local AI chatbot interface.' },
        { name: 'Three Mini Phone Servers (Portable Linux Nodes)', description: 'Mobile devices running lightweight Linux server environments, used as deployable remote-access nodes. These act as drop-in access points on any network they\'re connected to, providing secure wireless access to my systems — functionally similar to portable VPN endpoints.' },
        { name: 'Raspberry Pi 3', description: 'Runs Pi-hole for network-wide ad blocking, along with several lightweight supporting services.' },
        { name: 'UniFi Cloud Key (Central Network Controller)', description: 'Acts as the main management hub for the home lab, controlling and monitoring all UniFi devices, including: UniFi Access Point (AP), UniFi Camera, UniFi Display, UniFi 8-Port Switch, and UniFi 16-Port Switch.' },
        { name: 'Network-Attached Storage (NAS)', description: 'Storage array containing three SSDs and one HDD, providing a total of 3 TB of storage, connected directly to the Proxmox cluster for VM and container storage.' },
        { name: 'Dell OptiPlex – "Infinite Void" (Ubuntu Linux Server)', description: 'Dedicated Ubuntu Linux server used for backend services, automation, and infrastructure support tasks.' },
        { name: 'Dell OptiPlex #2 – Proxmox Cluster Node 1', description: 'First node in the Proxmox virtualization cluster, hosting virtual machines and containers.' },
        { name: 'Dell OptiPlex #3 – Proxmox Cluster Node 2', description: 'Second node in the Proxmox virtualization cluster, providing redundancy and workload distribution.' },
        { name: 'UniFi Switch #1 – 8-Port Managed Switch', description: 'Provides managed network connectivity for lab devices and supports VLAN segmentation.' },
        { name: 'UniFi Switch #2 – 16-Port Managed Switch', description: 'Core switching hardware for the lab, handling higher device density and backbone traffic.' },
      ],
      external: [
        { name: 'Dell OptiPlex 7050 – Proxmox Cluster Node 3', description: 'Separate physical system outside the primary rack, acting as the third Proxmox node. Includes its own dedicated NAS with 2.5 TB of storage, expanding cluster capacity and resilience.' },
      ],
      learned: [
        'Networking: VLAN design, traffic segmentation, managed switching, and centralized device control',
        'Virtualization: Building and operating a multi-node Proxmox cluster with shared storage',
        'Linux Servers: Deploying and managing Ubuntu and lightweight Linux environments for services and automation',
        'Storage Systems: Integrating NAS devices with virtualization platforms and balancing performance vs. capacity',
        'Hardware Configuration: Assembling, repurposing, and maintaining enterprise-style hardware in a homelab setting',
        'Security & Remote Access: Designing portable access nodes and understanding network trust boundaries',
      ],
    },
  },
  {
    title: 'Server Room (NPCE)',
    description:
      "I recently built a complete enterprise-grade server room and esports network for the Boys & Girls Clubs of the Lewis-Clark Valley. Starting from an empty space, I deployed a full UniFi infrastructure including PoE switches, structured cabling, UniFi Protect cameras, and a CloudKey Gen2 Plus for centralized network and video management. I also assisted in configuring a SonicWall next-generation firewall to deliver secure, segmented networking throughout the facility. MXnet was implemented to control and distribute content across all building displays, ensuring synchronized and flexible media routing. The project included setting up multiple low-latency esports stations with optimized networking and workstation layouts. The final result is a scalable, secure, and high-performance infrastructure that supports daily operations, youth programs, and future expansion.",
    techStack: [
      'MXnet Video Ecosystem',
      'SonicWall',
      'Ubiquiti CloudKey',
      'Ubiquiti Cameras',
      'Ubiquiti UniFi Switches',
    ],
    date: '2024',
    links: [],
    images: [
      {
        src: '/projects/BGCLCV/teenCenterPc.webp',
        alt: 'Teen Center PC Setup',
      },
      {
        src: '/projects/BGCLCV/serverRoom.webp',
        alt: 'Server Room',
      },
      {
        src: '/projects/BGCLCV/serverRoomAngle.webp',
        alt: 'Server Room Angle View',
      },
      {
        src: '/projects/BGCLCV/serverSonicwall.webp',
        alt: 'Server Sonicwall Setup',
      },
      {
        src: '/projects/BGCLCV/esportsRoom.webp',
        alt: 'Esports Room',
      },
      {
        src: '/projects/BGCLCV/teenCenter.webp',
        alt: 'Teen Center',
      },
      {
        src: '/projects/BGCLCV/gymHoop.webp',
        alt: 'Gym Basketball Hoop',
      }
    ],
  },
  {
    title: 'Ubiquiti UniFi',
    description:
      'This project represents multiple production networks I built from the ground up using UniFi hardware. My work covered network design, hardware deployment, IP addressing, VLAN segmentation, and SonicWall edge firewall configuration. I also handled rack installs, switch provisioning, access point placement, camera infrastructure, and NVR storage, with segmented traffic for staff devices, security systems, phones, and infrastructure. Alongside UniFi, I integrated RFID access control and IP security systems, reinforcing a full-stack infrastructure approach from cabling through firewall policy.',
    typeLabel: 'Network Infrastructure > UniFi',
    techStack: [
      'UniFi CloudKey',
      'UniFi Switch 24-Port',
      'UniFi Switch 48-Port',
      'UniFi Access Points',
      'UniFi Protect',
      'UniFi NVR (Video Storage)',
      'UniFi G4 Dome Cameras',
      'UniFi Cameras',
      'SonicWall Firewalls',
      'VLAN Segmentation',
      'RFID Readers',
      'IP Security Systems',
    ],
    date: '2024-2026',
    features: [
      'Full UniFi network deployment',
      'VLAN design and segmentation',
      'SonicWall firewall configuration',
      'Camera systems with NVR storage',
      'Access point planning and tuning',
      'Desktop hardwiring and phone lines',
      'RFID and external security integrations',
    ],
    links: [],
    images: [
      {
        src: '/Projects/Ubiquiti/s_dashboard.webp',
        alt: 'UniFi dashboard overview',
      },
      {
        src: '/Projects/Ubiquiti/s_network.webp',
        alt: 'UniFi network topology view',
      },
      {
        src: '/Projects/Ubiquiti/o_dashboard.webp',
        alt: 'Operational dashboard analytics',
      },
      {
        src: '/Projects/Ubiquiti/o_network.webp',
        alt: 'Operational network and device status',
      }
    ],
  },
  {
    title: 'Modern Portfolio',
    description:
      "My current portfolio website, a clean, modern platform that showcases everything I've learned in web development, UI design, and frontend engineering. This is one of the projects I'm most proud of, built to push motion, layout structure, accessibility, and performance while keeping a polished, Apple-inspired aesthetic across light and dark modes.",
    typeLabel: 'Personal Portfolio > Next.js',
    techStack: [
      'Next.js 15.5.12',
      'React',
      'Node.js',
      'Tailwind CSS',
      'Radix UI',
      'Framer Motion',
      'Lucide Icons',
      'Express',
      'Vite',
      'Turbopack',
      'Open Graph',
      'React Native for Web',
    ],
    date: '2026',
    features: [
      'Modern responsive layout',
      'Clean animated transitions with Framer Motion',
      'Dark / Light mode support',
      'Structured sections for Me, Skills, Projects, More, and Contact',
      'Performance-optimized Next.js build',
      'Open Graph social sharing support',
    ],
    links: [
      {
        name: 'Website',
        url: 'https://jordanhymas.com',
      },
      {
        name: 'GitHub',
        url: 'https://github.com/Jhymas20',
      },
    ],
    images: [
      {
        src: '/Projects/ModernPortfolio/home_page.webp',
        alt: 'Modern Portfolio home page',
      },
      {
        src: '/Projects/ModernPortfolio/projects_page.webp',
        alt: 'Modern Portfolio projects page',
      },
      {
        src: '/Projects/ModernPortfolio/me_page.webp',
        alt: 'Modern Portfolio me page',
      },
      {
        src: '/Projects/ModernPortfolio/skills_page.webp',
        alt: 'Modern Portfolio skills page',
      },
      {
        src: '/Projects/ModernPortfolio/contact_page.webp',
        alt: 'Modern Portfolio contact page',
      },
    ],
  },
  {
    title: 'Retro Snake',
    description:
      "This is one of the first projects I ever worked on during my early programming journey. Built entirely in C++ with a Bash-based build system, this classic Snake game recreation represents my initial steps into game development and systems programming. While it's a simple implementation by today's standards, I've included it here for sentimental value and to showcase my growth as a developer. It's not a reflection of my current work capabilities, but rather a reminder of where I started and how far I've come in my development journey.",
    techStack: ['C++', 'Bash'],
    date: '2023',
    links: [],
    images: [
      {
        src: '/Projects/Snake/snake.webp',
        alt: 'Retro Snake gameplay',
      },
      {
        src: '/Projects/Snake/menu.webp',
        alt: 'Retro Snake menu',
      },
    ],
  },
  {
    title: 'Proxmox Cluster',
    description:
      'A multi-node Proxmox VE virtualization cluster used to manage virtual machines for security testing, system administration, and infrastructure experimentation. The cluster is designed to resemble a small enterprise environment, providing centralized VM management, shared storage, and remote accessibility.',
    techStack: [
      'Proxmox VE',
      'Dell OptiPlex',
      'NAS Storage',
      'Tailscale VPN',
      'Linux',
      'Windows Server',
      'Kali Linux',
    ],
    date: '2024-2025',
    links: [],
    images: [
      {
        src: '/Projects/Proxmox/proxmoxHome.webp',
        alt: 'Proxmox cluster home view',
      },
      {
        src: '/Projects/Proxmox/mainProxmox.webp',
        alt: 'Proxmox cluster main dashboard',
      },
    ],
    details: {
      equipment: [
        { name: 'Node 1 & Node 2', description: 'Two Dell OptiPlex systems running Proxmox VE, connected to a shared 3 TB NAS for virtual machine and ISO storage.' },
        { name: 'Node 3', description: 'A Dell OptiPlex 7050 acting as the third Proxmox node, attached to a dedicated 2.5 TB NAS for additional capacity and redundancy.' },
        { name: 'Shared Storage', description: 'NAS-backed storage integrated with Proxmox to support VM disks, snapshots, and backups across the cluster.' },
      ],
      external: [
        { name: 'Tailscale VPN', description: 'Used to securely access the entire home lab from any location, providing encrypted, zero-trust remote connectivity to Proxmox nodes, virtual machines, and management interfaces without exposing services directly to the public internet.' },
      ],
      learned: [
        'Virtual machine lifecycle management using Proxmox VE',
        'Multi-node clustering and shared storage integration',
        'Secure remote access using mesh VPN technologies',
        'Linux and Windows server administration in virtualized environments',
        'Backup, snapshot, and recovery planning',
        'Hosting Linux and Windows VMs for administrative and infrastructure testing',
        'Running Kali Linux VMs for controlled security and penetration-testing labs',
        'Rapid VM deployment using a template library',
        'Snapshotting and restoring systems to simulate recovery and rollback scenarios',
      ],
    },
  },
];

// Define interface for project prop
interface ProjectProps {
  title: string;
  category?: string;
  thumbnail?: string;
  description?: string;
  techStack?: string[];
  date?: string;
  links?: { name: string; url: string }[];
  images?: { src: string; alt: string }[];
}

const ProjectContent = ({ project }: { project: ProjectProps }) => {
  // Find the matching project data
  const projectData = PROJECT_CONTENT.find((p) => p.title === project.title);

  if (!projectData) {
    return <div>Project details not available</div>;
  }

  // Build category/type string
  const categoryString = project.category || 'Project';
  const typeString =
    'typeLabel' in projectData && projectData.typeLabel
      ? projectData.typeLabel
      : `${categoryString} > ${projectData.techStack[0] || 'Development'}`;

  return (
    <div className="h-full w-full overflow-y-auto bg-[#f5f4f0] dark:bg-[#1D1D1F]">
      <div className="p-6 space-y-4">
        {/* Header with thumbnail and title */}
        <div className="flex items-start gap-4 border-b border-neutral-300 pb-4 dark:border-neutral-700">
          {/* Thumbnail */}
          <div className="flex-shrink-0">
            {project.thumbnail ? (
              <div className="relative h-16 w-16 overflow-hidden rounded-lg border-2 border-neutral-300 dark:border-neutral-600">
                <Image
                  src={project.thumbnail}
                  alt={projectData.title}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
            ) : projectData.images && projectData.images[0] ? (
              <div className="relative h-16 w-16 overflow-hidden rounded-lg border-2 border-neutral-300 dark:border-neutral-600">
                <Image
                  src={projectData.images[0].src}
                  alt={projectData.title}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-neutral-300 bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-800">
                <Img className="h-8 w-8 text-neutral-500" />
              </div>
            )}
          </div>

          {/* Title and subtitle */}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              {projectData.title}
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {project.category || 'Project'}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            {projectData.description}
          </p>
        </div>

        {/* Details Section */}
        <CollapsibleSection title="Details:" defaultOpen={true}>
          <div className="space-y-3 text-sm">
            {/* Type */}
            <div className="flex items-start gap-2">
              <span className="text-orange-500">●</span>
              <div>
                <span className="font-medium text-neutral-700 dark:text-neutral-300">Type: </span>
                <span className="text-neutral-600 dark:text-neutral-400">{typeString}</span>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-start gap-2">
              <span className="text-orange-500">●</span>
              <div>
                <span className="font-medium text-neutral-700 dark:text-neutral-300">Year: </span>
                <span className="text-neutral-600 dark:text-neutral-400">{projectData.date}</span>
              </div>
            </div>

            {/* Technologies */}
            <div className="flex items-start gap-2">
              <span className="text-orange-500">●</span>
              <div className="flex-1">
                <span className="font-medium text-neutral-700 dark:text-neutral-300">Technologies: </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {projectData.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-neutral-200 px-3 py-1 text-xs text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </CollapsibleSection>

        {/* Features Section */}
        {'features' in projectData && Array.isArray(projectData.features) && projectData.features.length > 0 && (
          <CollapsibleSection title="Features:" defaultOpen={true}>
            <div className="space-y-2 text-sm">
              {projectData.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-orange-500">●</span>
                  <span className="text-neutral-600 dark:text-neutral-400">{feature}</span>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Equipment Section (for Home-Lab style projects) */}
        {projectData.details?.equipment && (
          <CollapsibleSection title="Lab Equipment:" defaultOpen={true}>
            <div className="space-y-3 text-sm">
              {projectData.details.equipment.map((item: { name: string; description: string }, index: number) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">{index + 1}.</span>
                  <div>
                    <span className="font-medium text-neutral-700 dark:text-neutral-300">{item.name}</span>
                    <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* External Equipment Section */}
        {projectData.details?.external && (
          <CollapsibleSection title="External to the Main Lab Rack:" defaultOpen={true}>
            <div className="space-y-3 text-sm">
              {projectData.details.external.map((item: { name: string; description: string }, index: number) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-orange-500">●</span>
                  <div>
                    <span className="font-medium text-neutral-700 dark:text-neutral-300">{item.name}</span>
                    <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* What I Learned Section */}
        {projectData.details?.learned && (
          <CollapsibleSection title="What I Learned:" defaultOpen={true}>
            <div className="space-y-2 text-sm">
              {projectData.details.learned.map((item: string, index: number) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-orange-500">●</span>
                  <span className="text-neutral-600 dark:text-neutral-400">{item}</span>
                </div>
              ))}
              <p className="text-neutral-600 dark:text-neutral-400 mt-3 italic">
                This lab functions as a practical testbed for experimenting with enterprise networking, DevOps workflows, AI integration, and infrastructure design in a controlled environment.
              </p>
            </div>
          </CollapsibleSection>
        )}

        {/* Links Section */}
        {projectData.links && projectData.links.length > 0 && (
          <CollapsibleSection title="Links:" defaultOpen={true}>
            <div className="space-y-2 text-sm">
              {projectData.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-neutral-700 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span className="capitalize">{link.name}</span>
                </a>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Preview Section */}
        {projectData.images && projectData.images.length > 0 && (
          <CollapsibleSection title="Preview:" defaultOpen={true}>
            <div className="space-y-4">
              {projectData.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-lg border border-neutral-300 dark:border-neutral-600 ${
                    'orientation' in image && image.orientation === 'vertical' ? 'aspect-[3/4]' : 'aspect-video'
                  }`}
                >
                  {'type' in image && image.type === 'video' ? (
                    <video
                      src={image.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                      preload="metadata"
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain"
                    />
                  )}
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}
      </div>
    </div>
  );
};

// Main data export with updated content
export const data = [
  {
    category: 'Web Development',
    title: 'Liquid Portfolio',
    src: '/Projects/LiquidPortfolio/projects.webp',
    content: <ProjectContent project={{ title: 'Liquid Portfolio', category: 'Web Development', thumbnail: '/Projects/LiquidPortfolio/projects.webp' }} />,
  },
  {
    category: 'Cybersecurity Platform',
    title: 'CyberCodex.io',
    src: '/Projects/Cybercodex.io/courses.webp',
    content: <ProjectContent project={{ title: 'CyberCodex.io', category: 'Cybersecurity Platform', thumbnail: '/Projects/Cybercodex.io/courses.webp' }} />,
  },
  {
    category: 'Web Development',
    title: 'First Portfolio',
    src: '/Projects/OldPortfolio/home.webp',
    content: <ProjectContent project={{ title: 'First Portfolio', category: 'Web Development', thumbnail: '/Projects/OldPortfolio/home.webp' }} />,
  },
  {
    category: 'Infrastructure & Homelab',
    title: 'Home-Lab',
    src: '/Projects/HomeLab/Main.webp',
    orientation: 'vertical' as const,
    content: <ProjectContent project={{ title: 'Home-Lab', category: 'Infrastructure & Homelab', thumbnail: '/Projects/HomeLab/Main.webp' }} />,
  },
  {
    category: 'Infrastructure & Networking',
    title: 'Server Room (NPCE)',
    src: '/projects/BGCLCV/teenCenterPc.webp',
    content: <ProjectContent project={{ title: 'Server Room (NPCE)', category: 'Infrastructure & Networking', thumbnail: '/projects/BGCLCV/teenCenterPc.webp' }} />,
  },
  {
    category: 'Infrastructure & Networking',
    title: 'Ubiquiti UniFi',
    src: '/Projects/Ubiquiti/unifi_main.webp',
    content: <ProjectContent project={{ title: 'Ubiquiti UniFi', category: 'Infrastructure & Networking', thumbnail: '/Projects/Ubiquiti/unifi_main.webp' }} />,
  },
  {
    category: 'Web Development',
    title: 'Modern Portfolio',
    src: '/Projects/ModernPortfolio/home_page.webp',
    content: <ProjectContent project={{ title: 'Modern Portfolio', category: 'Web Development', thumbnail: '/Projects/ModernPortfolio/home_page.webp' }} />,
  },
  {
    category: 'Game Development',
    title: 'Retro Snake',
    src: '/Projects/Snake/snake.webp',
    content: <ProjectContent project={{ title: 'Retro Snake', category: 'Game Development', thumbnail: '/Projects/Snake/snake.webp' }} />,
  },
  {
    category: 'Infrastructure & Virtualization',
    title: 'Proxmox Cluster',
    src: '/Projects/Proxmox/mainProxmox.webp',
    content: <ProjectContent project={{ title: 'Proxmox Cluster', category: 'Infrastructure & Virtualization', thumbnail: '/Projects/Proxmox/mainProxmox.webp' }} />,
  },
];
