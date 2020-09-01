import React from 'react';
import axios from 'axios';
import {Button, TextField} from '@material-ui/core';
import GithubCard from './components/GithubCard';

class App extends React.Component {
  constructor() {
    super();
    this.state = {cardData: [],
                  person: 'buchananta',         //person we search for
                  search: 'buchananta',         //
                  searchValue: 'buchananta',    //input text maintained in state
                 };
  }
  componentDidMount() {
    this.axiosRequest();
  }
  componentDidUpdate(oldProps, oldState) {
    console.log("person in update: " + this.state.person);
    if (oldState.search !== this.state.search) {
      this.axiosSearch();
    } 
    if (oldState.person !== this.state.person) {
      this.axiosRequest();
    }
  }
  axiosRequest = () => {
    axios.get(`https://api.github.com/users/${this.state.person}/following`)
    .then(res => {
      this.setState(
        {cardData: res.data}
      )
    })
    .catch(e => console.log(e));
  }
  axiosSearch = () => {
    axios.get(`https://api.github.com/search/users?q=${this.state.search}`)
      .then(res => this.setState({person: res.data.items[0].login}))
      .catch(e => console.log(e))
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 style={{fontSize: '5vw',
                      textAlign: 'center',}}>
              React GitHub User Card
          </h1>
        </header>
        <div>
          <form>
            <TextField id='filled-basic'
                       label='Search Users'
                       value={this.state.searchValue}
                       onChange={(e) => this.setState({searchValue: e.target.value})} 
            />
            <Button
              disabled={this.state.searchValue === ''}
              variant='contained'
              color='primary'
              onClick={() => this.setState({search: this.state.searchValue})}
            >
              Search
            </Button>
          </form>
          <GithubCard 
            url={'https://api.github.com/users/'+ this.state.person}
            key={this.state.person}
          />
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
