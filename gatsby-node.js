const axios = require("axios");
const NetlifyAPI = require("netlify");
require("dotenv").config();

const sourceCalendlyNodes = async (createNode, createContentDigest, createNodeId) => {
  const EVENT_NODE_TYPE = `ScheduledEvent`;
  const EVENT_TYPE_NODE_TYPE = `EventType`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.CALENDLY_API_TOKEN}`,
  };

  const userOptions = {
    method: "GET",
    url: "https://api.calendly.com/users/me",
    headers: headers,
  };

  const scheduledEventOptions = {
    method: "GET",
    headers: headers,
    url: "https://api.calendly.com/scheduled_events",
  };

  const userResponse = await axios.request(userOptions);
  const response = await axios.request({
    params: {
      user: userResponse.data.resource.uri,
      status: "active",
      min_start_time: new Date().toISOString(),
    },
    ...scheduledEventOptions,
  });
  const events = response.data;
  // loop through data and create Gatsby nodes
  events.collection.forEach((event) => {
    createNode({
      ...event,
      event_date: new Date(event.start_time).toDateString(),
      id: createNodeId(`${EVENT_NODE_TYPE}-${event.uri}`),
      parent: null,
      children: [],
      internal: {
        type: EVENT_NODE_TYPE,
        content: JSON.stringify(event),
        contentDigest: createContentDigest(event),
      },
    });
  });
  const etResponse = await axios.request({
    method: "GET",
    url: "https://api.calendly.com/event_types",
    headers: headers,
    params: {
      user: userResponse.data.resource.uri,
    },
  });
  etResponse.data.collection.forEach((eventType) =>
    createNode({
      ...eventType,
      id: createNodeId(`${EVENT_TYPE_NODE_TYPE}-${eventType.uri}`),
      parent: null,
      children: [],
      internal: {
        type: EVENT_TYPE_NODE_TYPE,
        content: JSON.stringify(eventType),
        contentDigest: createContentDigest(eventType),
      },
    })
  );
};

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }) => {
  const { createNode } = actions;
  await sourceCalendlyNodes(createNode, createContentDigest, createNodeId);
  return;
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
type ScheduledEvent implements Node {
  id: ID!
  parent: Node
  children: [Node!]!
  internal: Internal!
  created_at(difference: String, formatString: String, fromNow: Boolean, locale: String): Date
  end_time(difference: String, formatString: String, fromNow: Boolean, locale: String): Date
  event_memberships: [ScheduledEventEvent_memberships]
  event_type: EventType @link(from: "event_type" by: "uri")
  invitees_counter: ScheduledEventInvitees_counter
  location: ScheduledEventLocation
  name: String
  start_time(difference: String, formatString: String, fromNow: Boolean, locale: String): Date
  status: String
  updated_at(difference: String, formatString: String, fromNow: Boolean, locale: String): Date
  event_date: String
  uri: String
}

type ScheduledEventEvent_memberships {
  user: String
}
type ScheduledEventInvitees_counter implements Node {
  active: Int
  limit: Int
  total: Int
}
type ScheduledEventLocation implements Node {
  data: ScheduledEventLocationData
  join_url: String
  status: String
  type: String
}

type ScheduledEventLocationData {
  id: Float
  settings: ScheduledEventLocationDataSettings
  extra: ScheduledEventLocationDataExtra
  password: String
}

type ScheduledEventLocationDataSettings {
  global_dial_in_numbers: [ScheduledEventLocationDataSettingsGlobal_dial_in_numbers]
}
type ScheduledEventLocationDataSettingsGlobal_dial_in_numbers {
  country_name: String
  city: String
  number: String
  type: String
  country: String
}
type ScheduledEventLocationDataExtra {
  intl_numbers_url: String
}

type EventType implements Node {
  id: ID!
  parent: Node
  children: [Node!]!
  internal: Internal!
  active: Boolean
  color: String
  created_at(difference: String, formatString: String, fromNow: Boolean, locale: String): Date
  duration: Int
  kind: String
  name: String
  profile: EventTypeProfile
  scheduling_url: String
  secret: Boolean
  slug: String
  type: String
  updated_at(difference: String, formatString: String, fromNow: Boolean, locale: String): Date
  uri: String
}

type EventTypeProfile {
    name: String
    owner: String
    type: String
}`);
};

// TODO: temporary workaround for https://github.com/gatsbyjs/gatsby/issues/31878
exports.onCreateWebpackConfig = ({ actions, plugins, stage, getConfig }) => {
  // override config only during production JS & CSS build
  if (stage === "build-javascript") {
    // get current webpack config
    const config = getConfig();

    const options = {
      minimizerOptions: {
        preset: [
          `default`,
          {
            svgo: {
              full: true,
              plugins: [
                // potentially destructive plugins removed - see https://github.com/gatsbyjs/gatsby/issues/15629
                // use correct config format and remove plugins requiring specific params - see https://github.com/gatsbyjs/gatsby/issues/31619
                `removeUselessDefs`,
                `cleanupAttrs`,
                `cleanupEnableBackground`,
                // `cleanupIDs`,
                `cleanupListOfValues`,
                `cleanupNumericValues`,
                `collapseGroups`,
                `convertColors`,
                `convertPathData`,
                `convertStyleToAttrs`,
                `convertTransform`,
                `inlineStyles`,
                `mergePaths`,
                `minifyStyles`,
                `moveElemsAttrsToGroup`,
                `moveGroupAttrsToElems`,
                // `prefixIds`,
                `removeAttrs`,
                `removeComments`,
                `removeDesc`,
                `removeDimensions`,
                `removeDoctype`,
                `removeEditorsNSData`,
                `removeEmptyAttrs`,
                `removeEmptyContainers`,
                `removeEmptyText`,
                `removeHiddenElems`,
                `removeMetadata`,
                `removeNonInheritableGroupAttrs`,
                `removeOffCanvasPaths`,
                `removeRasterImages`,
                `removeScriptElement`,
                `removeStyleElement`,
                `removeTitle`,
                `removeUnknownsAndDefaults`,
                `removeUnusedNS`,
                `removeUselessStrokeAndFill`,
                `removeXMLProcInst`,
                `reusePaths`,
                `sortAttrs`,
              ],
            },
          },
        ],
      },
    };
    // find CSS minimizer
    const minifyCssIndex = config.optimization.minimizer.findIndex(
      (minimizer) => minimizer.constructor.name === "CssMinimizerPlugin"
    );
    // if found, overwrite existing CSS minimizer with the new one
    if (minifyCssIndex > -1) {
      config.optimization.minimizer[minifyCssIndex] = plugins.minifyCss(options);
    }
    // replace webpack config with the modified object
    actions.replaceWebpackConfig(config);
  }
};
