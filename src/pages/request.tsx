import React from "react";

import { openPopupWidget } from "react-calendly";
import Layout from "../components/layout";
import BoxButton from "../components/boxButton";

const openPrayerTime = (url: string) => {
  return () => openPopupWidget({ url });
};

const PrayerMeetupPage = () => {
  return (
    <Layout title={"make a prayer request"}>
      <div>
        <div className="w-screen bg-gray-500 text-gray-50 px-4 py-2 text-lg font-sans shadow mb-24">
          Submit a public prayer request
        </div>
        <div className="relative"></div>
      </div>
    </Layout>
  );
};

export default PrayerMeetupPage;
