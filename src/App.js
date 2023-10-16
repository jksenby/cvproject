import "./App.css";
import Spinner from "./components/Spinner/Spinner";
import AppHeader from "./components/appHeader/AppHeader";
import { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const GoodsList = lazy(() => import("./components/goodslist/GoodsList")),
  GoodsPage = lazy(() => import("./components/goodsPage/GoodsPage")),
  BasketPage = lazy(() => import("./components/basketPage/basketPage")),
  ShopPage = lazy(() => import("./components/shopPage/ShopPage")),
  NearbyShops = lazy(() => import("./components/nearbyShops/NearbyShops")),
  CategoryPage = lazy(() => import("./components/categoryPage/CategoryPage")),
  AppFooter = lazy(() => import("./components/appFooter/AppFooter"));
function App() {
  const [id, setId] = useState("");
  const handleId = (value) => {
    setId(value);
  };
  const [shops, setShops] = useState({});
  const handleShops = (value) => {
    setShops(value);
  };

  return (
    <div className="App">
      <Router>
        <div className="app">
          <AppHeader />
          <main>
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <GoodsList handleId={handleId} showCarousel={true} />
                  }
                />
                <Route
                  path="/products/:id"
                  element={<GoodsPage id={id} handleId={handleId} />}
                />
                <Route
                  path="/basket"
                  element={<BasketPage handleId={handleId} />}
                />
                <Route
                  path="/shops"
                  element={<ShopPage handleShops={handleShops} />}
                />
                <Route
                  path="/nearby/shops"
                  element={<NearbyShops shops={shops} />}
                />
                <Route
                  path="/basket/category/:categoryname"
                  element={<CategoryPage handleId={handleId} />}
                />
              </Routes>
            </Suspense>
          </main>
          <AppFooter />
        </div>
      </Router>
    </div>
  );
}

export default App;
