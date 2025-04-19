/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Container, Card, Row, Col, Button } from 'react-bootstrap';

import icebreakers from './iceBreakerQuestions';
import React from 'react';

const getIceBreaker = () => {
  if (icebreakers.length === 0) {
    return '';
  }
  const randomIndex = Math.floor(Math.random() * icebreakers.length);
  return icebreakers[randomIndex].question;
};

const StandUpPicker = () => {
  const [question, setQuestion] = React.useState('');

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <p>Ice breaker </p>
              <p>{question}</p>
              <p>
                <Button onClick={() => setQuestion(getIceBreaker())}>
                  {question ? 'Pick a new question' : 'Pick a question'}
                </Button>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StandUpPicker;
