import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Link from "next/link";

const HomeContent = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ticketData, setTicketData] = useState(data.data);

  return (
    <div className="home-content">
      <div className="container">
        <div className="content-title">
          <h3 className="fw-semibold primary-color">Featured Destination</h3>
          <h3 className="fw-semibold primary-color">From Indonesia</h3>
        </div>
        <div className="row mt-4">
          <div className="col-md-6 col-lg-3 mb-3">
            <div className="card shadow featured-card d-flex justify-content-end flex-column p-3" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url('/static/images/bukittinggi.png')" }}>
              <p className="text-white fw-semibold fs-5 mb-2">PADANG</p>
              <Link href="/result?category=&from=&to=PADANG&departureTime=&returnTime=" onClick={() => setIsLoading(true)}>
                <button type="button" className="btn border-light text-light" style={{ width: "150px" }}>
                  More
                </button>
              </Link>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 mb-3">
            <div
              className="card shadow  featured-card d-flex justify-content-end flex-column p-3"
              style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url('/static/images/bali.png')", backgroundPosition: "top" }}
            >
              <p className="text-white fw-semibold fs-5 mb-2">BALI</p>
              <Link href="/result?category=&from=&to=DENPASAR&departureTime=&returnTime=" onClick={() => setIsLoading(true)}>
                <button type="button" className="btn border-light text-light" style={{ width: "150px" }}>
                  More
                </button>
              </Link>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 mb-3">
            <div
              className="card shadow  featured-card d-flex justify-content-end flex-column p-3"
              style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url('/static/images/jakarta.png')", backgroundPosition: "top" }}
            >
              <p className="text-white fw-semibold fs-5 mb-2">JAKARTA</p>
              <Link href="/result?category=&from=&to=JAKARTA&departureTime=&returnTime=" onClick={() => setIsLoading(true)}>
                <button type="button" className="btn border-light text-light" style={{ width: "150px" }}>
                  More
                </button>
              </Link>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 mb-3">
            <div
              className="card shadow  featured-card d-flex justify-content-end flex-column p-3"
              style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url('/static/images/jogjakarta.png')", backgroundPosition: "top" }}
            >
              <p className="text-white fw-semibold fs-5 mb-2">YOGYAKARTA</p>
              <Link href="/result?category=&from=&to=YOGYAKARTA&departureTime=&returnTime=" onClick={() => setIsLoading(true)}>
                <button type="button" className="btn border-light text-light" style={{ width: "150px" }}>
                  More
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="content-title mt-5">
          <h3 className="fw-semibold primary-color">Departure From</h3>
        </div>
        <div className="row mt-4 mb-5">
          <div className="col-md-6 col-xl-3 mb-3">
            <div className="card shadow departure-card overflow-hidden">
              <div
                className="card-image d-flex justify-content-center align-items-center text-light fw-semibold "
                style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/static/images/bukittinggi.png')" }}
              >
                <p className="m-0 fs-5">PADANG</p>
              </div>

              <div className="card-body">
                {ticketData.padang.map((ticket, key) => {
                  return (
                    <Link className="" key={key} href={"/tickets/" + ticket.id}>
                      <div className="from-ticket mb-3 d-flex align-items-center justify-content-between">
                        <div className="">
                          <p className="card-text fw-semibold m-0">{ticket.to}</p>
                          <p className="m-0">
                            {ticket.departureTime.split("T")[0]} | {ticket.departureTime.substr(11, 5)}{" "}
                          </p>
                        </div>
                        <div className="">
                          <p className="m-0">{ticket.category}</p>
                          <p className="card-text fw-semibold">Rp {ticket.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <hr />
                    </Link>
                  );
                })}

                <div className="from-ticket d-flex align-items-center justify-content-end">
                  <Link href="/result?category=&from=PADANG&to=&departureTime=&returnTime=" onClick={() => setIsLoading(true)}>
                    <p className="card-text fw-semibold primary-color text-decoration-underline"> More</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-3 mb-3">
            <div className="card shadow departure-card overflow-hidden">
              <div className="card-image d-flex justify-content-center align-items-center text-light fw-semibold " style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/static/images/bali.png')" }}>
                <p className="m-0 fs-5">BALI</p>
              </div>

              <div className="card-body">
                {ticketData.bali.map((ticket, key) => {
                  return (
                    <Link className="" key={key} href={"/tickets/" + ticket.id}>
                      <div className="from-ticket mb-3 d-flex align-items-center justify-content-between">
                        <div className="">
                          <p className="card-text fw-semibold m-0">{ticket.to}</p>
                          <p className="m-0">
                            {ticket.departureTime.split("T")[0]} | {ticket.departureTime.substr(11, 5)}{" "}
                          </p>
                        </div>
                        <div className="">
                          <p className="m-0">{ticket.category}</p>
                          <p className="card-text fw-semibold">Rp {ticket.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <hr />
                    </Link>
                  );
                })}
                <div className="from-ticket d-flex align-items-center justify-content-end">
                  <Link href="/result?category=&from=DENPASAR&to=&departureTime=&returnTime=" onClick={() => setIsLoading(true)}>
                    <p className="card-text fw-semibold primary-color text-decoration-underline"> More</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-3 mb-3">
            <div className="card shadow departure-card overflow-hidden">
              <div
                className="card-image d-flex justify-content-center align-items-center text-light fw-semibold "
                style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/static/images/jakarta.png')", backgroundPosition: "top" }}
              >
                <p className="m-0 fs-5">JAKARTA</p>
              </div>

              <div className="card-body">
                {ticketData.jakarta.map((ticket, key) => {
                  return (
                    <Link className="" key={key} href={"/tickets/" + ticket.id}>
                      <div className="from-ticket mb-3 d-flex align-items-center justify-content-between">
                        <div className="">
                          <p className="card-text fw-semibold m-0">{ticket.to}</p>
                          <p className="m-0">
                            {ticket.departureTime.split("T")[0]} | {ticket.departureTime.substr(11, 5)}{" "}
                          </p>
                        </div>
                        <div className="">
                          <p className="m-0">{ticket.category}</p>
                          <p className="card-text fw-semibold">Rp {ticket.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <hr />
                    </Link>
                  );
                })}
                <div className="from-ticket d-flex align-items-center justify-content-end">
                  <Link href="/result?category=&from=JAKARTA&to=&departureTime=&returnTime=" onClick={() => setIsLoading(true)}>
                    <p className="card-text fw-semibold primary-color text-decoration-underline"> More</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-3 mb-3">
            <div className="card shadow departure-card overflow-hidden">
              <div
                className="card-image d-flex justify-content-center align-items-center text-light fw-semibold "
                style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/static/images/jogjakarta.png')", backgroundPosition: "center" }}
              >
                <p className="m-0 fs-5">YOGYAKARTA</p>
              </div>

              <div className="card-body">
                {ticketData.yogyakarta.map((ticket, key) => {
                  return (
                    <Link className="" key={key} href={"/tickets/" + ticket.id}>
                      <div className="from-ticket mb-3 d-flex align-items-center justify-content-between">
                        <div className="">
                          <p className="card-text fw-semibold m-0">{ticket.to}</p>
                          <p className="m-0">
                            {ticket.departureTime.split("T")[0]} | {ticket.departureTime.substr(11, 5)}{" "}
                          </p>
                        </div>
                        <div className="">
                          <p className="m-0">{ticket.category}</p>
                          <p className="card-text fw-semibold">Rp {ticket.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <hr />
                    </Link>
                  );
                })}
                <div className="from-ticket d-flex align-items-center justify-content-end">
                  <Link href="/result?category=&from=YOGYAKARTA&to=&departureTime=&returnTime=" onClick={() => setIsLoading(true)}>
                    <p className="card-text fw-semibold primary-color text-decoration-underline"> More</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="content-title text-center mb-4">
            <h4 className="m-0">Never miss an offer again!</h4>
            <h4 className="">Send us your email</h4>
          </div>
          <div className="col-10 mx-auto">
            <div className="card primary-background">
              <div className="card-body px-5 py-4 d-flex align-items-center justify-content-between">
                <input type="email" className="form-control py-2 mail-list" id="exampleInputEmail1" aria-describedby="emailHelp" style={{ background: "transparent", color: "white" }} placeholder="Enter Your Email Address" />
                <a href="#" className="btn btn-light primary-color fw-semibold px-5 py-2 fs-6 ms-4">
                  SEND
                </a>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <Modal show={isLoading} centered className="loading-modal">
        <Modal.Body>
          <div className="d-flex flex-column h-100 justify-content-center align-items-center" controlId="formBasicEmail">
            <div className="spinner-border text-light" role="status" style={{ height: "4rem", width: "4rem", borderWidth: "8px" }}></div>
            <p className="text-white fw-semibold m-0 mt-3 fs-5">Loading...</p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HomeContent;
