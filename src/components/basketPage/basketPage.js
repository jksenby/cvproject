import { Button, Card, CloseButton, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import BasketForm from "./basketForm";
import { useState } from "react";
import {
  useGetBasketQuery,
  useDeleteFromBasketMutation,
} from "../basket/basketApi";
import "./basketPage.scss";
const BasketPage = ({ handleId }) => {
  const { data: basketItems, isError, isLoading } = useGetBasketQuery();
  const [deleteItem] = useDeleteFromBasketMutation();

  let price = 0;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
    return <h1 style={{ color: "red" }}>Error</h1>;
  }
  function renderItems(arr) {
    console.log(arr);
    const items = arr.map((item, i) => {
      price += item.price;
      return (
        <li tabIndex={0} key={item.id}>
          <Link to={`/products/${item.id}`} style={{ textDecoration: "none" }}>
            <Card style={{ width: "12rem", margin: "50px" }}>
              <CloseButton
                onClick={() => deleteItem(item.id)}
                style={{ position: "absolute", backgroundColor: "white" }}
                variant="white"
              />
              <Card.Img variant="top" alt={item.title} src={item.image} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Subtitle>Rating: {item.rating.rate}/5</Card.Subtitle>
                <Card.Text>
                  <h5>${item.price}</h5>
                  {item.description.slice(0, 50)}
                  {item.description.length > 50 ? "..." : null}
                </Card.Text>
                <h2>${item.price}</h2>
                <Button variant="dark">
                  <Link
                    to={`category/${item.category}`}
                    style={{
                      textDecoration: "none",
                      textTransform: "capitalize",
                      color: "white",
                    }}
                  >
                    {item.category}
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Link>{" "}
        </li>
      );
    });
    return <ul style={{ display: "-ms-grid" }}>{items}</ul>;
  }
  let element = <h1>There is no products in the basket</h1>;
  if (basketItems) {
    element = renderItems(basketItems);
  }
  return (
    <>
      <div className="list">
        {element}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>CheckOut</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <BasketForm price={price} />
          </Modal.Body>
        </Modal>
      </div>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ fontSize: "2.5em" }}
      >
        Order
      </Button>
      <h1>Total cost: ${price}</h1>
    </>
  );
};

export default BasketPage;
