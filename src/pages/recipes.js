import React from "react";
import { Container } from "reactstrap";
import ListOfRecipe from "../components/ListOfRecipe";

const Recipes = ({ video, videos, handleVid, pickedind }) => (
  <div>
    <Container>
      <ListOfRecipe
        video={video}
        videos={videos}
        handleVid={handleVid}
        pickedind={pickedind}
      />
    </Container>
  </div>
);

export default Recipes;
