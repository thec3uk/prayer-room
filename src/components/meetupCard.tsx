import React from "react";

// import { UserGroupIcon } from "@heroicons/react/solid";
import { VideoCameraIcon } from "@heroicons/react/outline";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

import Card from "../components/card";

dayjs.extend(advancedFormat);

const MeetupCard = ({ node }) => {
  const formattedShortStartDate = dayjs(node.start_time).format("HH:mm");
  const formattedShortEndDate = dayjs(node.end_time).format("HH:mm");
  // 2021-09-09T20:00:00+01:00
  const urlStartDate = dayjs(node.start_time).format("YYYY-MM-DDTHH:mm:ssZ");
  const eventStarted = dayjs().isAfter(dayjs(node.start_time));
  const title = `${formattedShortStartDate} - ${formattedShortEndDate}`;
  return (
    <Card title={title} subtitle={`(${node.name})`} classes="bg-blue-700">
      <div className="flex flex-row justify-between">
        <div className="p-2 flex flex-row">
          {/* <UserGroupIcon className="h-6 w-6" />
                  <span className="ml-2">
                    {node.invitees_counter.active}/{node.invitees_counter.limit}
                  </span> */}
        </div>
        {eventStarted ? (
          <a
            className="capitalize p-2 border bg-blue-400 text-gray-900 rounded hover:bg-blue-500 font-sans flex flex-row"
            href={node.location.join_url}>
            <VideoCameraIcon className="h-6 w-6 mr-2" />
            <span>Join ({node.location.type})</span>
          </a>
        ) : (
          <a
            className="capitalize p-2 border bg-blue-400 text-gray-900 rounded hover:bg-blue-500 hover:text-gray-100 font-sans flex flex-row"
            href={`${node.event_type.scheduling_url}/${urlStartDate}`}>
            <VideoCameraIcon className="h-6 w-6 mr-2" />
            <span>Sign up</span>
          </a>
        )}
      </div>
    </Card>
  );
};

export default MeetupCard;
