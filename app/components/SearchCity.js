import Image from "next/image";
import React from "react";

export const SearchCity = ({ displaySection }) => {
  return (
    <section
      className="search-city section-message"
      style={{ display: displaySection === "search" ? "flex" : "none" }}
    >
      <Image
        src="/message/search.png"
        alt="search-city"
        width={200}
        height={200}
        style={{ height: "auto" }}
      />
      <div className="message-content">
        <h1>Search City</h1>
        <h4 className="regular-txt">
          Find out the weather conditions of the city
        </h4>
      </div>
    </section>
  );
};
