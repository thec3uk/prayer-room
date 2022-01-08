import React from "react";

import { graphql } from "gatsby";

import Layout from "../components/layout";
import MeetupCard from "../components/meetupCard";
import GroupedList from "../components/groupedList";
import BoxLink from "../components/boxLink";

const PrayerMeetupPage = ({ data }) => {
  const groupCall = true;
  return (
    <Layout
      title={"join a meetup"}
      menu={
        <>
          <div className="z-50 w-full mt-6 -mb-4">
            <BoxLink title="Schedule a meeting" alignment="right" to="/meetup" />
          </div>
        </>
      }>
      <div>
        <div
          className={`w-screen px-4 py-2 ${
            groupCall ? "mb-12" : "mb-24"
          } font-sans text-lg bg-gray-600 shadow md:w-full text-gray-50`}>
          See upcoming prayer meetups
        </div>
        {groupCall && (
          <div className="w-screen px-4 mb-8 text-lg font-extrabold text-center text-black md:w-full">
            <a href="https://zoom.us/j/6218249928?pwd=MnhyenA2clIrS0IwNEZ5b3hGMldMZz09">
              <h3 className="block p-4 transform bg-blue-400 shadow hover:translate-y-px hover:shadow-sm hover:text-gray-50 hover:bg-blue-600">
                Zoom Call for January Prayer &amp; Fasting
              </h3>
            </a>
          </div>
        )}
        <GroupedList group={data.allScheduledEvent.group} Component={MeetupCard} />
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
