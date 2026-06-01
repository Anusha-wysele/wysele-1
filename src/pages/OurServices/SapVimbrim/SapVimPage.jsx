import Breadcrumbs from "../../../components/common/Breadcrumbs";
import SapBrimservices from "./SapBrimservices";
import SapVimhero from "./SapVimhero";
import SapVimservices from "./SapVimservices";
import SapVimtransform from "./SapVimtransform";
import SapVimwhychoose from "./SapVimwhychoose";

export default function SapVimPage() {
  return (
    <main className="bg-white pt-12">
      <SapVimhero />
      <Breadcrumbs />
      <SapVimtransform />
      <SapVimservices />
      <SapBrimservices />
      <SapVimwhychoose />
    </main>
  );
}
