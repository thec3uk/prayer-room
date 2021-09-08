module.exports = {
  pathPrefix: "/", // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
  title: "The Tim Creamer Prayer Room", // Navigation and Site Title
  description: "",
  url: process.env.URL || "http://localhost:8000", // Domain of your site. No trailing slash!
  siteUrl: process.env.URL || "http://localhost:8000/", // url + pathPrefix
  //   favicon: "static/images/manifest-logo.png", // Used for manifest favicon generation
  shortName: "C3", // shortname for manifest. MUST be shorter than 12 characters
  author: "Andrew Miller", // Author for schemaORGJSONLD
  themeColor: "#202945",
  backgroundColor: "#f05356",
};
