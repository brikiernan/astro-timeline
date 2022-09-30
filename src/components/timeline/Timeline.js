/* eslint-disable */

import "./Timeline.css";

import { forwardRef, createElement } from "react";

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
      })
    : (obj[key] = value);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
let append = (target, ...children) => target.append(...children) || target;
let assign = (target, attrs, ...children) => {
  for (let name2 in attrs) {
    target.setAttribute(name2, attrs[name2]);
  }
  return append(target, ...children);
};
function from(name2, attributes = null, ...children) {
  return assign(document.createElement(name2), attributes, ...children);
}
function fromSVG(name2, attributes = null, ...children) {
  return assign(
    document.createElementNS("http://www.w3.org/2000/svg", name2),
    attributes,
    ...children
  );
}
function Div(attributes = null, ...children) {
  let element = from("div", attributes, ...children);
  let { prototype } = new.target || HTMLElement;
  if (prototype.constructor !== HTMLElement)
    Object.setPrototypeOf(element, prototype);
  return element;
}
Div.prototype = HTMLElement.prototype;
function WeakRef(set = (_target, value) => Object(value)) {
  let map = /* @__PURE__ */ new WeakMap();
  return (target, ...args) => {
    let get = map.get(target);
    if (!get) map.set(target, (get = set(target, ...args)));
    return get;
  };
}
let useElementInternals = new WeakRef((host, opts) => {
  let animationID;
  let shadowRoot;
  let shadowSlotElement;
  let shadowStyleElement;
  let ints = {
    host,
    parts: {},
    props: {},
    style: {},
    get shadowRoot() {
      return shadowRoot || (shadowRoot = host.attachShadow({ mode: "open" }));
    },
    get shadowSlotElement() {
      return (
        shadowSlotElement ||
        (shadowSlotElement = ints.shadowRoot.appendChild(new from("slot")))
      );
    },
    get shadowStyleElement() {
      return (
        shadowStyleElement ||
        (shadowStyleElement = ints.shadowRoot.appendChild(new from("style")))
      );
    },
    setProps(newProps) {
      let oldProps = ints.props;
      for (let name2 in newProps) {
        let oldValue = oldProps[name2];
        let newValue = newProps[name2];
        if (oldValue !== newValue) {
          oldProps[name2] = newValue;
          ints.onPropsChange(name2, oldValue, newValue);
        }
      }
    },
    onPropsChange() {},
    setStyle(style) {
      for (let name2 in style) {
        ints.style[name2] = style[name2];
      }
      update();
      function update() {
        cancelAnimationFrame(animationID);
        let { sheet } = ints.shadowStyleElement;
        if (sheet) {
          let runtimeStyle = (
            sheet.cssRules[0] || sheet.cssRules[sheet.insertRule(":host{")]
          ).style;
          for (let name2 in ints.style) {
            if (name2.includes("-")) {
              runtimeStyle.setProperty(name2, ints.style[name2]);
            } else {
              runtimeStyle[name2] = ints.style[name2];
            }
          }
        } else {
          animationID = requestAnimationFrame(update);
        }
      }
    },
    ...Object(opts)
  };
  return ints;
});
let any = null;
let minmax = (min = 0, mid = 0, max = 0) => Math.min(max, Math.max(min, mid));
let getTime = (time = 0) => new Date(time).getTime() || 0;
let getString = (value) => (value == null ? "" : String(value));
let getZoom = (value) => minmax(0.5, Number(value) || 1, 5);
let getTimeISO = (time = 0, text = any) => {
  let isoText = new Date(getTime(time)).toISOString();
  let isoParts = {
    YYYY: isoText.slice(0, 4),
    MM: isoText.slice(5, 7),
    DD: isoText.slice(8, 10),
    hh: isoText.slice(11, 13),
    mm: isoText.slice(14, 16),
    ss: isoText.slice(17, 19),
    ms: isoText.slice(20, 24)
  };
  return String(text).replace(/\{([^}]+)\}/g, ($0, $1) => isoParts[$1] || $0);
};
let getStatus = (status) => {
  status = String(status).toLowerCase();
  if (
    status !== "caution" &&
    status !== "critical" &&
    status !== "serious" &&
    status !== "standby"
  ) {
    status = "normal";
  }
  return status;
};
let format = {
  MMYYYY: (divide) => ({
    divide,
    format: (time) => getTimeISO(time, `{MM}/{YYYY}`)
  }),
  MMDD: (divide) => ({
    divide,
    format: (time) => getTimeISO(time, `{MM}/{DD}`)
  }),
  hhmm: (divide) => ({
    divide,
    format: (time) => getTimeISO(time, `{hh}:{mm}`)
  }),
  mmss: (divide) => ({
    divide,
    format: (time) => getTimeISO(time, `{mm}:{ss}`)
  }),
  ssms: (divide) => ({
    divide,
    format: (time) => getTimeISO(time, `{ss}:{ms}`)
  })
};
class TimelineRulerElement extends Div {
  constructor() {
    super({ class: "ruler", part: "ruler" });
    useElementInternals(this, {
      props: {
        stepper: {
          divide: 0,
          format: () => ""
        }
      }
    });
    this.repaint();
  }
  repaint() {
    var _a;
    let host = this;
    let base = (_a = host.getRootNode()) == null ? void 0 : _a.host;
    if (!base || host === base) return;
    let hostInternals = useElementInternals(host);
    let baseInternals = useElementInternals(base);
    let oldStepper = hostInternals.props.stepper;
    let newStepper =
      host.constructor.steppers.find(
        (stepper) =>
          (stepper.divide / baseInternals.props.msPerPx) *
            baseInternals.props.zoom >=
          60
      ) || host.constructor.steppers.at(-1);
    if (oldStepper !== newStepper) {
      hostInternals.props.stepper = newStepper;
      host.redraw();
    }
  }
  redraw() {
    var _a;
    let host = this;
    let base = (_a = host.getRootNode()) == null ? void 0 : _a.host;
    if (!base || host === base) return;
    let hostInternals = useElementInternals(host);
    let baseInternals = useElementInternals(base);
    let { stepper } = hostInternals.props;
    baseInternals.setProps({ rulerMsPerStep: stepper.divide });
    let rulerSteps = [];
    for (
      let currentTime = baseInternals.props.startTime,
        closingTime = baseInternals.props.endTime;
      currentTime < closingTime;
      currentTime += stepper.divide
    ) {
      rulerSteps.push(
        new from(
          "div",
          {
            class: "ruler-step",
            part: "ruler-step"
          },
          stepper.format(currentTime)
        )
      );
    }
    host.replaceChildren(...rulerSteps);
  }
}
__publicField(TimelineRulerElement, "steppers", [
  format.ssms(100),
  format.ssms(250),
  format.mmss(1e3),
  format.mmss(5e3),
  format.mmss(1e4),
  format.mmss(2e4),
  format.mmss(3e4),
  format.hhmm(6e4),
  format.hhmm(6e4),
  format.hhmm(6e4 * 2),
  format.hhmm(6e4 * 5),
  format.hhmm(6e4 * 10),
  format.hhmm(6e4 * 20),
  format.hhmm(6e4 * 30),
  format.hhmm(6e4 * 60),
  format.hhmm(6e4 * 60 * 2),
  format.hhmm(6e4 * 60 * 3),
  format.hhmm(6e4 * 60 * 6),
  format.hhmm(6e4 * 60 * 12),
  format.MMDD(6e4 * 60 * 24),
  format.MMDD(6e4 * 60 * 24 * 7),
  format.MMYYYY((6e4 * 60 * 24 * 365) / (12 + 1 / 12))
]);
class TimelineTrackHeaderElement extends Div {
  constructor() {
    super();
    let { parts } = useElementInternals(this);
    assign(this, { class: "track-fragment", part: "track-container" });
    append(
      this,
      new from(
        "div",
        { class: "track-header", part: "track-header" },
        (parts.toggle = new from(
          "button",
          { type: "button", class: "toggle", part: "toggle" },
          new fromSVG(
            "svg",
            {
              class: "toggle-symbol",
              part: "toggle-symbol",
              viewBox: "0 0 24 24"
            },
            new fromSVG("path", {
              d:
                "M9.29 15.88 13.17 12 9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42Z"
            })
          )
        )),
        (parts.content = new from("div"))
      ),
      (parts.tracks = new from("div", { class: "tracks", part: "tracks" }))
    );
  }
}
class TimelineEventElement extends Div {
  constructor(options = any) {
    options = Object(options);
    super();
    let ints = useElementInternals(this, {
      props: {
        startTime: 0,
        endTime: 0,
        status: "normal",
        title: "",
        subtitle: ""
      },
      onPropsChange(name2, oldValue, newValue) {
        switch (name2) {
          case "startTime": {
            ints.setStyle({ "--TimelineEventOpening": newValue });
            break;
          }
          case "endTime": {
            ints.setStyle({ "--TimelineEventClosing": newValue });
            break;
          }
          case "status": {
            this.host.classList.toggle("status-" + oldValue, false);
            this.host.classList.toggle("status-" + newValue, true);
            this.host.part.toggle("status-" + oldValue, false);
            this.host.part.toggle("status-" + newValue, true);
            break;
          }
          case "title": {
            ints.parts.title.replaceChildren(newValue);
            break;
          }
          case "subtitle": {
            ints.parts.subtitle.replaceChildren(newValue);
            break;
          }
        }
        switch (name2) {
          case "startTime":
          case "endTime": {
            if (!options.subtitle) {
              this.host.subtitle = `${getTimeISO(
                ints.props.startTime,
                "{hh}:{mm}:{ss}"
              )} - ${getTimeISO(ints.props.endTime, "{hh}:{mm}:{ss}")}`;
            }
            break;
          }
        }
      }
    });
    ints.shadowSlotElement;
    ints.parts.title = new from("div", {
      class: "event-title",
      part: "event-title"
    });
    ints.parts.subtitle = new from("div", {
      class: "event-subtitle",
      part: "event-subtitle"
    });
    assign(this, { class: "event", part: "event" });
    this.append(ints.parts.title, ints.parts.subtitle);
    this.endTime = options.endTime;
    this.startTime = options.startTime;
    this.status = options.status;
    this.title = options.title;
  }
  get status() {
    return useElementInternals(this).props.status;
  }
  set status(status) {
    status = getStatus(status);
    useElementInternals(this).setProps({ status });
  }
  get startTime() {
    return useElementInternals(this).props.startTime;
  }
  set startTime(startTime) {
    startTime = getTime(startTime);
    useElementInternals(this).setProps({ startTime });
  }
  get endTime() {
    return useElementInternals(this).props.endTime;
  }
  set endTime(endTime) {
    endTime = getTime(endTime);
    useElementInternals(this).setProps({ endTime });
  }
  get title() {
    return useElementInternals(this).props.title;
  }
  set title(title) {
    title = getString(title);
    useElementInternals(this).setProps({ title });
  }
  get subtitle() {
    return useElementInternals(this).props.subtitle;
  }
  set subtitle(subtitle) {
    subtitle = getString(subtitle);
    useElementInternals(this).setProps({ subtitle });
  }
}
class TimelineTrackElement extends Div {
  constructor(options = any) {
    options = Object(options);
    super();
    let { props, parts, setProps } = useElementInternals(this, {
      props: {
        title: "",
        open: true
      },
      onPropsChange(name2, _oldValue, newValue) {
        switch (name2) {
          case "title": {
            useElementInternals(parts.header).parts.content.replaceChildren(
              newValue
            );
            break;
          }
          case "open": {
            this.host.classList.toggle("open", newValue);
            this.host.part.toggle("open", newValue);
            parts.header.classList.toggle("open", newValue);
            break;
          }
        }
      }
    });
    parts.header = new TimelineTrackHeaderElement();
    useElementInternals(parts.header).parts.toggle.addEventListener(
      "click",
      () => {
        setProps({ open: !props.open });
      }
    );
    assign(
      this,
      { class: "track-fragment", part: "track-container" },
      (parts.content = new from("div", { class: "track", part: "track" })),
      (parts.tracks = new from("div", { class: "tracks", part: "tracks" }))
    );
    Object.assign(this, {
      title: options.title,
      open: options.open
    });
  }
  get events() {
    return useElementInternals(this).parts.content.childNodes;
  }
  get tracks() {
    return useElementInternals(this).parts.tracks.childNodes;
  }
  get title() {
    return useElementInternals(this).props.title;
  }
  set title(title) {
    title = getString(title);
    useElementInternals(this).setProps({ title });
  }
  get open() {
    return useElementInternals(this).props.open;
  }
  set open(open) {
    open = Boolean(open);
    useElementInternals(this).setProps({ open });
  }
  addEvent(options = any) {
    return useElementInternals(this).parts.content.appendChild(
      new TimelineEventElement(options)
    );
  }
  addTrack(options = any) {
    let track = new TimelineTrackElement(options);
    let { parts } = useElementInternals(this);
    this.classList.add("has-children");
    this.part.add("has-children");
    parts.header.classList.add("has-children");
    parts.header.part.add("has-children");
    useElementInternals(parts.header).parts.tracks.append(
      useElementInternals(track).parts.header
    );
    parts.tracks.append(track);
    return track;
  }
}
const cssText =
  ":host {\n	/* Custom: Timeline (properties) */\n	--TimelineMsPerPx: 6e4;\n	--TimelineZoom: 1;\n	--TimelineOpening: 0;\n	--TimelineClosing: 0;\n	--TimelineCurrent: 0;\n\n	/* Custom: Timeline */\n	--TimelineBorder: hsl(0 0% 74%);\n	--TimelineCursor: hsl(0 0% 10%);\n	--TimelineGap: 0.0625em;\n	--TimelineGroup: hsl(0 0% 88%);\n	--TimelinePlayhead: var(--TimelineEventBorder);\n\n	/* Custom: Track */\n	--TimelineTrack: hsl(0 0% 90%);\n	--TimelineTrackChild: hsl(0 0% 84%);\n	--TimelineTrackHeaderSizeX: 12.25em;\n	--TimelineTrackPast: hsl(0 0% 84%);\n	--TimelineTrackSizeY: 2.75em;\n	--TimelineTrackText: hsl(0 0% 04%);\n\n	/* Custom: Ruler (properties) */\n	--TimelineRulerMsPerStep: 36e5;\n	--TimelineRulerSizeY: 20px;\n\n	/* Custom: Ruler Marker */\n	--TimelineRulerMarkerSizeY: 50%;\n	--TimelineRulerMarkerMinorSizeY: 25%;\n\n	/* Custom: Event */\n	--TimelineEvent: hsl(0 0% 98%);\n	--TimelineEventText: hsl(0 0% 04%);\n	--TimelineEventBorder: var(--TimelineBorder);\n\n	/* Computed */\n	--ComputedTimelineElapsed: calc(\n		var(--TimelineClosing, 0)\n		- var(--TimelineOpening, 0)\n	);\n	--ComputedTimelinePx: calc(\n		var(--TimelineZoom, 1)\n		/ var(--TimelineMsPerPx, 6e4)\n		* 1px\n	);\n}\n\nbutton {\n	appearance: none;\n	background-color: transparent;\n	border-width: 0;\n	color: inherit;\n	font: inherit;\n	line-height: inherit;\n	margin: 0;\n	padding: 0;\n}\n\nsvg {\n	fill: currentColor;\n}\n\n* {\n	box-sizing: border-box;\n}\n\n.workspace {\n}\n\n.workspace {\n	display: grid;\n\n	/* Layout */\n	align-items: start;\n	grid-template: 1fr / var(--TimelineTrackHeaderSizeX) 1fr;\n	grid-gap: var(--TimelineGap);\n	max-height: 100%;\n	max-width: max-content;\n\n	cursor: default;\n	user-select: none;\n}\n\n.workspace-column {\n	display: grid;\n	grid-template-rows: var(--TimelineRulerSizeY) minmax(var(--TimelineTrackSizeY), max-content);\n}\n\n.workspace-column > :nth-child(1) {\n	grid-area: 1 / 1 / 2 / 2;\n}\n\n.workspace-column > :nth-child(2) {\n	grid-area: 2 / 1 / 3 / 2;\n}\n\n.workspace-column > :nth-child(3) {\n	grid-area: 1 / 1 / 3 / 2;\n}\n\n.is-flow-x, .is-flow-y {\n	scroll-behavior: smooth;\n	scrollbar-width: none;\n}\n\n.is-flow-x {\n	/* Layout */\n	overflow-x: auto;\n	overflow-y: hidden;\n}\n\n.is-flow-y {\n	/* Layout */\n	overflow-x: hidden;\n	overflow-y: auto;\n}\n\n.is-flow-x::-webkit-scrollbar, .is-flow-y::-webkit-scrollbar {\n	/* Layout */\n	width: 0;\n	height: 0;\n}\n\n.track,\n.track-header {\n	display: grid;\n\n	height: var(--TimelineTrackSizeY);\n}\n\n.track > * {\n	grid-area: 1 / 1 / 2 / 2;\n}\n\n.track-header {\n	display: flex;\n\n	/* layout */\n	align-items: center;\n}\n\n.tracks:not(:empty),\n.track-fragment:not(:empty) {\n	display: grid;\n	grid-gap: 1px;\n}\n\n.tracks:empty,\n.track-fragment:empty {\n	display: contents;\n}\n\n.tracks:not(:is(.open, .workspace-column) > *) {\n	display: none;\n}\n\n.toggle {\n	/* Parent Layout */\n	align-self: stretch;\n\n	display: flex;\n\n	/* Layout */\n	align-items: center;\n	margin-right: 0.25em;\n	padding: 0.25em;\n\n	/* Appearance */\n	cursor: pointer;\n	overflow: hidden;\n	outline-offset: -1px;\n}\n\n.toggle:hover {\n	background-color: hsl(0 0% 100% / 3%);\n}\n\n.toggle:focus-visible {\n	outline-style: solid;\n}\n\n.toggle:not(.has-children > * > *) {\n	visibility: hidden;\n}\n\n.toggle-symbol {\n	/* Layout */\n	width: 1em;\n}\n\n.toggle-symbol:where(.open > * > .toggle *) {\n	rotate: 90deg;\n}\n\n.event {\n	display: grid;\n\n	/* Layout */\n	align-items: center;\n	padding: .5em;\n	width: calc(\n		var(--TimelineEventExpanseC, 0)\n		* var(--ComputedTimelinePx, 1px)\n	);\n\n	/* Text */\n	white-space: nowrap;\n\n	/* Appearance */\n	background: hsl(0 0% 98%);\n	border-radius: 0.1875em;\n	box-shadow: hsl(0 0% 24%) 0 0 0 1px inset;\n	translate: calc(\n		var(--TimelineEventOpeningC, 0)\n		* var(--ComputedTimelinePx, 1px)\n	) 0px;\n\n	/* Variable */\n	--TimelineEventExpanseC: calc(var(--TimelineEventClosing, 0) - var(--TimelineEventOpening, 0));\n	--TimelineEventOpeningC: calc(var(--TimelineEventOpening, 0) - var(--TimelineOpening, 0));\n	--TimelineEventClosingC: calc(var(--TimelineEventClosing, 0) - var(--TimelineOpening, 0));\n}\n\n.event-title {\n	overflow: hidden;\n\n	/* Text */\n	font-size: 0.875em;\n	line-height: calc(16 / 14);\n}\n\n.event-subtitle {\n	overflow: hidden;\n\n	/* Text */\n	font-size: 0.75em;\n	line-height: calc(12 / 12);\n}\n\n.playhead {\n	display: grid;\n\n	/* Layout */\n	grid-template-rows: 0.75em 1fr;\n	margin-left: -0.375em;\n	width: 0.75em;\n\n	/* Appearance */\n	color: hsl(0 0% 0% / 45%);\n	translate: calc(\n		(\n			var(--TimelineCurrent, 0)\n			- var(--TimelineOpening)\n		)\n		* var(--ComputedTimelinePx, 1px)\n	) 0px;\n}\n\n.playhead-handle {\n	grid-area: 1 / 1 / 2 / 3;\n\n	/* Layout */\n	margin-left: .5px;\n	width: 100%;\n}\n\n.playhead-line {\n	grid-area: 1 / 1 / 3 / 3;\n	width: 1px;\n	margin-left: 0.375em;\n	background: linear-gradient(180deg, transparent calc(0.375em - .5px), CurrentColor calc(0.375em - .5px) );\n}\n\n/* === */\n\n.has-tracks .ruler,\n.has-tracks .track {\n	width: calc(\n		var(--ComputedTimelineElapsed, 0)\n		* var(--ComputedTimelinePx, 1px)\n	);\n}\n\n.workspace {\n	--depth: 0;\n	--box-shadow-1: 0 0 0 0 inset;\n	--box-shadow-2: 0 0 0 0 inset;\n	--darken: hsl(0 0% 0% / 0%);\n}\n\n.tracks .tracks {\n	--depth: calc(var(--depthC) + 1);\n}\n\n.tracks .track-fragment {\n	--depthC: var(--depth);\n}\n\n.track,\n.track-header {\n	/* Appearance */\n	box-shadow: var(--box-shadow-1), var(--box-shadow-2);\n}\n\n.tracks .tracks :is(.track, .track-header) {\n	--darken: hsl(0 0% 0% / calc(4% + 4% * var(--depth)));\n}\n\n.track-header {\n	/* Layout */\n	padding-left: calc(var(--depth) * .5em);\n\n	/* Appearance */\n	background:\n		linear-gradient(var(--darken), var(--darken)),\n		linear-gradient(var(--TimelineTrack), var(--TimelineTrack))\n	;\n}\n\n.track {\n	/* Appearance */\n	background:\n		linear-gradient(var(--darken), var(--darken)),\n		linear-gradient(90deg,\n			var(--TimelineTrackPast) calc(\n				(\n					var(--TimelineCurrent, 0)\n					- var(--TimelineOpening)\n				)\n				* var(--ComputedTimelinePx, 1px)\n			),\n			var(--TimelineTrack) calc(\n				(\n					var(--TimelineCurrent, 0)\n					- var(--TimelineOpening)\n				)\n				* var(--ComputedTimelinePx, 1px)\n			)\n		)\n	;\n}\n\n.has-children .track-fragment:nth-child(1) > :is(.track, .track-header) {\n	--box-shadow-1: var(--TimelineNestedTrackOpeningShadow);\n}\n\n.has-children .track-fragment:not(.has-children):nth-last-child(1) > :is(.track, .track-header) {\n	--box-shadow-2: var(--TimelineNestedTrackClosingShadow);\n}\n\n.ruler {\n	display: flex;\n	overflow: hidden;\n\n	/* Layout */\n	width: var(--ComputedWidth);\n\n	/* Apperance */\n	color: currentColor;\n\n	/* Computed */\n	--ComputedWidth: calc(\n		var(--ComputedTimelineElapsed, 0)\n		* var(--ComputedTimelinePx, 1px)\n	);\n}\n\n.ruler-step {\n	/* Layout */\n	flex-shrink: 0;\n	width: var(--ComputedWidth);\n\n	/* Text */\n	font-size: 0.75em;\n	line-height: calc(12 / 12);\n	text-indent: 12.5%;\n\n	/* Appearance */\n	background:\n		linear-gradient(90deg, var(--TimelineRulerMarkerColor, CurrentColor) 0 1px, transparent 0) no-repeat 0% 100% / 50% var(--TimelineRulerMarkerSizeY, 50%),\n		linear-gradient(90deg, var(--TimelineRulerMarkerColor, CurrentColor) 0 1px, transparent 0) no-repeat calc(100% / 3) 100% / 25% var(--TimelineRulerMarkerMinorSizeY, 25%),\n		linear-gradient(90deg, var(--TimelineRulerMarkerColor, CurrentColor) 0 1px, transparent 0) no-repeat calc(200% / 3) 100% / 25% var(--TimelineRulerMarkerMinorSizeY, 25%),\n		linear-gradient(90deg, var(--TimelineRulerMarkerColor, CurrentColor) 0 1px, transparent 0) no-repeat 100% 100% / 25% var(--TimelineRulerMarkerMinorSizeY, 25%)\n	;\n\n	/* Computed */\n	--ComputedWidth: calc(\n		var(--TimelineRulerMsPerStep, 36e5)\n		* var(--ComputedTimelinePx)\n	);\n}\n";
