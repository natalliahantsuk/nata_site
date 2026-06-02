/* global React, PROJECTS, ProjectThumb, nav */
const {
  useMemo: useMemo_pr
} = React;

/* Reserve image space at render time to avoid layout shift on full-width images */
function arStyle(src) {
  const R = typeof window !== "undefined" && window.__assetRatios || {};
  const base = String(src || "").split("/").pop().split("?")[0];
  const r = R[base];
  return r ? {
    aspectRatio: String(r),
    width: "100%",
    height: "auto"
  } : {};
}

/* ============================================================
   SINGLE PROJECT
   ============================================================ */
function ProjectPage({
  id
}) {
  const idx = PROJECTS.findIndex(p => p.id === id);
  const project = PROJECTS[idx];
  const [pwUnlocked, setPwUnlocked] = React.useState(() => sessionStorage.getItem(`unlock_${id}`) === "1");
  if (!project) {
    return /*#__PURE__*/React.createElement("main", {
      className: "page-fade container",
      style: {
        padding: "200px 0",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: "var(--display)",
        fontSize: "3rem"
      }
    }, "Project not found."), /*#__PURE__*/React.createElement("a", {
      href: "#/portfolio",
      style: {
        marginTop: 24,
        display: "inline-block",
        textDecoration: "underline"
      }
    }, "\u2190 Back to portfolio"));
  }
  if (project.protected && !pwUnlocked) {
    return /*#__PURE__*/React.createElement(ProjectGate, {
      project: project,
      onUnlock: () => {
        sessionStorage.setItem(`unlock_${id}`, "1");
        setPwUnlocked(true);
      }
    });
  }
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const isCaseStudy = project.caseStudy === true;
  const isStructured = Array.isArray(project.responsibilities);
  return /*#__PURE__*/React.createElement("main", {
    className: "page-fade",
    "data-project": project.id
  }, /*#__PURE__*/React.createElement("header", {
    className: "proj-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "crumbs"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#/portfolio",
    "data-cursor": "BACK"
  }, "\u2190 Work"), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement("span", null, project.industry)), /*#__PURE__*/React.createElement("h1", null, project.title), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, project.lede || project.summary)), /*#__PURE__*/React.createElement("div", {
    className: "proj-meta"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Client"), /*#__PURE__*/React.createElement("div", {
    className: "val"
  }, project.client)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Team"), /*#__PURE__*/React.createElement("div", {
    className: "val"
  }, project.team)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Role"), /*#__PURE__*/React.createElement("div", {
    className: "val"
  }, project.role))), !isCaseStudy && /*#__PURE__*/React.createElement("figure", {
    className: "proj-img-full"
  }, project.image ? /*#__PURE__*/React.createElement("img", {
    src: project.image,
    alt: project.title,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : /*#__PURE__*/React.createElement(ProjectThumb, {
    project: project,
    big: true
  })), isCaseStudy && project.heroImage && (project.id === "bankinter-bkwallet" ? /*#__PURE__*/React.createElement("figure", {
    className: "cs-image-frame cs-hero-fullbleed",
    style: {
      margin: "0 0 0"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: project.heroImage,
    alt: project.title,
    loading: "eager",
    fetchpriority: "high",
    decoding: "async",
    style: {
      display: "block",
      ...arStyle(project.heroImage)
    }
  })) : /*#__PURE__*/React.createElement("figure", {
    className: "proj-img-full"
  }, /*#__PURE__*/React.createElement("img", {
    src: project.heroImage,
    alt: project.title,
    loading: "eager",
    fetchpriority: "high",
    decoding: "async",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }))), project.nda && /*#__PURE__*/React.createElement("section", {
    className: "proj-section nda-section"
  }, /*#__PURE__*/React.createElement("h2", null, "NDA notice"), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontStyle: "italic",
      color: "var(--muted)"
    }
  }, project.nda))), isCaseStudy ? /*#__PURE__*/React.createElement(CaseStudyBody, {
    project: project
  }) : isStructured ? /*#__PURE__*/React.createElement(StructuredBody, {
    project: project
  }) : /*#__PURE__*/React.createElement(ProseBody, {
    project: project
  }), /*#__PURE__*/React.createElement("nav", {
    className: "proj-nav"
  }, /*#__PURE__*/React.createElement("a", {
    href: `#/project/${prev.id}`,
    "data-cursor": "PREV"
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, "\u2190 Previous"), /*#__PURE__*/React.createElement("span", {
    className: "title"
  }, prev.title)), /*#__PURE__*/React.createElement("a", {
    href: `#/project/${next.id}`,
    "data-cursor": "NEXT"
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, "Next \u2192"), /*#__PURE__*/React.createElement("span", {
    className: "title"
  }, next.title))));
}

/* ============================================================
   CASE STUDY BODY — image-led, with My Role + fake results
   ============================================================ */
