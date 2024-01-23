import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProduct] = useState<string[]>([]);
  useEffect(() => {
    console.log("fetching products from server");
    setProduct(['clothing', 'housing']);
  },[]);
  return <div>Product List</div>;
};

export default ProductList;