class TimelineElement$1 extends HTMLElement {
  constructor(options = any) {
    options = Object(options);
    super();
    let { parts, shadowRoot, shadowStyleElement } = useElementInternals(this, {
      props: {
        startTime: 0,
        endTime: 0,
        currentTime: 0,
        zoom: 1,
        msPerPx: 6e4,
        rulerMsPerStep: 36e5
      },
      parts: {
        header: {}
      },
      onPropsChange(name2, _oldValue, newValue) {
        switch (name2) {
          case "endTime": {
            this.setStyle({ "--TimelineClosing": newValue });
            this.parts.ruler.redraw();
          }
          case "currentTime": {
            this.setStyle({ "--TimelineCurrent": newValue });
            break;
          }
          case "startTime": {
            this.setStyle({ "--TimelineOpening": newValue });
            this.parts.ruler.redraw();
            break;
          }
          case "msPerPx": {
            this.setStyle({ "--TimelineMsPerPx": newValue });
            break;
          }
          case "rulerMsPerStep": {
            this.setStyle({ "--TimelineRulerMsPerStep": newValue });
            parts.ruler.repaint();
            break;
          }
          case "zoom": {
            this.setStyle({ "--TimelineZoom": newValue });
            this.parts.ruler.repaint();
            break;
          }
        }
      }
    });
    let headerParts = useElementInternals(parts.header).parts;
    parts.workspace = new from(
      "div",
      { class: "workspace is-flow-y" },
      new from(
        "div",
        { class: "workspace-column has-track-headers" },
        (parts.legend = new from("div", { class: "legend", part: "legend" })),
        (headerParts.tracks = new from("div", {
          class: "tracks",
          part: "tracks"
        }))
      ),
      new from(
        "div",
        { class: "workspace-column has-tracks is-flow-x" },
        (parts.ruler = new TimelineRulerElement()),
        (parts.tracks = new from("div", { class: "tracks", part: "tracks" })),
        (parts.playhead = new from(
          "div",
          { class: "playhead", part: "playhead" },
          new fromSVG(
            "svg",
            {
              class: "playhead-handle",
              part: "playhead-handle",
              viewBox: "0 0 2 1"
            },
            new fromSVG("path", { d: "M 0,0 L 2,0 L 1,1" })
          ),
          new from("div", { class: "playhead-line", part: "playhead-line" })
        ))
      )
    );
    shadowStyleElement.textContent = cssText;
    shadowRoot.prepend(shadowStyleElement, parts.workspace);
    this.endTime = options.endTime;
    this.currentTime = options.currentTime;
    this.startTime = options.startTime;
  }
  connectedCallback() {
    let { parts } = useElementInternals(this);
    parts.ruler.repaint();
  }
  addTrack(options = any) {
    let track = new TimelineTrackElement(options);
    let { parts } = useElementInternals(this);
    useElementInternals(parts.header).parts.tracks.append(
      useElementInternals(track).parts.header
    );
    parts.tracks.append(track);
    return track;
  }
  get tracks() {
    let { parts } = useElementInternals(this);
    return parts.tracks.childNodes;
  }
  get startTime() {
    return useElementInternals(this).props.startTime;
  }
  set startTime(startTime) {
    startTime = getTime(startTime);
    useElementInternals(this).setProps({ startTime });
  }
  get endTime() {
    return useElementInternals(this).props.endTime;
  }
  set endTime(endTime) {
    endTime = getTime(endTime);
    useElementInternals(this).setProps({ endTime });
  }
  get currentTime() {
    return useElementInternals(this).props.currentTime;
  }
  set currentTime(currentTime) {
    currentTime = getTime(currentTime);
    useElementInternals(this).setProps({ currentTime });
  }
  get zoom() {
    return useElementInternals(this).props.zoom;
  }
  set zoom(zoom) {
    zoom = getZoom(zoom);
    useElementInternals(this).setProps({ zoom });
  }
}

if (!customElements.get("web-timeline")) {
  customElements.define("web-timeline", TimelineElement$1);
}

let name = "web-timeline";

let dom = Object.assign(/* @__PURE__ */ Object.create(null), {
  tracks: 1,
  startTime: 1,
  endTime: 1,
  currentTime: 1,
  zoom: 1
});

let Timeline = forwardRef((props, ref) => {
  let kDOM = {};
  let kJSX = {
    ref(current) {
      if (current) for (let k in kDOM) current[k] = kDOM[k];
      if (typeof ref === "function") ref(current);
      else if (ref) ref.current = current;
    }
  };
  for (let k in props) {
    (k in dom ? kDOM : kJSX)[k] = props[k];
  }
  return createElement(name, kJSX);
});

Timeline.displayName = name;

export { Timeline };
