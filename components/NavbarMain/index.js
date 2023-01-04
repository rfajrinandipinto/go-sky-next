import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import { Router, useRouter } from "next/router";

import Cookies from "js-cookie";
import { ToastContainer } from "react-bootstrap";
import { redirect } from "next/dist/server/api-utils";

const NavbarMain = () => {
  const router = useRouter;
  const getAccessToken = () => Cookies.get("access_token");

  const [notification, setNotification] = useState();
  const [authenticated, setAuthenticated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");

  const toggleShowAlert = () => setShowAlert(!showAlert);

  const isAuthenticated = () => setAuthenticated(!!getAccessToken());

  const [show, setShow] = useState({ login: false, confirm: false, register: false });

  const handleOpenLogin = () => setShow({ login: true });
  const handleCloseLogin = () => setShow({ login: false });

  const handleOpenRegister = () => setShow({ register: true });
  const handleCloseRegister = () => setShow({ register: false });

  const handleOpenConfirm = () => setShow({ confirm: true });
  const handleCloseConfirm = () => setShow({ confirm: false });

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  async function doLogin({ email, password }) {
    let data = null;

    try {
      const response = await fetch("https://gosky.up.railway.app/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      data = await response.json();
      const dataToken = data.data.accessToken;
      return dataToken;
    } catch (err) {
      const dataToken = false;
      return dataToken;
    }
  }

  async function doOtp({ email }) {
    let data = null;
    try {
      const response = await fetch(`https://gosky.up.railway.app/api/auth/otp?email=${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await response.json();
      const dataToken = data.data.otpToken;
      return dataToken;
    } catch (err) {
      const dataToken = false;
      return dataToken;
    }
  }

  async function doOtpConfirm({ name, password, otpCode, otpToken }) {
    const response = await fetch(`https://gosky.up.railway.app/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
        otp: otpCode,
        otpToken: otpToken,
      }),
    });

    console.log(name, password, otpCode, otpToken);

    console.log(response);

    const dataToken = response.data.accessToken;
    return dataToken;
  }

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(false);

  if (typeof window !== "undefined") {
    // Perform localStorage action
    getAccessToken();
  }

  useEffect(() => {
    if (Cookies.get("access_token")) {
      let unread = 0;
      isAuthenticated();
      getDataUser(Cookies.get("access_token"));

      fetch("https://gosky.up.railway.app/api/notifications", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) =>
          data.data.map((item) => {
            if (item.isRead == false) {
              unread++;
            }
          })
        )
        .then(() => setNotification(unread));
    }
  }, []);

  function handleSubmitLogin(e) {
    handleCloseLogin();
    setIsLoading(true);
    e.preventDefault();
    doLogin({ email, password })
      .then((accessToken) => {
        if (accessToken) {
          setAlertContent("Berhasil Login !");
          Cookies.set("access_token", accessToken);
          getDataUser;
        } else {
          setIsLoading(false);
          setAlertContent("GAGAL LOGIN, silahkan cek email dan password anda kembali!");
          handleOpenLogin();
          return Promise.reject();
        }
      })
      .then(() => setIsLoading(false))
      .then(() => isAuthenticated())
      .finally(() => toggleShowAlert());
  }

  function handleSubmitOtp(e) {
    handleCloseConfirm();
    setIsLoading(true);
    e.preventDefault();
    doOtpConfirm({ name, password, otpCode, otpToken })
      .then((accessToken) => {
        if (accessToken) {
          setAlertContent("Konfirmasi Otp Berhasil !");
          Cookies.set("access_token", accessToken);
          isAuthenticated();
          getDataUser(Cookies.get("access_token"));
        } else {
          setIsLoading(false);
          setAlertContent("Konfirmasi OTP gagal, silahkan cek kode OTP anda kembali!");
          handleOpenConfirm();
          return Promise.reject();
        }
      })
      .then(() => getDataUser(getAccessToken()))
      .catch((err) => console.log(err.message))
      .then(() => toggleShowAlert())
      .finally(() => setIsLoading(false));
  }

  function handleSubmitRegister(e) {
    e.preventDefault();
    handleCloseRegister();
    setIsLoading(true);

    doOtp({ email })
      .then((otpToken) => {
        if (otpToken) {
          setAlertContent("Otp Telah Dikirimkan, Silahkan cek email anda");
          setOtpToken(otpToken);
        } else {
          setIsLoading(false);
          setAlertContent("Gagal Mengirim OTp , Silahkan Register Kembali");
          toggleShowAlert();
          handleOpenRegister();
          return Promise.reject();
        }
      })
      .then(() => setAlertContent("Otp Berhasil ,silahkan login"))
      .then(() => toggleShowAlert())
      .then(() => setIsLoading(false))
      .finally(() => handleOpenConfirm());
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    Cookies.remove("access_token");
    isAuthenticated();
    setIsLoggedIn(false);

    await delay(1000);
    setIsLoading(false);
    setAlertContent("Berhasil Logout");
    toggleShowAlert();
  };

  async function getDataUser(token) {
    const response = await fetch("https://gosky.up.railway.app/api/auth/whoami", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const dataUser = data.data;
    console.log(token);
    setUserData(dataUser);
  }

  return (
    <Navbar bg="white" expand="lg">
      <Container>
        <Navbar.Brand href="/home">
          <Image src="/static/images/logo.svg" width={125} height={50} alt="gosky logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center ">
            <a href={authenticated ? "/profile?page=history" : "#"} className="text-dark" onClick={() => (authenticated ? "" : handleOpenLogin())}>
              <i className="bi bi-file-earmark-text-fill me-2 primary-color"></i>
              <span>My Bookings</span>
            </a>
            <a href={authenticated ? "/profile?page=notification" : "#"} className="text-dark mx-2" onClick={() => (authenticated ? "" : handleOpenLogin())}>
              {" "}
              <i className="bi bi-bell-fill primary-color position-relative me-2">
                {notification != 0 ? (
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger " style={{ fontSize: "0.5rem" }}>
                    {notification}
                  </span>
                ) : (
                  ""
                )}
              </i>{" "}
              <span>Notification</span>
            </a>

            {authenticated == false ? (
              <>
                <Nav.Link href="#home" className="text-dark">
                  <Button variant="primary" className="primary-background  " onClick={handleOpenLogin}>
                    <span>Login</span>
                  </Button>{" "}
                </Nav.Link>

                <Nav.Link href="#home" className="text-dark ">
                  <Button variant="primary" className="primary-background" onClick={handleOpenRegister}>
                    Register
                  </Button>{" "}
                </Nav.Link>
              </>
            ) : (
              <NavDropdown
                title={
                  <>
                    <i className="bi bi-person-circle me-1 primary-color"></i>
                    <p className="m-0">{userData.name}</p>
                  </>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                <NavDropdown.Item href="/profile?page=wishlist">Wishlist</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.3">
                  <Button variant="primary" className="primary-background" style={{ width: "120px" }} onClick={handleLogout}>
                    Logout
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Modal show={show.login} onHide={handleCloseLogin} centered>
        <Form onSubmit={handleSubmitLogin}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseLogin} style={{ width: "100px" }}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" style={{ width: "100px" }}>
              Login
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={show.register} onHide={handleCloseRegister} centered>
        <Form onSubmit={handleSubmitRegister}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} value={name} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseRegister} style={{ width: "100px" }}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" style={{ width: "100px" }}>
              Register
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={show.confirm} onHide={handleCloseConfirm} centered>
        <Form onSubmit={handleSubmitOtp}>
          <Modal.Header closeButton>
            <Modal.Title>Konfirmasi Email</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Kode OTP</Form.Label>
              <Form.Control type="text" placeholder="Enter otp code" onChange={(e) => setOtpCode(e.target.value)} value={otpCode} required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" style={{ width: "100px" }}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" style={{ width: "100px" }}>
              Login
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

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
    </Navbar>
  );
};

export default NavbarMain;
