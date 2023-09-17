import React, { useState } from "react";
import { Typography } from "@mui/material";

const Category = ({ cat }) => {
  const [show, setShow] = useState(false);
  const [selectedCat, setSelectedCat] = useState("");
  return (
    <div>
      <img
        src={cat.image}
        width={50}
        style={{ backgroundColor: "#feb55f", borderRadius: 50 }}
        alt="symbol"
      />
      <Typography
        variant="body2"
        onClick={(e) => {
          if (cat.children.length > 0) {
            setShow(!show);
            setSelectedCat(cat.id);
            console.log(e.target.firstChild.textContent);
            console.log(cat.id);
          } else {
            console.log(cat.id);
          }
        }}
      >
        {cat.title}
      </Typography>
    </div>
  );
};

export default Category;
