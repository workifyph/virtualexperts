import type {
  Stat,
  ServiceItem,
  TestimonialItem,
  StepItem,
  CaseStudyItem,
  TeamMember,
  IndustryItem,
  PillarItem,
  FaqItem,
  HeroSlide,
} from "@/config/types";

/* ==================================================================
   Content Data
   All page content lives here. Edit arrays below to change what
   appears on the site. No component code changes needed.
   ================================================================== */

export const heroSlides: HeroSlide[] = [
  { type: "image", src: "/welcome-video-poster.jpg", alt: "Executive leadership in modern office" },
  { type: "video", src: "/welcome-video.mp4", poster: "/welcome-video-poster.jpg" },
  { type: "image", src: "/video-02-poster.jpg", alt: "Team collaboration and strategy session" },
];

export const trustStats: Stat[] = [
  { value: "2017", label: "Established" },
  { value: "400+", label: "Talent pool" },
  { value: "13+", label: "Industries served" },
  { value: "24/7", label: "Coverage available" },
];

export const services: ServiceItem[] = [
  {
    slug: "customer-support",
    title: "Customer Support",
    description: "Professional call handling, inbox management, and live chat.",
    image: "/service-customer.png",
  },
  {
    slug: "virtual-assistance",
    title: "Virtual Assistance",
    description: "Calendar, CRM, lead follow-up, and executive support.",
    image: "/service-assistant.png",
  },
  {
    slug: "back-office",
    title: "Back-Office Operations",
    description: "Reporting, documentation, billing, and workflow coordination.",
    image: "/service-backoffice.png",
  },
  {
    slug: "on-call-support",
    title: "On-Call VA Support",
    description: "Flexible, project-based help starting at $6/hour.",
    image: "/home-feature-cst.png",
  },
  {
    slug: "recruitment",
    title: "Recruitment Support",
    description: "End-to-end sourcing, screening, and candidate matching.",
    image: "/home-feature-dgp.png",
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Dulce Chiongson",
    role: "CEO & Co-Founder",
    image: "/dulce-chiongson.jpg",
    bio: "Co-founded VEX in 2017 and leads the company with a long-term focus on service quality, professionalism, and dependable execution.",
  },
  {
    name: "Chep Elvas",
    role: "Co-Founder",
    image: "/chep-elvas.png",
    bio: "Brings customer relations, marketing, and business planning experience that helps clients scale through stronger support systems.",
  },
];

export const servedIndustries: IndustryItem[] = [
  { name: "Real Estate", icon: "\u{1F3E0}" },
  { name: "Insurance", icon: "\u{1F6E1}\uFE0F" },
  { name: "E-commerce", icon: "\u{1F6D2}" },
  { name: "Healthcare", icon: "\u{1F3E5}" },
  { name: "Legal Services", icon: "\u2696\uFE0F" },
  { name: "Travel & Hospitality", icon: "\u2708\uFE0F" },
  { name: "Education", icon: "\u{1F4DA}" },
  { name: "Tech & Software", icon: "\u{1F4BB}" },
  { name: "Sports & Events", icon: "\u{1F39F}\uFE0F" },
  { name: "Multimedia & Film", icon: "\u{1F3AC}" },
  { name: "Logistics", icon: "\u{1F4E6}" },
  { name: "Agriculture", icon: "\u{1F331}" },
  { name: "Property Management", icon: "\u{1F3E2}" },
];

export const corePrinciples: PillarItem[] = [
  { title: "Opportunity", body: "Growth through practical expertise and execution support." },
  { title: "Accountability", body: "Clear ownership, documented work, dependable follow-through." },
  { title: "Integrity", body: "Ethical work, honest communication, willingness to speak up." },
  { title: "Efficiency", body: "Accurate, cost-effective support easy to integrate." },
];

export const clientTestimonials: TestimonialItem[] = [
  {
    name: "Dominique C.",
    role: "Scaling business owner",
    quote: "We have been working with Virtual Experts PH over the past eight years. They handle all the recruiting, HR, and management work behind the scenes so we can focus on growing the business. We have probably hired 300+ people through their firm. It has been a remarkable experience.",
  },
  {
    name: "Brian A.",
    role: "Long-term client partner",
    quote: "I have used a variety of outsourced centers throughout my career. I have found Virtual Experts to be among the best and most responsive. They have always been accommodating to meet our needs and have been a fantastic resource and partner through the years. I highly recommend Virtual Experts to any firm looking to outsource.",
  },
  {
    name: "Isaac P.",
    role: "Business process client",
    quote: "For years, nearly 80% of our processes were manual. But with Virtual Experts' expertise, everything has now been fully automated, dramatically increasing our team's productivity beyond what I ever imagined possible. Virtual Experts truly live up to their name.",
  },
  {
    name: "Jeff T.",
    role: "Customer service client",
    quote: "I found Jasmin through Virtual Experts Philippines. I am very impressed with her work as part of our customer service team. She's reliable, punctual, detailed, and focused. I highly recommend their service.",
  },
  {
    name: "Karen C.",
    role: "Business owner",
    quote: "I am so glad I was introduced to Virtual Experts Philippines for my VA needs. It has been a game changer because it allows me to free up my time on the little things so I can focus on my core business. My VA is professional, timely, efficient, and most of all she cares about the work she does.",
  },
  {
    name: "Miles M.",
    role: "Operations leader",
    quote: "For the last eight years of my career, I have experience working directly with outsourced workers across multiple countries and none have been able to match the consistency and effort provided by Virtual Experts PH. They regularly demonstrate themselves to be reliable coworkers and fantastic human beings to interact with.",
  },
];

