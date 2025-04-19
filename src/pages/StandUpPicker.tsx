/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import { Wheel } from 'react-custom-roulette';
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Accordion,
  Button,
  Modal,
} from 'react-bootstrap';

const timeout = (delay: number) => new Promise((res) => setTimeout(res, delay));

// @ts-ignore
const buildStringOptions = (options: unknown[]) => {
  const string = options.reduce(
    (stringOptions, option, index) =>
      // @ts-ignore
      `${stringOptions}${option.option}${
        index !== options.length - 1 ? '\n' : ''
      }`,
    '',
  );

  return string;
};

const defaultOptions = [
  {
    option: 'David',
    style: { backgroundColor: '#6f42c1', textColor: 'white' },
  },
  {
    option: 'Dylan',
    style: { backgroundColor: '#0d6efd', textColor: 'white' },
  },
  {
    option: 'Jason',
    style: { backgroundColor: '#198754', textColor: 'white' },
  },
  { option: 'Kim', style: { backgroundColor: '#ffc107', textColor: 'black' } },
  {
    option: 'Lakshmi',
    style: { backgroundColor: '#fd7e14', textColor: 'black' },
  },
  {
    option: 'Trevor',
    style: { backgroundColor: '#dc3545', textColor: 'white' },
  },
];

const StandUpPicker = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [winnerIndex, setWinnerIndex] = useState(0);
  const [shouldSpin, setShouldSpin] = useState(false);
  const [options, setOptions] = useState(defaultOptions || []);
  const [winnerLog, setWinnerLog] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (shouldSpin) {
      handleSpinClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const handleSpinClick = () => {
    const newWinnerIndex = Math.floor(Math.random() * options.length);
    setWinnerIndex(newWinnerIndex);
    setMustSpin(true);
    setShouldSpin(false);
  };

  const onTextChange = (value: string) => {
    const newOptions = value.split('\n').map((v) => {
      const foundOption = defaultOptions.find((o) => o.option === v);
      return foundOption || { option: v };
    });
    //@ts-ignore
    setOptions(newOptions);
  };

  const removeAndSpin = async () => {
    setShowModal(false);
    await timeout(250);
    const newOptions = [...options];
    newOptions.splice(winnerIndex, 1);
    setOptions(newOptions);
    setShouldSpin(true);
  };

  const chosenStyles = options.find(
    (_o, index) => index === winnerIndex,
  )?.style;

  return (
    <Container>
      <Row xs={1} md={2}>
        <Col>
          <Card>
            <Card.Body>
              <div onClick={() => !mustSpin && handleSpinClick()}>
                <Wheel
                  mustStartSpinning={mustSpin}
                  prizeNumber={winnerIndex}
                  data={options}
                  onStopSpinning={() => {
                    setMustSpin(false);
                    setWinnerLog([...winnerLog, options[winnerIndex].option]);
                    setShowModal(true);
                  }}
                  backgroundColors={['#3e3e3e', '#949494']}
                  textColors={['#ffffff', '#000000']}
                  spinDuration={0.25}
                />
              </div>
              <div className='text-center'>
                <Button
                  variant='secondary'
                  onClick={handleSpinClick}
                  disabled={mustSpin}
                >
                  Spin
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Entries</Card.Title>
              <Form.Control
                as='textarea'
                rows={7}
                onChange={(e) => onTextChange(e.target.value)}
                // @ts-ignore
                value={buildStringOptions(options)}
                disabled={mustSpin}
              />
            </Card.Body>
          </Card>
          <Accordion>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>Results</Accordion.Header>
              <Accordion.Body>
                <ul className='list-unstyled'>
                  {winnerLog.map((winner) => (
                    <li key='winner'>{winner}</li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <ConfettiExplosion
          force={0.8}
          duration={3000}
          particleCount={250}
          style={{ left: '50%' }}
          zIndex={500}
        />
        <Modal.Header
          closeButton
          style={{
            backgroundColor: chosenStyles?.backgroundColor,
            color: chosenStyles?.textColor,
          }}
        >
          <Modal.Title>Next up is:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='fs-1 text text-center'>
            {options[winnerIndex]?.option}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='light' onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant='primary'
            onClick={removeAndSpin}
            disabled={options.length <= 1}
          >
            Remove and spin
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default StandUpPicker;
