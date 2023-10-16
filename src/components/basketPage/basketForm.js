import { useState } from "react";

const BasketForm = ({ price }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [adress, setAdress] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const order = {
      name: name,
      phoneNumber: phoneNumber,
      adress: adress,
    };

    console.log(order);

    setAdress("");
    setName("");
    setPhoneNumber("");
  };

  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Your name
        </label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Your phone number
        </label>
        <textarea
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Phone Number"
          style={{ height: "130px" }}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Your adress
        </label>
        <textarea
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Adress"
          style={{ height: "130px" }}
          value={adress}
          onChange={(e) => setAdress(e.target.value)}
        />
      </div>
      <label htmlFor="element" className="form-label">
        Total Price: {price}$
      </label>
      <h1>
        <button type="submit" className="btn btn-primary">
          Place an order
        </button>
      </h1>
    </form>
  );
};

export default BasketForm;
