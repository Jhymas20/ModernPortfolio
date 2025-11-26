import Image from 'next/image';
import { Image as Img } from 'lucide-react';
import { ChevronRight, Link, ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { url } from 'inspector';
import { CollapsibleSection } from './CollapsibleSection';

// Enhanced project content array with all projects
const PROJECT_CONTENT = [
  {
    title: 'Synto',
    description:
      'Synto is an AI-powered interface that transforms complex blockchain interactions into simple, natural language commands. Whether you want to send tokens, stake assets, swap coins, or even create NFTs or liquidity pools, just tell Synto what to do — no manual wallet interactions, no technical jargon. One of my biggest projects yet',
    techStack: [
      'Next.js',
      'TailwindCSS',
      'Web3.js',
      'shadcn-ui',
      'TypeScript',
      'Phantom Wallet',
      'OpenAI API',
      'Vercel AI SDK',
      'Solana Agent kit',
      'Neon',
      'Prisma'
    ],
    date: '2025',
    links: [
      {
        name: 'website',
        url: 'https://synto.fun',
      },
      {
        name: 'Launch Video',
        url: 'https://www.youtube.com/watch?v=4QUE2KgKDUw',
      },
      {
        name: 'X',
        url: 'https://x.com/chainSynto',
      },
      {
        name: 'Technical Video',
        url: 'https://www.youtube.com/watch?v=1CjBLKPUwtA&feature=youtu.be',
      },
      {
        name: 'Pitch Deck',
        url: 'https://drive.google.com/file/d/1B3m44mEgv81rJHfjNfTKi147yX4raQed/view?usp=sharing',
      },
      {
        name: 'Usage tutorial',
        url: 'https://www.youtube.com/watch?v=PRu1cfvT2bA',
      }
    ],
    images: [
      {
        src: '/synto1.png',
        alt: 'Synto landing page',
      },
      {
        src: '/synto2.png',
        alt: 'Synto chat interface',
      },
      {
        src: '/synto3.png',
        alt: 'Synto chat interface',
      },
      {
        src: '/synto4.png',
        alt: 'Synto chat interface',
      },
      {
        src: '/synto5.png',
        alt: 'Synto chat interface',
      },
      {
        src: '/synto6.png',
        alt: 'Synto chat interface',
      },
    ],
  },
  {
    title: 'CyberCodex.io',
    description:
      "CyberCodex.io is a comprehensive cybersecurity learning platform featuring interactive courses, hands-on labs, and a vibrant community. Master security skills from beginner to advanced with structured pathways and real-world scenarios.",
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    date: '2024',
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
    title: 'Defai',
    description:
      "We Win ETHOXford hackathon by building DEFAI. DEFAI stands for Decentralized Finance Artificial Intelligence. It's an AI-powered chat interface that simplifies on-chain operations on the Avalanche blockchain by allowing users to interact using natural language. This makes complex DeFi operations accessible even for those with limited technical expertise.",
    techStack: [
      'Next.js',
      'TailwindCSS',
      'shadcn-ui',
      'Vercel AI SDK',
      'TypeScript',
    ],
    date: '2025',
    links: [
      {
        name: 'website',
        url: 'https://dorahacks.io/buidl/22605',
      },
      {
        name: 'github',
        url: 'https://github.com/toukoum/DEFAI',
      },
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/feed/update/urn:li:activity:7299337190151483392/',
      },
      {
        name: 'Youtube Video',
        url: 'https://www.youtube.com/watch?v=N9O7los4-ng&t=34s&ab_channel=Toukoum',
      }
    ],
    images: [
      {
        src: '/defai1.png',
        alt: 'Landing Page of Defai',
      },
      {
        src: '/defai2.png',
        alt: 'Confirmation popup of Defai',
      },
      {
        src: '/defai3.png',
        alt: 'Chatbot of Defai',
      },
      {
        src: '/defai4.jpeg',
        alt: 'Winner team',
      },
    ],
  },
  {
    title: 'Fitgear',
    description:
      'Won the Gotta Go Hack IA by building Fitgear, a virtual voice seller accessible by QR code to improve the ratio between customers and sellers. Created an AI pipeline with API calls and a RAG system for natural language interactions.',
    techStack: ['Next.js', 'TailwindCSS', 'OpenAI API', 'Langchain'],
    date: '2024',
    links: [
      {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/posts/raphael-giraud-60939519a_hackathon-innovation-sporttech-activity-7210399263774674946-qSXq?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAC6vwikBVSEkS7XWktWS7y6GR3GHwAlKslc',
      },
    ],
    images: [
      {
        src: '/fitgear2.png',
        alt: 'Fitgear chatbot',
      },
      {
        src: '/fitgear1.png',
        alt: 'Fitgear landing page',
      },
    ],
  },
  {
    title: 'Datai',
    description:
      "DATAI is an AI-powered agent that lets non-technical users query a database using natural language without writing SQL. Built using Next.js, TailwindCSS, shadcn-ui, and Anthropic's Claude API, this project focuses on simplicity, speed, and user-friendly design.",
    techStack: [
      'Next.js',
      'TailwindCSS',
      'shadcn-ui',
      'Claude API',
      'TypeScript',
    ],
    date: '2024',
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/toukoum/datai',
      },
      {
        name: 'Youtube Video Demo',
        url: 'https://youtu.be/iE0RXjdbQsw',
      }
    ],
    images: [
      {
        src: '/projects/BGCLCV/teenCenterPc.webp',
        alt: 'Teen Center PC Setup',
      },
      {
        src: '/projects/BGCLCV/serverRoom.jpeg',
        alt: 'Server Room',
      },
      {
        src: '/projects/BGCLCV/serverRoomAngle.jpeg',
        alt: 'Server Room Angle View',
      },
      {
        src: '/projects/BGCLCV/serverSonicwall.jpeg',
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
    title: '3d Pong Game',
    description:
      "Transcendance is the final project of my 42 cursus. It's a 3D pong game with multiplayer capabilities, user authentication, and real-time gameplay. We had to do everything from scratch, so it was pretty challenging and we learned a lot.",
    techStack: ['Django', 'Python', 'JavaScript', 'Websockets', 'PostgreSQL', 'Docker', 'Nginx', 'Web3', 'Solidity'],
    date: '2023',
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/toukoum/Transcendance',
      },
    ],
    images: [
      {
        src: '/trans1.png',
        alt: 'Transcendance landing page',
      },
      {
        src: '/trans2.webp',
        alt: 'Transcendance game',
      },
      {
        src: '/trans3.png',
        alt: 'Transcendance game',
      },
      {
        src: '/trans4.png',
        alt: 'Transcendance game',
      },
      {
        src: '/trans5.png',
        alt: 'Transcendance game',
      },
      {
        src: '/trans6.png',
        alt: 'Transcendance game',
      }

    ],
  },
  {
    title: 'Minishell',
    description:
      "Minishell is a project that aims to create a simple shell. It's a great introduction to process creation and management in C, offering fundamental Unix command-line functionality. This was a very challenging project, but I learned a lot from it.",
    techStack: ['C', 'Unix', 'Bash'],
    date: '2023',
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/toukoum/Michelle-42',
      },
    ],
    images: [
      {
        src: '/minishell1.png',
        alt: 'Minishell landing page',
      }
    ],
  },
  {
    title: 'YouBot',
    description:
      'YouBot is a Python Bot that Scrapes Videos from Pexels, adds a random song from a Songs Folder, then auto-uploads the videos to your YouTube Channel for continuous content generation.',
    techStack: ['Python', 'YouTube API', 'Pexels API'],
    date: '2022',
    links: [
      {
        name: "YouTube Video",
        url: "https://youtu.be/vp1v5mBG7rA "
      },
      {
        name: 'GitHub',
        url: 'https://github.com/toukoum/YouBot',
      }
    ],
    images: [
      {
        src: '/youbot1.jpg',
        alt: 'Youbot landing page',
      },
      {
        src: '/youbot2.png',
        alt: 'Youbot chatbot',
      },
    ],
  },
  {
    title: 'Old Portfolio',
    description:
      'My previous traditional portfolio built with vanilla HTML, CSS and JS with GSAP animations for a smooth and interactive user experience.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
    date: '2022',
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
        src: '/oldport1.png',
        alt: 'Old Portfolio landing page',
      },
      {
        src: '/oldport2.png',
        alt: 'Old Portfolio projects',
      }
    ],
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
  const typeString = `${categoryString} > ${projectData.techStack[0] || 'Development'}`;

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
                  className="object-cover"
                />
              </div>
            ) : projectData.images && projectData.images[0] ? (
              <div className="relative h-16 w-16 overflow-hidden rounded-lg border-2 border-neutral-300 dark:border-neutral-600">
                <Image
                  src={projectData.images[0].src}
                  alt={projectData.title}
                  fill
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

            {/* Links */}
            {projectData.links && projectData.links.length > 0 && (
              <div className="flex items-start gap-2">
                <span className="text-orange-500">●</span>
                <div className="flex-1">
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">Links: </span>
                  <div className="mt-2 space-y-2">
                    {projectData.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span className="capitalize">{link.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CollapsibleSection>

        {/* Preview Section */}
        {projectData.images && projectData.images.length > 0 && (
          <CollapsibleSection title="Preview:" defaultOpen={true}>
            <div className="space-y-4">
              {projectData.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-video overflow-hidden rounded-lg border border-neutral-300 dark:border-neutral-600"
                >
                  {image.type === 'video' ? (
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
                      className="object-cover"
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
    category: 'Startup Project',
    title: 'CyberCodex.io',
    src: '/syntopreview.png',
    content: <ProjectContent project={{ title: 'Synto', category: 'Startup Project', thumbnail: '/syntopreview.png' }} />,
  },
  {
    category: 'Cybersecurity Platform',
    title: 'CyberCodex.io',
    src: '/Projects/Cybercodex.io/courses.webp',
    content: <ProjectContent project={{ title: 'CyberCodex.io', category: 'Cybersecurity Platform', thumbnail: '/Projects/Cybercodex.io/courses.webp' }} />,
  },
  {
    category: 'Hackathon Winner',
    title: 'Defai',
    src: '/defaipreview.png',
    content: <ProjectContent project={{ title: 'Defai', category: 'Hackathon Winner', thumbnail: '/defaipreview.png' }} />,
  },
  {
    category: 'Hackathon Winner',
    title: 'Fitgear',
    src: '/fitgearpreview.png',
    content: <ProjectContent project={{ title: 'Fitgear', category: 'Hackathon Winner', thumbnail: '/fitgearpreview.png' }} />,
  },
  {
    category: 'Business Intelligence',
    title: 'Server Room',
    src: '/projects/BGCLCV/teenCenterPc.webp',
    content: <ProjectContent project={{ title: 'Datai', category: 'Business Intelligence', thumbnail: '/projects/BGCLCV/teenCenterPc.webp' }} />,
  },
  {
    category: '42 Project',
    title: '3d Pong Game',
    src: '/transcendancepreview.png',
    content: <ProjectContent project={{ title: '3d Pong Game', category: '42 Project', thumbnail: '/transcendancepreview.png' }} />,
  },
  {
    category: '42 Project',
    title: 'Minishell',
    src: '/minishellpreview.png',
    content: <ProjectContent project={{ title: 'Minishell', category: '42 Project', thumbnail: '/minishellpreview.png' }} />,
  },
  {
    category: 'Automation',
    title: 'YouBot',
    src: '/youbotpreview.png',
    content: <ProjectContent project={{ title: 'YouBot', category: 'Automation', thumbnail: '/youbotpreview.png' }} />,
  },
  {
    category: 'Web Development',
    title: 'Old Portfolio',
    src: '/oldportfoliopreview.png',
    content: <ProjectContent project={{ title: 'Old Portfolio', category: 'Web Development', thumbnail: '/oldportfoliopreview.png' }} />,
  },
];
