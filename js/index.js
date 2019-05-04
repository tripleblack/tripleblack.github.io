function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _extends() {_extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}
/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * The <AppShell /> should render the application's shell. These are parts of
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * the user interface that are common accross multiple views. Concepts are
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * loosely taken from google's {@link https://developers.google.com/web/fundamentals/architecture/app-shell appshell definition}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * The app shell is broken down into these area's, that are consistently found
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * in multiple app views:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * |--------------------|--------------------|
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * | Breadcrumbs        |              Aside |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * |--------------------|--------------------|
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * | Messages                                |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * |-----------------------------------------|
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * | Header                                  |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * |-----------------------------------------|
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * |                                         |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * |                  Main                   |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * |                                         |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * |-----------------------------------------|
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * | Footer                                  |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * |-----------------------------------------|
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * * Breadcrumbs: Path to the active view
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * * Aside: Additional meta content for the active view
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * * Messages: Any app messages, such as confirmations or alerts (not implemented)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * * Header: The title / subtitle of the active view (not implemented)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * * Main: View specific content. This is where Content and Asin apps exist
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * * Footer: Navigation / special content for the active view
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */




// Since these are in window, pretend these statements were called:
// import React from 'react';
// import ReactDOM from 'react-dom';
// import ReactRouterDOM from 'react-router-dom';
const { BrowserRouter: Router, Route, Link, NavLink, Switch, withRouter, matchPath, Redirect } = ReactRouterDOM;

/* Placeholders */

const mockBlock = (label, color, progress) => () =>
React.createElement("div", { className: "mock-block", style: { backgroundColor: color } },
React.createElement("i", null, label),
progress && React.createElement(IncrementProgress, null));


const MockBlock = ({ label, color, progress }) => mockBlock(label, color, progress)();
const MockRoute = ({ label, color, progress, ...props }) => React.createElement(Route, _extends({}, props, { render: mockBlock(label, color, progress) }));
const TextRoute = ({ text, ...props }) => React.createElement(Route, _extends({}, props, { render: () => React.createElement("p", null, text) }));

const createProgressStore = () => {
  let state = 1;
  let subscribers = [];

  return {
    increment() {
      if (state < 10) {
        state = state + 1;
      } else if (state >= 10) {
        state = 0;
      }
      subscribers.forEach(subscriber => subscriber());
    },
    getState() {
      return state;
    },
    subscribe(subscriber) {
      subscribers.push(subscriber);
      return () => {subscribers = subscribers.filter(sub => sub !== subscriber);};
    } };

};
const progressStore = createProgressStore();

class IncrementProgress extends React.Component {
  componentDidMount() {
    progressStore.increment();
  }
  render() {
    return null;
  }}


/* Dumb Components */

const Header = ({ title, subtitle, summary }) =>
React.createElement("header", { id: "view-header" },
React.createElement("h1", { id: "view-heading" },
title,
subtitle && React.createElement("small", null, " ", subtitle)),

summary && React.createElement("p", { id: "view-summary" }, summary));



const DetailFrame = ({ children, ...props }) =>
React.createElement("div", _extends({ className: "detail-frame" }, props),
children);



const ListFrame = ({ children, ...props }) =>
React.createElement("ul", _extends({ className: "list-frame" }, props),
children);



const RouteHeader = withRouter((props) =>
React.createElement(Header, {
  title: props.title,
  subtitle: React.createElement(Route, { path: `${props.match.path}/:id`, render: ({ match }) => match.params.id }),
  summary: props.summary }));




/* BreadCrumbs */

const pathBasename = urlPath => urlPath.split('/').filter(p => p).pop();
const BreadcrumbsItem = ({ match }) =>
React.createElement(React.Fragment, null,
React.createElement("li", null, "/"),
React.createElement("li", { className: match.isExact && 'active' },
React.createElement(Link, { to: match.url || '' },
pathBasename(match.url))),


React.createElement(Route, { path: `${match.url}/:path`, component: BreadcrumbsItem }));


const Breadcrumbs = () =>
React.createElement("nav", { className: "breadcrumbs" },
React.createElement(Route, { path: "/:path", component: BreadcrumbsItem }));



/* Aside */

class ContentWorkflow extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "componentDidMount",
    () => {
      this.unsubscribe = progressStore.subscribe(() => this.forceUpdate());
    });}
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return (
      React.createElement("div", { className: "progress-bar" },
      React.createElement("div", { className: "progress", style: { width: `${progressStore.getState()}0%` } })));


  }}


const AsinPreview = (props) =>
React.createElement("div", null,
React.createElement("span", null, "Preview | "),
React.createElement("b", null, props.match.params.asin));



const Aside = () =>
React.createElement("aside", null,
React.createElement(Route, { path: "/asins", exact: true, component: () => 'Select an Asin' }),
React.createElement(Route, { path: "/asins/:asin", component: AsinPreview }),
React.createElement(Route, { path: "/contents/:id", component: ContentWorkflow }));



/* Content */

const ContentDetailPane = (props) =>
React.createElement(DetailFrame, null,
React.createElement(RouteHeader, { title: props.match.params.id, summary: "" }),
React.createElement(Route, { path: `${props.match.path}/asins`, render: () => React.createElement(IncrementProgress, null) }),
React.createElement(TextRoute, { path: `${props.match.path}/asins`, exact: true, text: `The asin components below are same ones used for the top level /asins/ route. This asin list is filtered for the selected content: ${props.match.params.id}. Click an asin below to see details for that asin as it relates to this content.` }),
React.createElement(TextRoute, { path: `${props.match.path}/asins/:asin`, text: "Notice that the <AsinList /> and <AsinDetail /> components are rendered side by side here. The top level /asins/ route uses these same components but only renders one or the other." }),
React.createElement("div", { className: "split" },
React.createElement(Route, { path: `${props.match.path}/asins`, component: AsinList }),
React.createElement(Route, { path: `${props.match.path}/asins/:asin`, component: AsinDetail })),

React.createElement(MockRoute, { path: `${props.match.path}/edit`, label: "Edit", progress: true }),
React.createElement(MockRoute, { path: `${props.match.path}/preview`, label: "Preview", progress: true }),
React.createElement(MockRoute, { path: `${props.match.path}/languages`, label: "Languages", progress: true }));



