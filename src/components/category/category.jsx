import React from "react";
import { category } from "../../constants";
import { colors } from "../../constants/color";
import { Stack } from "@mui/material";
import "./category.css";

const Category = ({ selectCategoryHender, selectCategory }) => {
  return (
    <Stack direction={"row"} sx={{ overflowX: "scroll" }}>
      {category.map((item) => (
        <button
          key={item.name}
          className="category-btn"
          style={{
            borderRadius: "0",
            background: item.name === selectCategory && colors.secondary,
            color: item.name === selectCategory && "#fff",
          }}
          onClick={() => selectCategoryHender(item.name)}
        >
          <span
            style={{
              color: item.name === selectCategory ? "#fff" : colors.secondary,
              marginRight: "15px",
            }}
          >
            {item.icons}
          </span>
          <span style={{ opacity: "1" }}>{item.name}</span>
        </button>
      ))}
    </Stack>
  );
};

export default Category;
