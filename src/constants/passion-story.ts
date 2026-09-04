export type PassionNavItem = {
  label: string;
  sublabel: string;
  href: string;
};

export type PassionFigureType =
  | "globe"
  | "clock"
  | "photo"
  | "mountain"
  | "studio"
  | "screen";

export type PassionFigure = {
  id: string;
  type: PassionFigureType;
  caption: string;
  imageSrc?: string;
  imageAlt?: string;
};

export type PassionChapter = {
  id: string;
  number: string;
  paragraphs: string[];
  figures: PassionFigure[];
};

export const PASSION_PAGE_NAV: PassionNavItem[] = [
  { label: "Yudeat", sublabel: "Home", href: "/" },
  { label: "Work", sublabel: "Projects index", href: "/#work" },
  { label: "Passion", sublabel: "Story & craft", href: "/passion" },
  { label: "Field", sublabel: "Image archive", href: "/passion#image-field" },
  { label: "Journal", sublabel: "Writing", href: "/blog" },
  { label: "Mountains", sublabel: "Field notes", href: "/passion#collections-mountains" },
  { label: "Contact", sublabel: "Get in touch", href: "/#contact" },
];

export const PASSION_INTRO = {
  eyebrow: "Mountaineer & maker",
  title: "Rooted in the Annapurna",
  subtitle:
    "From Parbat to the high country — studying mountains formally while building for the web.",
};

export const PASSION_PROFILE = {
  title: "Profile Introduction",
  statement:
    "Born in Parbat, Nepal — in the shadow of the Annapurna range — altitude was never abstract: it was weather, light, and the shape of every horizon. Design and code came first, as craft and livelihood. The mountains kept pulling, until field walks became study, and study became a Bachelor in Mountaineering Studies. Today the two run in parallel — technical craft on one side, high-altitude discipline on the other — held together by one instinct: curiosity about what happens just outside the frame.",
  aside: {
    kicker: "Field Note",
    imageSrc: "/field/IMG_6695.jpg",
    imageAlt: "Field frame from a ridge study",
    caption: "Field frame — ridge study",
    question: "Can the discipline of the mountains shape the craft of the screen?",
    meta: "Parbat · Annapurna region",
  },
};

export const PASSION_INTRO_PHOTOS = [
  {
    src: "/field/IMG_6730.jpg",
    alt: "Himalayan ridgeline above a cloud inversion",
  },
  {
    src: "/field/IMG_6711.jpg",
    alt: "Mountain light on a valley walk",
  },
  {
    src: "/field/IMG_6695.jpg",
    alt: "Field frame from a ridge study",
  },
] as const;

export const PASSION_CHAPTERS: PassionChapter[] = [
  {
    id: "chapter-1",
    number: "1.",
    paragraphs: [
      "Parbat sits close enough to the Annapurna massif that altitude is never abstract — it is weather, light, and the shape of every horizon. That geography became the baseline: ridges as reference lines, cloud as scale, walking as the first way of learning a landscape.",
      "Web development came first as craft and livelihood — systems, interfaces, problems solved in code. The mountains kept pulling. What started as field walks and camera frames became formal study: mountaineering as discipline, not just backdrop.",
    ],
    figures: [
      {
        id: "fig-1",
        type: "globe",
        caption: "Fig 1: Parbat & Annapurna",
      },
      {
        id: "fig-2",
        type: "photo",
        caption: "Fig 2: High-country light",
        imageSrc: "/field/IMG_6662.jpg",
        imageAlt: "Morning light across Himalayan foothills",
      },
    ],
  },
  {
    id: "chapter-2",
    number: "2.",
    paragraphs: [
      "Design arrived as a discipline before code did. I loved grids, brutalist posters, and the tension between raw structure and human warmth. Typography felt like architecture you could read.",
      "When I started building interfaces, the same questions followed me: what should be loud, what should disappear, and how does someone feel five seconds after landing on a page?",
    ],
    figures: [
      {
        id: "fig-3",
        type: "clock",
        caption: "Fig 3: Learning in seasons",
      },
      {
        id: "fig-4",
        type: "screen",
        caption: "Fig 4: First shipped interface",
        imageSrc: "/project4.png",
        imageAlt: "Bold portfolio interface with expressive typography",
      },
    ],
  },
  {
    id: "chapter-3",
    number: "3.",
    paragraphs: [
      "Photography became my second profession — not because I chased weddings or stock libraries, but because walking with a camera slows me down. Mountains especially. They refuse fast aesthetics.",
      "Some of my favorite frames are ordinary: pine silhouettes, cloud inversions, a ridge line that looks like a blade. I chase clarity, not drama. The same instinct shows up when I design a product dashboard.",
    ],
    figures: [
      {
        id: "fig-5",
        type: "mountain",
        caption: "Fig 5: Field study",
        imageSrc: "/field/IMG_6730.jpg",
        imageAlt: "Snow peaks above a sea of clouds in the Himalayas",
      },
      {
        id: "fig-6",
        type: "photo",
        caption: "Fig 6: Distance & scale",
        imageSrc: "/field/IMG_6706.jpg",
        imageAlt: "Rolling hills and soft morning light",
      },
    ],
  },
  {
    id: "chapter-4",
    number: "4.",
    paragraphs: [
      "Today those two paths run parallel: freelance design and front-end development on one side, a Bachelor in Mountaineering Studies on the other. Technical problem-solving from the screen transfers to route planning, gear systems, and reading terrain under pressure.",
      "If you are here for the developer portfolio, you will find it on the home page. If you are here for the mountaineer — this is the thread that ties it together: high-altitude geography, field discipline, and the same curiosity about what happens just outside the frame.",
    ],
    figures: [
      {
        id: "fig-7",
        type: "studio",
        caption: "Fig 7: Studio practice",
      },
      {
        id: "fig-8",
        type: "screen",
        caption: "Fig 8: Systems in production",
        imageSrc: "/project2.png",
        imageAlt: "Wholesale marketplace interface with clean product layout",
      },
    ],
  },
];