function CaseStudyBody({
  project
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, project.sections && project.sections.map((s, i) => {
    if (s.kind === "cs3-intro") {
      return /*#__PURE__*/React.createElement("section", {
        className: "cs3-intro",
        key: i,
        "data-dark": "true"
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs3-intro-grid"
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
        className: "cs3-intro-title"
      }, s.title), /*#__PURE__*/React.createElement("p", {
        className: "cs3-intro-body"
      }, s.body)), /*#__PURE__*/React.createElement("div", {
        className: "cs3-intro-diagram"
      }, /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 360 320",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/React.createElement("g", {
        stroke: "#FFFFFF",
        strokeWidth: "2",
        fill: "none"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M 130 245 Q 250 100 290 60",
        markerEnd: "url(#cs3-arrow)"
      })), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
        id: "cs3-arrow",
        viewBox: "0 0 10 10",
        refX: "9",
        refY: "5",
        markerWidth: "6",
        markerHeight: "6",
        orient: "auto-start-reverse"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M 0 0 L 10 5 L 0 10 z",
        fill: "#FFFFFF"
      }))), /*#__PURE__*/React.createElement("circle", {
        cx: "130",
        cy: "245",
        r: "68",
        fill: "none",
        stroke: "#FFFFFF",
        strokeWidth: "2"
      }), /*#__PURE__*/React.createElement("text", {
        x: "130",
        y: "240",
        textAnchor: "middle",
        fontFamily: "ui-sans-serif",
        fontWeight: "700",
        fontSize: "15",
        fill: "#0E0E14"
      }, "Analysis"), /*#__PURE__*/React.createElement("text", {
        x: "130",
        y: "260",
        textAnchor: "middle",
        fontFamily: "ui-sans-serif",
        fontWeight: "700",
        fontSize: "15",
        fill: "#0E0E14"
      }, "product"), /*#__PURE__*/React.createElement("circle", {
        cx: "290",
        cy: "60",
        r: "62",
        fill: "none",
        stroke: "#FFFFFF",
        strokeWidth: "2"
      }), /*#__PURE__*/React.createElement("text", {
        x: "290",
        y: "55",
        textAnchor: "middle",
        fontFamily: "ui-sans-serif",
        fontWeight: "700",
        fontSize: "14",
        fill: "#0E0E14"
      }, "Insights"), /*#__PURE__*/React.createElement("text", {
        x: "290",
        y: "75",
        textAnchor: "middle",
        fontFamily: "ui-sans-serif",
        fontWeight: "700",
        fontSize: "14",
        fill: "#0E0E14"
      }, "product"), /*#__PURE__*/React.createElement("text", {
        x: "218",
        y: "135",
        textAnchor: "middle",
        fontFamily: "ui-sans-serif",
        fontSize: "14",
        fill: "#FFFFFF"
      }, "Comparison"), /*#__PURE__*/React.createElement("text", {
        x: "218",
        y: "152",
        textAnchor: "middle",
        fontFamily: "ui-sans-serif",
        fontSize: "14",
        fill: "#FFFFFF"
      }, "Tool"))))));
    }
    if (s.kind === "cs3-why") {
      return /*#__PURE__*/React.createElement("section", {
        className: "cs3-why",
        key: i
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs3-why-grid"
      }, /*#__PURE__*/React.createElement("h2", {
        className: "cs3-why-title"
      }, s.title), /*#__PURE__*/React.createElement("div", {
        className: "cs3-why-lists"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs3-why-block"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs3-why-label"
      }, s.focusTitle), /*#__PURE__*/React.createElement("ul", null, s.focus.map((x, j) => /*#__PURE__*/React.createElement("li", {
        key: j
      }, x)))), /*#__PURE__*/React.createElement("div", {
        className: "cs3-why-block"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs3-why-label"
      }, s.resultTitle), /*#__PURE__*/React.createElement("ul", null, s.result.map((x, j) => /*#__PURE__*/React.createElement("li", {
        key: j
      }, x))))))));
    }
    if (s.kind === "cs3-challenge") {
      return /*#__PURE__*/React.createElement("section", {
        className: "cs3-challenge",
        key: i,
        "data-dark": "true"
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs3-challenge-grid"
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
        className: "cs3-challenge-title"
      }, s.title, ":"), /*#__PURE__*/React.createElement("p", {
        className: "cs3-challenge-body"
      }, s.body), /*#__PURE__*/React.createElement("div", {
        className: "cs3-challenge-models"
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "cs3-challenge-modelhead"
      }, "Old model:"), /*#__PURE__*/React.createElement("p", null, s.oldModel)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "cs3-challenge-modelhead"
      }, "New goal:"), /*#__PURE__*/React.createElement("p", null, s.newGoal)))), /*#__PURE__*/React.createElement("div", {
        className: "cs3-challenge-right"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs3-challenge-keytitle"
      }, s.keyTitle), /*#__PURE__*/React.createElement("ul", null, s.key.map((k, j) => /*#__PURE__*/React.createElement("li", {
        key: j
      }, k)))))));
    }
    if (s.kind === "cs3-feedback") {
      return /*#__PURE__*/React.createElement("section", {
        className: "cs3-feedback",
        key: i
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("h2", {
        className: "cs3-feedback-title"
      }, s.title, ":"), /*#__PURE__*/React.createElement("div", {
        className: "cs3-feedback-grid"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs3-feedback-col"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs3-feedback-label"
      }, s.triggerLabel), /*#__PURE__*/React.createElement("p", {
        className: "cs3-feedback-trigger"
      }, s.triggerBody)), /*#__PURE__*/React.createElement("div", {
        className: "cs3-feedback-col cs3-feedback-mid"
      }, /*#__PURE__*/React.createElement("p", {
        className: "cs3-feedback-insight"
      }, s.insight), /*#__PURE__*/React.createElement("div", {
        className: "cs3-feedback-bubbles"
      }, s.quotes.map((q, j) => /*#__PURE__*/React.createElement("div", {
        className: `cs3-bubble cs3-bubble-${j}`,
        key: j
      }, /*#__PURE__*/React.createElement("span", null, q), /*#__PURE__*/React.createElement("em", null, "Team"))))), /*#__PURE__*/React.createElement("div", {
        className: "cs3-feedback-col"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs3-feedback-label"
      }, s.decisionLabel), /*#__PURE__*/React.createElement("p", {
        className: "cs3-feedback-decision"
      }, s.decision)))));
    }
    if (s.kind === "cs3-introduction") {
      return /*#__PURE__*/React.createElement("section", {
        className: "cs3-introduction",
        key: i
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("h2", {
        className: "cs3-introduction-title"
      }, s.title), /*#__PURE__*/React.createElement("div", {
        className: "cs3-introduction-grid"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs3-introduction-col"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs3-introduction-brand"
      }, /*#__PURE__*/React.createElement("span", {
        className: "cs3-introduction-brand-mark"
      }, s.left.brand)), /*#__PURE__*/React.createElement("h3", null, s.left.heading), /*#__PURE__*/React.createElement("p", null, s.left.body)), /*#__PURE__*/React.createElement("div", {
        className: "cs3-introduction-col"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs3-introduction-icon"
      }, /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 60 60",
        width: "56",
        height: "56",
        fill: "none",
        stroke: "#0E0E14",
        strokeWidth: "2.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M 12 16 L 12 44 L 20 44 L 20 16 Z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M 40 16 L 40 44 L 48 44 L 48 16 Z"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "30",
        y1: "14",
        x2: "30",
        y2: "46"
      }))), /*#__PURE__*/React.createElement("h3", null, s.right.heading), /*#__PURE__*/React.createElement("p", null, s.right.body)))));
    }
    if (s.kind === "cs3-insights-cover") {
      return /*#__PURE__*/React.createElement("section", {
        className: "cs3-insights-cover",
        key: i
      }, /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement("img", {
        src: s.image,
        alt: s.title
      }), /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement("h2", null, s.title), /*#__PURE__*/React.createElement("div", {
        className: "cs3-insights-cover-desc"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs3-insights-cover-label"
      }, s.descriptionTitle), /*#__PURE__*/React.createElement("p", null, s.description)))));
    }
    if (s.kind === "cs3-manifesto") {
      return /*#__PURE__*/React.createElement("section", {
        className: "cs3-manifesto",
        key: i,
        "data-dark": "true"
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("h2", null, /*#__PURE__*/React.createElement("span", {
        className: "cs3-manifesto-white"
      }, s.white), " ", /*#__PURE__*/React.createElement("span", {
        className: "cs3-manifesto-ink"
      }, s.ink))));
    }
    if (s.kind === "team") {
      return /*#__PURE__*/React.createElement("section", {
        className: "cs-team",
        key: i
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs-team-grid"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs-team-left"
      }, /*#__PURE__*/React.createElement("h2", {
        className: "cs-team-title"
      }, s.title || "Team"), /*#__PURE__*/React.createElement("div", {
        className: "cs-team-members"
      }, s.members.map((m, j) => /*#__PURE__*/React.createElement("div", {
        className: "cs-team-member",
        key: j
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs-team-role"
      }, m.role, ":"), /*#__PURE__*/React.createElement("div", {
        className: "cs-team-name"
      }, m.name))))), /*#__PURE__*/React.createElement("div", {
        className: "cs-team-right"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs-team-myrole-title"
      }, "My role:"), /*#__PURE__*/React.createElement("div", {
        className: "cs-team-myrole-list"
      }, s.myRole.map((r, j) => /*#__PURE__*/React.createElement("div", {
        className: "cs-team-myrole",
        key: j
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs-team-myrole-verb"
      }, r.verb, ":"), /*#__PURE__*/React.createElement("div", {
        className: "cs-team-myrole-body"
      }, r.body)))), s.footer && /*#__PURE__*/React.createElement("div", {
        className: "cs-team-footer"
      }, s.footer)))));
    }
    if (s.kind === "timeline-h") {
      return /*#__PURE__*/React.createElement("section", {
        className: "cs-timeline",
        key: i
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("h2", {
        className: "cs-timeline-title"
      }, s.title), /*#__PURE__*/React.createElement("div", {
        className: "cs-timeline-track"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs-timeline-line"
      }), /*#__PURE__*/React.createElement("div", {
        className: "cs-timeline-phases"
      }, s.phases.map((p, j) => /*#__PURE__*/React.createElement("div", {
        className: "cs-timeline-phase",
        key: j
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs-timeline-phase-title"
      }, p.title), /*#__PURE__*/React.createElement("div", {
        className: "cs-timeline-dot"
      }), /*#__PURE__*/React.createElement("div", {
        className: "cs-timeline-items"
      }, p.items.map((it, k) => /*#__PURE__*/React.createElement("p", {
        key: k
      }, it)))))))));
    }
    if (s.kind === "callout-image") {
      return /*#__PURE__*/React.createElement("div", {
        className: "cs-block cs-callout-image",
        key: i
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, s.section && /*#__PURE__*/React.createElement("div", {
        className: "cs-block-section"
      }, s.section), s.title && /*#__PURE__*/React.createElement("div", {
        className: "cs-block-head"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs-block-num"
      }, "/", String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("h2", null, s.title)), s.body && /*#__PURE__*/React.createElement("p", {
        className: "cs-caption",
        style: {
          marginBottom: 32
        }
      }, s.body)), /*#__PURE__*/React.createElement("figure", {
        className: "cs-image-frame"
      }, /*#__PURE__*/React.createElement("img", {
        src: s.image,
        alt: s.title || ""
      }), s.callout && /*#__PURE__*/React.createElement("div", {
        className: "cs-image-callout"
      }, s.callout)));
    }
    if (s.kind === "discovery-text") {
      return /*#__PURE__*/React.createElement("section", {
        className: "cs-discovery-text",
        key: i
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, s.slack && /*#__PURE__*/React.createElement("div", {
        className: "cs-slack"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs-slack-channel"
      }, "# ", s.slack.channel), /*#__PURE__*/React.createElement("div", {
        className: "cs-slack-row"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs-slack-avatar"
      }), /*#__PURE__*/React.createElement("div", {
        className: "cs-slack-body"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs-slack-meta"
      }, /*#__PURE__*/React.createElement("span", {
        className: "cs-slack-author"
      }, s.slack.author), /*#__PURE__*/React.createElement("span", {
        className: "cs-slack-time"
      }, s.slack.time)), /*#__PURE__*/React.createElement("p", {
        className: "cs-slack-msg"
      }, s.slack.message), /*#__PURE__*/React.createElement("div", {
        className: "cs-slack-reactions"
      }, s.slack.reactions.map((r, k) => /*#__PURE__*/React.createElement("span", {
        className: "cs-slack-reaction",
        key: k
      }, r)))))), /*#__PURE__*/React.createElement("div", {
        className: "cs-discovery-grid"
      }, /*#__PURE__*/React.createElement("div", null, s.section && /*#__PURE__*/React.createElement("div", {
        className: "cs-discovery-section"
      }, s.section), /*#__PURE__*/React.createElement("h2", {
        className: "cs-discovery-title"
      }, s.title), /*#__PURE__*/React.createElement("p", {
        className: "cs-discovery-body"
      }, s.body)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "cs-discovery-output-title"
      }, s.outputTitle || "Output", ":"), /*#__PURE__*/React.createElement("ul", {
        className: "cs-discovery-output"
      }, s.output.map((o, k) => /*#__PURE__*/React.createElement("li", {
        key: k
      }, o)))))));
    }
    if (s.kind === "usecases-3") {
      return /*#__PURE__*/React.createElement("section", {
        className: "cs-usecases",
        key: i
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, s.section && /*#__PURE__*/React.createElement("div", {
        className: "cs-discovery-section"
      }, s.section), /*#__PURE__*/React.createElement("h2", {
        className: "cs-discovery-title"
      }, s.title), s.intro && /*#__PURE__*/React.createElement("p", {
        className: "cs-discovery-body"
      }, s.intro), /*#__PURE__*/React.createElement("div", {
        className: "cs-usecase-grid"
      }, s.cases.map((c, j) => /*#__PURE__*/React.createElement("div", {
        className: "cs-usecase-card",
        key: j
      }, /*#__PURE__*/React.createElement("h3", null, c.title), c.body && /*#__PURE__*/React.createElement("p", {
        className: "cs-usecase-body"
      }, c.body), /*#__PURE__*/React.createElement("p", {
        className: "cs-usecase-use"
      }, /*#__PURE__*/React.createElement("strong", null, "Use case:"), " ", c.useCase))))));
    }
    if (s.kind === "validation-decision") {
      return /*#__PURE__*/React.createElement("section", {
        className: "cs-validation",
        key: i
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs-validation-grid"
      }, /*#__PURE__*/React.createElement("figure", {
        className: "cs-validation-img"
      }, /*#__PURE__*/React.createElement("img", {
        src: s.image,
        alt: s.title || ""
      })), /*#__PURE__*/React.createElement("div", null, s.section && /*#__PURE__*/React.createElement("div", {
        className: "cs-discovery-section"
      }, s.section), /*#__PURE__*/React.createElement("h2", {
        className: "cs-validation-title"
      }, s.title), /*#__PURE__*/React.createElement("ul", {
        className: "cs-validation-steps"
      }, s.steps.map((step, k) => /*#__PURE__*/React.createElement("li", {
        key: k
      }, step))), s.outputTitle && /*#__PURE__*/React.createElement("div", {
        className: "cs-discovery-output-title"
      }, s.outputTitle, ":"), s.decision && /*#__PURE__*/React.createElement("p", {
        className: "cs-validation-decision"
      }, s.decision)))));
    }
    if (s.kind === "section-cover") {
      return /*#__PURE__*/React.createElement("section", {
        className: "cs-section-cover",
        key: i
      }, /*#__PURE__*/React.createElement("figure", {
        className: "cs-section-cover-img"
      }, /*#__PURE__*/React.createElement("img", {
        src: s.image,
        alt: s.title
      }), /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement("h2", null, s.title), s.subtitle && /*#__PURE__*/React.createElement("p", null, s.subtitle))));
    }
    if (s.kind === "design-change") {
      return /*#__PURE__*/React.createElement("section", {
        className: "cs-designchange",
        key: i
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs-designchange-grid"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs-designchange-text"
      }, s.section && /*#__PURE__*/React.createElement("div", {
        className: "cs-discovery-section"
      }, s.section, ":"), s.title && /*#__PURE__*/React.createElement("h2", {
        className: "cs-designchange-title"
      }, s.title), s.body && s.body.map((p, k) => /*#__PURE__*/React.createElement("p", {
        key: k
      }, p))), /*#__PURE__*/React.createElement("figure", {
        className: "cs-designchange-img"
      }, /*#__PURE__*/React.createElement("img", {
        src: s.image,
        alt: s.title || ""
      })))));
    }
    if (s.kind === "summary-table") {
      return /*#__PURE__*/React.createElement("section", {
        className: "cs-summary",
        key: i,
        "data-dark": "true"
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("h2", {
        className: "cs-summary-title"
      }, s.title), /*#__PURE__*/React.createElement("table", {
        className: "cs-summary-table"
      }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, s.columns.map((c, k) => /*#__PURE__*/React.createElement("th", {
        key: k
      }, c)))), /*#__PURE__*/React.createElement("tbody", null, s.rows.map((r, j) => /*#__PURE__*/React.createElement("tr", {
        key: j
      }, r.map((cell, k) => /*#__PURE__*/React.createElement("td", {
        key: k,
        "data-col": k
      }, cell))))))));
    }
    if (s.kind === "results-band") {
      return /*#__PURE__*/React.createElement("section", {
        className: "cs-resultsband",
        key: i,
        "data-dark": "true"
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("h2", {
        className: "cs-resultsband-title"
      }, s.title), /*#__PURE__*/React.createElement("div", {
        className: "cs-resultsband-grid"
      }, s.stats.map((stat, k) => /*#__PURE__*/React.createElement("p", {
        key: k,
        className: "cs-resultsband-stat"
      }, /*#__PURE__*/React.createElement("span", {
        className: "cs-resultsband-value"
      }, stat.value), /*#__PURE__*/React.createElement("span", {
        className: "cs-resultsband-label"
      }, stat.label)))), s.footer && /*#__PURE__*/React.createElement("p", {
        className: "cs-resultsband-footer"
      }, s.footer), s.chart && /*#__PURE__*/React.createElement("figure", {
        className: "cs-resultsband-chart"
      }, /*#__PURE__*/React.createElement("img", {
        src: s.chart,
        alt: "Adoption chart"
      })), /*#__PURE__*/React.createElement("p", {
        className: "cs-results-nda"
      }, "For confidentiality reasons, the metrics shown here are representative simulations based on the project's outcome. Real product and business performance data cannot be disclosed due to NDA restrictions.")));
    }
    if (s.kind === "takeaways") {
      return /*#__PURE__*/React.createElement("section", {
        className: "cs-takeaways",
        key: i,
        "data-dark": "true"
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs-takeaways-grid"
      }, /*#__PURE__*/React.createElement("h2", {
        className: "cs-takeaways-title"
      }, s.title), /*#__PURE__*/React.createElement("div", {
        className: "cs-takeaways-list"
      }, s.items.map((it, k) => /*#__PURE__*/React.createElement("p", {
        key: k,
        className: "cs-takeaway"
      }, /*#__PURE__*/React.createElement("strong", null, it.lead), " ", it.body))))));
    }
    if (s.kind === "challenge") {
      return /*#__PURE__*/React.createElement("section", {
        className: "cs-challenge",
        key: i,
        "data-dark": "true"
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs-challenge-title"
      }, s.title, ":"), /*#__PURE__*/React.createElement("p", {
        className: "cs-challenge-body"
      }, s.body), s.quote && /*#__PURE__*/React.createElement("div", {
        className: "cs-challenge-quote"
      }, /*#__PURE__*/React.createElement("span", {
        className: "cs-q-mark"
      }, "\u201C"), /*#__PURE__*/React.createElement("p", null, s.quote, /*#__PURE__*/React.createElement("span", {
        className: "cs-q-mark-end"
      }, "\u201D")), s.quoteAttribution && /*#__PURE__*/React.createElement("div", {
        className: "cs-q-attr"
      }, s.quoteAttribution))));
    }
    if (s.kind === "impact") {
      return /*#__PURE__*/React.createElement("section", {
        className: "cs-challenge",
        key: i,
        "data-dark": "true"
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("p", {
        className: "cs-impact-body"
      }, s.body), s.attribution && /*#__PURE__*/React.createElement("div", {
        className: "cs-q-attr"
      }, s.attribution)));
    }
    if (s.kind === "overview") {
      return /*#__PURE__*/React.createElement("section", {
        className: "cs-overview",
        key: i
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs-overview-label"
      }, s.title), /*#__PURE__*/React.createElement("p", {
        className: "cs-overview-body"
      }, s.body), s.brand && /*#__PURE__*/React.createElement("div", {
        className: "cs-overview-brand"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs-overview-brand-name"
      }, s.brand), s.brandLine && /*#__PURE__*/React.createElement("p", {
        className: "cs-overview-brand-line"
      }, s.brandLine))));
    }
    if (s.kind === "goal") {
      return /*#__PURE__*/React.createElement("section", {
        className: "proj-section cs-goal-section",
        key: i
      }, /*#__PURE__*/React.createElement("h2", null, s.title), /*#__PURE__*/React.createElement("div", {
        className: "body"
      }, /*#__PURE__*/React.createElement("p", {
        className: "cs-goal"
      }, s.body), s.meta && /*#__PURE__*/React.createElement("div", {
        className: "cs-goal-meta"
      }, s.meta.map((m, j) => /*#__PURE__*/React.createElement("div", {
        className: "cs-goal-meta-cell",
        key: j
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs-goal-meta-label"
      }, m.label), /*#__PURE__*/React.createElement("div", {
        className: "cs-goal-meta-value"
      }, m.value))))));
    }
    if (s.kind === "outcome") {
      return /*#__PURE__*/React.createElement("section", {
        className: "cs-outcome",
        key: i,
        "data-dark": "true"
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs-outcome-label"
      }, "\u2661 ", s.title), /*#__PURE__*/React.createElement("h2", {
        className: "cs-outcome-headline"
      }, s.headline), s.body && /*#__PURE__*/React.createElement("p", {
        className: "cs-outcome-body"
      }, s.body)));
    }
    if (s.kind === "process") {
      return /*#__PURE__*/React.createElement("section", {
        className: "cs-process",
        key: i
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs-block-head"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs-block-num"
      }, "/", String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("h2", null, s.title)), /*#__PURE__*/React.createElement("div", {
        className: "cs-process-grid"
      }, s.steps.map((step, j) => /*#__PURE__*/React.createElement("div", {
        className: "cs-process-step",
        key: j
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs-process-num"
      }, j + 1, /*#__PURE__*/React.createElement("span", null, ".")), /*#__PURE__*/React.createElement("h3", null, step.title), step.notes.map((n, k) => /*#__PURE__*/React.createElement("p", {
        key: k
      }, n)))))));
    }
    if (s.kind === "stat") {
      return /*#__PURE__*/React.createElement("section", {
        className: "cs-stat",
        key: i,
        "data-dark": "true"
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs-stat-body"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cs-stat-tag"
      }, s.title), /*#__PURE__*/React.createElement("div", {
        className: "cs-stat-headline"
      }, "Account opening time reduced from", " ", /*#__PURE__*/React.createElement("span", {
        className: "cs-stat-from"
      }, s.value), " to", " ", /*#__PURE__*/React.createElement("span", {
        className: "cs-stat-to"
      }, s.valueAfter), "."), s.label && /*#__PURE__*/React.createElement("div", {
        className: "cs-stat-foot"
      }, s.label))));
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "cs-block",
      key: i,
      style: {
        ...(s.marginTop !== undefined ? {
          marginTop: s.marginTop
        } : {}),
        ...(s.marginBottom !== undefined ? {
          marginBottom: s.marginBottom
        } : {})
      }
    }, s.title && /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cs-block-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cs-block-num"
    }, "/", String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("h2", null, s.title))), /*#__PURE__*/React.createElement("figure", {
      className: "cs-image-frame"
    }, /*#__PURE__*/React.createElement("img", {
      src: s.image,
      alt: s.title || ""
    })), s.caption && /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("p", {
      className: "cs-caption"
    }, s.caption)));
  }), project.myRole && /*#__PURE__*/React.createElement("section", {
    className: "cs-myrole",
    "data-dark": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, "/MY ROLE"), /*#__PURE__*/React.createElement("h2", null, project.myRoleTitle || "My role")), project.myRoleIntro && /*#__PURE__*/React.createElement("p", {
    className: "cs-myrole-intro"
  }, project.myRoleIntro), /*#__PURE__*/React.createElement("div", {
    className: "cs-myrole-grid"
  }, project.myRole.map((r, i) => /*#__PURE__*/React.createElement("div", {
    className: "cs-myrole-card",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-myrole-num"
  }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("h3", null, r.title), /*#__PURE__*/React.createElement("p", null, r.body)))))), project.headlineStat && /*#__PURE__*/React.createElement("section", {
    className: "cs-stat",
    "data-dark": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-stat-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-stat-tag"
  }, "Headline impact"), /*#__PURE__*/React.createElement("div", {
    className: "cs-stat-headline"
  }, "Account opening time reduced from", " ", /*#__PURE__*/React.createElement("span", {
    className: "cs-stat-from"
  }, project.headlineStat.from), " ", "to", " ", /*#__PURE__*/React.createElement("span", {
    className: "cs-stat-to"
  }, project.headlineStat.to), "."), project.headlineStat.label && /*#__PURE__*/React.createElement("div", {
    className: "cs-stat-foot"
  }, project.headlineStat.label)))), project.results && /*#__PURE__*/React.createElement("section", {
    className: "cs-results"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, "/RESULTS"), /*#__PURE__*/React.createElement("h2", null, "Design metrics improved")), /*#__PURE__*/React.createElement("div", {
    className: "cs-results-grid"
  }, project.results.map((r, i) => /*#__PURE__*/React.createElement("div", {
    className: "cs-result-card",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-result-value"
  }, r.value), /*#__PURE__*/React.createElement("div", {
    className: "cs-result-label"
  }, r.label), r.note && /*#__PURE__*/React.createElement("div", {
    className: "cs-result-note"
  }, r.note)))), /*#__PURE__*/React.createElement("p", {
    className: "cs-results-nda"
  }, "For confidentiality reasons, the metrics shown here are representative simulations based on the project's outcome. Real product and business performance data cannot be disclosed due to NDA restrictions."))), project.projected && /*#__PURE__*/React.createElement("section", {
    className: "cs-projected",
    "data-dark": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-projected-head"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "cs-projected-title"
  }, project.projected.title), /*#__PURE__*/React.createElement("div", {
    className: "cs-projected-stats"
  }, project.projected.stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    className: "cs-projected-stat",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-projected-value"
  }, s.value), /*#__PURE__*/React.createElement("p", {
    className: "cs-projected-label"
  }, s.label))))), project.projected.quote && /*#__PURE__*/React.createElement("blockquote", {
    className: "cs-projected-quote"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cs-q-mark"
  }, "\u201C"), /*#__PURE__*/React.createElement("p", null, project.projected.quote, /*#__PURE__*/React.createElement("span", {
    className: "cs-q-mark-end"
  }, "\u201D")), project.projected.quoteAttribution && /*#__PURE__*/React.createElement("cite", {
    className: "cs-projected-attr"
  }, project.projected.quoteAttribution)))), project.tools && /*#__PURE__*/React.createElement("section", {
    className: "proj-section"
  }, /*#__PURE__*/React.createElement("h2", null, "Tools"), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "proj-tools"
  }, project.tools.map(t => /*#__PURE__*/React.createElement("span", {
    className: "proj-tool",
    key: t
  }, t))), /*#__PURE__*/React.createElement("a", {
    className: "proj-cta",
    href: "#/contact",
    "data-cursor": "WRITE",
    style: {
      marginTop: 40
    }
  }, "Discuss this project \u2192"))));
}

