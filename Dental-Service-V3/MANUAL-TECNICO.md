# TECHNICAL DOCUMENTATION — DR. JOCÉLIO WEBSITE

**Project:** Institutional and commercial website for Dr. Jocélio (dental clinic)
**Reference:** official clinic app (screenshots supplied with the brief)
**Location:** Avenida Carlos Cruz, Juazeiro do Norte, Ceará — Brazil
**WhatsApp:** +55 88 99682-1431
**Document version:** 1.0.0

---

## 0. WHAT WAS DELIVERED AND WHAT WAS NOT

Honesty first, so nothing is mistaken for finished work.

**Delivered as working code**

- `index.html` — the complete single-page website, every section of the brief implemented.
- `assets/style.css` — the full design system: colour tokens, typography, buttons, cards, 3D scene, phone mockups, responsive breakpoints, reduced-motion and print rules.
- `assets/script.js` — real behaviour: WhatsApp deep links per button, sticky header, scroll progress, active-section indicator, mobile menu, scroll reveal, cursor tilt, back-to-top, and the contact form.
- `assets/logo-dr-jocelio.svg` and `assets/logo-dr-jocelio-branco.svg` — the DJ monogram (light and dark versions), hand-written vector.
- `assets/dr-jocelio.jpg` — the professional's photograph, cropped from the official app screenshot.
- `assets/app-*.webp` — the app screens in WebP, used in the phone mockups.
- `politica-de-privacidade.html`, `termos-de-uso.html` — LGPD and terms pages, linked from the footer.
- `robots.txt`, `sitemap.xml` — SEO technical files.

**Not delivered, and why**

| Item | Status | Reason |
|---|---|---|
| 3D rendered with Three.js / React Three Fiber | Replaced by CSS 3D | The build environment has no browser and no front-end toolchain, so an npm/React project cannot be built or verified here. The hero's dental element, phone mockups and depth effects are CSS transforms — no CDN dependency, no build step, faster on mobile. |
| Deploy / hosting | Not done | The connected Vercel integration is read-only (list projects, deployments, domains, build logs). It cannot create a project, trigger a build or publish. |
| Generated logo image, mockup renders, stock photography | Not generated | Image generation is not available on the current plan. The logo is therefore delivered as SVG source, which scales to any size and works as favicon and app icon. |
| Contact form backend | Substituted | There is no mail backend here. Sending opens the official WhatsApp with the message pre-written, so no false "message sent" confirmation is ever shown. |
| Prices, opening hours, CRO, formation, address number, social profiles | Left as marked placeholders | The brief forbids inventing them, and they are not in the material received. |

Every placeholder is visible in the page itself — styled in amber with dashed borders, or marked `[LIKE THIS]` — so nobody mistakes a gap for published content.

---

## 1. VISUAL IDENTITY

### 1.1 The logo concept

The clinic has no official logo yet, so the mark is an original proposal.

The symbol is a monogram of the initials **D** and **J** drawn in one continuous stroke: the D is a rounded bowl with a straight stem, and the J grows out of the bottom right of the D as a long tapering hook, so the two letters share a single line. Inside the D's counter — the negative space enclosed by the bowl — sits the silhouette of a **tooth crown with two soft root points**, legible but not shouted. A thin, evenly weighted ring frames the whole mark, giving it the composure a medical brand needs.

The ring reads as protection and as a seal. The tooth inside reads as dentistry without a cartoon molar. The shared stroke reads as continuity of care.

**Files**

| File | Use |
|---|---|
| `assets/logo-dr-jocelio.svg` | Header, footer, favicon, light backgrounds. Ring and letters in the blue gradient `#2375E5 → #1765C5`; the tooth is knocked out in white. |
| `assets/logo-dr-jocelio-branco.svg` | Dark backgrounds (the app section, the footer). Ring and letters in white; the tooth is `#0E3C7A`. |

**Sizes in use:** 42 × 42 px in the header, 56 × 56 px in the footer, and the same file serves as `favicon` and `apple-touch-icon`. Because it is vector, it holds at 16 px and at billboard size.

