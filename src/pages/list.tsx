import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

import GroupedList from "../components/groupedList";
import PrayerCard from "../components/prayerCard";
import BoxLink from "../components/boxLink";

const PrayerListPage = ({ data }) => {
  return (
    <Layout
      title={"pray for someone"}
      menu={
        <>
          <div className="z-50 w-full mt-6 -mb-4">
            <BoxLink title="Request a prayer" alignment="right" to="/request" />
          </div>
        </>
      }>
      <div className="">
        <div className="w-screen px-4 py-2 mb-8 font-sans text-lg bg-gray-600 shadow md:w-full text-gray-50">
          See prayer request from others and take some time to pray
        </div>
        <GroupedList group={data.allAirtable.group} Component={PrayerCard} inverseSort />
      </div>
    </Layout>
  );
};

export default PrayerListPage;

export const query = graphql`
  query PrayerListRequest {
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
