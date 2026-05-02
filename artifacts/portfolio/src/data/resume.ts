export interface ResumeEntry {
  title: string;
  organization: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface ResumeData {
  education: {
    institution: string;
    location: string;
    degrees: { level: string; detail: string; graduated: string }[];
    coursework: string;
    honors: string;
  };
  professional: ResumeEntry[];
  leadership: ResumeEntry[];
  languages: string;
  interests: string[];
}

const resume: ResumeData = {
  education: {
    institution: 'Massachusetts Institute of Technology (MIT)',
    location: 'Cambridge, MA',
    degrees: [
      {
        level: 'MS in Mechanical Engineering',
        detail: 'GPA: 5.0/5.0',
        graduated: 'Feb. 2025',
      },
      {
        level: 'BS in Mechanical Engineering, minor in Design',
        detail: 'GPA: 4.7/5.0 · ACT: 34',
        graduated: 'Feb. 2023',
      },
    ],
    coursework:
      'Fundamentals of Programming, AI & ML for Engineering Design, Art & Science of Negotiation, Negotiation Analysis, Management in Engineering, Developing Leadership Capabilities, Product Engineering Process',
    honors:
      'Pi Tau Sigma Honors Society (top 25% of MechE class), MIT Project Manus Makerspace Mentor',
  },
  professional: [
    {
      title: 'Graduate Researcher',
      organization: 'Culpepper Lab, MIT Dept. of Mechanical Engineering',
      location: 'Cambridge, MA',
      period: 'Sep. 2023 – Jan. 2025',
      bullets: [
        'Designed and led a novel technical makerspace training program integrating engineering design thinking, parametric CAD in OnShape, rapid prototyping, and hands-on fabrication to reduce barriers for beginner makers and underrepresented minorities.',
        'Conducted surveys/interviews with 23 student participants to assess changes in self-efficacy, engineering identity, and motivation.',
        'Utilized Pandas in Python scripts to generate histograms and box plots from Excel data to highlight pre and post training differentials.',
        'Awarded Best Student Paper at International Symposium for Academic Makerspaces (ISAM) 2025. Presented poster at ISAM 2024.',
      ],
    },
    {
      title: 'Mechanical Engineering Intern',
      organization: 'Encora Therapeutics',
      location: 'Remote',
      period: 'Jun. 2022 – Aug. 2022',
      bullets: [
        "Brainstormed and sketched concepts optimizing for ergonomics and patient autonomy for Encora's tremor-reducing wrist wearable.",
        'Developed 13 simple embedded electronic band designs in SolidWorks and analyzed stresses using finite element analysis (FEA).',
      ],
    },
    {
      title: 'Cell Engineering Intern',
      organization: 'Tesla, Cell Engineering Team',
      location: 'Palo Alto, CA',
      period: 'Jun. 2021 – Aug. 2021',
      bullets: [
        "Took ownership of existing experiment to define and understand several mechanical parameters in Tesla's 4680 tabless cells.",
        'Designed and executed 3 experiments to calculate battery cell pore volume over different periods of cell life.',
      ],
    },
  ],
  leadership: [
    {
      title: 'Design Instructor',
      organization: 'MIT Dept. of Mechanical Engineering',
      location: 'Cambridge, MA',
      period: 'Mar. 2025 – May 2025',
      bullets: [
        'Lectured 30 enrolled students on topics in engineering and design thinking for a first-year Mechanical Engineering course.',
        'Partnered with co-instructor to revamp course content and ensure consistent course updates via Canvas.',
        'Organized design reviews for students with multiple stakeholders and provided feedback on student prototypes and progress.',
      ],
    },
    {
      title: 'High School Instructor',
      organization: 'MIT Global Teaching Labs',
      location: 'Barcelona, Spain',
      period: 'Jan. 2025',
      bullets: [
        'Developed Python tutorials, supported Arduino lessons, and integrated making into non-STEM course projects with up to 20 students.',
        'Initiated a tutorial for 4 teachers on how to use 3D printers and laser cutters for independent integration into their curriculums.',
      ],
    },
    {
      title: 'ReVise User Research Lead',
      organization: '2.009, Product Engineering Process',
      location: 'Cambridge, MA',
      period: 'Sep. 2021 – Dec. 2021',
      bullets: [
        'Collaborated with a 20-person team to build ReVise, a vacuum-forming vise that safely grips delicate, irregularly shaped workpieces.',
        'Proposed and prototyped the vacuum forming concept which defined the final product mechanism.',
        'Led the user research sub-team to design and execute testing protocols, gather user feedback, and inform design directions.',
        'Presented and demoed alpha prototype to 1,000 in-person and 5,000 virtual attendees.',
      ],
    },
    {
      title: 'Executive Board Member, Co-VP',
      organization: 'MIT Muslim Students Association',
      location: 'Cambridge, MA and Remote',
      period: 'Jan. 2019 – May 2022 & Jan. 2024 – Dec. 2024',
      bullets: [
        "Established org's vision and increased collaboration with other cultural student orgs; managed 8 committees.",
        'Managed a $30k budget; directed a 10-person team across 3 org-wide committees to coordinate 30 dinners serving 100+ people daily.',
        'Organized 10+ events across four semesters for up to 300 people as Social Chair.',
        'Compiled fragmented org documentation to prevent information loss and streamline annual exec board transitions.',
      ],
    },
  ],
  languages: 'English (native) · Arabic (conversational)',
  interests: [
    'Reading',
    'Writing',
    'Crocheting',
    '3D Printing',
    'Prosthetics',
    'Product Design',
    'Urban Planning',
    'Trains',
    'Traveling',
    'Hiking',
    'Pickleball',
    'Cats',
  ],
};

export default resume;
