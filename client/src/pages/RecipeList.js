import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function RecipeList({user}) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/recipes")
      .then((r) => r.json())
      .then(setRecipes);
  }, []);

  if (!user) return <Redirect to="/" />;
  return (
    <Wrapper>
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <Recipe key={recipe.id}>
            <Box>
              <h2>{recipe.title}</h2>
              <p>
                <em>Time to Complete: {recipe.minutes_to_complete} minutes</em>
                &nbsp;·&nbsp;
                <cite>By {recipe.user.username}</cite>
              </p>
              <ReactMarkdown>{recipe.instructions}</ReactMarkdown>
              <Button as={Link} to={`/recipes/${recipe.id}`}>Edit</Button>
              <div>
                <h5>Answers</h5>
                <p>Some answer</p>
              </div>
            </Box>
          </Recipe>
        ))
      ) : (
        <>
          <h2>No Recipes Found</h2>
          <Button as={Link} to="/new">
            Make a New Recipe
          </Button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Recipe = styled.article`
  margin-bottom: 24px;
`;

export default RecipeList;