/* Banking-style structured body (Bankinter old / Santander / Automotive) */
function StructuredBody({
  project
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "proj-section"
  }, /*#__PURE__*/React.createElement("h2", null, project.sectionsTitle || "Role"), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, project.sectionsIntro && /*#__PURE__*/React.createElement("p", null, project.sectionsIntro), /*#__PURE__*/React.createElement("ul", {
    className: "proj-list"
  }, project.responsibilities.map((r, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, r))))), project.productAreas && /*#__PURE__*/React.createElement("section", {
    className: "proj-section"
  }, /*#__PURE__*/React.createElement("h2", null, "Product areas"), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "proj-areas"
  }, project.productAreas.map((a, i) => /*#__PURE__*/React.createElement("div", {
    className: "proj-area",
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
    className: "name"
  }, a)))))), project.seniorHighlight && /*#__PURE__*/React.createElement("section", {
    className: "proj-section"
  }, /*#__PURE__*/React.createElement("h2", null, "Senior highlight"), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "proj-pullquote"
  }, project.seniorHighlight))), project.tools && /*#__PURE__*/React.createElement("section", {
    className: "proj-section"
  }, /*#__PURE__*/React.createElement("h2", null, "Tools"), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "proj-tools"
  }, project.tools.map(t => /*#__PURE__*/React.createElement("span", {
    className: "proj-tool",
    key: t
  }, t))), /*#__PURE__*/React.createElement("a", {
    className: "proj-cta",
    href: "#/contact",
    "data-cursor": "WRITE",
    style: {
      marginTop: 40
    }
  }, "Discuss this project \u2192"))));
}