**Clear space rule:** leave a margin equal to the ring's stroke width (about 5% of the mark's height) free of any other element.

**Lock-up note:** the wordmark is set as live text beside the mark, in Manrope 800 with `0.02em` tracking, uppercase, two lines when the subtitle is included. If a designer later builds a fixed logotype, the header lock-up in `.brand` is the element to replace — it is one block in `index.html`.

**Not to do:** do not add gradients inside the tooth; do not place the light mark on a mid-tone blue; do not stretch it; do not rotate the mark other than the −8° hover on the header.

### 1.2 Palette

Taken from the app screenshots and used verbatim.

| Token | Hex | Role |
|---|---|---|
| `--azul` | `#2375E5` | Primary buttons, links, highlights, interactive components |
| `--azul-escuro` | `#1765C5` | Button gradient end, hover states, secondary headings |
| `--azul-profundo` | `#0E3C7A` | Gradient anchor, footer top, text on light blue |
| `--branco` | `#FFFFFF` | Dominant surface, as in the app |
| `--cinza-azulado` | `#F3F7FB` | Tinted sections, input backgrounds, depth separation |
| `--texto` | `#151D2B` | Primary text |
| `--texto-2` | `#747D8C` | Secondary text, captions |
| `--linha` | `#E4EBF3` | Hairlines and borders |
| `--verde-wa` | `#25D366` | WhatsApp float only — the official brand colour of the channel |

White carries the page, blue separates and directs, blue-grey gives depth. No other saturated colour is introduced anywhere; the amber used for placeholders is documentation marking, not part of the brand, and must disappear before launch.

### 1.3 Typography

**Manrope** (Google Fonts), weights 400/500/600/700/800. A geometric sans with slightly humanist terminals: technical without being cold, which matches a clinic that positions itself on technology and care. Fallback chain is `system-ui, -apple-system, 'Segoe UI', Roboto, Arial`.

| Role | Size | Weight | Notes |
|---|---|---|---|
| H1 | `clamp(34px, 5.6vw, 68px)` | 800 | Tracking `−0.022em`, gradient text |
| H2 | `clamp(27px, 3.7vw, 46px)` | 800 | Section titles |
| H3 | `clamp(19px, 1.8vw, 23px)` | 700 | Card titles |
| Eyebrow | 12.5px | 700 | Uppercase, `0.13em` tracking |
| Body | `clamp(15.5px, 1.05vw, 17px)` | 400 | Line height 1.65 |
| Lead | 1.045em | 400 | `--texto-2` |
| Micro / legal | 12.4–13px | 400 | Footer and form notices |

Self-hosting the two most used weights as WOFF2 is the one performance item worth doing after launch — it removes a third-party request from the critical path.

### 1.4 Shape, depth and motion

Radii are generous and consistent: `12 / 18 / 26 / 34 px` (`--r-sm` to `--r-xl`). Cards use `--r-xl`, inputs `14px`, buttons are fully rounded pills, exactly as in the app. Shadows are three-tiered and always soft — never a hard black drop shadow.

Motion vocabulary: `cubic-bezier(.22,.61,.36,1)` on everything. Reveal on scroll rises 26 px over 800 ms, staggered 70 ms. Cards lift 6–8 px on hover. The hero's dental element floats on a 7 s loop with three floating chips at different speeds for parallax depth. All of it is disabled by `prefers-reduced-motion: reduce`.

---

## 2. SITE STRUCTURE

The brief asks for all pages and sections. The delivery is a single-page architecture with in-page anchors, which is the right shape for a clinic: one scroll that answers "who, what, where, how much, how do I book".

