import React from "react";
import BoxLink from "../components/boxLink";

import Layout from "../components/layout";

const PrayerSubmittedPage = () => {
  return (
    <Layout title={"make a prayer request"}>
      <div>
        <div className="w-screen bg-gray-600 text-gray-50 px-4 py-2 text-lg font-sans shadow mb-24">
          Your prayer has been stored
        </div>
        <div className="relative">
          <BoxLink title="View prayers" alignment="right" to="/list" />
          <BoxLink title="Request another prayer" alignment="right" to="/request" />
        </div>
      </div>
    </Layout>
  );
};

export default PrayerSubmittedPage;
