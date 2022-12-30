import React from "react";
import { SSRProvider } from "react-bootstrap";
import NavbarMain from "../components/NavbarMain";
import Headers from "../components/Headers";
import TicketResult from "../components/TicketResult";
import { useRouter } from "next/router";

const result = ({ data }) => {
  return (
    <SSRProvider>
      <NavbarMain></NavbarMain>
      <TicketResult data={data}></TicketResult>
    </SSRProvider>
  );
};

export async function getServerSideProps(context) {
  const urlQuery = context.query;

  const ticketResult = await fetch(
    `https://gosky.up.railway.app/api/tickets?` +
      new URLSearchParams({
        category: urlQuery.category,
        from: urlQuery.from,
        to: urlQuery.to,
        departureTime: urlQuery.departureTime,
        returnTime: urlQuery.returnTime,
      })
  ).then((response) => response.json());

  return {
    props: { data: ticketResult.data },
  };
}

export default result;
