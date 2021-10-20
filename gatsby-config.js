/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const config = require("./config/site");

const prismicRepositoryName = "thec3";

const linkResolver = function (doc) {
  // Fallback for other types, in case new custom types get created
  return "/" + doc.uid;
};

module.exports = {
  /* Your site config here */
  flags: {
    DEV_SSR: false,
  },

  siteMetadata: {
    ...config,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-transition-link`,
      // options: {
      //   layout: require.resolve(`./src/components/layout.tsx`),
      // },
    },
    {
      resolve: "gatsby-source-prismic",
      options: {
        // The name of your prismic.io repository. This is required.
        // Example: 'gatsby-source-prismic-test-site' if your prismic.io address
        // is 'gatsby-source-prismic-test-site.prismic.io'.
        repositoryName: prismicRepositoryName,

        // An API access token to your prismic.io repository. This is required.
        // You can generate an access token in the "API & Security" section of
        // your repository settings. Setting a "Callback URL" is not necessary.
        // The token will be listed under "Permanent access tokens".
        accessToken:
          "MC5ZU1lMT0JBQUFDSUFpVFpR.JO-_vWPvv71bORpdBO-_ve-_vSfvv71kE2Xvv73vv73vv73vv73vv71a77-9eDjvv73vv70oDnM7fQ",

        // Set a link resolver function used to process links in your content.
        // Fields with rich text formatting or links to internal content use this
        // function to generate the correct link URL.
        // The document node, field key (i.e. API ID), and field value are
        // provided to the function, as seen below. This allows you to use
        // different link resolver logic for each field if necessary.
        // See: https://prismic.io/docs/javascript/query-the-api/link-resolving
        linkResolver: ({ node, key, value }) => linkResolver,

        // Set a list of links to fetch and be made available in your link
        // resolver function.
        // See: https://prismic.io/docs/javascript/query-the-api/fetch-linked-document-fields
        // fetchLinks: [
        //   // Your list of links
        // ],
        schemas: {
          academy_page: require("./src/schemas/academy_page.json"),
          content_page: require("./src/schemas/content_page.json"),
          homepage: require("./src/schemas/homepage.json"),
          landing_page: require("./src/schemas/landing_page.json"),
          notification_banner: require("./src/schemas/notification_banner.json"),
          redirect: require("./src/schemas/redirect.json"),
          site_config: require("./src/schemas/site_config.json"),
          text_page: require("./src/schemas/text_page.json"),
          colour: require("./src/schemas/colour.json"),
          contact_information: require("./src/schemas/contact_information.json"),
          online_event: require("./src/schemas/online_event.json"),
          page: require("./src/schemas/page.json"),
          impact_page: require("./src/schemas/page.json"),
        },
        // Set an HTML serializer function used to process formatted content.
        // Fields with rich text formatting use this function to generate the
        // correct HTML.
        // The document node, field key (i.e. API ID), and field value are
        // provided to the function, as seen below. This allows you to use
        // different HTML serializer logic for each field if necessary.
        // See: https://prismic.io/docs/nodejs/beyond-the-api/html-serializer
        htmlSerializer:
          ({ node, key, value }) =>
          (type, element, content, children) => {
            // Your HTML serializer
          },
      },
    },
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-typescript",
      options: {
        // isTSX: true, // defaults to false
        // jsxPragma: `jsx`, // defaults to "React"
        // allExtensions: true, // defaults to false
      },
    },
    "gatsby-plugin-tslint",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "The Tim Creamer Prayer Room",
        short_name: "Prayer Room",
        start_url: "/",
        background_color: "#3DB4F5",
        theme_color: "#3DB4F5",
        display: "minimal-ui",
        icon: "static/manifest-logo.png", // This path is relative to the root of the site.
      },
    },
  ],
};
