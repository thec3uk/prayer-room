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
          <div className="w-full -mb-4 mt-6 z-50">
            <BoxLink title="Request a prayer" alignment="right" to="/request" />
          </div>
        </>
      }>
      <div className="">
        <div className="w-screen bg-gray-600 text-gray-50 px-4 py-2 text-lg font-sans shadow mb-8">
          See prayer request from others and take some time to pray
        </div>
        <GroupedList group={data.allPrayerRequest.group} Component={PrayerCard} />
      </div>
    </Layout>
  );
};

export default PrayerListPage;

export const query = graphql`
  query Forms {
    allPrayerRequest {
      group(field: submission_date) {
        edges {
          node {
            id
            human_fields {
              Name
              Prayer
              Title
            }
            ordered_human_fields {
              name
              title
              value
            }
          }
        }
        fieldValue
      }
    }
  }
`;
