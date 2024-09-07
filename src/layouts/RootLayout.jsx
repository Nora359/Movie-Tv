// layouts/RootLayout.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div style={layoutStyle}>
      <Header />
      <div className="px-4 lg:px-0" style={contentStyle}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

const layoutStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh", 
};

const contentStyle = {
  flex: 1, 
};