/* Original prose body (Fintech / AI workflow / etc) */
function ProseBody({
  project
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, project.problem && /*#__PURE__*/React.createElement("section", {
    className: "proj-section"
  }, /*#__PURE__*/React.createElement("h2", null, "The problem"), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("p", null, project.problem))), /*#__PURE__*/React.createElement("figure", {
    className: "proj-img-full"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--cream-2)",
      display: "grid",
      placeItems: "center",
      fontFamily: "var(--mono)",
      fontSize: "0.85rem",
      color: "var(--muted)",
      letterSpacing: "0.1em"
    }
  }, "PROCESS \xB7 2 / 4")), project.approach && /*#__PURE__*/React.createElement("section", {
    className: "proj-section"
  }, /*#__PURE__*/React.createElement("h2", null, "Approach"), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("p", null, project.approach))), /*#__PURE__*/React.createElement("figure", {
    className: "proj-img-full"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--ink)",
      color: "var(--bg)",
      display: "grid",
      placeItems: "center",
      fontFamily: "var(--mono)",
      fontSize: "0.85rem",
      letterSpacing: "0.1em",
      opacity: 0.95
    }
  }, "FINAL DESIGN \xB7 3 / 4")), project.outcome && /*#__PURE__*/React.createElement("section", {
    className: "proj-section"
  }, /*#__PURE__*/React.createElement("h2", null, "Outcome"), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("p", null, project.outcome), /*#__PURE__*/React.createElement("a", {
    className: "proj-cta",
    href: "#/contact",
    "data-cursor": "WRITE"
  }, "Discuss this project \u2192"))));
}
window.ProjectPage = ProjectPage;
function ProjectGate({
  project,
  onUnlock
}) {
  const [pw, setPw] = React.useState("");
  const [err, setErr] = React.useState("");
  const submit = e => {
    e.preventDefault();
    if (pw.trim().length === 0) {
      setErr("Enter a password to continue.");
      return;
    }
    // Mock gate — any non-empty password unlocks.
    onUnlock();
  };
  return /*#__PURE__*/React.createElement("main", {
    className: "page-fade gate"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gate-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, "\u2301"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--mono)",
      fontSize: "0.78rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--muted)",
      marginBottom: 16
    }
  }, project.client, " \xB7 ", project.industry), /*#__PURE__*/React.createElement("h2", null, project.title), /*#__PURE__*/React.createElement("p", null, "This case study contains client-confidential material. Drop the password I shared with you to unlock the full study."), /*#__PURE__*/React.createElement("form", {
    className: "gate-form",
    onSubmit: submit
  }, /*#__PURE__*/React.createElement("input", {
    type: "password",
    placeholder: "Password",
    value: pw,
    onChange: e => {
      setPw(e.target.value);
      setErr("");
    },
    autoFocus: true
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    "data-cursor": "UNLOCK"
  }, "Unlock \u2192")), err && /*#__PURE__*/React.createElement("div", {
    className: "gate-error"
  }, err), /*#__PURE__*/React.createElement("div", {
    className: "gate-hint"
  }, "No password? Email natallia.hantsuk@gmail.com"), /*#__PURE__*/React.createElement("a", {
    href: "#/portfolio",
    style: {
      marginTop: 32,
      display: "inline-block",
      fontFamily: "var(--mono)",
      fontSize: "0.78rem",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "var(--muted)",
      textDecoration: "underline"
    }
  }, "\u2190 Back to work")));
}