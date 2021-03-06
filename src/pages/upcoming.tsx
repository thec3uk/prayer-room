import React from "react";

import { graphql } from "gatsby";

import Layout from "../components/layout";
import MeetupCard from "../components/meetupCard";
import GroupedList from "../components/groupedList";
import BoxLink from "../components/boxLink";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const filterOldMeetups = (item) => {
  const date = dayjs(item.end_time);
  return date > dayjs();
};

const PrayerMeetupPage = ({ data }) => {
  // const groupCall = true;
  const groupCall = data.airtable.data.Enabled;
  return (
    <Layout
      title={"join a meetup"}
      menu={
        <>
          <div className="z-50 w-full mt-6 -mb-4">
            {/* <BoxLink title="Schedule a meeting" alignment="right" to="/meetup" /> */}
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
          <div className="flex justify-center">
            <div className="w-screen px-4 mb-8 text-lg font-extrabold text-center text-black md:w-full md:p-3 md:shadow md:m-4 md:bg-gray-50">
              <h2 className="w-full mb-4 text-2xl text-left underline">Group Prayer</h2>
              <a href="https://zoom.us/j/6218249928?pwd=MnhyenA2clIrS0IwNEZ5b3hGMldMZz09">
                <h3 className="block w-full p-4 text-gray-900 capitalize transform bg-blue-400 border border-gray-900 rounded shadow hover:border-gray-50 hover:translate-y-px hover:shadow-sm hover:bg-blue-500 hover:text-gray-100 ">
                  {data.airtable.data.Button_Text}
                </h3>
              </a>
            </div>
          </div>
        )}
        <GroupedList group={data.allScheduledEvent.group} Component={MeetupCard} filterFn={filterOldMeetups} />
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
    airtable(queryName: { eq: "AirtableSettings" }, data: { name: { eq: "Enable Group Prayer" } }) {
      data {
        Button_Text
        Enabled
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
