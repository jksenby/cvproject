import React from "react";
import { CDBBtn, CDBIcon, CDBBox } from "cdbreact";

export const AppFooter = () => {
  return (
    <div className="shadow">
      <CDBBox
        display="flex"
        justifyContent="between"
        alignItems="center"
        className="mx-auto py-4 flex-wrap"
        style={{ width: "80%" }}
      >
        <CDBBox display="flex" alignItems="center">
          <a href="/" className="d-flex align-items-center p-0 text-dark">
            <span className="ms-4 h5 mb-0 font-weight-bold">Devwares</span>
          </a>
          <small className="ms-2">&copy; jksenby, 2023. Chichuchicha.</small>
        </CDBBox>
        <CDBBox display="flex">
          <CDBBtn flat color="dark" className="p-2">
            <CDBIcon fab icon="facebook-f" />
          </CDBBtn>
          <CDBBtn flat color="dark" className="mx-3 p-2">
            <CDBIcon fab icon="twitter" />
          </CDBBtn>
          <CDBBtn flat color="dark" className="p-2">
            <CDBIcon fab icon="instagram" />
          </CDBBtn>
        </CDBBox>
      </CDBBox>
    </div>
  );
};

export default AppFooter;
