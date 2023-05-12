import { Chat } from "../chat/chat";
import { Link, useLocation } from "react-router-dom";

export const Footer = () => {
  const location = useLocation();
  return (
    <div>
      <div>
        {location.pathname !== "/" && <Link to={"/"}>Home</Link>}
        <br />
        {location.pathname !== "/ai" &&
          import.meta.env.VITE_ENVIRONMENT === "development" && (
            <Link to={"/ai"}>AI Console</Link>
          )}
        <br />
      </div>

      <Chat />
    </div>
  );
};
