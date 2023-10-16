import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import "./nearbyShops.scss";
const NearbyShops = ({ shops }) => {
  function renderItems(arr) {
    console.log(arr);
    const items = arr.map((item, i) => {
      return (
        <li tabIndex={0} key={item.id}>
          <Card style={{ width: "12rem", margin: "50px" }}>
            <Card.Img
              variant="top"
              alt={item.name}
              src={item.photos[0].html_attributions[0].slice(9, 67)}
            />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Subtitle>{item.rating}/10</Card.Subtitle>
              <Card.Text>{item.formatted_address}</Card.Text>
              <Link to={`/products/${item.id}`}>
                <Button variant="outline-primary">Learn more</Button>
              </Link>{" "}
            </Card.Body>
          </Card>
        </li>
      );
    });
    return <ul style={{ display: "-ms-grid" }}>{items}</ul>;
  }
  let element = <Spinner />;
  if (shops.placesDetails && shops.placesDetails.length > 0) {
    element = renderItems(shops.placesDetails);
  }
  return <div className="list">{element}</div>;
};

export default NearbyShops;
