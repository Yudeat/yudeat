import {
  SITE_CONTACT_EMAIL,
  SITE_LOCATION,
  SITE_PHONE_DISPLAY,
} from "@/constants/site";

export const WHO_WE_ARE_IMAGE = {
  src: "/about-mountain.png",
  alt: "Snow-capped Himalayan peaks above clouds at sunrise",
} as const;

export const WHO_WE_ARE_CREATIVE_IMAGE = {
  src: "/about-creative-hero.png",
  alt: "Laptop showing a bold digital experience design with warm orange lighting",
} as const;

export const WHO_WE_ARE_WRITING_IMAGE = {
  src: "/about-writing-hand.png",
  alt: "Illustrated hand writing with a pen — storytelling and craft",
} as const;

export const WHO_WE_ARE_NAV = {
  indexLabel: "Index",
  indexHref: "#work",
  infoLabel: "Info",
  journalLabel: "Field",
  journalHref: "/passion#image-field",
} as const;

export const WHO_WE_ARE_BIO = {
  name: "Yudeat",
  headline: "Building digital experiences that stick",
  lead:
    "My name is Yudeat — designer, full-stack developer, and visual storyteller. I build and ship end-to-end with a DevOps mindset, and care about typography, brutalist structure, and work that feels alive in the browser.",
  trail: `Based in ${SITE_LOCATION}, I ship for clients worldwide and keep one foot in the mountains.`,
  readMoreLabel: "Read my story",
  readMoreHref: "/passion",
  contactLabel: "Say hello",
  contactHref: "#contact",
} as const;

export const WHO_WE_ARE_STAT = {
  value: "10+",
  label: "projects shipped",
  note: "Real products for real users — design, code, and polish in one loop.",
} as const;

export const WHO_WE_ARE_CONTACT_CARD = {
  name: "Yudeat",
  role: "full-stack developer & DevOps",
  phone: SITE_PHONE_DISPLAY,
  email: SITE_CONTACT_EMAIL,
  coordinates: "27°42′ N, 85°19′ E",
} as const;

export const WHO_WE_ARE_STAMP_LABEL = "Design Dev";
