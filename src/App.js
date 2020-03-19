import React from 'react';
import axios from 'axios';
import {DefaultButton} from 'pivotal-ui/react/buttons';
import {ThemeProvider} from 'pivotal-ui/react/theme-context';
import {Grid, FlexCol} from 'pivotal-ui/react/flex-grids';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      search: ""
    }
  };

  componentDidMount() {
    this.getNewGif();
  };

  getNewGif = () => {
    const {search} = this.state;
    let apiRequestUrl;
    if (search === '') {
      apiRequestUrl = `https://api.giphy.com/v1/gifs/random?api_key=d6cBwlVGiBroU1k4qdv1Y09RDqIopUcZ&tag=&rating=G`
    } else {
      const randomNum = Math.floor(Math.random() * 25);
      apiRequestUrl = `https://api.giphy.com/v1/gifs/search?api_key=d6cBwlVGiBroU1k4qdv1Y09RDqIopUcZ&q=${search}&limit=1&offset=${randomNum}&rating=G&lang=en`
    }
    axios.get(apiRequestUrl).then((response) => {
      const data = response.data.data;
      data.length
        ? this.setState({
          url: data[0].images['original'].url
        })
        : this.setState({
          url: data.image_url
        });
    }).catch(err => console.log(err));
  };

  onInputChange = ({target: {value}}) => {
    this.setState({search: value});
  };

  render() {
    const {url} = this.state;
    return (
      <ThemeProvider theme="dark">
        <Grid flexDirection="column">
          <FlexCol>
            <h3>Giphy Search</h3>
          </FlexCol>
          <FlexCol>
            <label htmlFor="search">search term: </label>
            <input id="search" onInput={this.onInputChange}/>
            <br/><br/>
          </FlexCol>
          {url && <FlexCol>
            <img src={url} alt="gif"/>
            <div>Powered By GIPHY</div>
          </FlexCol>}
          <Grid justifyContent="center">
            <FlexCol fixed>
              <DefaultButton onClick={this.getNewGif}>Shuffle GIF</DefaultButton>
            </FlexCol>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  };
}

export default App;
