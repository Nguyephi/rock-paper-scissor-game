import React from 'react';
import './App.css';
import { Button, ButtonToolbar, Card, Col, Container, Dropdown, ListGroup, Row } from 'react-bootstrap';


const choices = [
  'foot',
  'bomb',
  'cockroach'
]

class App extends React.Component {
  constructor(props) {
    super(props)
    const computerChoice = choices[Math.floor(Math.random()*choices.length)]
    this.state = {
      computerChoice,
      gameHistory: [],
      gameResultPrompt: []
    }
  }

  onPlayerChoice(playerChoice) {
    const { computerChoice, gameHistory, gameResultPrompt } = this.state
    let result = '';
    let historyResult = "";
    if (computerChoice === playerChoice) {
      result = 'Tie!'
      historyResult = 'Tie'
    } else if (playerChoice === 'foot' && computerChoice === 'bomb') {
      result = 'Computer chooses bomb. Bomb kills human foot. Computer wins!'
      historyResult = 'Computer Wins'
    } else if (playerChoice === 'foot' && computerChoice === 'cockroach') {
      result = 'Foot stomps cockroach. Player wins!'
      historyResult = 'Player Wins'
    } else if (playerChoice === 'bomb' && computerChoice === 'cockroach') {
      result = 'Computer chooses cockroach. Cockroach survives nuclear bomb. Computer wins!'
      historyResult = 'Computer Wins'
    } else if (playerChoice === 'bomb' && computerChoice === 'foot') {
      result = 'Bomb kills human foot. Player wins!'
      historyResult = 'Player Wins'
    } else if (playerChoice === 'cockroach' && computerChoice === 'foot') {
      result = 'Computer chooses foot. Foot stomps coackroach. Computer wins!'
      historyResult = 'Computer Wins'
    } else if (playerChoice === 'cockroach' && computerChoice === 'bomb') {
      result = 'Coackroach survives nuclear bomb. Player wins!'
      historyResult = 'Player Wins'
    }
    
    const newResult = {
      result,
      playerChoice,
      computerChoice,
      historyResult
    }
    
    gameHistory.push(newResult)
    const newComputerChoice = choices[Math.floor(Math.random()*choices.length)]
    
    gameResultPrompt.unshift(result)
    
    this.setState({ gameHistory, playerChoice, computerChoice: newComputerChoice })
  }
  
  
  renderImg = () => {
    if (this.state.playerChoice === 'foot') {
      return 'https://i.makeagif.com/media/2-24-2016/neA4FR.gif'
    } else if (this.state.playerChoice === 'bomb') {
      return 'https://media.giphy.com/media/XUFPGrX5Zis6Y/giphy.gif'
    } else if (this.state.playerChoice === 'cockroach') {
      return 'https://media3.giphy.com/media/EmSCxtcjQCmXK/giphy.gif'
    }
    return 'https://thumbs.gfycat.com/AgedWateryAcornweevil-size_restricted.gif'
  }
  
  renderGameHistory() {
    const historyResultHTML = this.state.gameHistory.map((game) => {
        if (game.historyResult === "Tie") {
            return <ListGroup.Item variant="warning">{ game.historyResult }</ListGroup.Item>
          } else if (game.historyResult === "Computer Wins") {
            return <ListGroup.Item variant="danger">{ game.historyResult }</ListGroup.Item>
          } else if (game.historyResult === "Player Wins") {
            return <ListGroup.Item variant="success">{ game.historyResult }</ListGroup.Item>
          }
        })
        return historyResultHTML
      }
        
  getPromtHTML = () => {
    if (this.state.playerChoice === 'foot') {
      return <h2>Player chooses foot</h2>
    } else if (this.state.playerChoice === 'bomb') {
      return <h2>Player chooses bomb</h2>
    } else if (this.state.playerChoice === 'cockroach') {
      return <h2>Player chooses cockroach</h2>
    }
    return <h2>Choose Wisely!</h2>
  }
        
  renderResultPrompt() {
    const { gameResultPrompt } = this.state
    
    if (!gameResultPrompt[0]) return <div />
    if (gameResultPrompt) return <div>{gameResultPrompt[0]}</div>
  }
        
  render() {
    console.log("state", this.state)
    return (
      <div style={{display: "flex"}}className="App">
        <div>
          <Container>
            <Row>
              <Col md={3}>
                <img style={{marginTop: "30px", width: "100px", height: "105px"}} src="img/That'70sShowLogo.png" />
              </Col>
              <Col sm={6}>
                <Card style={{alignItem: 'center'}}>
                  <Card.Img style={{height: '200px', width: '200px'}} variant="top" src={this.renderImg()} />
                  <Card.Body>
                    <Card.Text>
                      {this.getPromtHTML()}
                      <p>
                        {this.renderResultPrompt()}
                      </p>
                    </Card.Text>
                      <ButtonToolbar>
                        <Button style={{margin: '0 .5em 0 .5em'}} onClick={() => this.onPlayerChoice('foot')} variant="outline-dark">Foot</Button>
                        <Button style={{margin: '0 .5em 0 .5em'}} onClick={() => this.onPlayerChoice('bomb')} variant="outline-dark">Bomb</Button>
                        <Button style={{margin: '0 .5em 0 .5em'}} onClick={() => this.onPlayerChoice('cockroach')} variant="outline-dark">Cockroach</Button>
                      </ButtonToolbar>
                  </Card.Body>
                </Card>
              </Col>
              <Col xl={3} className='colXL'>
                <h5>
                  Game History:
                </h5>  
                <ListGroup>
                  {this.renderGameHistory()}
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default App;
