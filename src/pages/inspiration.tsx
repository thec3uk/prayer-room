import React from "react";
import Layout from "../components/layout";

const PrayerMeetupPage = () => {
  return (
    <Layout title={"be inspired"}>
      <div className="relative mx-4 my-8 flex flex-col gap-4">
        <div className="bg-blue-300 p-6 text-gray-800 font-serif shadow-lg">
          <blockquote className="pb-4 leading-relaxed text-2xl">
            If my people, who are called by my name, will <span className="bg-white py-3 px-1">humble</span> themselves
            and pray and seek my face and turn from their wicked ways, then I will hear from heaven, and I will{" "}
            <span className="bg-white py-3 px-1">forgive their sin</span> and will heal their land.
          </blockquote>
          <cite>2 Chronicles 7:14</cite>
        </div>

        <div className="bg-blue-700 p-6 text-gray-100 font-serif shadow-lg">
          <blockquote className="pb-4 leading-relaxed text-2xl">
            Cast all your anxiety on him because <span className="bg-gray-500 py-3 px-1">he cares for you.</span>
          </blockquote>
          <cite>1 Peter 5:7</cite>
        </div>

        <div className="bg-blue-300 p-6 text-gray-800 font-serif shadow-lg">
          <blockquote className="pb-4 leading-relaxed text-2xl">
            This is the confidence we have in approaching God: that if we{" "}
            <span className="bg-white py-3 px-1">ask anything according to his will,</span> he hears us.
          </blockquote>
          <cite>1 John 5:14</cite>
        </div>

        <div className="bg-blue-700 p-6 text-gray-100 font-serif shadow-lg">
          <blockquote className="pb-4 leading-relaxed text-2xl">
            Rejoice always, <span className="bg-gray-500 py-3 px-1">pray continually,</span> give thanks in all
            circumstances; for this is God’s will for you in Christ Jesus.
          </blockquote>
          <cite>1 Thessalonians 5:16-18</cite>
        </div>

        <div className="bg-blue-300 p-6 text-gray-800 font-serif shadow-lg">
          <blockquote className="pb-4 leading-relaxed text-2xl">
            Then Jesus told his disciples a parable to show them that they should{" "}
            <span className="bg-white py-3 px-1">always pray and not give up.</span>
          </blockquote>
          <cite>Luke 18:1</cite>
        </div>
      </div>
    </Layout>
  );
};

export default PrayerMeetupPage;
