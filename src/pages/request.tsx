import React from "react";
import { navigate } from "gatsby-link";

import Layout from "../components/layout";
import BoxButton from "../components/boxButton";
import PrayerPraiseToggle from "../components/prayerPraise";

const Input = ({ label, name, onChange, required = false }) => {
  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium capitalize text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          type="text"
          name={name}
          required={required}
          id={`id_${name}`}
          onChange={onChange}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

const TextArea = ({ label, name, onChange }) => {
  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium capitalize text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <textarea
          name={name}
          id={`id_${name}`}
          required
          rows={10}
          onChange={onChange}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const PrayerRequestPage = () => {
  const [state, setState] = React.useState({});
  const [isPraise, setIsPraise] = React.useState(false);
  const prayerString = isPraise ? "praise" : "prayer";

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        isPraise,
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch((error) => alert(error));
  };
  return (
    <Layout title={`make a ${prayerString} request`}>
      <div>
        <div className="w-screen md:w-full bg-gray-500 text-gray-50 px-4 py-2 text-lg font-sans shadow mb-24">
          Submit a public {prayerString} request
        </div>
        <div className="relative">
          <form
            name="prayer-request"
            method="post"
            action="/thanks/"
            className="mx-2 space-y-2"
            data-netlify="true"
            onSubmit={handleSubmit}
            data-netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="prayer-request" />{" "}
            <input type="hidden" name="is_praise" value={isPraise.toString()} />
            <p hidden>
              <label>
                Don’t fill this out: <input name="bot-field" onChange={handleChange} />
              </label>
            </p>
            <Input onChange={handleChange} label="Name" name="name" />
            <PrayerPraiseToggle enabled={isPraise} setEnabled={setIsPraise} />
            <Input onChange={handleChange} label={`${prayerString} Title`} name="title" required />
            <TextArea onChange={handleChange} label={prayerString} name="prayer" />
            <div className="pt-4 -mx-2">
              <BoxButton title={`Share your ${prayerString}`} alignment="right" />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default PrayerRequestPage;
