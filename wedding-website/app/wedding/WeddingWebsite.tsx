"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Baby,
  Calendar,
  Car,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Cigarette,
  Clock,
  CloudRain,
  ExternalLink,
  Flame,
  Gift,
  HelpCircle,
  Image as ImageIcon,
  Mail,
  MapPin,
  Menu,
  Music2,
  ShieldCheck,
  Utensils,
  X,
} from "lucide-react";

const THEME = {
  ink: "#2a2018",
  cream: "#fbfaf7",
};

const HERO_BG_URL =
  "https://i0.wp.com/www.maplehillfarm.ca/wp-content/uploads/2024/02/Maple-Hill-Farms-Wedding-10.jpg?fit=1080%2C785&ssl=1";

const WEDDING = {
  couple: "Robert Phillips & Natalie Kavanaugh",
  dateISO: "2026-08-22T15:00:00-04:00",
  rsvpByISO: "2026-05-31T23:59:59-04:00",
  venueName: "Maple Hills Farms",
  venueAddressLine: "450 Dominion Dr, Hanmer, ON P3P 0A8",
  city: "Hanmer, Ontario",
  venueWebsite: "https://www.maplehillfarm.ca/",
  ceremonyTime: "3:00 PM",
  dinnerTime: "5:00 PM",
  dinnerNote: "Buffet dinner catered by Cousin Vinneys Restaurant",
  kidsWelcome: true,
  parking: "Plenty of parking available on-site",
  contactEmail: "robnatwedding@gmail.com",
  rsvpFormUrl:
    "https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAAJ59Z3xUQlk2SFBQS000WENSTVFJQzIzRDk0TVgyMi4u&embed=true",
  registryUrl: "https://www.amazon.ca/wedding/guest-view/C514H7K0OMXA",
};

const PHOTOS = [
  { src: "/photos/photo3.png", alt: "Rob & Natalie", caption: "Engagement glow-up" },
  { src: "/photos/photo1.jpg", alt: "A moment together", caption: "Weekend getaway energy" },
  { src: "/photos/photo2.jpg", alt: "Vibes", caption: "Date-night documentary evidence" },
  { src: "/photos/photo4.png", alt: "A favorite memory", caption: "One of our favorite memories" },
];

const HOTELS = [
  {
    tier: "Budget-friendly",
    items: [
      {
        name: "Super 8 by Wyndham Sudbury",
        area: "Sudbury",
        url: "https://www.wyndhamhotels.com/en-ca/super-8/sudbury-ontario/super-8-sudbury-on/overview",
        notes: "Simple value option with free breakfast + Wi‑Fi.",
      },
      {
        name: "Travelodge by Wyndham Sudbury",
        area: "Sudbury",
        url: "https://www.wyndhamhotels.com/en-ca/travelodge/sudbury-ontario/travelodge-hotel-sudbury/overview",
        notes: "Central location with practical amenities.",
      },
    ],
  },
  {
    tier: "Mid-range",
    items: [
      {
        name: "Holiday Inn Sudbury",
        area: "Sudbury",
        url: "https://www.ihg.com/holidayinn/hotels/us/en/sudbury/ysbrs/hoteldetail",
        notes: "Reliable full-service stay.",
      },
      {
        name: "Hampton Inn by Hilton Sudbury",
        area: "Sudbury",
        url: "https://www.hilton.com/en/hotels/ysbryhx-hampton-sudbury-ontario/",
        notes: "Popular pick with breakfast + pool.",
      },
    ],
  },
  {
    tier: "Closest-to-venue",
    items: [
      {
        name: "Fleur De Lis Motel",
        area: "Hanmer",
        url: "https://www.fleurdelisstay.com/",
        notes: "Small local motel with minimal drive time.",
      },
      {
        name: "The Hacienda Bed and Breakfast",
        area: "Hanmer",
        url: "https://thehaciendabedandbreakfast.ca/",
        notes: "Cozy B&B style stay in Hanmer.",
      },
    ],
  },
];

