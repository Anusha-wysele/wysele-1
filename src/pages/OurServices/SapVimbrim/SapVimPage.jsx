import React from "react";
import SapVimhero from "./SapVimhero";
import SapVimtransform from "./SapVimtransform";
import SapVimservices from "./SapVimservices";
import SapBrimservices from "./SapBrimservices";
import SapVimwhychoose from "./SapVimwhychoose";

export default function SapVimPage() {
  return (
    <main className="bg-white pt-12">
      <SapVimhero />
      <SapVimtransform />
      <SapVimservices />
      <SapBrimservices />
      <SapVimwhychoose />
    </main>
  );
}
