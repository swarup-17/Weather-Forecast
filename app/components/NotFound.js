import Image from "next/image";
import React from "react";
import "/app/globals.css";
export const NotFound = ({ displaySection }) => {
  return (
    <section
      className="not-found section-message"
      style={{ display: displaySection === "notFound" ? "flex" : "none" }}
    >
      <Image
        src="/message/not-found.png"
        alt="not-found"
        width={200}
        height={200}
        style={{ height: "auto" }}
      />
      <div className="message-content">
        <h1>Not Found</h1>
        <h4 className="regular-txt">Enter a valid city name</h4>
      </div>
    </section>
  );
};
