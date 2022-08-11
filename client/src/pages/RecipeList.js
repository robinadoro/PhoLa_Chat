import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function RecipeList({user}) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("/questions")
      .then((r) => r.json())
      .then(setQuestions);
  }, []);

  if (!user) return <Redirect to="/" />;
  return (
    <Wrapper>
      {questions.length > 0 ? (
        questions.map((question) => (
          <Recipe key={question.id}>
            <Box>
              <h2>{question.topic}</h2>
              <p>
                <cite>By {question.user.username}</cite>
              </p>
              <ReactMarkdown>{question.question}</ReactMarkdown>
              <Button as={Link} to={`/questions/${question.id}`}>Edit</Button>
              <div>
                <h5>Answers</h5>
                <p>Some answer</p>
              </div>
            </Box>
          </Recipe>
        ))
      ) : (
        <>
          <h2>No questions Found</h2>
          <Button as={Link} to="/new">
            Create a question
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
