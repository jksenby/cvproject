import { useEffect } from "react";
import {
  fetchGoods,
  goodsSelector,
  setFilterByPrice,
  setFilterByName,
} from "../slices/goodsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, InputGroup, Form, Col, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import "./goodsList.scss";
const GoodsList = ({ handleId, showCarousel }) => {
  const dispatch = useDispatch();
  const goods = useSelector(goodsSelector);
  useEffect(() => {
    dispatch(fetchGoods());
    // eslint-disable-next-line
  }, []);

  function renderItems(arr) {
    console.log(arr);
    const items = arr.map((item, i) => {
      return (
        <li tabIndex={0} key={item.id}>
          <Link to={`/products/${item.id}`} style={{ textDecoration: "none" }}>
            <Card
              onClick={() => handleId(item.id)}
              border="dark"
              style={{
                width: "13rem",
                margin: "30px",
                padding: "5px",
                cursor: "pointer",
              }}
            >
              <Card.Img
                variant="bottom"
                alt={item.title}
                src={item.image}
                style={{ height: "17rem", borderBottom: "2px solid black" }}
              />
              <Card.Body>
                <Card.Title>
                  {item.title.slice(0, 20)}
                  {item.title.length > 20 ? "..." : null}
                </Card.Title>
                <Card.Subtitle>Rating: {item.rating.rate}/5</Card.Subtitle>
                <Card.Text>
                  {item.description.slice(0, 50)}
                  {item.description.length > 50 ? "..." : null}
                </Card.Text>
                <h2>${item.price}</h2>
              </Card.Body>
            </Card>
          </Link>{" "}
        </li>
      );
    });
    return <ul style={{ display: "-ms-grid" }}>{items}</ul>;
  }
  let element = <Spinner />;
  if (goods) {
    element = renderItems(goods);
  }
  if (goods.length === 0) {
    element = <h2>There are no such product</h2>;
  }
  const carousel = showCarousel ? <CarouselofAd /> : null;
  return (
    <div
      style={{
        justifyContent: "center",
      }}
    >
      {carousel}
      <div className="list">{element}</div>
      <div className="filters">
        <InputGroup className="mb-3">
          <Col>
            <InputGroup.Text style={{ display: "block" }}>🔍</InputGroup.Text>
            <Form.Control
              onChange={(e) => dispatch(setFilterByName(e.target.value))}
              aria-label="Dollar amount (with dot and two decimal places)"
              placeholder="Search by Name"
            />
          </Col>
          <Col>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              onChange={(e) => dispatch(setFilterByPrice(+e.target.value))}
              aria-label="Dollar amount (with dot and two decimal places)"
              placeholder="Search by Price"
            />
          </Col>
        </InputGroup>
      </div>
    </div>
  );
};

const CarouselofAd = () => {
  return (
    <Carousel
      data-bs-theme="dark"
      style={{ margin: "auto", maxHeight: "900px", maxWidth: "1600px" }}
    >
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.alphacoders.com/439/thumb-1920-439623.jpg"
          alt="First slide"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://graphicsfamily.com/wp-content/uploads/edd/2022/02/Free-Food-Advertising-Banner-Template.jpg"
          alt="Second slide"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media.gq-magazine.co.uk/photos/621915985fd591a44bb4c948/16:9/w_1920,h_1080,c_limit/February%2028%20-%20Bianca%20Saunders_Onlineheader.jpg"
          alt="Third slide"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default GoodsList;
