/* global React, PROJECTS, nav */
const {
  useState: useState_p,
  useEffect: useEffect_p,
  useRef: useRef_p
} = React;

/* ============================================================
   HOME
   ============================================================ */
function HomePage() {
  return /*#__PURE__*/React.createElement("main", {
    className: "page-fade"
  }, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(WhatIDo, null), /*#__PURE__*/React.createElement(FeaturedWork, null), /*#__PURE__*/React.createElement(PersonalStory, null), /*#__PURE__*/React.createElement(HowIThink, null), /*#__PURE__*/React.createElement(Connect, null), /*#__PURE__*/React.createElement(SiteFooter, null));
}
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    className: "hero container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-quote"
  }, /*#__PURE__*/React.createElement("span", {
    className: "typein"
  }, /*#__PURE__*/React.createElement("span", {
    className: "word",
    style: {
      animationDelay: "0ms"
    }
  }, "I\xA0"), /*#__PURE__*/React.createElement("span", {
    className: "word",
    style: {
      animationDelay: "60ms"
    }
  }, "design\xA0"), /*#__PURE__*/React.createElement("span", {
    className: "word",
    style: {
      animationDelay: "120ms"
    }
  }, "products\xA0"), /*#__PURE__*/React.createElement("span", {
    className: "word",
    style: {
      animationDelay: "180ms"
    }
  }, "where\xA0"), /*#__PURE__*/React.createElement("span", {
    className: "word",
    style: {
      animationDelay: "240ms"
    }
  }, "users\xA0"), /*#__PURE__*/React.createElement("span", {
    className: "word",
    style: {
      animationDelay: "300ms"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "accent-word"
  }, "make decisions"), "."))), /*#__PURE__*/React.createElement("div", {
    className: "hero-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-name"
  }, "Natallia", /*#__PURE__*/React.createElement("br", null), "Hantsuk"), /*#__PURE__*/React.createElement("div", {
    className: "hero-tagline"
  }, "Senior Product Designer.", /*#__PURE__*/React.createElement("br", null), "16 years in design, 10+ in product.", /*#__PURE__*/React.createElement("br", null), "Lisbon \xB7 open to lead roles.")));
}
function WhatIDo() {
  const items = [{
    title: "Product Direction",
    body: "Shaping unclear problems into clear product decisions — discovery, framing, betting where to invest."
  }, {
    title: "Systems & Scale",
    body: "Designing for consistency across complex products. Design systems, governance, multi-surface coherence."
  }, {
    title: "Growth & Optimization",
    body: "Improving activation, retention, and the few key metrics that actually move the business."
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, "/01"), /*#__PURE__*/React.createElement("h2", null, "What I actually do")), /*#__PURE__*/React.createElement("div", {
    className: "do-list"
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    className: "do-row",
    key: i
  }, /*#__PURE__*/React.createElement("h3", null, it.title), /*#__PURE__*/React.createElement("p", null, it.body)))));
}
function FeaturedWork() {
  const featuredIds = ["automotive-hmi", "bankinter", "santander"];
  const featured = featuredIds.map(id => PROJECTS.find(p => p.id === id)).filter(Boolean);
  return /*#__PURE__*/React.createElement("section", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, "/02"), /*#__PURE__*/React.createElement("h2", null, "Featured work")), /*#__PURE__*/React.createElement("div", {
    className: "feat-grid"
  }, featured.map((p, i) => /*#__PURE__*/React.createElement("a", {
    key: p.id,
    className: `feat-card ${i % 2 === 1 ? "reverse" : ""}`,
    href: `#/project/${p.id}`,
    "data-cursor": "KNOW MORE"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feat-thumb"
  }, /*#__PURE__*/React.createElement(ProjectThumb, {
    project: p
  })), /*#__PURE__*/React.createElement("div", {
    className: "feat-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("span", null, p.industry)), /*#__PURE__*/React.createElement("h3", null, p.title), /*#__PURE__*/React.createElement("p", null, p.summary), /*#__PURE__*/React.createElement("div", {
    className: "tags"
  }, p.tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    className: "tag"
  }, t))))))));
}

