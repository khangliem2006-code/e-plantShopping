
import { useDispatch, useSelector } from "react-redux";
import plants from "./plants.js";
import { addItem } from "./CartSlice.jsx";
import "./ProductList.css";

function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate the total quantity of all plants in the cart.
  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Track which plants have already been added to the cart.
  const addedToCart = cartItems.reduce((result, item) => {
    result[item.name] = true;
    return result;
  }, {});

  // Get all available plant categories.
  const categories = [...new Set(plants.map((plant) => plant.category))];

  const handleAddToCart = (plant) => {
    if (!addedToCart[plant.name]) {
      dispatch(addItem(plant));
    }
  };

  return (
    <main className="product-page">
      <nav className="product-navbar">
        <h2>🌿 Paradise Nursery</h2>

        <div className="nav-buttons">
          <button onClick={() => onNavigate("home")}>
            Home
          </button>

          <button onClick={() => onNavigate("plants")}>
            Plants
          </button>

          <button onClick={() => onNavigate("cart")}>
            🛒 Cart (
            <span className="cart_quantity_count">
              {totalItems}
            </span>
            )
          </button>
        </div>
      </nav>

      <header className="product-heading">
        <h1>Our Houseplants</h1>
        <p>
          Find the perfect plants to bring nature into your home.
        </p>
      </header>

      {categories.map((category) => (
        <section
          className="product-list plant-category"
          key={category}
        >
          <h2>{category}</h2>

          <div className="plant-grid">
            {plants
              .filter((plant) => plant.category === category)
              .map((plant) => (
                <article className="plant-card" key={plant.id}>
                  <img src={plant.image} alt={plant.name} />

                  <div className="plant-info">
                    <h3>{plant.name}</h3>

                    <p>{plant.description}</p>

                    <p className="plant-price">
                      ${Number(plant.price).toFixed(2)}
                    </p>

                    <button
                      disabled={!!addedToCart[plant.name]}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedToCart[plant.name]
                        ? "Added to Cart"
                        : "Add to Cart"}
                    </button>
                  </div>
                </article>
              ))}
          </div>
        </section>
      ))}
    </main>
  );
}

export default ProductList;
