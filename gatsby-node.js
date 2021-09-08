const axios = require("axios");
require("dotenv").config();
// constants for your GraphQL Post and Author types
const EVENT_NODE_TYPE = `ScheduledEvent`;

const options = {
  method: "GET",
  url: "https://api.calendly.com/scheduled_events",
  params: {
    user: "https://api.calendly.com/users/CCCGSTBZJ3UUC6PE",
    status: "active",
    min_start_time: new Date().toISOString(),
  },
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.CALENDLY_API_TOKEN}`,
  },
};

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId, getNodesByType }) => {
  const { createNode } = actions;
  const response = await axios.request(options);
  const data = response.data;
  // loop through data and create Gatsby nodes
  data.collection.forEach((event) =>
    createNode({
      ...event,
      id: createNodeId(`${EVENT_NODE_TYPE}-${event.uri}`),
      parent: null,
      children: [],
      internal: {
        type: EVENT_NODE_TYPE,
        content: JSON.stringify(event),
        contentDigest: createContentDigest(event),
      },
    })
  );
  return;
};
