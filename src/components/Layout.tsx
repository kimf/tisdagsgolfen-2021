import Head from "next/head"

import Navbar from "./ui/Navbar"

export default function Layout({ children }: any) {
  return (
    <>
      <Head>
        <title>Tisdagsgolfen</title>
        <meta charSet="utf-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="robots" content="follow, index" />
        <link href="/favicon.ico" rel="shortcut icon" />
        <meta content="Ledartavla för tisdagsgolfen" name="description" />
        <meta property="og:url" content="https://tisdagsgolfen.fransman.se" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tisdagsgolfen" />
        <meta property="og:description" content="Ledartavla för tisdagsgolfen" />
        <meta property="og:title" content="Tisdagsgolfen" />
        <meta property="og:image" content="/og.png" />
      </Head>
      <Navbar />
      <main id="skip">{children}</main>
    </>
  )
}
