/* global React */
const {
  useState: useState_c
} = React;

/* ============================================================
   CONTACT
   ============================================================ */
function ContactPage() {
  const [data, setData] = useState_c({
    name: "",
    email: "",
    company: "",
    subject: "Hello",
    message: ""
  });
  const [status, setStatus] = useState_c("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState_c("");

  /* Web3Forms — replace YOUR_ACCESS_KEY_HERE with the key from web3forms.com.
     Sign up free at https://web3forms.com using natallia.hantsuk@gmail.com,
     then paste the access key into the WEB3FORMS_KEY constant below. */
  const WEB3FORMS_KEY = "YOUR_ACCESS_KEY_HERE";
  const submit = async e => {
    e.preventDefault();
    if (!data.name.trim() || !data.email.trim() || !data.message.trim()) return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          from_name: data.name,
          email: data.email,
          subject: `[Portfolio] ${data.subject}: ${data.name}`,
          company: data.company || "—",
          message: data.message
          // optional: cc, reply-to, etc.
        })
      });
      const result = await res.json();
      if (result.success) {
        setStatus("sent");
      } else {
        setStatus("error");
        setErrorMsg(result.message || "Something went wrong. Please email natallia.hantsuk@gmail.com directly.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Couldn't reach the form service. Please email natallia.hantsuk@gmail.com directly.");
    }
  };
  const set = k => e => setData({
    ...data,
    [k]: e.target.value
  });
  return /*#__PURE__*/React.createElement("main", {
    className: "page-fade contact"
  }, /*#__PURE__*/React.createElement(LisbonScene, null), /*#__PURE__*/React.createElement("div", {
    className: "contact-form-wrap"
  }, /*#__PURE__*/React.createElement("h2", null, "Let's talk."), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "Senior IC, lead, or team lead. Lisbon-based, open to hybrid in EU and remote-first roles. I read every message."), status !== "sent" ? /*#__PURE__*/React.createElement("form", {
    className: "contact-form",
    onSubmit: submit
  }, /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Your name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: data.name,
    onChange: set("name"),
    placeholder: "",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: data.email,
    onChange: set("email"),
    placeholder: "",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Company (optional)"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: data.company,
    onChange: set("company"),
    placeholder: "\u2014"
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "What's this about?"), /*#__PURE__*/React.createElement("select", {
    value: data.subject,
    onChange: set("subject")
  }, /*#__PURE__*/React.createElement("option", null, "A senior product role"), /*#__PURE__*/React.createElement("option", null, "A team-lead role"), /*#__PURE__*/React.createElement("option", null, "Project / consultancy"), /*#__PURE__*/React.createElement("option", null, "Mentorship or chat"), /*#__PURE__*/React.createElement("option", null, "Hello"))), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Message"), /*#__PURE__*/React.createElement("textarea", {
    rows: "3",
    value: data.message,
    onChange: set("message"),
    placeholder: "Tell me a little about the team and the work\u2026",
    required: true
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "contact-submit",
    disabled: status === "sending",
    "data-cursor": "SEND"
  }, status === "sending" ? "Sending…" : /*#__PURE__*/React.createElement(React.Fragment, null, "Send ", /*#__PURE__*/React.createElement("span", null, "\u2192"))), status === "error" && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      color: "#c0392b",
      fontSize: "0.95rem"
    }
  }, errorMsg)) : /*#__PURE__*/React.createElement("div", {
    className: "contact-success"
  }, /*#__PURE__*/React.createElement("strong", null, "Message sent successfully."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12,
      color: "var(--muted)"
    }
  }, "Thank you for getting in touch. I'll review your message and respond soon."))));
}

/* Stylized Lisbon scene — typographic + soft gradient instead of stock photo */
function LisbonScene() {
  return /*#__PURE__*/React.createElement("div", {
    className: "contact-image"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lisbon-label"
  }, "\u25CF 38.7223\xB0 N \xB7 9.1393\xB0 W"), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 800 1000",
    preserveAspectRatio: "xMidYMax slice",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "600",
    cy: "280",
    r: "140",
    fill: "#F6EFDD",
    opacity: "0.55"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "600",
    cy: "280",
    r: "80",
    fill: "#F6EFDD",
    opacity: "0.45"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 720 Q 200 700 400 730 T 800 720 L 800 1000 L 0 1000 Z",
    fill: "#1F1820",
    opacity: "0.35"
  }), /*#__PURE__*/React.createElement("g", {
    fill: "#1F1820",
    opacity: "0.85"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "640",
    width: "80",
    height: "360"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "80",
    y: "600",
    width: "60",
    height: "400"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "80,600 110,575 140,600"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "140",
    y: "660",
    width: "70",
    height: "340"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "210",
    y: "610",
    width: "90",
    height: "390"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "210,610 255,580 300,610"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "300",
    y: "650",
    width: "60",
    height: "350"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "360",
    y: "590",
    width: "100",
    height: "410"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "460",
    y: "660",
    width: "70",
    height: "340"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "460,660 495,625 530,660"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "530",
    y: "620",
    width: "90",
    height: "380"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "620",
    y: "670",
    width: "60",
    height: "330"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "680",
    y: "640",
    width: "120",
    height: "360"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "680,640 720,605 760,640"
  })), /*#__PURE__*/React.createElement("g", {
    fill: "#E96A3A",
    opacity: "0.7"
  }, Array.from({
    length: 30
  }).map((_, i) => /*#__PURE__*/React.createElement("rect", {
    key: i,
    x: 20 + i * 27 % 760,
    y: 680 + i * 53 % 220,
    width: "4",
    height: "6"
  }))), /*#__PURE__*/React.createElement("g", {
    fill: "#F6EFDD",
    opacity: "0.07"
  }, Array.from({
    length: 8
  }).map((_, i) => /*#__PURE__*/React.createElement("rect", {
    key: i,
    x: i * 100,
    y: 960,
    width: "80",
    height: "40"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "lisbon-art"
  }, /*#__PURE__*/React.createElement("p", {
    className: "lisbon-quote"
  }, "\"Where I work, think,", /*#__PURE__*/React.createElement("br", null), "and walk a lot.\"")));
}
window.ContactPage = ContactPage;