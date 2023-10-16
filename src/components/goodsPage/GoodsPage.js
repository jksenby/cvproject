import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOne } from "../slices/goodsSlice";
import { Button } from "react-bootstrap";
import { useAddToBasketMutation, useGetBasketQuery } from "../basket/basketApi";
import { Link } from "react-router-dom";
import GoodsList from "../goodslist/GoodsList";
import "./goodsPage.scss";

const GoodsPage = ({ id, handleId }) => {
  const correctId = id === "" ? window.location.href.slice(31) : id;
  const dispatch = useDispatch();
  const item = useSelector((state) => state.goods.item);
  const [createAction] = useAddToBasketMutation();
  const { data: basketItems } = useGetBasketQuery();
  let buttonColor = "dark";
  let text = "Add to Basket";

  useEffect(() => {
    dispatch(fetchOne(correctId));
    // eslint-disable-next-line
  }, []);
  if (basketItems && basketItems.length > 0) {
    basketItems.forEach((item) => {
      if (item.id === +correctId) {
        console.log(basketItems);
        buttonColor = "success";
        text = "Added";
      }
    });
  }
  return (
    <div>
      <h1>{item.title}</h1>
      <div className="product">
        <img src={item.image} alt="item img" />
        <div className="product__info">
          <div className="price">
            {item.price}$ ---{">"}
            <Button
              variant={buttonColor}
              onClick={() => {
                createAction(item)
                  .unwrap()
                  .then(() => {})
                  .then((error) => console.log(error));
              }}
            >
              {text}
            </Button>
          </div>
          <div>
            <h2 className="category">
              Category -{">"}{" "}
              <Button variant="dark">
                <Link
                  style={{
                    textDecoration: "none",
                    textTransform: "capitalize",
                    color: "white",
                  }}
                  to={`../basket/category/${item.category}`}
                  className="link"
                >
                  {item.category}
                </Link>
              </Button>{" "}
            </h2>
          </div>
          <p>{item.description}</p>
        </div>
      </div>
      <h1>Other products</h1>
      <GoodsList handleId={handleId} showCarousel={false} />
    </div>
  );
};

export default GoodsPage;
