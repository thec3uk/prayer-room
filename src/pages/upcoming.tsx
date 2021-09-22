import React from "react";

import { graphql } from "gatsby";

import Layout from "../components/layout";
import MeetupCard from "../components/meetupCard";
import GroupedList from "../components/groupedList";

const PrayerMeetupPage = ({ data }) => {
  return (
    <Layout title={"join a meetup"}>
      <div>
        <div className="w-screen md:w-full bg-gray-600 text-gray-50 px-4 py-2 text-lg font-sans shadow mb-24">
          See upcoming prayer meetups
        </div>
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
