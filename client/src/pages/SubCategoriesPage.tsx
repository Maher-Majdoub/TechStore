import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCategories, { Category } from "../hooks/useCategories";

const SubCategoriesPage = () => {
  //const categorySlug = useParams();
  const { data, isLoading, error } = useCategories();

  if (error) {
    const navigate = useNavigate();
    navigate("/error");
  }
  //const subCategories = [];

  if (data) {
    for (const category in data.results) {
      console.log(category);
    }
  }

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <p>hello world</p>
    </>
  );
};

export default SubCategoriesPage;
