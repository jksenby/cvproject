import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategory,
  goodsSelector,
  setFilterByName,
  setFilterByPrice,
} from "../slices/goodsSlice";
import { useEffect } from "react";
import { Card, Button, Col, InputGroup, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import "./categoryPage.scss";
const CategoryPage = ({ handleId }) => {
  let categoryname = window.location.href.slice(38);
  if (categoryname === "men's%20clothing") {
    categoryname = "men's clothing";
  } else if (categoryname === "women's%20clothing") {
    categoryname = "women's clothing";
  }
  const products = useSelector(goodsSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategory(categoryname));
  }, [categoryname, dispatch, products]);
  function renderItems(arr) {
    console.log(arr);
    const items = arr.map((item, i) => {
      return (
        <li tabIndex={0} key={item.id}>
          <Link to={`/products/${item.id}`} style={{ textDecoration: "none" }}>
            <Card
              style={{ width: "12rem", margin: "50px" }}
              onClick={() => handleId(item.id)}
            >
              <Card.Img variant="top" alt={item.title} src={item.image} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Subtitle>{item.rating.rate}/10</Card.Subtitle>
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
  if (products) {
    element = renderItems(products);
  }
  if (products.length === 0) {
    element = <h2>There are no such products</h2>;
  }

  return (
    <>
      <div className="list">
        <h1>{categoryname}</h1>
        {element}
      </div>
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
    </>
  );
};

export default CategoryPage;
