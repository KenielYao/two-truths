import './App.css';

import Typography from '@mui/material/Typography';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Button, ButtonGroup, Card, CardContent, CardActionArea } from '@mui/material';
import { Check, Clear } from '@mui/icons-material';

import React, { useState } from "react";

import data from "./data.json"

function App(props) {
  
  const numQuestions = data.length

  const [factSetIdx, setFactSetIdx] = useState(0);
  const [selectedButton, setSelectedButton] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false)

  let factSet = data[factSetIdx].setContents
  let topic = data[factSetIdx].topic

  const handleQuestionClick = (event) => {
      setSelectedButton(event.currentTarget.id)
      setDisabled(true)
      setShowAnswer(true)
  }

  const handleNextClick = (event) => {
    setFactSetIdx((factSetIdx + 1) % numQuestions)
    setSelectedButton(null)
    setDisabled(false)
    setShowAnswer(false)
  }

  function Fact(props) {
    return (
      <>
        <Card style={{ border: showAnswer && props.fact.factId === selectedButton ? 
          ( props.fact.isLie ? "1px solid green" : "1px solid red" ) : null }}>
          <CardActionArea id={props.fact.factId} onClick={handleQuestionClick} disabled={disabled}>
            <CardContent>
              <Typography variant="body2">{props.fact.fact}</Typography>
              { showAnswer ? ( 
                props.fact.isLie ? 
                  <><br></br><Check color="success"/></> : 
                  <><br></br><Clear color="error"/></>
              ) : null}
            </CardContent>
          </CardActionArea>
        </Card>
        <br></br>
      </>
    )
  }

  function Answer(props) {
    let selectedFact = factSet.find(element => element.factId === props.pick)
    let trueFact = factSet.find(element => element.isLie === true)

    return (
      <>
        <Typography variant="h4">Answer:</Typography>
        <br></br>
        <Typography variant="body1">
          { 
            selectedFact.isLie ? 
            "You're right!".concat(' ', selectedFact.explanation) : 
            "Better luck next time!".concat(' ', selectedFact.explanation, ' ', trueFact.explanation)
          }
        </Typography>
        <br></br>
        <br></br>
      </>
    )
  }
  
  return (
    <div>
      <div className="App">
        <Typography variant="h1">Two Truths and a Lie</Typography>
        <hr></hr>
        <br></br>
        {/* <Typography variant="h2">Question:</Typography> */}
        <Typography variant="h4">Here are three { topic } facts. Which is the lie?</Typography>
        <br></br>
        <ButtonGroup 
          variant="outlined" 
          disabled={disabled}
          orientation="vertical" 
          size="large" 
          aria-label="outlined primary button group" >
          {factSet.map((fact) => <Fact fact={fact} />)}
        </ButtonGroup>
        <br></br>
        <br></br>
        { showAnswer ? <Answer pick={selectedButton}/> : null}
        <Button variant="outlined" onClick={handleNextClick}>Give me another!</Button>
      </div>
    </div>
  )
}

export default App;
