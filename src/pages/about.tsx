import React from "react";
import Layout from "../components/layout";

const PrayerMeetupPage = () => {
  return (
    <Layout title={"The Tim Creamer Prayer Room"}>
      <div className="md:h-screen md:flex md:flex-col md:justify-center md:items-start md:mx-32">
        <div className="md:bg-gray-50 rounded shadow md:p-4">
          <div className="w-screen md:w-full px-4 py-2 text-lg md:text-lg font-sans mb-8">
            <h2 className="font-serif text-xl mb-2">About this space</h2>
            This space was created in honour of Tim Creamer. A man of passionate faith who was always first to pray.
            Sadly missed but an inspiration to us all to ‘run the race with perseverance’.
          </div>
          <div className="flex justify-center mx-8">
            <img
              src="/223-3.jpg"
              alt="Tim with his Family outside The C3 Centre"
              className="rounded-full shadow mb-20 md:w-2/5"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrayerMeetupPage;
