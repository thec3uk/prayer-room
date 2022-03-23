import React, { useEffect } from "react";
import { graphql } from "gatsby";

import BoxLink from "../components/boxLink";
import Layout from "../components/layout";
import { useLayoutContext } from "../context/layout";

import GroupedList from "../components/groupedList";
import PrayerCard from "../components/prayerCard";

const Menu = () => {
  return (
    <div className="relative">
      {/* <BoxLink to={"/meetup"} title={"schedule a prayer meetup"} /> */}
      <BoxLink to={"/upcoming"} title={"prayer meetings"} />
      <BoxLink title="Request a prayer" to="/request" />
      {/* <BoxLink to={"/list"} title={"public prayers"} /> */}
      <BoxLink to={"/inspiration"} title={"inspiration"} />
    </div>
  );
};

const PrayerRoomPage = ({ data }) => {
  return (
    <Layout title={"...a time to be silent and a time to speak..."} isHome={true} showsubTitle={true} menu={<Menu />}>
      <div className="hidden md:block">
        <GroupedList group={data.allAirtable.group} Component={PrayerCard} inverseSort />
      </div>
    </Layout>
  );
};

export default PrayerRoomPage;

export const query = graphql`
  query PrayerRequest {
    allAirtable(filter: { queryName: { eq: "PrayerRequests" } }) {
      group(field: data___submission_date) {
        edges {
          node {
            data {
              name
              prayer
              title
              type
            }
            id
          }
        }
        fieldValue
      }
    }
  }
`;
