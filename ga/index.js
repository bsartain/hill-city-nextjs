// log the pageview with their URL
export const pageview = (url) => {
  console.log("URL: ", url);
  console.log("GA TRACKING ID: ", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS);
  window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  });
};

// log specific events happening.
export const event = ({ action, params }) => {
  window.gtag("event", action, params);
};
