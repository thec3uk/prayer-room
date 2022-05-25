import React from "react";
import { navigate } from "gatsby-link";

import Layout from "../components/layout";
import BoxButton from "../components/boxButton";
import PrayerPraiseToggle from "../components/prayerPraise";
import BoxLink from "../components/boxLink";
import PrayerPraiseTabs from "../components/tabs";

const Input = ({ label, name, onChange, required = false, type = "text" }) => {
  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 capitalize">
        {label}
      </label>
      <div className="mt-1">
        <input
          type={type}
          name={name}
          required={required}
          id={`id_${name}`}
          onChange={onChange}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

const TextArea = ({ label, name, onChange }) => {
  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 capitalize">
        {label}
      </label>
      <div className="mt-1">
        <textarea
          name={name}
          id={`id_${name}`}
          required
          rows={7}
          onChange={onChange}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

const Menu = () => {
  return (
    <div className="block md:block">
      <BoxLink title="View prayers" alignment="right" to="/list" />
    </div>
  );
};

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
    fetch(process.env.GATSBY_ZAPIER_WEBHOOK as string, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        type: prayerString,
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch((error) => alert(error));
  };

  // const clickHandler = (event) => {
  //   event.target.disabled = true;
  // };
  return (
    <Layout title={`make a ${prayerString} request`} menu={<Menu />}>
      <div>
        <div className="w-screen px-4 py-2 mb-24 font-sans text-lg bg-gray-500 shadow md:w-full text-gray-50">
          Submit a public {prayerString} request
        </div>
        <div className="relative md:h-full md:flex md:flex-col md:justify-center md:mx-32">
          <div className="rounded md:bg-gray-50 md:shadow-lg md:p-4">
            <form name="prayer-request" action="/thanks/" className="mx-2 space-y-2" onSubmit={handleSubmit}>
              <PrayerPraiseTabs isPraise={isPraise} setIsPraise={setIsPraise} />
              <input type="hidden" name="type" value={prayerString} />
              <p hidden>
                <label>
                  Don’t fill this out: <input name="bot-field" onChange={handleChange} />
                </label>
              </p>
              <Input onChange={handleChange} label="Name" name="name" />
              <div className="flex space-x-2">
                <div className="flex-grow">
                  <Input onChange={handleChange} label="Email" name="email" type="email" />
                </div>
                {/* <div className="flex-grow">
                  <Input onChange={handleChange} label="Phone" name="phone" type="tel" />
                </div> */}
              </div>
              {/* <PrayerPraiseToggle enabled={isPraise} setEnabled={setIsPraise} /> */}
              <Input onChange={handleChange} label={`${prayerString} Title`} name="title" required />
              <TextArea onChange={handleChange} label={prayerString} name="prayer" />
              <div className="pt-4 -mx-2 md:-mx-6">
                <BoxButton title={`Share your ${prayerString}`} alignment="right" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrayerRequestPage;