const ContentDetail = (props) =>
React.createElement(DetailFrame, null,
React.createElement("nav", { className: "view-nav" },
React.createElement("li", null, React.createElement(NavLink, { to: `${props.match.url}/edit`, activeClassName: "active" }, "Edit")),
React.createElement("li", null, React.createElement(NavLink, { to: `${props.match.url}/preview`, activeClassName: "active" }, "Preview")),
React.createElement("li", null, React.createElement(NavLink, { to: `${props.match.url}/asins`, activeClassName: "active" }, "Asins")),
React.createElement("li", null, React.createElement(NavLink, { to: `${props.match.url}/languages`, activeClassName: "active" }, "Languages"))),

React.createElement(Route, { path: `${props.match.path}`, component: ContentDetailPane }),
React.createElement(Redirect, { to: `${props.match.url}/edit` }));



const ContentList = (props) =>
React.createElement(ListFrame, null,
React.createElement("li", null, React.createElement(Link, { to: `${props.match.url}/<c-1>` }, "Content 1")),
React.createElement("li", null, React.createElement(Link, { to: `${props.match.url}/<c-2>` }, "Content 2")),
React.createElement("li", null, React.createElement(Link, { to: `${props.match.url}/<c-3>` }, "Content 3")),
React.createElement("li", null, React.createElement(Link, { to: `${props.match.url}/<c-4>` }, "Content 4")));



const ContentApp = (props) =>
React.createElement(React.Fragment, null,
React.createElement(RouteHeader, { title: "Content" }),
React.createElement(Route, { path: props.match.path, exact: true, component: ContentList }),
React.createElement(TextRoute, { path: `${props.match.path}/:id`, text: "Clicking on the tabs below will route to a placeholder for that action. It will also increment the progress bar (to simulate a user building content). This demonstrates how to structure features with common context in different branches of the react tree." }),
React.createElement(Route, { path: `${props.match.path}/:id`, component: ContentDetail }));



/* Asin */

const AsinDetail = props => React.createElement(MockBlock, { label: props.match.params.asin });

const AsinList = (props) =>
React.createElement(ListFrame, null,
React.createElement("li", null, React.createElement(Link, { to: `${props.match.url}/<a-1>` }, "Asin 1")),
React.createElement("li", null, React.createElement(Link, { to: `${props.match.url}/<a-2>` }, "Asin 2")),
React.createElement("li", null, React.createElement(Link, { to: `${props.match.url}/<a-3>` }, "Asin 3")),
React.createElement("li", null, React.createElement(Link, { to: `${props.match.url}/<a-4>` }, "Asin 4")));



const AsinApp = (props) =>
React.createElement(React.Fragment, null,
React.createElement(RouteHeader, { title: "Asin" }),
React.createElement(TextRoute, { path: `${props.match.path}`, text: "This is a simple List / Detail component. Notice the aside content (top right of page). It is placed outside of the <AsinApp /> but it's aware of the current selected asin and will only be render at the /asins/ route. These asin components are reused in the /contents/ route in context of the the currently selected content." }),
React.createElement(Route, { path: `${props.match.path}`, exact: true, component: AsinList }),
React.createElement(Route, { path: `${props.match.path}/:asin`, component: AsinDetail }));



const HomeApp = (props) =>
React.createElement(React.Fragment, null,
React.createElement(Header, { title: "Welcome!", summary: "This is a demo of how the application will be structured. It's heavily influenced by react-router v4. Try not to think in terms of a traditional route/view app. Click around and look in the code. Notice that features use routes independent of other features on the same page view. The <Breadcrumbs />, <Aside />, and <AppMain /> are in different branches but behave as if they are components in a common template." }),
React.createElement(ContentList, { match: { path: `${props.match.path}contents`, url: `${props.match.url}contents` } }));



/* App */

const App = () =>
React.createElement(Router, null,
React.createElement("div", { id: "app-shell" },
React.createElement("header", { id: "app-header" },
React.createElement("div", { className: "split" },
React.createElement(Route, { path: "/:path", component: Breadcrumbs }),
React.createElement(Aside, null)),

React.createElement("nav", { id: "app-nav" },
React.createElement("li", null, React.createElement(NavLink, { to: "/", exact: true, activeClassName: "active" }, "Home")),
React.createElement("li", null, React.createElement(NavLink, { to: "/contents", activeClassName: "active" }, "Content")),
React.createElement("li", null, React.createElement(NavLink, { to: "/asins", activeClassName: "active" }, "Asins")))),


React.createElement("main", { id: "app-main" },
React.createElement(Route, { exact: true, path: "/", component: HomeApp }),
React.createElement(Route, { path: "/contents", component: ContentApp }),
React.createElement(Route, { path: "/asins", component: AsinApp }),
React.createElement(Redirect, { to: "/" })),

React.createElement("footer", { id: "app-footer" },
React.createElement(MockBlock, { label: "Footer", color: "gray" }))));






ReactDOM.render(
React.createElement(App, null),
document.getElementById('root'));