const THINGS_TO_DO = [
  {
    name: "Kuppajo Espresso Bar",
    type: "Coffee",
    drive: "~22 min from venue",
    url: "https://maps.google.com/?q=Kuppajo+Espresso+Bar+Sudbury",
  },
  {
    name: "Science North",
    type: "Family activity",
    drive: "~25 min from venue",
    url: "https://maps.google.com/?q=Science+North+Sudbury",
  },
  {
    name: "Bell Park + Boardwalk",
    type: "Scenic stop",
    drive: "~24 min from venue",
    url: "https://maps.google.com/?q=Bell+Park+Sudbury",
  },
  {
    name: "Tommy's Not Here",
    type: "Dinner / date night",
    drive: "~20 min from venue",
    url: "https://maps.google.com/?q=Tommy%27s+Not+Here+Sudbury",
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
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: diff === 0,
  };
}

function toEmbedUrl(url: string) {
  if (!url) return "";
  const u = url.trim();
  const sep = u.includes("?") ? "&" : "?";
  if (u.includes("ResponsePage.aspx") && !u.toLowerCase().includes("embed=true")) return `${u}${sep}embed=true`;
  return u;
}

function toGoogleCalendarLink() {
  const start = new Date(WEDDING.dateISO);
  const end = new Date(start.getTime() + 6 * 60 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${WEDDING.couple} Wedding`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `Ceremony at ${WEDDING.ceremonyTime}. Reception + dinner at ${WEDDING.dinnerTime}.`,
    location: `${WEDDING.venueName}, ${WEDDING.venueAddressLine}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function toICSDataUri() {
  const start = new Date(WEDDING.dateISO);
  const end = new Date(start.getTime() + 6 * 60 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//RobNatWedding//EN",
    "BEGIN:VEVENT",
    `UID:robnat-${fmt(start)}@wedding`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${WEDDING.couple} Wedding`,
    `LOCATION:${WEDDING.venueName} ${WEDDING.venueAddressLine}`,
    "DESCRIPTION:Can’t wait to celebrate with you!",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

function isEventWeek(dateISO: string) {
  const eventDate = new Date(dateISO);
  const now = new Date();
  const diffDays = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays <= 7 && diffDays >= -1;
}

function Pill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "maple" | "forest" | "gold" }) {
  const tones: Record<string, string> = {
    neutral: "bg-black/5 text-black/70 border border-transparent",
    maple: "bg-[rgba(139,47,47,0.10)] text-[rgba(139,47,47,0.95)] border border-[rgba(139,47,47,0.18)]",
    forest: "bg-[rgba(47,74,58,0.10)] text-[rgba(47,74,58,0.95)] border border-[rgba(47,74,58,0.18)]",
    gold: "bg-[rgba(200,162,90,0.14)] text-[rgba(90,62,18,0.95)] border border-[rgba(200,162,90,0.22)]",
  };
  return <span className={classNames("inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm", tones[tone])}>{children}</span>;
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={classNames(
        "rounded-3xl border border-black/10 bg-white/85 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur",
        "transition hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function Section({ id, title, kicker, children, icon: Icon }: { id: string; title: string; kicker?: string; children: React.ReactNode; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <section id={id} className="scroll-mt-28" aria-labelledby={`${id}-heading`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3">
          {Icon ? (
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black/5 shadow-sm">
              <Icon className="h-5 w-5" />
            </div>
          ) : null}
          <div>
            {kicker ? <div className="text-xs font-semibold tracking-widest text-black/55">{kicker}</div> : null}
            <h2 id={`${id}-heading`} className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
              {title}
            </h2>
            <div className="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-[rgba(139,47,47,0.55)] via-[rgba(200,162,90,0.65)] to-[rgba(47,74,58,0.55)]" />
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = ["details", "schedule", "venue", "gallery", "travel", "rsvp", "faq", "registry"];

  return (
    <div className="sticky top-0 z-50 border-b border-black/10 bg-gradient-to-b from-[#fbfaf7]/90 to-[#fbfaf7]/75 backdrop-blur">
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

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className="rounded-2xl px-3 py-2 text-sm capitalize text-black/70 transition hover:bg-black/5 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(139,47,47,0.8)]"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#rsvp" className="hidden rounded-2xl bg-gradient-to-r from-[rgba(139,47,47,0.98)] to-[rgba(42,32,24,0.98)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 sm:inline-flex">
            RSVP now
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            className="inline-flex rounded-2xl border border-black/10 bg-white p-2 text-black md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(139,47,47,0.8)]"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-menu" className="border-t border-black/10 bg-[#fbfaf7] px-4 py-3 md:hidden">
          <div className="grid gap-2">
            {links.map((link) => (
              <a key={link} href={`#${link}`} onClick={() => setOpen(false)} className="rounded-xl bg-white px-3 py-2 text-sm capitalize text-black/80 shadow-sm">
                {link}
              </a>
            ))}
            <a href="#rsvp" onClick={() => setOpen(false)} className="mt-1 inline-flex items-center justify-center rounded-xl bg-[rgba(139,47,47,0.95)] px-4 py-2 text-sm font-semibold text-white">
              RSVP now
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function RusticDivider() {
  return (
    <div aria-hidden className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scaleX: 0.86 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45 }}
        className="my-10 h-px w-full origin-center bg-gradient-to-r from-transparent via-black/15 to-transparent"
      />
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

function PhotoGrid() {
  const [idx, setIdx] = useState(0);
  const featured = PHOTOS[idx];

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm lg:col-span-7">
        <Image src={featured.src} alt={featured.alt} width={1000} height={700} className="h-[320px] w-full object-cover sm:h-[420px]" sizes="(max-width: 1024px) 100vw, 60vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="text-base font-semibold">{featured.alt}</div>
          <div className="text-sm text-white/90">{featured.caption}</div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5">
        {PHOTOS.map((p, photoIndex) => (
          <button
            key={p.src}
            onClick={() => setIdx(photoIndex)}
            className={classNames(
              "group relative overflow-hidden rounded-3xl border border-black/10 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(139,47,47,0.8)]",
              idx === photoIndex ? "ring-2 ring-[rgba(139,47,47,0.45)]" : ""
            )}
          >
            <Image src={p.src} alt={p.alt} width={560} height={360} className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.03]" sizes="(max-width: 1024px) 50vw, 30vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            <div className="absolute bottom-2 left-3 right-3 text-sm text-white/95">{p.caption}</div>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-black/10 bg-white p-3 lg:hidden">
        <button onClick={() => setIdx((x) => (x - 1 + PHOTOS.length) % PHOTOS.length)} className="rounded-xl border border-black/10 p-2" aria-label="Previous photo">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="text-sm text-black/70">Swipe vibe: {idx + 1} / {PHOTOS.length}</div>
        <button onClick={() => setIdx((x) => (x + 1) % PHOTOS.length)} className="rounded-xl border border-black/10 p-2" aria-label="Next photo">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function RSVPBlock() {
  const hasForm = Boolean(WEDDING.rsvpFormUrl.trim());
  const rsvpBy = new Date(WEDDING.rsvpByISO);

  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-base font-semibold">RSVP</div>
          <div className="mt-1 text-black/70">
            Please RSVP by {formatMonthDay(rsvpBy)}, {rsvpBy.getFullYear()}.
          </div>
        </div>
        <Pill tone="gold">
          <ShieldCheck className="h-4 w-4" /> takes ~1 minute
        </Pill>
      </div>

      <p className="mt-4 text-sm text-black/70">
        Your responses are only used for wedding planning (seating, meal counts, and accommodations).
      </p>

      <div className="mt-4 grid gap-2 text-sm text-black/70">
        <div className="flex items-start gap-2">
          <Baby className="mt-0.5 h-4 w-4" /> Include number of children in your RSVP.
        </div>
        <div className="flex items-start gap-2">
          <Utensils className="mt-0.5 h-4 w-4" /> Share dietary restrictions so we can plan the buffet.
        </div>
        <div className="flex items-start gap-2">
          <Music2 className="mt-0.5 h-4 w-4" /> Song requests are very welcome.
        </div>
      </div>

      {hasForm ? (
        <>
          <div className="mt-5 overflow-hidden rounded-3xl border border-black/10 bg-white">
            <iframe title="RSVP Microsoft Form" src={toEmbedUrl(WEDDING.rsvpFormUrl)} className="h-[760px] w-full" loading="lazy" />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-black/60">
            <div>If the embed fails on your device, open the direct form or send us an email RSVP.</div>
            <div className="flex flex-wrap gap-2">
              <a href={WEDDING.rsvpFormUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[rgba(47,74,58,0.98)] to-[rgba(42,32,24,0.98)] px-4 py-2 text-sm font-semibold text-white">
                Open RSVP form <ExternalLink className="h-4 w-4" />
              </a>
              <a href={`mailto:${WEDDING.contactEmail}?subject=Wedding%20RSVP`} className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black/80">
                Email RSVP <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-4 rounded-2xl border border-black/10 bg-white p-4 text-sm text-black/60">RSVP form link not added yet.</div>
      )}
    </Card>
  );
}

function FAQ() {
  const items = [
    { icon: ShieldCheck, q: "Dress code?", a: "Formal and outdoor-friendly (grass-proof shoes are encouraged)." },
    { icon: CloudRain, q: "Rain plan?", a: "Ceremony shifts to the covered rustic gazebo if weather turns." },
    { icon: HelpCircle, q: "Can I bring a plus-one?", a: "Please follow what’s listed on your invitation/RSVP form." },
    { icon: Utensils, q: "Food allergies?", a: "Add allergies in the RSVP and we’ll coordinate with catering." },
    { icon: HelpCircle, q: "Accessibility?", a: "The venue supports wheelchairs and strollers; message us if you need extra assistance." },
    { icon: ImageIcon, q: "Unplugged ceremony?", a: "Not fully unplugged — phones/photos are welcome, just keep aisles clear during vows." },
    { icon: Car, q: "Parking?", a: "Plenty of parking is available on-site." },
    { icon: Baby, q: "Kid-friendly?", a: "Yes — kids are welcome." },
    { icon: Cigarette, q: "Smoking / vaping?", a: "Designated smoking/vaping areas will be available on site." },
    { icon: Flame, q: "Campfire?", a: "Yes, there will be a campfire social area later in the evening." },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {items.map((it) => (
        <Card key={it.q} className="h-full">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-black/5">
              <it.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-base font-semibold">{it.q}</div>
              <div className="mt-1 text-black/70">{it.a}</div>
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
            <p className="mt-2 text-black/70">Most guests stay in Greater Sudbury. The venue is around a 20-minute drive from downtown.</p>
          </div>
          <Pill tone="forest">
            <Car className="h-4 w-4" /> Sudbury area
          </Pill>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        {HOTELS.map((group) => (
          <Card key={group.tier}>
            <div className="text-base font-semibold">{group.tier}</div>
            <div className="mt-3 grid gap-3">
              {group.items.map((h) => (
                <a key={h.name} href={h.url} target="_blank" rel="noreferrer" className="rounded-2xl border border-black/10 bg-white p-3 transition hover:bg-black/[0.02]">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-semibold">{h.name}</div>
                    <ExternalLink className="h-4 w-4 text-black/40" />
                  </div>
                  <div className="text-sm text-black/60">{h.area}</div>
                  <div className="mt-1 text-sm text-black/70">{h.notes}</div>
                </a>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="text-base font-semibold">Transportation notes</div>
          <ul className="mt-2 grid gap-1 text-sm text-black/70">
            <li>• Plan to arrive by 2:30 PM for a smooth start.</li>
            <li>• Parking is free and on-site.</li>
            <li>• Uber/Lyft availability can be limited; pre-book cabs from downtown if needed.</li>
            <li>• If staying in Sudbury, carpools are strongly recommended.</li>
          </ul>
        </Card>
        <Card>
          <div className="text-base font-semibold">Things to do nearby</div>
          <div className="mt-3 grid gap-2">
            {THINGS_TO_DO.map((place) => (
              <a key={place.name} href={place.url} target="_blank" rel="noreferrer" className="rounded-xl border border-black/10 bg-white p-3 text-sm text-black/80 hover:bg-black/[0.02]">
                <div className="font-semibold">{place.name}</div>
                <div className="text-black/60">
                  {place.type} • {place.drive}
                </div>
              </a>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Venue() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <div className="text-base font-semibold">{WEDDING.venueName}</div>
        <div className="mt-2 text-black/70">{WEDDING.venueAddressLine}</div>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href={WEDDING.venueWebsite} target="_blank" rel="noreferrer" className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold">
            Venue site
          </a>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${WEDDING.venueName} ${WEDDING.venueAddressLine}`)}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-gradient-to-r from-[rgba(47,74,58,0.98)] to-[rgba(42,32,24,0.98)] px-4 py-2 text-sm font-semibold text-white"
          >
            Get directions
          </a>
        </div>
      </Card>
      <Card>
        <div className="text-base font-semibold">Venue notes</div>
        <ul className="mt-2 grid gap-1 text-sm text-black/70">
          <li>• Rain plan: covered rustic gazebo.</li>
          <li>• Campfire social zone later in the evening.</li>
          <li>• Designated smoking/vaping area on site.</li>
        </ul>
      </Card>
    </div>
  );
}

function Registry() {
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-base font-semibold">Registry</div>
          <p className="mt-2 text-black/70">Our registry is on Amazon if you'd like to contribute.</p>
        </div>
        <a href={WEDDING.registryUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[rgba(139,47,47,0.98)] to-[rgba(42,32,24,0.98)] px-4 py-2 text-sm font-semibold text-white">
          View registry <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </Card>
  );
}

function Footer() {
  return (
    <footer className="border-t border-black/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-10 text-sm text-black/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <div className="font-semibold text-black">{WEDDING.couple}</div>
          <div>We’re so grateful you’re celebrating with us.</div>
        </div>
        <div className="flex gap-2">
          <Pill tone="gold">© {new Date().getFullYear()}</Pill>
          <Pill tone="forest">Maple syrup farm vibes</Pill>
        </div>
      </div>
    </footer>
  );
}

function EventWeekBanner() {
  if (!isEventWeek(WEDDING.dateISO)) return null;

  return (
    <div className="border-b border-[rgba(139,47,47,0.18)] bg-[rgba(139,47,47,0.10)]">
      <div className="mx-auto max-w-6xl px-4 py-2 text-sm text-[rgba(90,40,40,0.95)] sm:px-6 lg:px-8">
        <span className="font-semibold">Wedding week is here!</span> Check forecast, aim for early arrival, and keep your phone handy for day-of updates.
      </div>
    </div>
  );
}

export default function WeddingWebsite() {
  const weddingDate = useMemo(() => new Date(WEDDING.dateISO), []);
  const rsvpBy = useMemo(() => new Date(WEDDING.rsvpByISO), []);
  const countdown = useCountdown(weddingDate.getTime());
  const googleCalendarLink = useMemo(() => toGoogleCalendarLink(), []);
  const icsDownload = useMemo(() => toICSDataUri(), []);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 24]);

  const timeline = [
    { icon: Calendar, time: "2:30 PM", title: "Arrival window", detail: "Settle in, say hi, and grab your seat." },
    { icon: Clock, time: "3:00 PM", title: "Ceremony", detail: "Outside the barn doors (weather permitting)." },
    { icon: Utensils, time: "5:00 PM", title: "Dinner + party", detail: WEDDING.dinnerNote },
  ];

  return (
    <div id="top" className="min-h-screen bg-[#fbfaf7] text-[#2a2018]" style={{ backgroundColor: THEME.cream, color: THEME.ink }}>
      <EventWeekBanner />
      <Nav />

      <main>
        <header className="relative overflow-hidden" aria-label="Hero">
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <Image src={HERO_BG_URL} alt="Maple Hills Farms venue" fill priority className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/72 via-white/58 to-[#fbfaf7]" />
          </motion.div>

          <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-16">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Pill tone="maple">
                  <Calendar className="h-4 w-4" /> We’re getting married
                </Pill>
                <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight text-black sm:text-6xl">{WEDDING.couple}</h1>
                <p className="mt-3 text-base text-black/80 sm:text-lg">
                  {formatDateLong(weddingDate)} • {WEDDING.city} • RSVP by {formatMonthDay(rsvpBy)}
                </p>
                <p className="mt-4 text-lg text-black/80 sm:text-xl">Maple syrup farm wedding energy: barn doors, tent lights, good food, and a packed dance floor.</p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a href="#rsvp" className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[rgba(139,47,47,0.98)] to-[rgba(42,32,24,0.98)] px-5 py-3 text-sm font-semibold text-white">
                    RSVP now
                  </a>
                  <a href="#venue" className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white/80 px-5 py-3 text-sm font-semibold text-black/80">
                    Get directions
                  </a>
                  <a href={googleCalendarLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white/80 px-5 py-3 text-sm font-semibold text-black/80">
                    Add to Google Calendar
                  </a>
                  <a href={icsDownload} download="rob-nat-wedding.ics" className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white/80 px-5 py-3 text-sm font-semibold text-black/80">
                    Download .ics
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <Card className="overflow-hidden p-0">
                  <div className="relative h-56">
                    <Image src={PHOTOS[0].src} alt={PHOTOS[0].alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-xs font-semibold tracking-widest text-white/85">COUNTDOWN</div>
                      <div className="text-2xl font-semibold">{countdown.done ? "It’s wedding time!" : "See you soon"}</div>
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
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </header>

        <div className="pb-10">
          <RusticDivider />
          <Section id="details" title="The basics" kicker="All the important stuff" icon={Calendar}>
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <div className="font-semibold">Date</div>
                <div className="text-black/70">{formatDateLong(weddingDate)}</div>
              </Card>
              <Card>
                <div className="font-semibold">Ceremony</div>
                <div className="text-black/70">Starts at {WEDDING.ceremonyTime}</div>
              </Card>
              <Card>
                <div className="font-semibold">Venue</div>
                <div className="text-black/70">{WEDDING.venueName}</div>
                <div className="text-sm text-black/60">{WEDDING.venueAddressLine}</div>
              </Card>
            </div>
          </Section>
        </div>

        <div className="py-10">
          <RusticDivider />
          <Section id="schedule" title="Schedule" kicker="How the day flows" icon={Clock}>
            <div className="relative pl-6 lg:pl-0">
              <div className="absolute bottom-0 left-3 top-0 w-px bg-gradient-to-b from-[rgba(139,47,47,0.35)] via-[rgba(200,162,90,0.4)] to-transparent lg:hidden" />
              <div className="grid gap-4 lg:grid-cols-3">
                {timeline.map((item, i) => (
                  <div key={item.time} className="relative">
                    {i < timeline.length - 1 ? (
                      <div className="absolute -right-2 top-10 hidden h-px w-4 bg-black/20 lg:block" />
                    ) : null}
                    <Card className="h-full">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-black/5">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm uppercase tracking-widest text-black/55">Stop {i + 1}</div>
                          <div className="text-xl font-semibold">{item.time}</div>
                          <div className="mt-1 text-black/80">{item.title}</div>
                          <div className="mt-2 text-sm text-black/60">{item.detail}</div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>

        <div className="py-10">
          <RusticDivider />
          <Section id="venue" title="Venue" kicker="Maple syrup farm magic" icon={MapPin}>
            <Venue />
          </Section>
        </div>

        <div className="py-10">
          <RusticDivider />
          <Section id="gallery" title="Photos" kicker="A few favorite moments" icon={ImageIcon}>
            <PhotoGrid />
          </Section>
        </div>

        <div className="py-10">
          <RusticDivider />
          <Section id="travel" title="Travel" kicker="Sleep, drive, repeat" icon={Car}>
            <Travel />
          </Section>
        </div>

        <div className="py-10">
          <RusticDivider />
          <Section id="rsvp" title="RSVP" kicker="Let us know you’re coming" icon={Mail}>
            <RSVPBlock />
          </Section>
        </div>

        <div className="py-10">
          <RusticDivider />
          <Section id="faq" title="FAQ" kicker="Questions humans ask" icon={HelpCircle}>
            <FAQ />
          </Section>
        </div>

        <div className="py-10">
          <RusticDivider />
          <Section id="registry" title="Registry" kicker="Gifts and good vibes" icon={Gift}>
            <Registry />
          </Section>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
