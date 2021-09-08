import React from "react";

import { openPopupWidget } from "react-calendly";
import Layout from "../components/layout";
import BoxButton from "../components/boxButton";

const openPrayerTime = (url: string) => {
  return () => openPopupWidget({ url });
};

const PrayerMeetupPage = () => {
  return (
    <Layout title={"schedule a meetup"}>
      <div>
        <div className="w-screen bg-gray-500 text-gray-50 px-4 py-2 text-lg font-sans shadow mb-24">
          Pick date and time to meet up and pray
        </div>
        <div className="relative">
          <BoxButton
            onClickHandler={openPrayerTime("https://calendly.com/thec3-prayer/15-minutes")}
            title={"short (15 minutes)"}
          />
          <BoxButton
            onClickHandler={openPrayerTime("https://calendly.com/thec3-prayer/30-minutes")}
            title={"medium (30 minutes)"}
          />
          <BoxButton
            onClickHandler={openPrayerTime("https://calendly.com/thec3-prayer/60-minutes")}
            title={"long (30 minutes)"}
          />
        </div>
      </div>
    </Layout>
  );
};

export default PrayerMeetupPage;
