import React, { useState } from "react";

import { openPopupWidget, InlineWidget } from "react-calendly";
import { useWindowWidth } from "@react-hook/window-size";
import Layout from "../components/layout";
import BoxButton from "../components/boxButton";

const openPrayerTime = (url: string) => {
  return () => openPopupWidget({ url });
};

const SHORT_URL = "https://calendly.com/thec3-prayer/15-minutes";
const MEDIUM_URL = "https://calendly.com/thec3-prayer/30-minutes";
const LONG_URL = "https://calendly.com/thec3-prayer/60-minutes";

const Menu = ({ setUrl }: { setUrl: (s: string) => void }) => {
  return (
    <div className="relative">
      <BoxButton onClickHandler={() => setUrl(SHORT_URL)} title={"short (15 minutes)"} />
      <BoxButton onClickHandler={() => setUrl(MEDIUM_URL)} title={"medium (30 minutes)"} />
      <BoxButton onClickHandler={() => setUrl(LONG_URL)} title={"long (60 minutes)"} />
    </div>
  );
};

const MobileMenu = () => {
  return (
    <div className="relative">
      <BoxButton onClickHandler={openPrayerTime(SHORT_URL)} title={"short (15 minutes)"} />
      <BoxButton onClickHandler={openPrayerTime(MEDIUM_URL)} title={"medium (30 minutes)"} />
      <BoxButton onClickHandler={openPrayerTime(LONG_URL)} title={"long (60 minutes)"} />
    </div>
  );
};

const PrayerMeetupPage = () => {
  const [meetupUrl, setMeetUpUrl] = useState(SHORT_URL);
  const widowWidth = useWindowWidth();
  return (
    <Layout title={"schedule a meetup"} menu={widowWidth > 768 ? <Menu setUrl={setMeetUpUrl} /> : <MobileMenu />}>
      <div>
        <div className="w-screen md:w-full bg-gray-500 text-gray-50 px-4 py-2 text-lg font-sans shadow mb-24 md:mb-8">
          Pick date and time to meet up and pray
        </div>
        <div className="hidden md:block w-full h-full">
          <InlineWidget
            url={meetupUrl}
            styles={{
              height: "70vh",
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default PrayerMeetupPage;
