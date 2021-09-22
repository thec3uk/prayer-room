import React from "react";

import Layout from "../components/layout";
import BoxButton from "../components/boxButton";

const Input = ({ label, name }) => {
  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          type="text"
          name={name}
          id={`id_${name}`}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

const TextArea = ({ label, name }) => {
  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <textarea
          name={name}
          id={`id_${name}`}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

const PrayerRequestPage = () => {
  return (
    <Layout title={"make a prayer request"}>
      <div>
        <div className="w-screen md:w-full bg-gray-500 text-gray-50 px-4 py-2 text-lg font-sans shadow mb-24">
          Submit a public prayer request
        </div>
        <div className="relative">
          <form
            name="prayer-request"
            method="post"
            className="mx-2 space-y-2"
            data-netlify="true"
            data-netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="prayer-request" />
            <Input label="Name" name="name" />
            <Input label="Prayer Title" name="title" />
            <TextArea label="Prayer" name="prayer" />
            <div className="pt-4 -mx-2">
              <BoxButton onClickHandler={(e) => alert(e)} title="Share your prayer" alignment="right" />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default PrayerRequestPage;
