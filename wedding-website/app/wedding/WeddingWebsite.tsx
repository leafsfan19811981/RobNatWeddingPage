"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  Car,
  Baby,
  Utensils,
  HelpCircle,
  Gift,
  Mail,
  Music2,
  ChevronUp,
  Image as ImageIcon,
  ExternalLink,
  ShieldCheck,
  CloudRain,
  Cigarette,
  Flame,
} from "lucide-react";

const THEME = {
  ink: "#2a2018",
  maple: "#8b2f2f",
  forest: "#2f4a3a",
  gold: "#c8a25a",
  cream: "#fbfaf7",
};

// Venue hero image (hosted on venue site/CDN)
const HERO_BG_URL =
  "https://i0.wp.com/www.maplehillfarm.ca/wp-content/uploads/2024/02/Maple-Hill-Farms-Wedding-10.jpg?fit=1080%2C785&ssl=1";

const WEDDING = {
  couple: "Robert Phillips & Natalie Kavanaugh",
  dateISO: "2026-08-23T15:00:00-04:00",
  rsvpByISO: "2026-05-31T23:59:59-04:00",
  venueName: "Maple Hills Farms",
  venueAddressLine: "450 Dominion Dr, Hanmer, ON P3P 0A8",
  venueWebsite: "https://www.maplehillfarm.ca/",
  venueWeddingPackages: "https://www.maplehillfarm.ca/wedding-packages/",
  ceremonyTime: "3:00 PM",
  dinnerTime: "5:00 PM",
  dinnerNote: "Buffet dinner catered by Cousin Vinneys Restaurant",
  kidsWelcome: true,
  parking: "Plenty of parking available on-site",
  rsvpFormUrl:
    "https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAAJ59Z3xUQlk2SFBQS000WENSTVFJQzIzRDk0TVgyMi4u&embed=true",
  registryUrl: "",
};

const PHOTOS: Array<{ src: string; alt: string }> = [
  { src: "/photos/photo1.jpg", alt: "Rob & Natalie" },
  { src: "/photos/photo2.jpg", alt: "A moment together" },
  { src: "/photos/photo3.png", alt: "Engagement photo" },
  { src: "/photos/photo4.png", alt: "A favorite memory" },
].filter((p) => Boolean(p.src));

type Hotel = { name: string; area: string; url: string; notes: string };

