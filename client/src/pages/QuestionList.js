import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { Box,Button } from "../styles";
import AnswerForm from "./AnswerForm";

function RecipeList({user}) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("/questions")
      .then((r) => r.json())
      .then(setQuestions);
  }, []);

  function handleAnswerAdd(){
    fetch("/questions")
      .then((r) => r.json())
      .then(setQuestions);
  }
  

  if (!user) return <Redirect to="/" />;
  return (
    <Wrapper>
      {questions.length > 0 ? (
        questions.map((question) => (
          <Recipe key={question.id}>
            <Box>
              <h2>{question.topic}</h2>
              <span>
                <cite>By {question.user.username}</cite>
              </span>
              <ReactMarkdown>{question.question}</ReactMarkdown>
              {user.id === question.user.id && <div style={{margin:"20px 0px"}}><Button as={Link} to={`/questions/${question.id}`}>Edit</Button></div>}
              <AnswerForm question={question} onAddAnswer={handleAnswerAdd}/>
              
              <hr style={{marginTop:"15px"}}/>
              <div>
                <h5>Solutions</h5>
                {question.answers.length === 0 && <p>No answers yet</p>}
                {question.answers.map(a => <ul style={{listStyle:"none"}}><li style={{backgroundColor:"lightgrey",padding:"6px 8px",borderRadius:"5px"}}>{a.answer}</li></ul>)}
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
  max-width: 600px;
  margin: 40px auto;
`;

const Recipe = styled.article`
  margin-bottom: 24px;
`;

export default RecipeList;
