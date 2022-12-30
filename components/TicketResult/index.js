import React, { useState } from "react";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { ToastContainer, Toast } from "react-bootstrap";

import { useAppContext } from "../../pages/context/AppContext";

const TicketResult = (props) => {
  const router = useRouter();

  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");

  const toggleShowAlert = () => setShowAlert(!showAlert);

  const [ticketData, setTicketData] = useState(props.data);

  const [appState, setAppState] = useAppContext();

  const resultMinutes = (time) => {
    const d = new Date(time);
    return d.getTime();
  };

  const arriveTime = (time, duration) => {
    const d = new Date(time);
    d.setMinutes(d.getMinutes() + duration);
    return d.toISOString();
  };

  const handleWishlist = (id) => {
    const token = Cookies.get("access_token");

    if (token) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      };

      fetch(`https://gosky.up.railway.app/api/tickets/${id}/wishlist`, requestOptions)
        .then((response) => response.json())
        .then((response) => console.log(response))
        .then(() => setAlertContent("Berhasil ditambahkan ke wishlist anda"))
        .then(() => toggleShowAlert());
    } else {
      setAlertContent("Anda belum Login, seilahkan login terlebih dahulu");
      toggleShowAlert();
    }
  };

  return (
    <div className="TicketResultSeciton">
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-8">
            <Card className="mb-4 py-3">
              <Card.Body className="d-flex justify-content-between">
                <div>
                  <div className="fw-semibold fs-5">
                    {router.query.from} <i className="bi bi-arrow-right mx-2"></i> {router.query.to}{" "}
                  </div>
                  <div className="fs-5">
                    {router.query.departureTime.split("T")[0]} | {router.query.category || "ONE WAY / ROUND_TRIP"}{" "}
                  </div>
                </div>

                <link href="/home" className="d-flex">
                  <Button variant="primary primary-background px-4 ">Change search</Button>
                </link>
              </Card.Body>
            </Card>
            {ticketData.map((ticket, key) => {
              if (ticket.category == "ONE_WAY") {
                return (
                  <Card className="mb-4" key={key}>
                    <Card.Img variant="top" src={ticket.imageUrl} style={{ maxHeight: "100px", objectFit: "cover" }} />
                    <Card.Body className="row p-4 justify-content-between d-flex">
                      <div className="col-2 text-center">
                        <Image src="/static/images/logo.svg" width={125} height={50} className="me-4" alt="..." />
                      </div>
                      <div className="col-6 d-flex align-items-center flex-column">
                        <div className="d-flex align-items-center">
                          <div className="text-center me-5">
                            <p className="mb-1">{ticket.departureTime.match(/\d\d:\d\d/)}</p>
                            <p className="mb-0">{ticket.from}</p>
                          </div>
                          <div className="text-center mx-4">
                            <p className="mb-1">0H {ticket.duration}M</p>
                            <div className="mb-0">
                              <hr className="w-100"></hr>
                            </div>
                          </div>
                          <div className="text-center ms-5">
                            <p className="mb-1">{arriveTime(ticket.departureTime, ticket.duration).match(/\d\d:\d\d/)}</p>
                            <p className="mb-0">{ticket.to}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-3 text-center">
                        <div>
                          {" "}
                          <span className="fw-semibold">Rp {ticket.price.toLocaleString()}</span> / pax
                        </div>
                        <div className="d-flex mt-1">
                          <Link href={"/tickets/" + ticket.id} className="w-75 me-2">
                            <Button variant="primary w-100  primary-background">Choose</Button>
                          </Link>
                          <Button
                            variant="primary w-25 btn-danger"
                            onClick={() => {
                              handleWishlist(ticket.id);
                            }}
                          >
                            <i className="bi bi-heart"></i>
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                );
              } else {
                return (
                  <Card className="mb-4" key={key}>
                    <Card.Img variant="top" src={ticket.imageUrl} style={{ maxHeight: "100px", objectFit: "cover" }} />
                    <Card.Body className="row p-4 justify-content-between d-flex">
                      <div className="col-2 text-center d-flex align-items-center">
                        <Image src="/static/images/logo.svg" width={125} height={50} className="me-4" alt="..." />
                      </div>
                      <div className="col-6 d-flex align-items-center flex-column">
                        <div className="d-flex w-100 row ">
                          <div className="text-center col-4">
                            <p className="mb-1">{ticket.departureTime.match(/\d\d:\d\d/)}</p>
                            <p className="mb-0">{ticket.from}</p>
                          </div>
                          <div className="text-center col-4">
                            <p className="mb-1">0H {ticket.duration}M</p>
                            <div className="mb-0">
                              <hr className="w-100"></hr>
                            </div>
                          </div>
                          <div className="text-center col-4">
                            <p className="mb-1">{arriveTime(ticket.departureTime, ticket.duration).match(/\d\d:\d\d/)}</p>
                            <p className="mb-0">{ticket.to}</p>
                          </div>
                        </div>
                        <div className=" row w-100 mt-4">
                          <div className="text-center col-4 ">
                            <p className="mb-1">{ticket.returnTime.match(/\d\d:\d\d/)}</p>
                            <p className="mb-0">{ticket.to}</p>
                          </div>
                          <div className="text-center col-4 ">
                            <p className="mb-1">0H {ticket.duration}M</p>
                            <div className="mb-0">
                              <hr className="w-100"></hr>
                            </div>
                          </div>
                          <div className="text-center col-4 ">
                            <p className="mb-1">{arriveTime(ticket.returnTime, ticket.duration).match(/\d\d:\d\d/)}</p>
                            <p className="mb-0">{ticket.from}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-3 text-center d-flex flex-column justify-content-end">
                        <div>
                          {" "}
                          <span className="fw-semibold">Rp {ticket.price.toLocaleString()}</span> / pax
                        </div>
                        <div className="d-flex mt-1">
                          <Link href={"/tickets/" + ticket.id} className="w-75 me-2">
                            <Button variant="primary w-100  primary-background">Choose</Button>
                          </Link>
                          <Button
                            variant="primary w-25 btn-danger"
                            onClick={() => {
                              handleWishlist(ticket.id);
                            }}
                          >
                            <i className="bi bi-heart"></i>
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                );
              }
            })}
          </div>
        </div>
      </div>

      <ToastContainer position={"top-center"} className="mt-5">
        <Toast show={showAlert} onClose={toggleShowAlert} delay={3000} autohide>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">GoSky</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>{alertContent}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default TicketResult;