const HOTELS: Array<{ tier: string; items: Hotel[] }> = [
  {
    tier: "Budget-friendly",
    items: [
      {
        name: "Super 8 by Wyndham Sudbury",
        area: "Sudbury",
        url: "https://www.wyndhamhotels.com/en-ca/super-8/sudbury-ontario/super-8-sudbury-on/overview",
        notes: "Simple, solid value with free breakfast + Wi‑Fi.",
      },
      {
        name: "Travelodge by Wyndham Sudbury",
        area: "Sudbury",
        url: "https://www.wyndhamhotels.com/en-ca/travelodge/sudbury-ontario/travelodge-hotel-sudbury/overview",
        notes: "Central option with practical amenities.",
      },
      {
        name: "Quality Inn & Conference Centre Downtown",
        area: "Downtown Sudbury",
        url: "https://www.choicehotels.com/en-ca/ontario/sudbury/quality-inn-hotels/cn553",
        notes: "Downtown pick; convenient if you want restaurants nearby.",
      },
    ],
  },
  {
    tier: "Mid-range (comfort + convenience)",
    items: [
      {
        name: "Holiday Inn Sudbury",
        area: "Sudbury",
        url: "https://www.ihg.com/holidayinn/hotels/us/en/sudbury/ysbrs/hoteldetail",
        notes: "Reliable full-service option with easy access.",
      },
      {
        name: "Hampton Inn by Hilton Sudbury",
        area: "Sudbury",
        url: "https://www.hilton.com/en/hotels/ysbryhx-hampton-sudbury-ontario/",
        notes: "Popular pick with free hot breakfast + indoor pool.",
      },
      {
        name: "Comfort Inn East",
        area: "Sudbury (East)",
        url: "https://www.choicehotels.com/en-ca/ontario/sudbury/comfort-inn-hotels/cn428",
        notes: "Handy if you're coming in from the east side.",
      },
    ],
  },
  {
    tier: "Higher-end / treat-yourself",
    items: [
      {
        name: "Clarion Hotel Sudbury",
        area: "Downtown Sudbury",
        url: "https://www.choicehotels.com/en-ca/ontario/sudbury/clarion-hotels/cna60",
        notes: "Downtown hotel near Bell Park; restaurant + bar on-site.",
      },
      {
        name: "Fairfield by Marriott Inn & Suites Sudbury",
        area: "Sudbury",
        url: "https://www.marriott.com/en-us/hotels/ysbfi-fairfield-inn-and-suites-sudbury/overview/",
        notes: "Modern rooms and consistent service (great for families).",
      },
    ],
  },
  {
    tier: "Closest-to-venue (Hanmer area)",
    items: [
      {
        name: "Fleur De Lis Motel",
        area: "Hanmer",
        url: "https://www.fleurdelisstay.com/",
        notes: "Small, local motel in Hanmer — convenient if you want to stay nearby.",
      },
      {
        name: "The Hacienda Bed and Breakfast",
        area: "Hanmer",
        url: "https://thehaciendabedandbreakfast.ca/",
        notes: "B&B style stay in Hanmer for a quieter, more local feel.",
      },
    ],
  },
];

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function formatDateLong(date: Date) {
  return date.toLocaleDateString("en-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatMonthDay(date: Date) {
  return date.toLocaleDateString("en-CA", { month: "long", day: "numeric" });
}

function useCountdown(targetMs: number) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const diff = Math.max(0, targetMs - now);
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, done: diff === 0 };
}

function toEmbedUrl(url: string) {
  if (!url) return "";
  const u = url.trim();
  const sep = u.includes("?") ? "&" : "?";
  if (u.includes("ResponsePage.aspx") && !u.toLowerCase().includes("embed=true")) {
    return u + sep + "embed=true";
  }
  return u;
}

