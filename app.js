/* global React, ReactDOM, useRoute, TopBar, NavBar, CustomCursor, HomePage, PortfolioPage, ProjectPage, ContactPage, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle */
const {
  useState: useState_a,
  useEffect: useEffect_a
} = React;
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "cream",
  "cursor": true,
  "hero_quote_speed": 0.6,
  "grid_columns": 3,
  "show_tweaks": true
} /*EDITMODE-END*/;
function App() {
  const route = useRoute();
  const [textSize, setTextSize] = useState_a(() => localStorage.getItem("text_size") || "md");
  const [t, setTweak] = typeof useTweaks === "function" ? useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];
  useEffect_a(() => {
    localStorage.setItem("text_size", textSize);
    const map = {
      sm: "16px",
      md: "18px",
      lg: "20.5px"
    };
    document.documentElement.style.setProperty("--base-size", map[textSize]);
  }, [textSize]);
  useEffect_a(() => {
    document.documentElement.dataset.theme = t.theme === "cream" ? "" : t.theme;
  }, [t.theme]);
  useEffect_a(() => {
    document.documentElement.style.setProperty("--grid-cols", t.grid_columns);
  }, [t.grid_columns]);

  // Route resolution
  let page;
  if (route === "#/" || route === "" || route === "#") {
    page = /*#__PURE__*/React.createElement(HomePage, null);
  } else if (route === "#/portfolio") {
    page = /*#__PURE__*/React.createElement(PortfolioPage, null);
  } else if (route.startsWith("#/project/")) {
    const id = route.replace("#/project/", "");
    page = /*#__PURE__*/React.createElement(ProjectPage, {
      id: id
    });
  } else if (route === "#/contact") {
    page = /*#__PURE__*/React.createElement(ContactPage, null);
  } else {
    page = /*#__PURE__*/React.createElement(HomePage, null);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CustomCursor, {
    enabled: t.cursor
  }), /*#__PURE__*/React.createElement(TopBar, {
    textSize: textSize,
    setTextSize: setTextSize
  }), /*#__PURE__*/React.createElement(NavBar, {
    route: route
  }), /*#__PURE__*/React.createElement("div", {
    key: route
  }, page), typeof TweaksPanel !== "undefined" && /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Theme"
  }, /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Palette",
    value: t.theme,
    onChange: v => setTweak("theme", v),
    options: ["cream", "mono", "dark"]
  })), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Interaction"
  }, /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Custom cursor",
    value: t.cursor,
    onChange: v => setTweak("cursor", v)
  })), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Portfolio grid"
  }, /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Columns",
    value: String(t.grid_columns),
    onChange: v => {
      setTweak("grid_columns", parseInt(v, 10));
      const grid = document.querySelector(".work-grid");
      if (grid) grid.style.gridTemplateColumns = `repeat(${v}, 1fr)`;
    },
    options: ["2", "3", "4"]
  }))));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));

/* Hide the boot splash once the app has mounted + first paint settled */
(function hideBoot() {
  const root = document.getElementById("root");
  if (root) root.style.opacity = "1";
  const boot = document.getElementById("boot");
  if (!boot) return;
  const done = () => {
    boot.classList.add("boot-done");
    setTimeout(() => boot.remove(), 700);
  };
  if (document.fonts && document.fonts.ready) {
    Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 1500))]).then(done);
  } else {
    setTimeout(done, 400);
  }
})();