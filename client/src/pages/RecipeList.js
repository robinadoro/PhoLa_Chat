import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { Box,Button, Input, FormField, Label } from "../styles";

function AnswerForm({question}){
  const [answer, setAnswer] = useState("");
  console.log(question)
  return(
    <FormField>
      <Label htmlFor="answer">Submit your Answer</Label>
      <Input
        type="text"
        id="answer"
        autoComplete="off"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <div style={{margin:"20px 0px"}}>
      <Button as={Link} to={`/answers`}>Post Answer</Button>
      </div>
     
    </FormField>
  )
}

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
              {user.id === question.user.id && <div style={{margin:"20px 0px"}}><Button as={Link} to={`/questions/${question.id}`}>Edit</Button></div>}
              <AnswerForm question={question} />
              
              <hr style={{marginTop:"15px"}}/>
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
  max-width: 600px;
  margin: 40px auto;
`;

const Recipe = styled.article`
  margin-bottom: 24px;
`;

export default RecipeList;
