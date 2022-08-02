import React from "react";

import notfound from '../../pic/notfound.svg'

export default function NotFound() {
  // alert("notfound");

  return (
    <div className="container">
      <img src={notfound}
              className="notFound"

            />
      {/* <div className="logo_section containerNotfound">
        <span className="letter_logo">C</span>
        <span className="name_logo">Najdeh Clinic</span>
        <span className="line_logo"></span>
      </div>
      <h2>Not Found</h2> */}
    </div>
  );
}
