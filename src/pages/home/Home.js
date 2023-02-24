import Header from "../../components/header/Header";
import GridCards from "../../components/gridcards/GridCards";
import { isAuthenticated } from "../../utils/authHelper";
import { Component } from "react";


class Home extends Component {
  
  state = {
      errorMessage: null,
      successMessage: null,
      sneakers: [],
      genders: [],
      numProduct: 0
    }
    
    updateCounProd = (t) => {
      this.setState({numProduct:t})
    };
  
    componentDidUpdate(prevProps, prevState) {
    }
 
  
  getSneakers = () => {

    //get API url from the environment variables
    const apiURL = process.env.REACT_APP_API_URL

    //use fetch to make an API call and get a specific student (returns a promise)
    fetch(`${apiURL}/api/sneaker`)
      //on success of the fetch request, turn the response that came back into JSON
      .then((response) => response.json())
      //on success of turnig the response into JSON (data we can work with), lets add that data to state
      .then((result) => {

        //update state with the data from the API causing the page to re-render
        this.setState({ sneakers: result });
      })
      //handle any errors/failures with getting data from the API
      .catch((error) => {
        console.log(error)
      });
  }



  getGenders = () => {

    //get API url from the environment variables
    const apiURL = process.env.REACT_APP_API_URL

    //use fetch to make an API call and get a specific student (returns a promise)
    fetch(`${apiURL}/api/gender`)
      //on success of the fetch request, turn the response that came back into JSON
      .then((response) => response.json())
      //on success of turnig the response into JSON (data we can work with), lets add that data to state
      .then((result) => {

        //update state with the data from the API causing the page to re-render
        this.setState({ genders: result });
      })
      //handle any errors/failures with getting data from the API
      .catch((error) => {
        console.log(error)
      });
  }

  componentDidMount() {
    this.getSneakers()
    this.getGenders()
  }




  render() {
    
    return (
      <div className="Home">
        <Header isAuthenticated={isAuthenticated()}  countProd={this.state.numProduct}/>
        <GridCards key={1} gendersData={this.state.genders} sneakersData={this.state.sneakers} updateCounProd={this.updateCounProd} />
      </div>
    );
  }
}
export default Home;
