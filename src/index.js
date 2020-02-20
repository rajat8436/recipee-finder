import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      myRecipe: {},
      image: '',
      loadingState: null,
    };
  }

  setName = (event) =>{
    this.setState({
      search: event.target.value
    })
  };

  getRecipe = async() =>{
    this.setState({
      loadingState: 'LOADING'
    })
    console.log(this.state.search)
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.state.search}`);

    const myJson = await response.json();
    console.log("myJson" , myJson);

    if(myJson.meals == null) {    
  this.setState({
    loadingState: 'LOADING_FAILED'
  })
  } 

  var ingredients = myJson.meals.map(this.getIngredients);  
  var measures = myJson.meals.map(this.getMeasures);            
  this.setState({
    myRecipe: myJson.meals[0],
    image: myJson.meals[0].strMealThumb,
    loadingState: 'LOADING_DONE',
    ingredients: ingredients,
    measures: measures
  });
  console.log(this.state.myRecipe)
}

toggleLike= (event) =>{
  if(event.target.style.color == "black")
    event.target.style.color = "red";
  else
    event.target.style.color = "black";
}

getIngredients = (object) => {
  var keys = Object.keys(object);
  console.log(keys);
  var ingredients = [];
  for(var i=0; i<keys.length; i++) {
    if(keys[i].indexOf("strIngredient") != -1) {

      if((object["" + keys[i]]) != null && object["" + keys[i]].length > 0)
        ingredients.push(object["" + keys[i]]);
    }
  }
  console.log(ingredients);
  return ingredients;
}


getMeasures = (object) => {
  var keys = Object.keys(object);
  console.log(keys);
  var measures = [];
  for(var i=0; i<keys.length; i++) {
    if(keys[i].indexOf("strMeasure") != -1) {

      if((object["" + keys[i]]) != null && object["" + keys[i]].length > 0)
        measures.push(object["" + keys[i]]);
    }
  }
  console.log(measures);
  return measures;
}

printIngredients = (value, index) => {
  console.log(this.state);
  return <p>{value} ---- {this.state.measures[0][index]}</p>
}

  render() {   
    return (
      <div id="parent43">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.css"/>

    <div id="headerofbody">
          <h1 id="headofbody">Recipe Finder</h1>
         <center><input onChange={()=>this.setName(event)} value={this.state.search} placeholder="Enter the Name of the Dish"/>
         <span><button onClick={this.getRecipe}>Get Recipes</button>
         </span>
         <br/>
         <br/>
         {this.state.loadingState == null ? (<h2>Type a Dish Name to Search for it's ingredient</h2>): ("")}</center>
    </div>

         {this.state.loadingState == "LOADING_FAILED" ? (<h2>Data did not match with the input! </h2>): ("")}

         {this.state.loadingState=="LOADING" ? (<h1>Loading!</h1>): ("")}

         {this.state.loadingState == "LOADING_DONE"? (
    <div id="container43">

      <div id="headertwo">
         <div></div>
         <div><h1 id="main43">{this.state.myRecipe.strMeal}</h1></div>
         <div><i id="heart43" className="far fa-heart" onClick={this.toggleLike}></i></div>
      </div>

      <div id="description43">

        <div id="left43">
         <img src={this.state.image}/>
        </div>

        <div id="right43">
         <i>Category of the Meal - </i>{this.state.myRecipe.strCategory}
         <br/>
         <i>Area of the Meal - </i>{this.state.myRecipe.strArea}
         <br/>
         <br/>
         
         <i>Ingredients</i>
         <div id="foodingredient">{this.state.ingredients[0].map(this.printIngredients)}</div>
         <i><center>Recipe</center></i>
         
         <div id="foodrecipe">
         {this.state.myRecipe.strInstructions}
         </div>

        </div>
      </div>
    </div>
     ): ("")}

      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
