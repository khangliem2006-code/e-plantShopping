import { useState } from "react";
import AboutUs from "./AboutUs.jsx";
import ProductList from "./ProductList.jsx";
import CartItem from "./CartItem.jsx";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  if (page === "plants") {
    return <ProductList onNavigate={navigateTo} />;
  }

  if (page === "cart") {
    return <CartItem onNavigate={navigateTo} />;
  }

  return (
    <main className="landing-page">
      <header className="landing-navbar">
        <h2>🌿 Paradise Nursery</h2>
        <button onClick={() => navigateTo("plants")}>
          View Plants
        </button>
      </header>

      <section className="hero-content">
        <h1>Paradise Nursery</h1>
        <h2>Bring Nature Into Your Home</h2>

        <p>
          Discover beautiful indoor plants to make your home greener,
          fresher, and more relaxing.
        </p>

        <button
          className="get-started-button"
          onClick={() => navigateTo("plants")}
        >
          Get Started
        </button>
      </section>

      <AboutUs />
    </main>
  );
}

export default App;
