import { useState } from "react";

const Admin = () => {
  const [ticketsData, setTicketsData] = useState();
  const [ticketFilter, setTicketFilter] = useState({
    category: "ONE_WAY",
    from: "JAKARTA",
    to: "DENPASAR",
    departureTime: "2022-12-23",
  });

  const getTickets = () => {
    fetch(`https://gosky.up.railway.app/api/tickets?category=`)
      .then((response) => response.json())
      .then((data) => setTicketsData(data.data));
    console.log(ticketsData);
  };

  return (
    <div className="admin-pages">
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 bg-primary p-3 text-white" style={{ height: "100vh" }}>
            <p>Logo</p>
            <hr className="text-white" />
            <p>Dashboard</p>
            <hr className="text-white" />
            <a className="text-white" onClick={getTickets}>
              <p>Tickets</p>
            </a>

            <p>Transactions</p>
          </div>
          <div className="col-10 ps-0">
            <nav class="navbar navbar-expand-lg bg-light">
              <div class="container-fluid">
                <a class="navbar-brand" href="#">
                  Navbar
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="#">
                        Home
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">
                        Link
                      </a>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                      </a>
                      <ul class="dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#">
                            Action
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            Another action
                          </a>
                        </li>
                        <li>
                          <hr class="dropdown-divider" />
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            Something else here
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link disabled">Disabled</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div className="container dashboard-content mt-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
