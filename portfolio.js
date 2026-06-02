/* global React, PROJECTS, ProjectThumb */
const {
  useState: useState_w,
  useEffect: useEffect_w
} = React;

/* ============================================================
   PORTFOLIO — gate + grid
   ============================================================ */
function PortfolioPage() {
  const [unlocked, setUnlocked] = useState_w(() => sessionStorage.getItem("portfolio_unlocked") === "1");
  if (!unlocked) {
    return /*#__PURE__*/React.createElement(Gate, {
      onUnlock: () => {
        sessionStorage.setItem("portfolio_unlocked", "1");
        setUnlocked(true);
      }
    });
  }
  return /*#__PURE__*/React.createElement(PortfolioGrid, null);
}
function Gate({
  onUnlock
}) {
  const [pw, setPw] = useState_w("");
  const [err, setErr] = useState_w("");
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
  }, "\u2301"), /*#__PURE__*/React.createElement("h2", null, "Protected work."), /*#__PURE__*/React.createElement("p", null, "Some of my work is under NDA. Drop the password I shared with you and you'll see the full case studies."), /*#__PURE__*/React.createElement("form", {
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
  }, "Enter \u2192")), err && /*#__PURE__*/React.createElement("div", {
    className: "gate-error"
  }, err), /*#__PURE__*/React.createElement("div", {
    className: "gate-hint"
  }, "No password? Email natallia.hantsuk@gmail.com")));
}
function PortfolioGrid() {
  return /*#__PURE__*/React.createElement("main", {
    className: "page-fade"
  }, /*#__PURE__*/React.createElement("header", {
    className: "portfolio-head container"
  }, /*#__PURE__*/React.createElement("h1", null, "Selected", /*#__PURE__*/React.createElement("br", null), "work"), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, /*#__PURE__*/React.createElement("span", null, PROJECTS.length, " projects"), /*#__PURE__*/React.createElement("span", null, "Filter \xB7 All"))), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "work-grid"
  }, (() => {
    const order = ["nplan-comparison-case-study", "nplan-comparison-tool", "nplan-driving-path", "bankinter-onboarding", "bankinter-bkwallet", "santander-minors", "automotive-hmi", "santander", "bankinter"];
    const byId = Object.fromEntries(PROJECTS.map(p => [p.id, p]));
    return order.map(id => byId[id]).filter(Boolean);
  })().map(p => /*#__PURE__*/React.createElement("a", {
    className: "work-card",
    href: `#/project/${p.id}`,
    key: p.id,
    "data-cursor": "KNOW MORE"
  }, /*#__PURE__*/React.createElement("div", {
    className: "work-thumb"
  }, /*#__PURE__*/React.createElement(ProjectThumb, {
    project: p
  })), /*#__PURE__*/React.createElement("div", {
    className: "work-info"
  }, /*#__PURE__*/React.createElement("h3", null, p.title), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, p.industry)))))));
}
window.PortfolioPage = PortfolioPage;