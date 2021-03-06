import React, { Component } from 'react';
import './css/App.css';
import _ from 'lodash';
import qmarkimg from './assets/images/question-mark.png';

const Button = ({ text, clickHandler }) => (
  <button className="start-btn orange" onClick={clickHandler}>
    {text}
  </button>
)

const Paw = ({ clickHandler, isopen, imgBack }) => {

  return (
    <div className="paw-container" onClick={clickHandler}>
      <div
        className={`paw-card ${isopen ? 'open-card' : 'close-card'} `}>
        <div className="front face">
          <img src={qmarkimg} alt="Guestion Mark" />
        </div>
        <div className="back face">
          <img src={imgBack} alt="Paw Card" />
        </div>
      </div>

    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matchclicks: 1,
      matchclickpair: [],
      totalclicks: 0,
      correctpairs: 0,
      completed: false,
      gamestarted: false,
      cards: [
        {
          id: 1,
          name: 'Rolle',
          imgpath: './assets/images/rolle.jpg',
          pawcat: 1,
          isopen: false,
        }, {
          id: 2,
          name: 'Rolle',
          imgpath: './assets/images/rolle.jpg',
          pawcat: 1,
          isopen: false,
        }, {
          id: 3,
          name: 'Taja',
          imgpath: './assets/images/taja.jpg',
          pawcat: 2,
          isopen: false,
        }, {
          id: 4,
          name: 'Taja',
          imgpath: './assets/images/taja.jpg',
          pawcat: 2,
          isopen: false,
        }, {
          id: 5,
          name: 'Samba',
          imgpath: './assets/images/samba.jpg',
          pawcat: 3,
          isopen: false,
        }, {
          id: 6,
          name: 'Samba',
          imgpath: './assets/images/samba.jpg',
          pawcat: 3,
          isopen: false,
        }
      ],
      matches: []
    }

  }

  matchPair = []

  fetchShuffledPaws = () => {
    const shuffledPaws = _.shuffle(this.state.cards)
    this.setState({ gamestarted: true, cards: shuffledPaws })
  }

  cardActions = (pawcard) => {
    let realId = pawcard
    const targetPaw = this.state.cards.find(item => pawcard === item.id)

    if (this.matchPair.length < 2) {
      this.matchPair.push(targetPaw)
      const isEqualValues = this.matchPair.every(item => item.pawcat === this.matchPair[0].pawcat)
      console.log(isEqualValues)
      console.log(this.matchPair)
    }
    else {
      return
    }



    const arr = this.state.cards.map(card => {
      if (card.id === realId) {
        card.isopen = !card.isopen

        return card
      } else {
        return card
      }
    })


    this.setState({
      cards: arr,
      totalclicks: this.state.totalclicks + 1,
      matchclicks: this.state.matchclicks + 1,
      matchclickpair: this.matchPair
    })
  }

  render() {
    const header = () => {
      if (this.state.gamestarted === false) {
        return (
          <section className="start-section">
            <Button text="Start the game!" clickHandler={this.fetchShuffledPaws} />
          </section>
        )
      } else {
        return (
          <div>
            <section className="game-stats">
              <ul className="points">
                <li>
                  <span>{this.state.totalclicks}</span>
                  <span className="text">Pairs</span>
                </li>
                <li>
                  <span>{this.state.totalclicks}</span>
                  <span className="text">Total Clicks</span>
                </li>
                <li>
                  <span>{this.state.totalclicks}</span>
                  <span className="text">Turn Click Lefts</span>
                </li>
              </ul>
            </section>
          </div>
        )
      }
    }

    const grid = () => {

      if (this.state.gamestarted === true) {
        const paws = this.state.cards.map((pawcard) => (
          <Paw
            key={pawcard.id}
            name={pawcard.name}
            imgBack={pawcard.imgpath}
            clickHandler={() => this.cardActions(pawcard.id)}
            isopen={pawcard.isopen}
          />)
        )

        return paws

      } else {
        return
      }
    }

    return (
      <div className="app">
        <h1>Paw Cards</h1>
        {header()}
        <section className="paw-grid">
          {grid()}
        </section>
      </div>
    );
  }
}

export default App;
