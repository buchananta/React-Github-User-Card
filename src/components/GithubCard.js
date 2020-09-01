import React from 'react';
import axios from 'axios';
import {Card,
        CardContent,
        CardHeader,
        CardMedia,
        Typography,
        Paper,
        withStyles,
                     } from '@material-ui/core';


const useStyles = theme => ({
  'paper': {
    margin: 'auto',
    'max-width': '800px',
  },
  'root': {
    display: 'flex',
    margin: '2em auto',
  },
  'pic': {
    width: '350px',
    height: '350px',
  }
});

class GithubCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {data: {}, err: {}, }
  }

  componentDidMount() {
    axios.get(this.props.url)
      .then(res => {
        console.log('resdata' + res.data);
        this.setState({data: res.data})
      })
      .catch(err => {
        this.setState({err: err})
      })
  }

  render() {
    const { classes } = this.props;
    if (this.state.data === {}) {
      if (this.state.err !== {}) {
        return (
          <Paper className={classes.root} elevation={6}>
            <Card>
              <CardContent>
                <Typography variant="h3">
                  {this.state.err}
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        )
      } //if data and 
        return (
          <Card>
            <CardContent>
              <Typography variant="h3">
                Loading....
              </Typography>
            </CardContent>
          </Card>
        )
      
    }

    return (
      <Paper className={classes.paper} elevation={6}>
      <Card className={classes.root} >
        {this.state.data.avatar_url ? (
          <CardMedia image={this.state.data.avatar_url}
                     alt={this.state.data.name}
                     className={classes.pic}
          /> 
        ) : (
              <p>Loading....</p>
            )
        }
        <CardContent>
          <Typography variant="h3" >
            {this.state.data.name || this.state.data.login }
          </Typography>
          <Typography variant='h5' >
            {this.state.data.bio}
          </Typography>
          <Typography variant='body1' >
            Location: {this.state.data.location}
          </Typography>
          <Typography>
            Email: {this.state.data.email}
          </Typography>
          <Typography>
            Repos: {this.state.data.public_repos}
          </Typography>
        </CardContent>
      </Card>
      </Paper>
    )
  }
}







export default withStyles(useStyles)(GithubCard);