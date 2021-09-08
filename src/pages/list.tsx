import React from "react";

import { openPopupWidget } from "react-calendly";
import Layout from "../components/layout";
import BoxButton from "../components/boxButton";

const openPrayerTime = (url: string) => {
  return () => openPopupWidget({ url });
};

const PrayerMeetupPage = () => {
  return (
    <Layout title={"pray for someone"}>
      <div>
        <div className="w-screen bg-gray-600 text-gray-50 px-4 py-2 text-lg font-sans shadow mb-24">
          View the submitted prayers below and pray
        </div>
        <div className="relative"></div>
      </div>
    </Layout>
  );
};

export default PrayerMeetupPage;
