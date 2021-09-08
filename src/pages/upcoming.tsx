import React from "react";

import Layout from "../components/layout";
import { graphql } from "gatsby";
// import { UserGroupIcon } from "@heroicons/react/solid";
import { VideoCameraIcon } from "@heroicons/react/outline";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

const PrayerMeetupPage = ({ data }) => {
  return (
    <Layout title={"join a meetup"}>
      <div>
        <div className="w-screen md:w-full bg-gray-600 text-gray-50 px-4 py-2 text-lg font-sans shadow mb-24">
          See upcoming prayer meetups
        </div>
        <div className="relative grid grid-flow-row gap-4 mx-4 grid-cols-1 md:grid-cols-3">
          {data.allScheduledEvent.edges.map(({ node }) => {
            const formattedStartDate = dayjs(node.start_time).format("Do MMM YYYY HH:mm");
            const formattedShortEndDate = dayjs(node.end_time).format("HH:mm");
            return (
              <div className="text-gray-50 shadow bg-blue-700 p-4 rounded flex flex-col " key={node.id}>
                <h3 className=" text-xl font-sans capitalize">
                  {formattedStartDate} - {formattedShortEndDate}
                </h3>
                <h4 className="text-base font-sans font-light">({node.name})</h4>
                <div className="flex flex-row justify-between mt-4">
                  <div className="p-2 flex flex-row">
                    {/* <UserGroupIcon className="h-6 w-6" />
                  <span className="ml-2">
                    {node.invitees_counter.active}/{node.invitees_counter.limit}
                  </span> */}
                  </div>
                  <a
                    className="capitalize p-2 border bg-blue-300 text-gray-900 rounded hover-hover:bg-blue-600,  flex flex-row"
                    href={node.location.join_url}>
                    <VideoCameraIcon className="h-6 w-6 mr-2" />
                    <span>Join ({node.location.type})</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default PrayerMeetupPage;

export const query = graphql`
  {
    allScheduledEvent(sort: { fields: start_time, order: ASC }) {
      edges {
        node {
          name
          #  start_time(formatString: "Do MMM YYYY HH:mm")
          start_time
          invitees_counter {
            active
            limit
          }
          end_time
          #  end_time(formatString: "Do MMM YYYY HH:mm")
          #  short_end_time: end_time(formatString: "HH:mm")
          id
          location {
            join_url
            type
          }
        }
      }
    }
  }
`;
