import React, { useEffect } from "react";
import Cookies from "js-cookie";
import NavbarMain from "../../components/NavbarMain";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Footer from "../../components/footer";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { ToastContainer, Toast, Modal, Form } from "react-bootstrap";

const Profile = ({ data, transactionData, wishlistData, notificationsData, pageContent }) => {
  const router = useRouter();

  const [showResetEmail, setShowResetEmail] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const [showOtp, setShowOtp] = useState(false);

  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [otpToken, setOtpToken] = useState("");
  const [otp, setOtp] = useState("");

  const toggleResetEmail = () => setShowResetEmail(!showResetEmail);
  const toggleResetPassword = () => setShowResetPassword(!showResetPassword);
  const toggleOtp = () => setShowOtp(!showOtp);

  const [image, setImage] = useState("");

  const handleImage = (e) => {
    setIsLoading(true);
    setImage(e.target.files[0]);

    const token = Cookies.get("access_token");

    let imageData = new FormData();
    imageData.append("image", e.target.files[0]);
    console.log(imageData);

    const requestOptionsImage = {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: imageData,
    };

    fetch("https://gosky.up.railway.app/api/images?type=PROFILE_IMG", requestOptionsImage)
      .catch((err) => console.log(err))
      .then((response) => response.json())
      .then((data) => setFormData((formData) => ({ ...formData, imageUrl: data.data.imageUrl, imageId: data.data.imageId })))
      .then(() => setIsLoading(false));
  };

  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");

  const toggleShowAlert = () => setShowAlert(!showAlert);

  const [formData, setFormData] = useState({
    name: data.name,
    phone: data.phone,
    address: data.address,
    imageId: data.imageId,
    imageUrl: data.imageUrl,
  });

  const [wishlistTicket, setWishlistTicket] = useState(wishlistData);
  const [notification, setNotification] = useState(notificationsData);

  const [mainContent, setMainContent] = useState(pageContent || "profile");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const token = Cookies.get("access_token");

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        imageUrl: formData.imageUrl,
        imageId: formData.imageId,
      }),
    };

    fetch("https://gosky.up.railway.app/api/users", requestOptions)
      .catch((err) => console.log(err))
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => setAlertContent("Profil telah di update"))
      .then(() => setIsLoading(false))
      .then(() => toggleShowAlert());
  };

  const handleResetEmail = (e) => {
    e.preventDefault();
    toggleResetEmail();

    setIsLoading(true);
    const requestOptions = {
      method: "PUT",
      headers: { accept: "application/json" },
    };

    fetch(`https://gosky.up.railway.app/api/users/password`, requestOptions)
      .catch((err) => console.log(err))
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => setAlertContent("Passowrd Berhasil diubah"))
      .then(() => setIsLoading(false))
      .then(() => toggleShowAlert());
  };

  useEffect(() => {
    console.log(oldPassword);
    console.log(newPassword);
  }, [oldPassword, newPassword]);

  const handleResetPassword = (e) => {
    e.preventDefault();
    toggleResetPassword();

    const token = Cookies.get("access_token");

    console.log(oldPassword);
    console.log(newPassword);

    setIsLoading(true);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        password: oldPassword,
        newPassword: newPassword,
      }),
    };

    fetch(`https://gosky.up.railway.app/api/users/password`, requestOptions)
      .catch((err) => console.log(err))
      .then((response) => response.json())
      .then(() => setAlertContent("Pasword telah di reset"))
      .then(() => setIsLoading(false))
      .then(() => toggleShowAlert());
  };

  const handleSubmitOtp = (e) => {
    e.preventDefault();
    toggleOtp();

    setIsLoading(true);

    const token = Cookies.get("access_token");
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        otp: otp,
        otpToken: otpToken,
      }),
    };

    fetch(`https://gosky.up.railway.app/api/users/email`, requestOptions)
      .catch((err) => console.log(err))
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => setAlertContent("email berhasil diubah"))
      .then(() => setIsLoading(false))
      .then(() => toggleShowAlert());
  };

  const handleRemoveWishlist = (id) => {
    const token = Cookies.get("access_token");
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    };

    fetch(`https://gosky.up.railway.app/api/tickets/${id}/wishlist`, requestOptions)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .then(() => router.reload());
  };

  const handleRead = (id) => {
    setIsLoading(true);
    const token = Cookies.get("access_token");
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    };
    fetch(`https://gosky.up.railway.app/api/notifications/${id}/read`, requestOptions)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .then(() => router.reload());
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const renderMainContent = (param) => {
    switch (param) {
      case "profile":
        return (
          <div className="">
            <h4 className="fw-semibold mb-4">Profile Settings</h4>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title fw-semibold">Personal Data</h5>
                <hr></hr>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Image
                    </label>
                    <div className="bg-secondary mb-3" style={{ width: "150px", height: "150px", overflow: "hidden" }}>
                      <img src={data.imageUrl} alt="" className="img-fluid" style={{ objectFit: "contain", objectPosition: "top" }} />
                    </div>

                    <input type="file" className="form-control" onChange={handleImage} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Full Name
                    </label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={formData.name} required onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        email
                      </label>
                      <a onClick={toggleResetEmail} className="text-decoration-underline text-primary">
                        Change Email
                      </a>
                    </div>

                    <input type="email" className="form-control" id="user_email" aria-describedby="emailHelp" value={data.email} disabled />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Phone Number
                    </label>
                    <input type="number" className="form-control" id="user_phone" aria-describedby="emailHelp" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      address
                    </label>
                    <input type="text" className="form-control" id="user_address" aria-describedby="emailHelp" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="exampleInputPassword1" className="form-label">
                        Password
                      </label>
                      <a onClick={toggleResetPassword} className="text-decoration-underline text-primary">
                        Change Password
                      </a>
                    </div>

                    <input type="password" className="form-control" id="exampleInputPassword1" disabled value={"12345"} />
                  </div>
                  <div className="w-100 d-flex justify-content-end">
                    <button type="submit" className="btn btn-light me-3" style={{ width: "100px" }}>
                      cancel
                    </button>
                    <button type="submit" className="btn btn-primary primary-background" style={{ width: "100px" }}>
                      save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      case "history":
        return (
          <div className="">
            <h4 className="fw-semibold mb-4">Booking History</h4>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title fw-semibold">Recent Booking</h5>
                <hr></hr>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    {transactionData.map((data, key) => {
                      return (
                        <div className="card mb-3" key={key}>
                          <div className="card-body">
                            <div className="card-title d-flex justify-content-between">
                              <p className="mb-0 fw-semibold">Booking ID {data.bookingCode} </p>
                              <p className="mb-0 fw-semibold fs-5">Rp {data.ticket.price.toLocaleString()}</p>
                            </div>
                            <hr />
                            <div className="card-text d-flex align-items-center">
                              <i className="bi bi-airplane-fill primary-color fs-4 me-3"></i>
                              <p className="m-0 fs-5 fw-semibold">{data.ticket.from}</p>
                              <i className="bi bi-arrow-right mx-2"></i>
                              <p className="m-0 fs-5 fw-semibold">{data.ticket.to}</p>
                            </div>
                            <div className="d-flex">
                              <p className="m-0 me-2">{data.ticket.departureTime.split("T")[0]}</p>|<p className="m-0 ms-2">{data.ticket.departureTime.match(/\d\d:\d\d/)}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      case "wishlist":
        return (
          <div className="">
            <h4 className="fw-semibold mb-4">Wishlist</h4>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title fw-semibold">Wishlisted Tickets</h5>
                <hr></hr>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    {wishlistTicket.map((data, key) => {
                      return (
                        <div className="card mb-3" key={key}>
                          <div className="card-body">
                            <div className="card-title d-flex justify-content-between">
                              <p className="mb-0 fw-semibold">Flight Number {data.flightNumber} </p>
                              <p className="mb-0 fw-semibold fs-5">Rp {data.price.toLocaleString()}</p>
                            </div>
                            <hr />
                            <div className="card-text d-flex align-items-center">
                              <i className="bi bi-airplane-fill primary-color fs-4 me-3"></i>
                              <p className="m-0 fs-5 fw-semibold">{data.from}</p>
                              <i className="bi bi-arrow-right mx-2"></i>
                              <p className="m-0 fs-5 fw-semibold">{data.to}</p>
                            </div>
                            <div className="d-flex">
                              <p className="m-0 me-2">{data.departureTime.split("T")[0]}</p>|<p className="m-0 ms-2">{data.departureTime.match(/\d\d:\d\d/)}</p>
                            </div>
                            <div className="w-100 d-flex justify-content-end">
                              <button type="submit" className="btn btn-light me-3" style={{ width: "100px" }}>
                                detail
                              </button>
                              <button type="submit" className="btn btn-primary" style={{ width: "100px" }} onClick={() => handleRemoveWishlist(data.id)}>
                                remove
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      case "notification":
        return (
          <div className="">
            <h4 className="fw-semibold mb-4">Notification</h4>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title fw-semibold">Recent Nitification</h5>
                <hr></hr>
                <div className="row">
                  <div className="mb-3">
                    {notification.map((data, key) => {
                      return (
                        <div className="card mb-3" key={key}>
                          <div className="card-body row">
                            <div className="card-title d-flex justify-content-between col-lg-10 col-12">
                              <p className="mb-0 fw-semibold">{data.message} </p>
                            </div>
                            <div className="card-title d-flex flex-column justify-content-between justify-content-between col-lg-2 col-5 mx-auto ">
                              {data.isRead == false ? <span className="badge bg-secondary mb-3 bg-danger">Unread</span> : <span className="badge bg-secondary mb-3 bg-success">read</span>}

                              <button type="button" className="btn btn-primary " onClick={() => handleRead(data.id)}>
                                Mark as read
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="profileSection">
      <Head>
        <title>GoSky | Profile</title>
      </Head>
      <NavbarMain></NavbarMain>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-12">
            <Card>
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="rounded-circle me-3" style={{ width: "40px", height: "40px", backgroundColor: "grey" }}>
                    <img className="img-fluid" src={data.imageUrl} alt="" />
                  </div>

                  <p className="m-0 fs-5">{data.name}</p>
                </div>
                <hr />

                <a onClick={() => setMainContent("history")}>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-journal-text me-2 fs-5 primary-color"></i>
                    <p className="fs-5 m-0 ">Booking History</p>
                  </div>
                </a>

                <a onClick={() => setMainContent("wishlist")}>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-heart-fill me-2 fs-5 primary-color"></i>
                    <p className="fs-5 m-0">Wishlist</p>
                  </div>
                </a>

                <a onClick={() => setMainContent("notification")}>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-bell-fill me-2 fs-5 primary-color"></i>
                    <p className="fs-5 m-0">Notification</p>
                  </div>
                </a>

                <hr />
                <a onClick={() => setMainContent("profile")}>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-gear-fill me-2 fs-5 primary-color"></i>
                    <p className="fs-5 m-0">My Account</p>
                  </div>
                </a>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-8 col-12 mt-3">{renderMainContent(mainContent)}</div>
        </div>
      </div>
      <Footer></Footer>
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
          </Toast.Header>
          <Toast.Body>{alertContent}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal show={showResetEmail} onHide={toggleResetEmail} centered>
        <Form onSubmit={handleResetEmail}>
          <Modal.Header closeButton>
            <Modal.Title>Change Email</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>New Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setNewEmail(e.target.value)} value={newEmail} required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleResetEmail} style={{ width: "100px" }}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" style={{ width: "100px" }}>
              Login
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showResetPassword} onHide={toggleResetPassword} centered>
        <Form onSubmit={handleResetPassword}>
          <Modal.Header closeButton>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Old Password</Form.Label>
              <Form.Control type="text" placeholder="Enter old password" onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="text" placeholder="Enter new password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleResetPassword} style={{ width: "100px" }}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" style={{ width: "100px" }}>
              Confirm
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showOtp} onHide={toggleOtp} centered>
        <Form onSubmit={handleSubmitOtp}>
          <Modal.Header closeButton>
            <Modal.Title>Konfirmasi Otp</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Kode Otp</Form.Label>
              <Form.Control type="text" placeholder="Enter otp code" onChange={(e) => setOtp(e.target.value)} value={otp} required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleOtp} style={{ width: "100px" }}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" style={{ width: "100px" }}>
              Login
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export async function getServerSideProps(context) {
  const newToken = context.req.cookies["access_token"];
  if (newToken === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const userDataResponse = await fetch("https://gosky.up.railway.app/api/auth/whoami", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${newToken}`,
    },
  });
  const userData = await userDataResponse.json();

  const transactionDataResponse = await fetch("https://gosky.up.railway.app/api/transactions", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${newToken}`,
    },
  });
  const transactionData = await transactionDataResponse.json();

  const wishlistDataResponse = await fetch("https://gosky.up.railway.app/api/wishlist", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${newToken}`,
    },
  });
  const wishlistData = await wishlistDataResponse.json();

  const notificationsDataResponse = await fetch("https://gosky.up.railway.app/api/notifications", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${newToken}`,
    },
  });
  const notificationsData = await notificationsDataResponse.json();

  const pageContent = context.query.page ? context.query.page : null;

  return {
    props: { data: userData.data, transactionData: transactionData.data, wishlistData: wishlistData.data, notificationsData: notificationsData.data, pageContent: pageContent },
  };
}

export default Profile;
