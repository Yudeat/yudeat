export type TestimonialPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "mid-left"
  | "bottom-left"
  | "bottom-right";

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  detail: string;
  initials: string;
  position: TestimonialPosition;
  /** Tailwind classes for avatar gradient (static strings for compiler). */
  avatarClass: string;
  /** Subtle tilt on large screens for a scattered layout. */
  tiltClass: string;
  floatDelay: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "Clear communication from day one. The site went live on schedule and still feels sharp months later.",
    name: "Predeep Chy",
    detail: "Entrepreneur",
    initials: "PC",
    position: "top-left",
    avatarClass:
      "bg-gradient-to-br from-rose-100 via-rose-50 to-orange-50 text-rose-900/80 ring-rose-200/80",
    tiltClass: "lg:-rotate-[2.5deg]",
    floatDelay: "0s",
  },
  {
    id: "2",
    quote:
      "Our products finally have a digital home that feels as crafted and intentional as the furniture we build.",
    name: "Steel Wood Nepal",
    detail: "Furniture brand",
    initials: "SW",
    position: "top-right",
    avatarClass:
      "bg-gradient-to-br from-amber-100 via-amber-50 to-yellow-50 text-amber-900/80 ring-amber-200/80",
    tiltClass: "lg:rotate-[2deg]",
    floatDelay: "0.6s",
  },
  {
    id: "3",
    quote:
      "Fast, clean builds with real attention to detail — exactly what a growing tech team needs to ship with confidence.",
    name: "Origin Tech",
    detail: "Technology partner",
    initials: "OT",
    position: "bottom-left",
    avatarClass:
      "bg-gradient-to-br from-sky-100 via-sky-50 to-indigo-50 text-sky-900/80 ring-sky-200/80",
    tiltClass: "lg:-rotate-[1deg]",
    floatDelay: "0.3s",
  },
  {
    id: "4",
    quote:
      "Turned a vague brief into a polished product. I'd work together again without hesitation.",
    name: "Jitendra Pandit",
    detail: "Creative collaborator",
    initials: "JP",
    position: "bottom-right",
    avatarClass:
      "bg-gradient-to-br from-emerald-100 via-emerald-50 to-teal-50 text-emerald-900/80 ring-emerald-200/80",
    tiltClass: "lg:-rotate-[2deg]",
    floatDelay: "0.9s",
  },
  {
    id: "5",
    quote:
      "Good — and honestly among the best. We recommend this developer without hesitation.",
    name: "Playmates",
    detail: "playmates.live",
    initials: "PL",
    position: "mid-left",
    avatarClass:
      "bg-gradient-to-br from-violet-100 via-violet-50 to-fuchsia-50 text-violet-900/80 ring-violet-200/80",
    tiltClass: "lg:rotate-[1.5deg]",
    floatDelay: "0.45s",
  },
];

const POSITION_CLASSES: Record<TestimonialPosition, string> = {
  "top-left": "lg:absolute lg:left-[1%] lg:top-[6%] xl:left-[3%]",
  "top-center": "lg:absolute lg:left-1/2 lg:top-[4%] lg:-translate-x-1/2",
  "top-right": "lg:absolute lg:right-[1%] lg:top-[8%] xl:right-[3%]",
  "mid-left": "lg:absolute lg:left-[1%] lg:top-[36%] xl:left-[3%]",
  "bottom-left": "lg:absolute lg:bottom-[12%] lg:left-[2%] xl:left-[5%]",
  "bottom-right": "lg:absolute lg:bottom-[10%] lg:right-[2%] xl:right-[5%]",
};

export function getTestimonialPositionClass(position: TestimonialPosition): string {
  return POSITION_CLASSES[position];
}