function Pill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "maple" | "forest" | "gold";
}) {
  const base = "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm";
  const tones: Record<string, string> = {
    neutral: "bg-black/5 text-black/70 border border-transparent",
    maple:
      "bg-[rgba(139,47,47,0.10)] text-[rgba(139,47,47,0.95)] border border-[rgba(139,47,47,0.18)]",
    forest:
      "bg-[rgba(47,74,58,0.10)] text-[rgba(47,74,58,0.95)] border border-[rgba(47,74,58,0.18)]",
    gold:
      "bg-[rgba(200,162,90,0.14)] text-[rgba(90,62,18,0.95)] border border-[rgba(200,162,90,0.22)]",
  };
  return <span className={classNames(base, tones[tone])}>{children}</span>;
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={classNames(
        "rounded-3xl border border-black/10 bg-white/75 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur",
        "transition hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function RusticDivider() {
  return (
    <div aria-hidden className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-black/15 to-transparent" />
    </div>
  );
}

function Section({
  id,
  title,
  kicker,
  children,
  icon: Icon,
}: {
  id: string;
  title: string;
  kicker?: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3">
          {Icon ? (
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black/5 shadow-sm">
              <Icon className="h-5 w-5" />
            </div>
          ) : null}
          <div>
            {kicker ? <div className="text-xs font-semibold tracking-widest text-black/55">{kicker}</div> : null}
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl font-serif">{title}</h2>
            <div className="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-[rgba(139,47,47,0.55)] via-[rgba(200,162,90,0.65)] to-[rgba(47,74,58,0.55)]" />
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

function Nav() {
  const links = [
    { id: "details", label: "Details" },
    { id: "schedule", label: "Schedule" },
    { id: "venue", label: "Venue" },
    { id: "gallery", label: "Photos" },
    { id: "travel", label: "Travel" },
    { id: "rsvp", label: "RSVP" },
    { id: "faq", label: "FAQ" },
    { id: "registry", label: "Registry" },
  ];

  return (
    <div className="sticky top-0 z-50 border-b border-black/10 bg-gradient-to-b from-[#fbfaf7]/90 to-[#fbfaf7]/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="group inline-flex items-center gap-2">
          <div className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-2xl shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(139,47,47,0.95)] via-[rgba(42,32,24,0.95)] to-[rgba(47,74,58,0.95)]" />
            <span className="relative text-sm font-semibold text-white">R+N</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold leading-none">{WEDDING.couple}</div>
            <div className="mt-0.5 text-xs leading-none text-black/60">{formatDateLong(new Date(WEDDING.dateISO))}</div>
          </div>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="rounded-2xl px-3 py-2 text-sm text-black/70 transition hover:bg-black/5 hover:text-black"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#rsvp"
            className="rounded-2xl bg-gradient-to-r from-[rgba(139,47,47,0.98)] to-[rgba(42,32,24,0.98)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
          >
            RSVP
          </a>
        </div>
      </div>
    </div>
  );
}

function BackgroundOrnament() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(42,32,24,0.10), rgba(42,32,24,0.10) 1px, transparent 1px, transparent 10px), repeating-linear-gradient(0deg, rgba(42,32,24,0.05), rgba(42,32,24,0.05) 1px, transparent 1px, transparent 14px)",
        }}
      />
      <div className="absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[rgba(139,47,47,0.10)] blur-3xl" />
      <div className="absolute top-40 -left-28 h-[460px] w-[460px] rounded-full bg-[rgba(47,74,58,0.10)] blur-3xl" />
      <div className="absolute top-80 -right-28 h-[460px] w-[460px] rounded-full bg-[rgba(200,162,90,0.12)] blur-3xl" />
    </div>
  );
}

function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={classNames(
        "fixed bottom-5 right-5 z-40 rounded-2xl border border-black/10 bg-white/80 p-3 shadow-sm backdrop-blur transition",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      )}
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}

function Footer() {
  return (
    <footer className="border-t border-black/10">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-black/60 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-semibold text-black">{WEDDING.couple}</div>
            <div>Maple syrup farm vibes • barn doors • big tent energy</div>
          </div>
          <div className="flex items-center gap-2">
            <Pill tone="gold">© {new Date().getFullYear()}</Pill>
            <Pill tone="forest">Made with love + mild chaos</Pill>
          </div>
        </div>
      </div>
    </footer>
  );
}