export const caseStudies: CaseStudyItem[] = [
  {
    slug: "dental-clinics",
    industry: "Dental Clinics",
    title: "Reducing missed patient conversations during busy hours",
    image: "/home-feature-cst.png",
    challenge: "Inconsistent call handling and missed follow-ups during peak clinic hours.",
    approach: "Structured support around inbound calls, reminders, and patient communication.",
    outcome: "Steadier coverage, fewer missed touchpoints, and a more focused in-house team.",
  },
  {
    slug: "real-estate",
    industry: "Real Estate",
    title: "Improving lead response speed and admin consistency",
    image: "/home-feature-dgp.png",
    challenge: "Growth opportunities from multiple channels but inconsistent follow-up.",
    approach: "Aligned remote support around lead routing, calendar, and admin execution.",
    outcome: "Faster lead response, cleaner workflows, better daily follow-up continuity.",
  },
  {
    slug: "property-management",
    industry: "Property Management",
    title: "Smoother tenant communication and support operations",
    image: "/home-feature-mqa.png",
    challenge: "Unreliable help managing requests across a growing property portfolio.",
    approach: "Communication support, escalation handling, and structured back-office help.",
    outcome: "More stable operations, consistent tenant communication, less firefighting.",
  },
];

export const howModelWorks: StepItem[] = [
  { step: "01", title: "Consultation", body: "We discuss your needs, coverage, and team structure." },
  { step: "02", title: "Talent Matching", body: "Pre-vetted candidates aligned with your workflow." },
  { step: "03", title: "Onboarding", body: "Supervised setup covering tools and protocols." },
  { step: "04", title: "Ongoing Support", body: "Quality monitoring, escalations, and scaling." },
];

export const advantagePillars: PillarItem[] = [
  { title: "A System", body: "Structured workflows, supervision, daily accountability." },
  { title: "A Team", body: "Support that doesn't depend on one person alone." },
  { title: "A Partnership", body: "Long-term growth built on communication and continuity." },
];

export const whyFilipino: PillarItem[] = [
  { title: "English proficiency", body: "Highest in Asia, natural fluency for Western clients." },
  { title: "Cultural alignment", body: "Decades of BPO growth built Western-ready professionals." },
  { title: "Cost-effective quality", body: "Structured talent at a fraction of onshore cost." },
  { title: "Proven infrastructure", body: "2nd largest BPO destination globally." },
];

export const faqs: FaqItem[] = [
  {
    question: "How quickly can I get started?",
    answer: "Most engagements are up and running within 5-10 business days after our initial consultation. This includes talent matching, onboarding setup, and tool configuration.",
  },
  {
    question: "What's the minimum commitment?",
    answer: "We offer flexible arrangements starting from part-time support. There's no long-term contract required, though most clients find that ongoing partnerships deliver the best results.",
  },
  {
    question: "How do you ensure quality?",
    answer: "We maintain structured oversight including daily check-ins, quality audits, and direct client feedback loops. Every team member is supervised and held accountable.",
  },
  {
    question: "What tools do your teams use?",
    answer: "We adapt to your existing tech stack. Our teams are experienced with major CRMs, project management tools, communication platforms, and industry-specific software.",
  },
  {
    question: "Can I scale up or down?",
    answer: "Absolutely. Our model is built for flexibility. You can add team members as your business grows or reduce coverage during slower periods.",
  },
  {
    question: "What time zones do you cover?",
    answer: "Our primary operations align with US business hours (9PM-9AM Philippine Time), but we can configure coverage for any time zone requirements.",
  },
  {
    question: "How is billing structured?",
    answer: "We offer transparent monthly billing based on your team size and coverage hours. No hidden fees, no surprises.",
  },
  {
    question: "What happens if someone is unavailable?",
    answer: "We have backup systems in place. If your assigned team member is unavailable, a trained backup steps in to ensure continuity of service.",
  },
];
