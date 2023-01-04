import React from "react";
import { SSRProvider } from "react-bootstrap";
import AuthModal from "../components/AuthModal";
import NavbarMain from "../components/NavbarMain";
import Headers from "../components/Headers";
import TicketForm from "../components/TicketForm";
import HomeContent from "../components/HomeContent";
import Footer from "../components/Footer";
import Head from "next/head";

const home = (data) => {
  return (
    <SSRProvider>
      <Head>
        <title>GoSky | Home</title>
      </Head>
      <NavbarMain></NavbarMain>
      <Headers></Headers>
      <TicketForm></TicketForm>
      <HomeContent data={data}></HomeContent>
      <Footer></Footer>
    </SSRProvider>
  );
};

export async function getServerSideProps(context) {
  const ticketResultJakarta = await fetch(
    `https://gosky.up.railway.app/api/tickets?` +
      new URLSearchParams({
        from: "JAKARTA",
      })
  ).then((response) => response.json());

  const ticketResultPadang = await fetch(
    `https://gosky.up.railway.app/api/tickets?` +
      new URLSearchParams({
        from: "PADANG",
      })
  ).then((response) => response.json());

  const ticketResultBali = await fetch(
    `https://gosky.up.railway.app/api/tickets?` +
      new URLSearchParams({
        from: "DENPASAR",
      })
  ).then((response) => response.json());

  const ticketResultYogyakarta = await fetch(
    `https://gosky.up.railway.app/api/tickets?` +
      new URLSearchParams({
        from: "YOGYAKARTA",
      })
  ).then((response) => response.json());

  return {
    props: {
      data: {
        jakarta: ticketResultJakarta.data.slice(0, 5),
        padang: ticketResultPadang.data.slice(0, 5),
        bali: ticketResultBali.data.slice(0, 5),
        yogyakarta: ticketResultYogyakarta.data.slice(0, 5),
      },
    },
  };
}

export default home;
