import React from "react";

import Layout from "../components/layout";
import { graphql } from "gatsby";
// import { UserGroupIcon } from "@heroicons/react/solid";
import { VideoCameraIcon } from "@heroicons/react/outline";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

const MeetupCard = ({ node }) => {
  const formattedStartDate = dayjs(node.start_time).format("Do MMM YYYY HH:mm");
  const formattedShortStartDate = dayjs(node.start_time).format("HH:mm");
  const formattedShortEndDate = dayjs(node.end_time).format("HH:mm");
  // 2021-09-09T20:00:00+01:00
  const urlStartDate = dayjs(node.start_time).format("YYYY-MM-DDTHH:mm:ssZ");
  const eventStarted = dayjs().isAfter(dayjs(node.start_time));

  return (
    <div className="text-gray-50 shadow bg-blue-700 p-4 rounded flex flex-col">
      <h3 className=" text-xl font-sans capitalize">
        {formattedShortStartDate} - {formattedShortEndDate}
      </h3>
      <h4 className="text-base font-sans font-light">({node.name})</h4>
      <div className="flex flex-row justify-between mt-4">
        <div className="p-2 flex flex-row">
          {/* <UserGroupIcon className="h-6 w-6" />
                  <span className="ml-2">
                    {node.invitees_counter.active}/{node.invitees_counter.limit}
                  </span> */}
        </div>
        {eventStarted ? (
          <a
            className="capitalize p-2 border bg-blue-400 text-gray-900 rounded hover:bg-blue-500 font-sans flex flex-row"
            href={node.location.join_url}>
            <VideoCameraIcon className="h-6 w-6 mr-2" />
            <span>Join ({node.location.type})</span>
          </a>
        ) : (
          <a
            className="capitalize p-2 border bg-blue-400 text-gray-900 rounded hover:bg-blue-500 hover:text-gray-100 font-sans flex flex-row"
            href={`${node.event_type.scheduling_url}/${urlStartDate}`}>
            <VideoCameraIcon className="h-6 w-6 mr-2" />
            <span>Sign up</span>
          </a>
        )}
      </div>
    </div>
  );
};

const PrayerMeetupPage = ({ data }) => {
  return (
    <Layout title={"join a meetup"}>
      <div>
        <div className="w-screen md:w-full bg-gray-600 text-gray-50 px-4 py-2 text-lg font-sans shadow mb-24">
          See upcoming prayer meetups
        </div>
        <div>
          {data.allScheduledEvent.group.map(({ edges, field, fieldValue }) => {
            return (
              <div key={fieldValue} className="mx-4 mt-16">
                <h3 className="text-gray-900 text-xl mb-4">{fieldValue}</h3>
                <div className="relative grid grid-flow-row gap-4 grid-cols-1 md:grid-cols-3">
                  {edges.map(({ node }) => (
                    <MeetupCard key={node.id} node={node} />
                  ))}
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
      group(field: event_date) {
        field
        fieldValue
        edges {
          node {
            ...Event
          }
        }
      }
    }
  }

  fragment Event on ScheduledEvent {
    name
    start_time(formatString: "Do MMM YYYY HH:mm")
    short_start_time: start_time(formatString: "HH:mm")
    invitees_counter {
      active
      limit
    }
    end_time(formatString: "Do MMM YYYY HH:mm")
    short_end_time: end_time(formatString: "HH:mm")
    event_type {
      scheduling_url
    }
    id
    location {
      join_url
      type
    }
    event_date
  }
`;
