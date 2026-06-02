/* global React, ReactDOM, PROJECTS */
const {
  useState,
  useEffect,
  useRef,
  useMemo
} = React;

/* ---------- Hash router ---------- */
function useRoute() {
  const [hash, setHash] = useState(() => window.location.hash || "#/");
  useEffect(() => {
    const onHash = () => {
      setHash(window.location.hash || "#/");
      window.scrollTo({
        top: 0,
        behavior: "instant"
      });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return hash;
}
function nav(to) {
  window.location.hash = to;
}

/* ---------- Lisbon time ---------- */
function useLisbonTime() {
  const [time, setTime] = useState(() => formatLisbon());
  useEffect(() => {
    const id = setInterval(() => setTime(formatLisbon()), 1000 * 30);
    return () => clearInterval(id);
  }, []);
  return time;
}
function formatLisbon() {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Lisbon",
      hour12: false
    }).format(new Date());
  } catch (e) {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  }
}

/* ---------- Cursor ---------- */
function CustomCursor({
  enabled
}) {
  const dotRef = useRef(null);
  const pillRef = useRef(null);
  const [pillText, setPillText] = useState("KNOW MORE");
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    let x = window.innerWidth / 2,
      y = window.innerHeight / 2;
    let dx = x,
      dy = y,
      px = x,
      py = y;
    let raf;
    const move = e => {
      x = e.clientX;
      y = e.clientY;
    };
    const tick = () => {
      dx += (x - dx) * 0.5;
      dy += (y - dy) * 0.5;
      px += (x - px) * 0.18;
      py += (y - py) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
      if (pillRef.current) pillRef.current.style.transform = `translate(${px}px, ${py}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", move);
    const handleOver = e => {
      const t = e.target.closest("[data-cursor]");
      if (t) {
        setShow(true);
        setPillText(t.getAttribute("data-cursor") || "KNOW MORE");
      } else {
        setShow(false);
      }
    };
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOver);
    };
  }, [enabled]);
  if (!enabled) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "cursor-dot",
    ref: dotRef,
    "data-hide": show ? "true" : "false"
  }), /*#__PURE__*/React.createElement("div", {
    className: "cursor-pill",
    ref: pillRef,
    "data-show": show ? "true" : "false"
  }, pillText));
}

/* ---------- Top bar ---------- */
function TopBar({
  textSize,
  setTextSize
}) {
  const time = useLisbonTime();
  return /*#__PURE__*/React.createElement("div", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("a", {
    className: "cv-pill",
    href: __r("assets/Natallia-Hantsuk-CV.pdf"),
    download: "Natallia-Hantsuk-CV.pdf",
    "data-cursor": "DOWNLOAD"
  }, /*#__PURE__*/React.createElement("span", null, "CV"), /*#__PURE__*/React.createElement("span", {
    className: "arrow"
  }, "\u2193")), /*#__PURE__*/React.createElement("div", {
    className: "top-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-size",
    role: "group",
    "aria-label": "Text size"
  }, [{
    k: "sm",
    label: "A",
    s: 0.85
  }, {
    k: "md",
    label: "A",
    s: 1
  }, {
    k: "lg",
    label: "A",
    s: 1.15
  }].map(opt => /*#__PURE__*/React.createElement("button", {
    key: opt.k,
    "data-active": textSize === opt.k,
    onClick: () => setTextSize(opt.k),
    style: {
      fontSize: opt.k === "sm" ? "0.7rem" : opt.k === "md" ? "0.85rem" : "1rem"
    },
    "aria-label": `Text size ${opt.k}`
  }, "A"))), /*#__PURE__*/React.createElement("div", {
    className: "lisbon"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", null, "Lisbon \xB7 ", time))));
}
function NavBar({
  route
}) {
  const items = [{
    href: "#/",
    label: "Home"
  }, {
    href: "#/portfolio",
    label: "Work"
  }, {
    href: "#/contact",
    label: "Contact"
  }];

  // Detect when the floating bar crosses a dark surface and invert.
  useEffect(() => {
    let raf;
    const tick = () => {
      const probeY = 50; // approx center of nav/topbar row
      const els = document.elementsFromPoint(window.innerWidth / 2, probeY);
      const right = document.elementsFromPoint(window.innerWidth - 80, probeY);
      const left = document.elementsFromPoint(80, probeY);
      const all = [...els, ...right, ...left];
      const onDark = all.some(el => el.closest && el.closest("[data-dark]"));
      document.documentElement.dataset.navInverted = onDark ? "true" : "false";
      raf = null;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [route]);
  return /*#__PURE__*/React.createElement("nav", {
    className: "nav"
  }, items.map(it => {
    const active = it.href === "#/" && route === "#/" || it.href !== "#/" && route.startsWith(it.href);
    return /*#__PURE__*/React.createElement("a", {
      key: it.href,
      href: it.href,
      className: active ? "active" : "",
      "data-cursor": "GO"
    }, it.label);
  }));
}
function downloadCV() {
  const a = document.createElement("a");
  a.href = __r("assets/Natallia-Hantsuk-CV.pdf");
  a.download = "Natallia-Hantsuk-CV.pdf";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
window.useRoute = useRoute;
window.nav = nav;
window.TopBar = TopBar;
window.NavBar = NavBar;
window.CustomCursor = CustomCursor;