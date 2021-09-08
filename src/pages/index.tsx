import React, { useEffect } from "react";

import BoxLink from "../components/boxLink";
import Layout from "../components/layout";
import { useLayoutContext } from "../context/layout";

const Menu = () => {
  return (
    <div className="relative">
      <BoxLink to={"/meetup"} title={"schedule a prayer meetup"} />
      <BoxLink to={"/upcoming"} title={"join an upcoming meetup"} />
      {/* <BoxLink to={"/request"} title={"make a prayer request"} /> */}
      {/* <BoxLink to={"/list"} title={"pray for someone"} /> */}
      <BoxLink to={"/inspiration"} title={"prayer inspiration"} />
    </div>
  );
};

const PrayerRoomPage = () => {
  return (
    <Layout
      title={"...a time to be silent and a time to speak..."}
      isHome={true}
      showsubTitle={true}
      menu={<Menu />}></Layout>
  );
};

export default PrayerRoomPage;
