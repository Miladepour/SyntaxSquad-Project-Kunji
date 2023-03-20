import { Outlet } from "react-router-dom";
import Header from "../Header";

export default function WrapperUser() {
  return(
    <div>
      <Header />
      <Outlet />
    </div>
  );
}