import React from "react";
import Layout from "../components/layout";

const PrayerMeetupPage = () => {
  return (
    <Layout title={"The Tim Creamer Prayer Room"}>
      <div>
        <div className="w-screen px-4 py-2 text-lg font-sans mb-8">
          This space was created in honour of Tim Creamer. A man of passionate faith who was always first to pray. Sadly
          missed but an inspiration to us all to ‘run the race with perseverance’.
        </div>
        <div className="flex justify-center mx-8">
          <img src="/223-3.jpg" alt="Tim with his Family outside The C3 Centre" className="rounded-full shadow mb-20" />
        </div>
      </div>
    </Layout>
  );
};

export default PrayerMeetupPage;