function PhotoGrid() {
  const featured = PHOTOS[0];
  const rest = PHOTOS.slice(1);

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm lg:col-span-7"
      >
        <img
          src={featured?.src}
          alt={featured?.alt || "Photo"}
          className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-[1.03] sm:h-[420px]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-90" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-widest text-white/90 backdrop-blur">
          FEATURED
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-base font-semibold text-white drop-shadow">{featured?.alt}</div>
        </div>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5">
        {rest.map((p, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: idx * 0.03 }}
            className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm"
          >
            <img
              src={p.src}
              alt={p.alt}
              className="h-48 w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-80" />
            <div className="absolute bottom-3 left-3 right-3 text-sm text-white/90">{p.alt}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function RSVPBlock() {
  const hasForm = Boolean(WEDDING.rsvpFormUrl && WEDDING.rsvpFormUrl.trim().length > 0);
  const rsvpBy = new Date(WEDDING.rsvpByISO);
  const embedUrl = toEmbedUrl(WEDDING.rsvpFormUrl);

  return (
    <div className="grid gap-4">
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-base font-semibold">RSVP</div>
            <div className="mt-1 text-black/70">
              Please RSVP by {formatMonthDay(rsvpBy)}, {rsvpBy.getFullYear()}.
            </div>
          </div>
          <Pill tone="gold">
            <ShieldCheck className="h-4 w-4" /> quick + easy
          </Pill>
        </div>

        <div className="mt-4 grid gap-3 text-sm text-black/70">
          <div className="flex items-start gap-2">
            <Baby className="mt-0.5 h-4 w-4" /> Include number of children in your RSVP.
          </div>
          <div className="flex items-start gap-2">
            <Utensils className="mt-0.5 h-4 w-4" /> Dietary restrictions help us plan the buffet properly.
          </div>
          <div className="flex items-start gap-2">
            <Music2 className="mt-0.5 h-4 w-4" /> Song requests are strongly encouraged.
          </div>
        </div>

        {!hasForm ? (
          <div className="mt-5 rounded-2xl border border-black/10 bg-white p-4 text-sm text-black/60">
            <div className="font-semibold text-black">Microsoft Form link not added yet</div>
            <div className="mt-2">
              Paste your public RSVP form link into <span className="font-mono">WEDDING.rsvpFormUrl</span>.
            </div>
          </div>
        ) : (
          <div className="mt-5 grid gap-3">
            <div className="overflow-hidden rounded-3xl border border-black/10 bg-white">
              <iframe title="RSVP Microsoft Form" src={embedUrl} className="h-[820px] w-full" loading="lazy" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-black/60">
              <div>If the embed doesn’t load on your device, use the button to open it directly.</div>
              <a
                href={WEDDING.rsvpFormUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[rgba(47,74,58,0.98)] to-[rgba(42,32,24,0.98)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
              >
                Open RSVP Form <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

function FAQ() {
  const items = [
    {
      icon: ShieldCheck,
      q: "Dress code?",
      a: "Formal, outdoor-appropriate. Think: suit / cocktail dress… plus shoes you can survive grass in.",
    },
    {
      icon: ImageIcon,
      q: "Are phones and photos allowed?",
      a: "Absolutely — cell phones and pictures are welcome.",
    },
    {
      icon: CloudRain,
      q: "Rain plan?",
      a: "If the weather turns dramatic, the ceremony will move to a covered rustic gazebo with plenty of space.",
    },
    {
      icon: Cigarette,
      q: "Smoking / vaping?",
      a: "Designated smoking/vaping areas will be available on site.",
    },
    {
      icon: Flame,
      q: "Campfire?",
      a: "There’ll be a rustic campfire area for mingling… and possibly marshmallows.",
    },
    {
      icon: HelpCircle,
      q: "Pets?",
      a: "No pets, please (as much as we love them).",
    },
    {
      icon: Car,
      q: "Parking?",
      a: "Plenty of on-site parking.",
    },
    {
      icon: Baby,
      q: "Kid-friendly?",
      a: "Yes — kids are welcome.",
    },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {items.map((it) => (
        <Card key={it.q} className="h-full">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-black/5 shadow-sm">
              <it.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-base font-semibold">{it.q}</div>
              <div className="mt-2 text-black/70">{it.a}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function Travel() {
  return (
    <div className="grid gap-4">
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-base font-semibold">Hotel suggestions</div>
            <p className="mt-2 text-black/70">
              Most options are in Greater Sudbury; there are also a couple of nearby stays in Hanmer. The venue is about
              a 20‑minute drive from downtown Sudbury, so staying in town is easy and gives you lots of food/coffee
              options. Book early — summer weekends can fill up fast.
            </p>
          </div>
          <Pill tone="forest">
            <Car className="h-4 w-4" /> Sudbury area
          </Pill>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {HOTELS.map((group) => (
          <Card key={group.tier} className="h-full">
            <div className="text-base font-semibold">{group.tier}</div>
            <div className="mt-3 grid gap-3">
              {group.items.map((h) => (
                <a
                  key={h.name}
                  href={h.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl border border-black/10 bg-white p-4 transition hover:bg-black/[0.02]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-black group-hover:underline">{h.name}</div>
                      <div className="text-sm text-black/60">{h.area}</div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-black/40" />
                  </div>
                  <div className="mt-2 text-sm text-black/70">{h.notes}</div>
                </a>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="text-base font-semibold">What to pack</div>
          <Pill tone="gold">Formal • outdoor-ready</Pill>
        </div>
        <p className="mt-2 text-black/70">
          Outdoor + tent wedding. Bring comfy shoes, a light layer for the evening, and your best dance bravery. If
          you’re staying in Sudbury, consider booking rides ahead or coordinating carpools for the trip to Hanmer.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Pill>Layer up</Pill>
          <Pill>Comfortable footwear</Pill>
        </div>
      </Card>
    </div>
  );
}

function Registry() {
  const hasRegistry = Boolean(WEDDING.registryUrl && WEDDING.registryUrl.trim().length > 0);
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-base font-semibold">Registry</div>
          <p className="mt-2 text-black/70">Our registry will be on Amazon. We’ll post the link here once it’s ready.</p>
        </div>

        {hasRegistry ? (
          <a
            href={WEDDING.registryUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[rgba(139,47,47,0.98)] to-[rgba(42,32,24,0.98)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
          >
            View registry <ExternalLink className="h-4 w-4" />
          </a>
        ) : (
          <Pill tone="gold">Coming soon</Pill>
        )}
      </div>
    </Card>
  );
}

function DetailsGrid() {
  const weddingDate = new Date(WEDDING.dateISO);
  const rsvpBy = new Date(WEDDING.rsvpByISO);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <div className="flex items-start gap-3">
          <Calendar className="mt-0.5 h-5 w-5" />
          <div>
            <div className="font-semibold">Date</div>
            <div className="text-black/70">{formatDateLong(weddingDate)}</div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-5 w-5" />
          <div>
            <div className="font-semibold">Ceremony</div>
            <div className="text-black/70">Starts at {WEDDING.ceremonyTime}</div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-5 w-5" />
          <div>
            <div className="font-semibold">Venue</div>
            <div className="text-black/70">{WEDDING.venueName}</div>
            <div className="text-sm text-black/60">{WEDDING.venueAddressLine}</div>
          </div>
        </div>
      </Card>

      <Card className="md:col-span-2">
        <div className="flex items-start gap-3">
          <Utensils className="mt-0.5 h-5 w-5" />
          <div>
            <div className="font-semibold">Dinner</div>
            <div className="text-black/70">
              {WEDDING.dinnerTime} • {WEDDING.dinnerNote}
            </div>
            <div className="text-sm text-black/60">Cocktails + reception to follow the ceremony</div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-start gap-3">
          <Baby className="mt-0.5 h-5 w-5" />
          <div>
            <div className="font-semibold">Kids</div>
            <div className="text-black/70">{WEDDING.kidsWelcome ? "Welcome" : "Adults-only"}</div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-start gap-3">
          <Car className="mt-0.5 h-5 w-5" />
          <div>
            <div className="font-semibold">Parking</div>
            <div className="text-black/70">{WEDDING.parking}</div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-start gap-3">
          <HelpCircle className="mt-0.5 h-5 w-5" />
          <div>
            <div className="font-semibold">RSVP deadline</div>
            <div className="text-black/70">
              {formatMonthDay(rsvpBy)}, {rsvpBy.getFullYear()}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Venue() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-base font-semibold">{WEDDING.venueName}</div>
            <div className="mt-2 text-black/70">{WEDDING.venueAddressLine}</div>
          </div>
          <a
            href={WEDDING.venueWebsite}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold transition hover:bg-[rgba(200,162,90,0.10)]"
          >
            Venue site <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <a
            className="rounded-2xl bg-gradient-to-r from-[rgba(47,74,58,0.98)] to-[rgba(42,32,24,0.98)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${WEDDING.venueName} ${WEDDING.venueAddressLine}`
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            Open in Google Maps
          </a>
          <a
            className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold transition hover:bg-[rgba(200,162,90,0.10)]"
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
              `${WEDDING.venueName} ${WEDDING.venueAddressLine}`
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            Get directions
          </a>
        </div>

        <div className="mt-6 grid gap-3">
          <div className="rounded-2xl bg-black/5 p-4 text-sm text-black/70">
            <div className="font-semibold">Rain plan</div>
            <div className="mt-2">If needed, the ceremony will move to a covered rustic gazebo with plenty of space.</div>
          </div>
          <div className="rounded-2xl bg-black/5 p-4 text-sm text-black/70">
            <div className="font-semibold">Campfire zone</div>
            <div className="mt-2">There will be a rustic campfire area for mingling (and potentially marshmallows).</div>
          </div>
          <div className="rounded-2xl bg-black/5 p-4 text-sm text-black/70">
            <div className="font-semibold">Smoking / vaping</div>
            <div className="mt-2">Designated smoking/vaping areas will be available on site.</div>
          </div>
          <div className="rounded-2xl bg-black/5 p-4 text-sm text-black/70">
            <div className="font-semibold">Note</div>
            <div className="mt-2">No pets, please.</div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-base font-semibold">Map preview</div>
          <a
            href={WEDDING.venueWeddingPackages}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[rgba(139,47,47,0.98)] to-[rgba(42,32,24,0.98)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
          >
            Wedding packages <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-2 text-sm text-black/60">If embeds are blocked, the buttons on the left always work.</div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-black/10 bg-white">
          <iframe
            title="Map"
            className="h-80 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              `${WEDDING.venueName} ${WEDDING.venueAddressLine}`
            )}&output=embed`}
          />
        </div>
      </Card>
    </div>
  );
}

export default function WeddingWebsite() {
  const weddingDate = useMemo(() => new Date(WEDDING.dateISO), []);
  const countdown = useCountdown(weddingDate.getTime());

  return (
    <div id="top" className="min-h-screen text-black" style={{ background: THEME.cream }}>
      <style>{`::selection{background:rgba(200,162,90,0.35);} a{text-decoration-thickness:2px;}`}</style>
      <Nav />

      <div className="relative">
        <BackgroundOrnament />

        {/* HERO */}
        <header className="relative">
         <div className="lg:col-span-7 rounded-3xl border border-white/15 bg-black/30 p-6 backdrop-blur-md sm:p-8">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_BG_URL})` }} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-[#fbfaf7]" />
          </div>

          <div className="mx-auto max-w-6xl px-4 pb-10 pt-12 sm:px-6 sm:pt-16 lg:px-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-3xl border border-white/15 bg-white/10 px-4 py-2 text-white/90 backdrop-blur">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{WEDDING.venueName} • Hanmer, Ontario</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid gap-8 lg:grid-cols-12 lg:items-center"
            >
              <div className="lg:col-span-7">
                <div className="flex flex-wrap gap-2">
                  <Pill tone="forest">Rustic outdoor tent wedding</Pill>
                  <Pill tone="gold">Ceremony outside the barn doors</Pill>
                  <Pill tone="maple">Formal • with humor</Pill>
                </div>

                <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight sm:text-6xl text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)]">
                  {WEDDING.couple}
                </h1>
                <p className="mt-4 text-lg text-white/85 sm:text-xl drop-shadow-[0_8px_22px_rgba(0,0,0,0.45)]">
                  We’re getting married at a maple syrup farm with a big tent, barn doors, and views for days. Nature is
                  invited. Mosquitoes are not.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href="#rsvp"
                    className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[rgba(139,47,47,0.98)] to-[rgba(42,32,24,0.98)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                  >
                    RSVP
                  </a>
                  <a
                    href="#venue"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white/95 backdrop-blur transition hover:bg-white/15"
                  >
                    Venue + directions
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/85 drop-shadow-[0_8px_22px_rgba(0,0,0,0.35)]">
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDateLong(weddingDate)}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Ceremony {WEDDING.ceremonyTime}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {WEDDING.venueName}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5">
                <Card className="overflow-hidden p-0">
                  <div className="relative">
                    <img src={PHOTOS[0]?.src} alt={PHOTOS[0]?.alt || "Photo"} className="h-56 w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between gap-4 text-white">
                        <div>
                          <div className="text-xs font-semibold tracking-widest text-white/80">COUNTDOWN</div>
                          <div className="mt-1 text-2xl font-semibold">{countdown.done ? "It’s wedding time!" : "See you soon"}</div>
                        </div>
                        <div className="hidden items-center gap-2 sm:flex">
                          <Pill tone="gold">
                            <Music2 className="h-4 w-4" /> dance energy
                          </Pill>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { k: "Days", v: countdown.days },
                        { k: "Hours", v: countdown.hours },
                        { k: "Min", v: countdown.minutes },
                        { k: "Sec", v: countdown.seconds },
                      ].map((x) => (
                        <div key={x.k} className="rounded-2xl border border-black/10 bg-white p-3 text-center">
                          <div className="tabular-nums text-2xl font-semibold">{String(x.v).padStart(2, "0")}</div>
                          <div className="mt-1 text-xs text-black/60">{x.k}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 rounded-2xl bg-black/5 p-4 text-sm text-black/70">
                      <div className="font-semibold">Quick notes</div>
                      <ul className="mt-2 grid gap-1">
                        <li>• Dinner at {WEDDING.dinnerTime} (buffet)</li>
                        <li>• Kids welcome</li>
                        <li>• Plenty of parking</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </header>

        {/* DETAILS */}
        <div className="pb-10">
          <RusticDivider />
          <Section id="details" title="The basics" kicker="All the important stuff" icon={Calendar}>
            <DetailsGrid />
          </Section>
        </div>

        {/* SCHEDULE */}
        <div className="py-10">
          <RusticDivider />
          <Section id="schedule" title="Schedule" kicker="How the day flows" icon={Clock}>
            <div className="grid gap-4 lg:grid-cols-3">
              <Card>
                <div className="text-base font-semibold">3:00 PM</div>
                <div className="mt-1 text-black/70">Ceremony</div>
                <div className="mt-2 text-sm text-black/60">Outside the barn doors (weather-permitting)</div>
              </Card>
              <Card>
                <div className="text-base font-semibold">After ceremony</div>
                <div className="mt-1 text-black/70">Cocktails + Reception</div>
                <div className="mt-2 text-sm text-black/60">Mingle, laugh, hydrate, repeat</div>
              </Card>
              <Card>
                <div className="text-base font-semibold">5:00 PM</div>
                <div className="mt-1 text-black/70">Dinner</div>
                <div className="mt-2 text-sm text-black/60">{WEDDING.dinnerNote}</div>
              </Card>
            </div>
          </Section>
        </div>

        {/* VENUE */}
        <div className="py-10">
          <RusticDivider />
          <Section id="venue" title="Venue" kicker="Maple syrup farm magic" icon={MapPin}>
            <Venue />
          </Section>
        </div>

        {/* GALLERY */}
        <div className="py-10">
          <RusticDivider />
          <Section id="gallery" title="Photos" kicker="A few favorite moments" icon={ImageIcon}>
            <PhotoGrid />
          </Section>
        </div>

        {/* TRAVEL */}
        <div className="py-10">
          <RusticDivider />
          <Section id="travel" title="Travel" kicker="Sleep, drive, repeat" icon={Car}>
            <Travel />
          </Section>
        </div>

        {/* RSVP */}
        <div className="py-10">
          <RusticDivider />
          <Section id="rsvp" title="RSVP" kicker="Let us know you’re coming" icon={Mail}>
            <RSVPBlock />
          </Section>
        </div>

        {/* FAQ */}
        <div className="py-10">
          <RusticDivider />
          <Section id="faq" title="FAQ" kicker="Questions humans ask" icon={HelpCircle}>
            <FAQ />
          </Section>
        </div>

        {/* REGISTRY */}
        <div className="py-10">
          <RusticDivider />
          <Section id="registry" title="Registry" kicker="Gifts and good vibes" icon={Gift}>
            <Registry />
          </Section>
        </div>

        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}
