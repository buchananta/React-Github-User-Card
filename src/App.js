import React from 'react';
import axios from 'axios';
import {Button, TextField} from '@material-ui/core';
import GithubCard from './components/GithubCard';

class App extends React.Component {
  constructor() {
    super();
    this.state = {cardData: [],
                  search: 'buchananta',
                  searchValue: 'buchananta',
                 };
  }
  componentDidMount() {
    this.axiosRequest();
  }
  componentDidUpdate(oldProps, oldState) {
    if (oldState.search !== this.state.search) {
      this.axiosRequest();
    }
  }
  axiosRequest = () => {
    axios.get(`https://api.github.com/users/${this.state.search}/following`)
    .then(res => {
      this.setState(
        {cardData:
          [...this.state.cardData, ...res.data]
        }
      )
    })
    .catch(e => console.log(e));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 style={{'font-size': '5vw',
                      'text-align': 'center',}}>
              React GitHub User Card
          </h1>
        </header>
        <div>
          <form>
            <TextField id='filled-basic'
                       label='Search Users'
                       
            />
            <Button
              disabled={this.state.searchValue !== ''}
              variant='contained'
              color='primary'
              onClick={() => this.setState({search: this.state.searchValue})}
            >
              Search
            </Button>
          </form>
          <GithubCard url={`https://api.github.com/users/${this.state.search}`} />
          {this.state.cardData.map((data) => {
            return <GithubCard
                      key={data.login}
                      url={data.url} />
          })}
        </div>
      </div>
    );
  }
}

export default App;
