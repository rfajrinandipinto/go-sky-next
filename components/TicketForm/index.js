import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useRouter } from "next/router";
import { useAppContext } from "../../pages/context/AppContext";

const TicketForm = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  // Airport Data
  const airport = [
    {
      name: "Jakarta (JKTA)",
      value: "JAKARTA",
    },
    {
      name: "Denpasar (DPS)",
      value: "DENPASAR",
    },
    {
      name: "Yogyakarta (YIA)",
      value: "YOGYAKARTA",
    },
    {
      name: "Surabaya (SUB)",
      value: "SURABAYA",
    },
    {
      name: "Medan (KNO)",
      value: "MEDAN",
    },
    {
      name: "Solo (SOC)",
      value: "SOLO",
    },
    {
      name: "Semarang (SRG)",
      value: "SEMARANG",
    },
    {
      name: "Padang (PDG)",
      value: "PADANG",
    },
    {
      name: "Makassar (UPG)",
      value: "MAKASSAR",
    },
    {
      name: "Pontianak (PNK)",
      value: "PONTIANAK",
    },
    {
      name: "Banjarmasin (BDJ)",
      value: "BANJARMASIN",
    },
    {
      name: "Palembang (PLM)",
      value: "PALEMBANG",
    },
    {
      name: "Bandung (BDO)",
      value: "BANDUNG",
    },
    {
      name: "Jayapura (DJJ)",
      value: "JAYAPURA",
    },
  ];

  // Getting ISO Date
  const date = new Date();
  const isoDate = date.toISOString().split("T")[0];

  // Form State
  const [formData, setFormData] = useState({
    category: "ONE_WAY",
    from: "JAKARTA",
    to: "DENPASAR",
    departureTime: isoDate,
    returnTime: "",
  });

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    router.push({
      pathname: "/result",
      query: {
        category: formData.category,
        from: formData.from,
        to: formData.to,
        departureTime: formData.departureTime,
        returnTime: formData.departureTime,
      },
    });
  };

  useEffect(() => {});

  return (
    <div className="TicketFormSection">
      <div className="container">
        <Card className="mx-auto border-0 shadow" style={{ borderRadius: "1rem" }}>
          <Card.Body className="p-4">
            <Form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-sm-12 col-md-4">
                  <Form.Group className="mb-sm-3 mb-lg-0">
                    <FloatingLabel controlId="floatingInputDeparture" label="Dari" className="mb-3">
                      <Form.Select name="from" value={formData.from} required onChange={(e) => setFormData({ ...formData, from: e.target.value })} style={{ borderRadius: "0.5rem" }}>
                        {airport.map((item, key) => {
                          return (
                            <option key={key} value={item.value}>
                              {item.name}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                </div>
                <div className="col-sm-12 col-md-4">
                  <Form.Group className="mb-sm-3 mb-lg-0">
                    <FloatingLabel controlId="floatingInputReturn" label="Ke" className="mb-3">
                      <Form.Select name="to" value={formData.to} required onChange={(e) => setFormData({ ...formData, to: e.target.value })}>
                        {airport.map((item, key) => {
                          return (
                            <option key={key} value={item.value}>
                              {item.name}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                </div>
                <div className="col-sm-12 col-md-4 d-flex">
                  <Form.Group className="mb-3 mb-md-0 d-flex justify-content-around align-items-center w-100">
                    <Form.Check type="radio" label="One Way" name="category" value="ONE_WAY" onChange={(e) => setFormData({ ...formData, category: e.target.value })} defaultChecked />

                    <Form.Check type="radio" label="Round Trip" name="category" value="ROUND_TRIP" onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                  </Form.Group>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12 col-md-4">
                  <Form.Group className="mb-3 mb-md-0">
                    <FloatingLabel controlId="floatingInputDepartureTime" label="Pergi" className="" required>
                      <Form.Control type="date" name="departureTime" onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })} value={formData.departureTime} min={isoDate} />
                    </FloatingLabel>
                  </Form.Group>
                </div>
                <div className="col-sm-12 col-md-4">
                  <Form.Group className="mb-3 mb-md-0">
                    <FloatingLabel controlId="floatingInputReturnTime" label="Pulang" className="">
                      <Form.Control type="date" name="returnTime" disabled={formData.category == "ONE_WAY"} onChange={(e) => setFormData({ ...formData, returnTime: e.target.value })} value={formData.departureTime} min={isoDate} />
                    </FloatingLabel>
                  </Form.Group>
                </div>
                <div className="col-sm-12 col-md-4 pb-sm-3 pb-md-0">
                  <Button variant="primary" type="submit" className="w-100 h-100 primary-background">
                    Submit
                  </Button>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <Modal show={isLoading} centered className="loading-modal">
        <Modal.Body>
          <Form.Group className="d-flex flex-column h-100 justify-content-center align-items-center" controlId="formBasicEmail">
            <div className="spinner-border text-light" role="status" style={{ height: "4rem", width: "4rem", borderWidth: "8px" }}></div>
            <p className="text-white fw-semibold m-0 mt-3 fs-5">Loading...</p>
          </Form.Group>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TicketForm;
