import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";

export default function EditRecipe({ user }) {
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  function fetchQuestion() {
    setIsLoading(true);
    fetch(`/questions/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => {
        setIsLoading(false);
        if (r.ok) {
          
          r.json().then((r) => {
            setTopic(r.topic)
            setQuestion(r.question)
          })
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
  }

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch(`/questions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic,
        question
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        history.push("/questions");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Update Question</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="title">Topic</Label>
            <Input
              type="text"
              id="title"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="instructions">Question</Label>
            <Textarea
              id="instructions"
              rows="5"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Update Question"}
            </Button>
          </FormField>
          <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      </WrapperChild>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 500px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;
