import React from "react";
import { useRouter } from "next/dist/client/router";
import NavbarMain from "../../components/NavbarMain";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "next/image";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { ToastContainer, Toast, Modal } from "react-bootstrap";

import Cookies from "js-cookie";

const Ticket = ({ data }) => {
  const [ticket, setTicket] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");

  const toggleShowAlert = () => setShowAlert(!showAlert);
  const [userData, setUserData] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    const authenticated = Cookies.get("access_token");
    authenticated ? getDataUser() : "";
  }, []);

  const router = useRouter();
  const { id } = router.query;

  const arriveTime = (time, duration) => {
    const d = new Date(time);
    d.setMinutes(d.getMinutes() + duration);
    return d.toISOString();
  };

  async function getDataUser() {
    const newToken = Cookies.get("access_token");
    const response = await fetch("https://gosky.up.railway.app/api/auth/whoami", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${newToken}`,
      },
    });
    const data = await response.json();
    const dataUser = data.data;
    setUserData(dataUser);
  }

  async function handleBook() {
    const newToken = Cookies.get("access_token");

    if (newToken) {
      setIsLoading(true);
      const response = await fetch("https://gosky.up.railway.app/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newToken}`,
        },
        body: JSON.stringify({
          ticketId: id,
          amount: 1,
        }),
      });
      setIsLoading(false);
      setAlertContent("Booking Berhasil !");
      toggleShowAlert();
    } else {
      setAlertContent("Anda Belum  Login , silahkan login terlebih dahulu");
      toggleShowAlert();
    }
  }

  return (
    <div className="TicketDetailSection">
      <NavbarMain></NavbarMain>
      <div className="container">
        <h4 className="fw-semibold mt-4">Your Booking</h4>
        <p> Isi detail pemesanan booking anda</p>

        <h5 className="mb-3">Contact Details</h5>
        <div className="row flex-reverse-md">
          <div className="col-xl-8 col-12">
            <Form>
              <Card>
                <Card.Body>
                  <Card.Title>contact details for E-Tciket</Card.Title>

                  <div className="row">
                    <div className="col-12 col-md-6">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Your Name" value={userData ? userData.name : ""} onChange={(e) => setUserData({ ...userData, phone: e.target.value })} required />
                        <Form.Text className="text-muted">e.g. your name</Form.Text>
                      </Form.Group>
                    </div>
                    <div className="col-6"></div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-md-6">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={userData ? userData.email : ""} onChange={(e) => setUserData({ ...userData, phone: e.target.value })} required />
                        <Form.Text className="text-muted">e.g. email@gamil.com</Form.Text>
                      </Form.Group>
                    </div>
                    <div className="col-12 col-md-6">
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control type="number" placeholder="Your Mobile Number" value={userData ? userData.phone : ""} onChange={(e) => setUserData({ ...userData, phone: e.target.value })} required />
                        <Form.Text className="text-muted">e.g. +628948759</Form.Text>
                      </Form.Group>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <div className="d-flex mt-3">
                <Button variant="primary ms-auto primary-background px-5" onClick={handleBook}>
                  Confirm
                </Button>
              </div>
            </Form>
          </div>
          <div className="col-12 col-sm-8 col-xl-4 mb-4 ">
            <Card>
              <Card.Body>
                <Card.Title className="d-flex justify-content-center align-items-center">
                  {ticket.from} <i className="bi bi-arrow-right mx-3 fs-3"></i> {ticket.to}
                </Card.Title>
                <hr></hr>
                <Card.Text className="fw-semibold">Departure : {ticket.departureTime.split("T")[0]}</Card.Text>
                <div className="d-flex align-items-center">
                  <Image src="/static/images/logo.svg" width={125} height={50} className="me-3" alt="..." />
                  <p className="m-0 fs-5 fw-semibold">GoSky Airline</p>
                </div>
                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center mt-2">
                    <div className="text-center me-5">
                      <p className="mb-1">{ticket.departureTime.match(/\d\d:\d\d/)}</p>
                      <p className="mb-0">{ticket.from}</p>
                    </div>
                    <div className="text-center mx-4">
                      <p className="mb-1">{ticket.duration}M</p>
                      <hr></hr>
                    </div>
                    <div className="text-center ms-5">
                      <p className="mb-1">{arriveTime(ticket.departureTime, ticket.duration).match(/\d\d:\d\d/)}</p>
                      <p className="mb-0">{ticket.to}</p>
                    </div>
                  </div>
                </div>
                {ticket.category == "ROUND_TRIP" ? (
                  <div className="">
                    <hr></hr>
                    <Card.Text className="fw-semibold">Return : {ticket.returnTime.split("T")[0]}</Card.Text>
                    <div className="d-flex align-items-center">
                      <Image src="/static/images/logo.svg" width={125} height={50} className="me-3" alt="" />
                      <p className="m-0 fs-5 fw-semibold">GoSky Airline</p>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="d-flex align-items-center mt-2">
                        <div className="text-center me-5">
                          <p className="mb-1">{ticket.returnTime.match(/\d\d:\d\d/)}</p>
                          <p className="mb-0">{ticket.to}</p>
                        </div>
                        <div className="text-center mx-4">
                          <p className="mb-1">{ticket.duration}M</p>
                          <hr></hr>
                        </div>
                        <div className="text-center ms-5">
                          <p className="mb-1">{arriveTime(ticket.returnTime, ticket.duration).match(/\d\d:\d\d/)}</p>
                          <p className="mb-0">{ticket.from}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      <Modal show={isLoading} centered className="loading-modal">
        <Modal.Body>
          <Form.Group className="d-flex flex-column h-100 justify-content-center align-items-center" controlId="formBasicEmail">
            <div className="spinner-border text-light" role="status" style={{ height: "4rem", width: "4rem", borderWidth: "8px" }}></div>
            <p className="text-white fw-semibold m-0 mt-3 fs-5">Loading...</p>
          </Form.Group>
        </Modal.Body>
      </Modal>

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

export async function getServerSideProps(context) {
  const res = await fetch(`https://gosky.up.railway.app/api/tickets/${context.params.id}`);
  const result = await res.json();

  return {
    props: { data: result.data },
  };
}

export default Ticket;
