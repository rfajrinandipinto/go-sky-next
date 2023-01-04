import React from "react";

const Footer = () => {
  return (
    <div className="footer-component bg-white py-5 mt-5 shadow">
      <div className="container">
        <div className="row px-5">
          <div className="col-sm-12 col-lg-3 mb-5">
            <img src="/static/images/logo.svg" alt="" style={{ height: "40px" }} />
          </div>
          <div className="col-sm-4 col-lg-3 mb-3">
            <h4 className="fw-semibold mb-3">Contact Us</h4>
            <p className="text-muted mb-2 fw-semibold">089542376829</p>
            <p className="text-muted mb-2 fw-semibold">gosky@gmail.com</p>
            <p className="text-muted mb-2 fw-semibold">@GoSky</p>
          </div>
          <div className="col-sm-4 col-lg-3">
            <h4 className="fw-semibold mb-3">More Information</h4>
            <p className="text-muted mb-2 fw-semibold">About</p>
            <p className="text-muted mb-2 fw-semibold">Procurement Online</p>
            <p className="text-muted mb-2 fw-semibold">Investor Relation </p>
            <p className="text-muted mb-2 fw-semibold">Sales Office </p>
          </div>
          <div className="col-sm-4 col-lg-3 justify-content-end d-flex flex-column">
            <p className="text-muted mb-2 fw-semibold">Group Reservation</p>
            <p className="text-muted mb-2 fw-semibold">Career</p>
            <p className="text-muted mb-2 fw-semibold">News </p>
            <p className="text-muted mb-2 fw-semibold">Customer Care POlicy </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
