import React from "react";
import { Helmet } from "react-helmet-async";
export default function Seo() {
  return (
    <Helmet>
      <title>풀빛마실</title>
      <meta name="description" content="Home Description" />
      <link rel="icon" href="/favicon.ico" />
    </Helmet>
  );
}
