import React from 'react';

const SideBar = ({ showFirmHandler, showProductHandler, showAllProductsHandler, showFirmTitle }) => {
  return (
    <div className="sideBar">
      <ul className="sideBarLinks">
        {showFirmTitle && <li className="sideBarItem" onClick={showFirmHandler}>Add Firm</li>}
        {!showFirmTitle && <li className="sideBarItem" onClick={showProductHandler}>Add Product</li>}
        {!showFirmTitle && <li className="sideBarItem" onClick={showAllProductsHandler}>All Products</li>}
        <li className="sideBarItem">User Details</li>
      </ul>
    </div>
  );
};
export default SideBar;