| Section | Anchor | Content |
|---|---|---|
| Header | — | Logo lock-up, seven-item menu, WhatsApp CTA, scroll progress bar |
| Hero | `#inicio` | Eyebrow, H1, lead, two CTAs, three proof points, CSS 3D dental scene with floating chips |
| Marquee | — | Continuous strip of confirmed specialities |
| A clínica | `#clinica` | Institutional narrative, four value cards, reserved-fields note |
| Tratamentos | `#tratamentos` | Four service cards with description, protocol list, two CTAs, placeholder price; plus an empty slot card for future procedures |
| Dr. Jocélio | `#dr-jocelio` | Photograph with badge, presentation, data table, two CTAs |
| Galeria | `#galeria` | Six slots ready for real photographs |
| Aplicativo | `#aplicativo` | Five feature rows, three phone mockups with real app screens, store buttons in "coming soon" state |
| Depoimentos | `#depoimentos` | Three testimonial slots, LGPD warning |
| Agendamento | `#agendar` | Conversion block and a three-step explanation of how booking works |
| Contato | `#contato` | Contact list, map placeholder, validated form |
| Footer | — | Brand, navigation, treatments, contact, app, legal links, CFM/LGPD notice |
| Privacy / Terms | separate files | LGPD policy and terms of use |

### 2.1 The app section

This is the section the brief calls one of the most important, so it gets the darkest surface on the page and three floating phone mockups: the home screen front and centre, the appointments screen rotated behind on the left, the services screen rotated behind on the right. The frames are built in CSS (bezel gradient, inner highlight ring, notch) and the screens are the **real screenshots** converted to WebP, so the site and the app present the same interface.

Store buttons are rendered **disabled**, with the text "Aplicativo disponível em breve" above them. No URL is invented, no link leads anywhere, and the buttons are ready to receive the official links — set the `href` and remove `disabled` when publication happens.

The brief notes the app's admin area must not be presented as a patient feature. It is not mentioned anywhere on the site except in one clarifying line at the end of the app section, which states it is for internal clinic use.

---

## 3. REAL FUNCTIONS — WHAT EACH BUTTON DOES

The brief forbids decorative buttons. Every interactive element and its actual behaviour:

| Element | Behaviour |
|---|---|
| Every "Agendar consulta" button in the header, hero, treatments, professional section, CTA block and float | Opens `https://wa.me/5588996821431` in a new tab, with a **context-specific** pre-written message |
| "Conheça nossos tratamentos" | Smooth-scrolls to `#tratamentos` |
| "Solicitar informações" on each treatment | WhatsApp with a message naming that treatment |
| WhatsApp float (bottom right) | Same WhatsApp link, generic message, with a pulsing ring |
| Menu items | Smooth scroll to the section; active item follows the scroll position |
| Burger button | Opens the mobile menu; closes on link click, on Escape, and locks body scroll |
| Back-to-top arrow | Appears after 700 px, smooth scroll to top |
| Map placeholder button | Opens Google Maps searching "Avenida Carlos Cruz, Juazeiro do Norte - CE" in a new tab — safe, because it searches rather than claiming a coordinate |
| Store buttons (Google Play, App Store) | **Disabled on purpose.** No invented URL. |
| Privacy and terms links | Open the two delivered pages |
| Form submit | Validates, then opens WhatsApp with the completed data |

### 3.1 The contact form

Fields: name, phone, e-mail, subject, message — as specified. Plus a required LGPD consent checkbox, a honeypot field, and a timestamp field.

Validation is real and runs on blur and on submit: minimum name length and allowed characters, Brazilian phone with DDD (10 to 13 digits after stripping formatting), optional but validated e-mail, required subject, message between 10 and 1200 characters, required consent. Each field shows its own error message and gets a red border; the status line takes focus to the first invalid field.

Spam protection is two cheap barriers: a honeypot input hidden off-screen that only automation fills, and a minimum of 3 seconds between page load and submit.

**On submission the form does not claim to have sent an e-mail.** It builds a formatted message and opens the official WhatsApp with it, then reports exactly that: "Abrimos o WhatsApp com a sua mensagem pronta." If the browser blocks the pop-up, a fallback link is rendered in the status line so the message is never lost.

The form's legal note asks the patient **not** to write health data there — the brief is explicit that sensitive health data must not be collected through an ordinary form, and this respects that.

---

## 4. SEO AND LOCAL SEARCH

