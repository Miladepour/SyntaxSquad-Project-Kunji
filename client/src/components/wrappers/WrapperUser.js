import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../../components/Footer";

export default function WrapperUser() {
  return(
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}