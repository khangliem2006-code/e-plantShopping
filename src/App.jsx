import { useState } from "react";
import AboutUs from "./AboutUs.jsx";
import ProductList from "./ProductList.jsx";
import CartItem from "./CartItem.jsx";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [showProductList, setShowProductList] = useState(false);

  const navigateTo = (nextPage) => {
    setPage(nextPage);

    if (nextPage === "plants") {
      setShowProductList(true);
    } else {
      setShowProductList(false);
    }
  };

  const handleGetStartedClick = () => {
    setShowProductList(true);
    setPage("plants");
  };

  if (page === "plants" && showProductList) {
    return <ProductList onNavigate={navigateTo} />;
  }

  if (page === "cart") {
    return <CartItem onNavigate={navigateTo} />;
  }

  return (
    <div className="app-container">
      <main className="landing-page">
        <div className="background-image"></div>
        
        <header className="landing-navbar">
          <h2>🌿 Paradise Nursery</h2>

          <button onClick={() => navigateTo("plants")}>
            View Plants
          </button>
        </header>

        <section className="hero-content">
          <h1>Welcome to Paradise Nursery</h1>

          <h2>Bring Nature Into Your Home</h2>

          <p>
            Discover beautiful indoor plants to make your home greener,
            fresher, and more relaxing.
          </p>

          <button
            className="get-started-button"
            onClick={handleGetStartedClick}
          >
            Get Started
          </button>
        </section>

        <AboutUs />
      </main>
    </div>
  );
}

export default App;