- Semantic HTML: one `h1`, sequential `h2`/`h3`, `<main>`, `<nav>`, `<footer>`, `<section>` with ids.
- Title and meta description written for the searches the clinic actually wants: clinic + city + specialties.
- Canonical URL, `robots` directives, `theme-color`.
- Open Graph and Twitter cards complete, with a 1200 × 630 image slot at `assets/og-dr-jocelio.jpg` — **this file still must be produced**, since image generation was unavailable.
- JSON-LD with two linked nodes: `Dentist` and `WebSite`. The `Dentist` node carries name, description, URL, logo, phone, address (street, city, region, country), `areaServed` for Juazeiro do Norte, Crato and Barbalha, the four confirmed procedures, and the professional as `employee`.
- `robots.txt` allows everything and points to the sitemap; `sitemap.xml` lists the three pages.

**Placeholders inside the structured data must be replaced before launch** — `priceRange`, `openingHoursSpecification` and `sameAs` currently hold bracketed text. Invalid values in JSON-LD are worse than absent ones, so replace them or delete the keys.

Two more things worth doing after launch, when the data exists: a Google Business Profile tied to the same NAP (name, address, phone) as the site and the app, and one page per treatment instead of section anchors, which is what ranks for "canal dentário Juazeiro do Norte" style searches.

---

## 5. PERFORMANCE, ACCESSIBILITY AND SECURITY

**Performance.** No framework, no build step, no CDN except the font. CSS and JS are single files loaded with `defer`. Every image below the fold carries `loading="lazy"` and explicit `width`/`height` to reserve layout space and keep CLS near zero. App screens are WebP at quality 82 and roughly 20–56 KB each. The scroll listener is passive and the parallax is throttled through `requestAnimationFrame`.

**Accessibility.** Skip link to the content. Visible focus rings on every interactive element. `aria-label` on the burger, the WhatsApp float and the back-to-top button; `aria-expanded` kept in sync; `aria-controls` wired to the menu. Form errors use `role="alert"` and are tied to their inputs with `aria-describedby`; the status line is `aria-live="polite"`. Contrast: `#151D2B` on white is about 15:1, `#747D8C` on white about 4.6:1, white on `#2375E5` about 3.6:1 — the last one passes for large and bold text, which is what buttons use. The section with the darkest background keeps its body text at `#E8F0FB` on `#0A2347`.

**Security and privacy.** No cookies, no analytics, no trackers, no third-party scripts beyond the font, and no server-side storage: nothing the visitor types ever reaches a database. That is the safest possible posture for a form that must not hold health data, and it should be stated plainly in the privacy policy — which it is.

**Reduced motion.** Every animation and the pulse ring are switched off under `prefers-reduced-motion: reduce`, including the marquee.

**Print.** A print stylesheet hides the header, floats, marquee, 3D scene and mockups, so printing the page gives a clean institutional document.

---

## 6. IMPLEMENTATION, STAGE BY STAGE

The brief asks for the work to continue past the home page. All stages below are complete in the delivered files; what remains is the client-side input listed at the end.

**ETAPA 1 — identity.** Palette tokens, typography scale, radii, shadows, motion vocabulary, logo in two versions. Done in `style.css` §1 and the two SVG files.

**ETAPA 2 — home and hero with 3D.** The hero scene: two counter-rotating rings, a lit tooth crown with three roots, three floating chips, a perspective grid floor, and scroll parallax on three gradient orbs. The whole scene carries a cursor tilt. Done in `index.html` §hero and `style.css` §5, `script.js` §5 and §6.

**ETAPA 3 — services, professional, about, gallery.** Four treatment cards plus a slot card, the professional block with the real photograph cropped from the app screenshot, the institutional narrative, the six-slot gallery. Done.

**ETAPA 4 — app section with 3D mockups.** Three CSS phone frames with real screens, feature list, store buttons in the coming-soon state. Done.

**ETAPA 5 — contact, WhatsApp, booking.** Context-specific WhatsApp links, the five-step booking explanation, the validated form, the contact list, the map placeholder. Done.

**ETAPA 6 — footer, SEO, responsiveness, optimisation.** Five-column footer with legal links, complete head with structured data, `robots.txt`, `sitemap.xml`, breakpoints at 1080, 900, 640 px, lazy loading, WebP. Done.