/* Visual placeholder thumbnail — abstract geometric, varies by project id */
function ProjectThumb({
  project,
  big = false
}) {
  const variants = {
    "automotive-hmi": /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "#06080C"
      }
    }, /*#__PURE__*/React.createElement("img", {
      loading: "eager",
      fetchpriority: "high",
      decoding: "async",
      src: __r("assets/auto-cover-v2.png"),
      alt: "Automotive \u2014 Confidential / NDA",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
      }
    })),
    "santander": /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "#EC0000",
        backgroundImage: "url(" + __r("assets/santander-logo.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "106.1% auto",
        backgroundPosition: "center center"
      }
    }),
    "bankinter": /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "#FF6B00",
        display: "grid",
        placeItems: "center"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 400 200",
      style: {
        width: "78%"
      }
    }, /*#__PURE__*/React.createElement("text", {
      x: "200",
      y: "130",
      textAnchor: "middle",
      fontFamily: "ui-rounded, 'SF Pro Rounded', system-ui, sans-serif",
      fontSize: "84",
      fontWeight: "600",
      fill: "#FFFFFF",
      letterSpacing: "-2"
    }, "bankinter", /*#__PURE__*/React.createElement("tspan", {
      fontSize: "84"
    }, ".")))),
    "bankinter-bkwallet": /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "#000"
      }
    }, /*#__PURE__*/React.createElement("img", {
      loading: "eager",
      fetchpriority: "high",
      decoding: "async",
      src: __r("assets/bk-preview.jpg"),
      alt: "Bankinter BKwallet",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
      }
    })),
    "bankinter-onboarding": /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "#FFFFFF",
        display: "grid",
        placeItems: "center"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 400 300",
      style: {
        width: "70%"
      }
    }, /*#__PURE__*/React.createElement("text", {
      x: "40",
      y: "155",
      fontFamily: "ui-rounded, 'SF Pro Rounded', system-ui, sans-serif",
      fontSize: "170",
      fontWeight: "600",
      fill: "#FF6B00",
      letterSpacing: "-6"
    }, "bk", /*#__PURE__*/React.createElement("tspan", null, ".")), /*#__PURE__*/React.createElement("text", {
      x: "42",
      y: "210",
      fontFamily: "Inter, system-ui, sans-serif",
      fontSize: "40",
      fontWeight: "500",
      fill: "#4A4A4A",
      letterSpacing: "5"
    }, "PROTECTED"))),
    "santander-minors": /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "#000"
      }
    }, /*#__PURE__*/React.createElement("img", {
      loading: "eager",
      fetchpriority: "high",
      decoding: "async",
      src: __r("assets/snt-cover.jpg"),
      alt: "Santander \u2014 Minors' Access",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
      }
    })),
    "nplan-driving-path": /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "#0E1B2C"
      }
    }, /*#__PURE__*/React.createElement("img", {
      loading: "eager",
      fetchpriority: "high",
      decoding: "async",
      src: __r("assets/dp-cover.jpg"),
      alt: "nPlan \u2014 Driving Path",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
      }
    })),
    "nplan-comparison-tool": /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "#3C7BD1"
      }
    }, /*#__PURE__*/React.createElement("img", {
      loading: "eager",
      fetchpriority: "high",
      decoding: "async",
      src: __r("assets/cmp-thumb.jpg"),
      alt: "nPlan \u2014 Comparison Tool",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
      }
    })),
    "nplan-comparison-case-study": /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "#000"
      }
    }, /*#__PURE__*/React.createElement("img", {
      loading: "eager",
      fetchpriority: "high",
      decoding: "async",
      src: __r("assets/cmp3-cover.jpg"),
      alt: "Comparison Tool \u2014 A UX Case Study",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
      }
    })),
    "fintech-onboarding": /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, #F6EFDD 0%, #EFE6CF 100%)",
        display: "grid",
        placeItems: "center"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 400 300",
      style: {
        width: "60%"
      }
    }, /*#__PURE__*/React.createElement("rect", {
      x: "120",
      y: "40",
      width: "160",
      height: "220",
      rx: "20",
      fill: "#1F1820"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "135",
      y: "60",
      width: "130",
      height: "6",
      rx: "3",
      fill: "#E96A3A",
      opacity: "0.9"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "135",
      y: "76",
      width: "80",
      height: "3",
      rx: "1.5",
      fill: "#F6EFDD",
      opacity: "0.4"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "135",
      y: "100",
      width: "130",
      height: "40",
      rx: "6",
      fill: "#F6EFDD",
      opacity: "0.08"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "135",
      y: "150",
      width: "130",
      height: "40",
      rx: "6",
      fill: "#F6EFDD",
      opacity: "0.08"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "135",
      y: "200",
      width: "130",
      height: "40",
      rx: "20",
      fill: "#E96A3A"
    }), /*#__PURE__*/React.createElement("text", {
      x: "170",
      y: "225",
      fill: "#1F1820",
      fontFamily: "ui-sans-serif",
      fontSize: "11",
      fontWeight: "600"
    }, "CONFIRM"))),
    "ai-workflow": /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "#1F1820",
        display: "grid",
        placeItems: "center"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 400 300",
      style: {
        width: "85%"
      }
    }, /*#__PURE__*/React.createElement("g", {
      stroke: "#E96A3A",
      strokeWidth: "1.5",
      fill: "none"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M 80 80 C 140 80, 140 150, 200 150"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M 200 150 C 260 150, 260 80, 320 80"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M 200 150 C 260 150, 260 220, 320 220"
    })), /*#__PURE__*/React.createElement("rect", {
      x: "50",
      y: "60",
      width: "60",
      height: "40",
      rx: "6",
      fill: "#F6EFDD"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "170",
      y: "130",
      width: "60",
      height: "40",
      rx: "6",
      fill: "#F6EFDD"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "290",
      y: "60",
      width: "60",
      height: "40",
      rx: "6",
      fill: "#E96A3A"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "290",
      y: "200",
      width: "60",
      height: "40",
      rx: "6",
      fill: "#F6EFDD",
      opacity: "0.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: "55",
      y: "84",
      fill: "#1F1820",
      fontFamily: "ui-monospace,monospace",
      fontSize: "9"
    }, "INPUT"), /*#__PURE__*/React.createElement("text", {
      x: "178",
      y: "154",
      fill: "#1F1820",
      fontFamily: "ui-monospace,monospace",
      fontSize: "9"
    }, "REASON"), /*#__PURE__*/React.createElement("text", {
      x: "298",
      y: "84",
      fill: "#1F1820",
      fontFamily: "ui-monospace,monospace",
      fontSize: "9"
    }, "ACT"), /*#__PURE__*/React.createElement("text", {
      x: "298",
      y: "224",
      fill: "#1F1820",
      fontFamily: "ui-monospace,monospace",
      fontSize: "9"
    }, "AUDIT"))),
    "saas-analytics": /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, #EFE6CF 0%, #F6EFDD 100%)",
        display: "grid",
        placeItems: "center"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 400 300",
      style: {
        width: "75%"
      }
    }, /*#__PURE__*/React.createElement("polyline", {
      points: "40,220 100,180 160,200 220,120 280,140 340,80",
      fill: "none",
      stroke: "#1F1820",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "40",
      cy: "220",
      r: "4",
      fill: "#1F1820"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "100",
      cy: "180",
      r: "4",
      fill: "#1F1820"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "160",
      cy: "200",
      r: "4",
      fill: "#1F1820"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "220",
      cy: "120",
      r: "6",
      fill: "#E96A3A"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "280",
      cy: "140",
      r: "4",
      fill: "#1F1820"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "340",
      cy: "80",
      r: "4",
      fill: "#1F1820"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "40",
      y1: "240",
      x2: "360",
      y2: "240",
      stroke: "#1F1820",
      strokeWidth: "0.5",
      opacity: "0.3"
    }))),
    "health-app": /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(135deg, #DDE5D5 0%, #C4D1B8 100%)",
        display: "grid",
        placeItems: "center"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 400 300",
      style: {
        width: "55%"
      }
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "200",
      cy: "150",
      r: "100",
      fill: "none",
      stroke: "#1F1820",
      strokeWidth: "1",
      opacity: "0.3"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "200",
      cy: "150",
      r: "70",
      fill: "none",
      stroke: "#1F1820",
      strokeWidth: "1",
      opacity: "0.4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M 200 80 A 70 70 0 0 1 254 184",
      fill: "none",
      stroke: "#1F1820",
      strokeWidth: "6",
      strokeLinecap: "round"
    }), /*#__PURE__*/React.createElement("text", {
      x: "170",
      y: "156",
      fontFamily: "serif",
      fontStyle: "italic",
      fontSize: "32",
      fill: "#1F1820"
    }, "care"))),
    "edu-platform": /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "#F6EFDD",
        display: "grid",
        placeItems: "center"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 400 300",
      style: {
        width: "75%"
      }
    }, Array.from({
      length: 5
    }).map((_, i) => /*#__PURE__*/React.createElement("rect", {
      key: i,
      x: 60 + i * 60,
      y: 80 + i % 2 * 30,
      width: "40",
      height: 140 - i % 2 * 30,
      rx: "4",
      fill: i === 2 ? "#E96A3A" : "#1F1820",
      opacity: i === 2 ? 1 : 0.85
    }))))
  };
  return variants[project.id] || /*#__PURE__*/React.createElement("div", {
    className: "ph"
  }, project.title.toUpperCase());
}
function PersonalStory() {
  return /*#__PURE__*/React.createElement("section", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "story"
  }, /*#__PURE__*/React.createElement("aside", null, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "/03 \xB7 Personal story"), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, "16", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, ".")), /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, "years in design \u2014 10+ of them in product, across B2B and B2C.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "story-body"
  }, /*#__PURE__*/React.createElement("p", null, "I'm a Senior Product Designer with 16 years of design experience, including over 10 years in product design across B2B and B2C environments."), /*#__PURE__*/React.createElement("p", null, "I lead product work end to end \u2014 from understanding the problem, shaping the user experience, and aligning stakeholders, to delivering high-quality UI and supporting implementation. ", /*#__PURE__*/React.createElement("em", null, "I'm strongest in complex product spaces where design needs to connect user insight, business goals, technical constraints, and product strategy.")), /*#__PURE__*/React.createElement("p", null, "I've worked across Automotive, Fintech, SaaS, AI/ML, and digital platforms, both in large international companies and fast-moving product teams. This has shaped the way I work: structured, collaborative, hands-on, and focused on moving from ambiguity to clear, valuable solutions."), /*#__PURE__*/React.createElement("p", null, "I bring strong product instincts, a high standard for craft, and the ability to partner closely with PMs, engineers, and leadership. Whether I'm improving an existing product, defining a new feature, or evolving a design system, I care about creating experiences that are useful, coherent, and commercially meaningful."), /*#__PURE__*/React.createElement("p", null, "As a Belarusian designer based in Portugal, I'm highly adaptable and comfortable working across cultures, teams, and time zones. I'm resilient in complex situations and naturally focus on finding the real problem, building alignment, and helping the team move forward.")), /*#__PURE__*/React.createElement("a", {
    className: "story-cta",
    href: __r("assets/Natallia-Hantsuk-CV.pdf"),
    download: "Natallia-Hantsuk-CV.pdf",
    "data-cursor": "DOWNLOAD"
  }, "Download CV ", /*#__PURE__*/React.createElement("span", null, "\u2193")))));
}
function HowIThink() {
  const beliefs = ["Most UX problems are product problems.", "Speed often beats perfection.", "Alignment is more valuable than ideal solutions.", "Simplicity is a business decision."];
  return /*#__PURE__*/React.createElement("section", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "think",
    "data-dark": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, "/04"), /*#__PURE__*/React.createElement("h2", null, "How I think")), /*#__PURE__*/React.createElement("div", {
    className: "think-grid"
  }, beliefs.map((b, i) => /*#__PURE__*/React.createElement("div", {
    className: "think-item",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, "0", i + 1), /*#__PURE__*/React.createElement("h3", null, b))))));
}
function Connect() {
  return /*#__PURE__*/React.createElement("section", {
    className: "container connect"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, "/05"), /*#__PURE__*/React.createElement("h2", {
    style: {
      visibility: "hidden",
      height: 0,
      margin: 0
    }
  })), /*#__PURE__*/React.createElement("h2", null, "Let's", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
    href: "#/contact",
    "data-cursor": "WRITE"
  }, "connect.")), /*#__PURE__*/React.createElement("div", {
    className: "connect-meta"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Email"), /*#__PURE__*/React.createElement("br", null), "natallia.hantsuk@gmail.com"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Based in"), /*#__PURE__*/React.createElement("br", null), "Lisbon, Portugal"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Open to"), /*#__PURE__*/React.createElement("br", null), "Senior IC \xB7 Lead \xB7 Team Lead")));
}
function SiteFooter() {
  return /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", null, "\xA9 Natallia Hantsuk"), /*#__PURE__*/React.createElement("div", null, "Based in Lisbon")));
}
window.HomePage = HomePage;
window.ProjectThumb = ProjectThumb;