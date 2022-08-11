import { Button, Input, FormField, Label,Error } from "../styles";
import { useState } from "react";

export default function AnswerForm({question,onAddAnswer}){
    const [answer, setAnswer] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    function handleSubmit(e) {
      e.preventDefault();
      setIsLoading(true);
      fetch("/answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answer,
          question_id: question.id
        }),
      }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then(r=>{
            setAnswer("")
            onAddAnswer()
        })
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
    }
    return(
      <form onSubmit={handleSubmit}>
      <FormField>
        <Label htmlFor="answer">Submit your Solution</Label>
        <Input
          type="text"
          id="answer"
          autoComplete="off"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your solution here..."
        />
        <div style={{margin:"20px 0px"}}>
        <FormField>
              <Button color="primary" type="submit">
                {isLoading ? "Loading..." : "Post Solution"}
              </Button>
            </FormField>
        </div>
       
      </FormField>
      <FormField>
        {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
      </FormField>
      </form>
    )
  }