**ETAPA 7 — tests.** See the checklist below. Everything checkable without a browser was checked; the items requiring a real device are listed for the client.

---

## 7. TEST CHECKLIST

**Already verified in the delivered files**

| Check | Result |
|---|---|
| Every `data-wa` button receives an href | All 14 buttons generated by `script.js` §1 |
| WhatsApp number and link format | `5588996821431`, matches the brief's `wa.me/5588996821431` |
| Initial message wording | Matches the brief's text for the general contact entry points |
| Store buttons cannot be clicked | Marked `disabled` and `aria-disabled="true"` — no invented URL exists |
| No lorem ipsum, no invented fact | Every unknown is a bracketed or amber-marked placeholder |
| No claim of guaranteed results anywhere | Medical claim wording reviewed across all sections |
| Internal anchors resolve | All seven anchors exist as section ids |
| Form rules cover all five fields | Rules for `nome`, `telefone`, `email`, `assunto`, `mensagem`, plus the LGPD checkbox |

**To test on a real device before launch**

1. Open the WhatsApp link from a phone and confirm the message arrives pre-written, with line breaks intact.
2. Submit the form with valid data on Android and iPhone, and confirm the pop-up is not blocked by the browser.
3. Submit the form empty and confirm each field shows its own error and focus lands on the first.
4. Resize from 320 px to 2560 px and check the header, the phone mockups and the footer columns.
5. Tab through the entire page with the keyboard and confirm every control is reachable and visible.
6. Run Lighthouse on mobile and desktop; target 90+ on all four categories.
7. Check the page with a screen reader once, focusing on the menu, the form and the phone mockups' alt text.

---

## 8. WHAT THE CLINIC STILL NEEDS TO PROVIDE

Each item below appears in the site as a visible placeholder. When the information arrives, the listed file and location is where it goes.

| Missing item | Where it goes |
|---|---|
| Full address — number, district, postcode | `index.html`, `#contato` list and footer; also the `address` node in the JSON-LD |
| Opening hours | `#contato` and the footer; also `openingHoursSpecification` in the JSON-LD |
| Institutional e-mail | `#contato` list |
| Official social profiles | `#contato` list, footer and `sameAs` in the JSON-LD |
| Clinic history and philosophy | `#clinica` narrative block |
| Confirmed CRO registration | `#dr-jocelio` data table |
| Formation and qualifications | `#dr-jocelio` data table |
| Confirmed treatment prices | `card__price` line in each service card |
| Additional treatments | Duplicate a `.card` block in `#tratamentos` |
| Real photographs: façade, reception, rooms, equipment, team | The six `.gal__slot` blocks in `#galeria` |
| Authorised before-and-after cases | Same gallery, with written patient authorisation |
| Authorised testimonials | The three `.quote--slot` blocks in `#depoimentos` |
| Google Maps link for the clinic | The `.map__inner` block in `#contato` |
| App store links, when published | The two `.store` buttons in `#aplicativo` and the footer — add `href` and remove `disabled` |
| Open Graph image, 1200 × 630 | Saved as `assets/og-dr-jocelio.jpg` |
| Legal review of the privacy policy and terms | Both files, where the clinic's CNPJ or CPF, address and controller name are marked |

---

## 9. EDITORIAL COMPLIANCE

The brief is strict, and it was followed in the wording as well as the build.

Nothing is presented as a guaranteed result. No claim about clinical outcomes appears anywhere. No treatment, specialty or procedure was invented beyond the four confirmed by the app screenshots. The app's prices are not published — each service card carries a marked placeholder instead. No URL, no e-mail address, no CRO number, no founding date and no address detail was fabricated. No testimonial was written. The admin area of the app is not offered as a patient feature. The site states, in the footer and beside the treatments, that its content is informative and does not replace a consultation. Health data is explicitly steered away from the form and towards WhatsApp or the clinic directly. Patient images and testimonials only enter the page with documented authorisation.

That is the standard a dental clinic in Brazil should hold itself to, and the deliverable is built so that holding it is the path of least resistance.

---

*Documentation prepared for the Dr. Jocélio website project. Version 1.0.0.*
