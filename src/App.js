import { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

import './App.css';

const App = () => {
  //[value,setValue]
  //useState returns a state variable and function to update it.
  //our components re-render every time a set function gets called from our use state hooks.
  const [searchField,setSearchField] = useState(''); //encapsulating a singular value from that state.
  //if we need multiple values in a state, we need multiple useState calls
  //each hook only hooks into one value.  
  const [monsters,setMonsters] = useState([]);
  const [filteredMonsters,setFilterMonsters] = useState([monsters]); 

//This array, because it comes from outside of our browser, is going to give us an array that is different in memory
//  than the one that we have stored.Even if the values inside of this array is the exact same, because we know we get 
// the same ten user objects back in this array every time we call this API URL.But because it comes from outside of our
//  browser, it is a different array in memory.Every time this check happensOur set monsters is seeing that this user's 
// array is a different one in memory.It's a different array, even if the values inside are the same.Remember, 
// it's not about the values in the array.It's about whether or not that array points to the same reference in memory.
// And every time this happens, it is a different array in memory.So as a result, what happens is that every single 
// time this monsters is getting called, it is re rendering this entire function.So it's going to re fetch every 
// single time, which puts us in a circular loop.We are going to re render in turn we are going to fetch again, 
// get a new set of users and then update the state.State is updated react re renders this function fetches 
// again gets different users sets monsters and then reruns.And now we're stuck in this loop where we're just 
// constantly re fetching over and over and over and over again.And that is why this is happening.As a result,
//  what we need to do is we need to stop fetching somehow inside of this functional componentevery time.
// And the way we do that is actually using side effects.

//USEEFFECT SYNTAX
//-callback function, =>this callback is going to be the code or the effect that we want to happen 
// inside of our functional component
// -array of dependancies =>What this array says is that whenever any of the values inside of this dependency 
// array change is when I'm going to run this function, this callback function.

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => setMonsters(users));
  },[]);//the only time you should ever call this function is on mount, because if any of the dependencies 
  // change use effect is going to call this function,but I'm passing you no dependencies, which means that 
  // nothing is ever going to change.



  // when it comes to these functions,rendering top to bottom, what we know is that every time this function runs, 
  // this filtered monsters array is getting rebuilt, even if the monster's array has not changed.This is okay, though,
  //  because we want to do this essentially whenever monsters change or whatever,search field change.
  //what we want to do is we only want to filter these monsters whenever the things relevant to filtering monsters 
  // has changed, meaning that if the monsters array has changed or if the search field value has changed, both of 
  // which live in our state.So what we can do in order to fix this is that we can make another effect.

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilterMonsters(newFilteredMonsters);
  },[monsters,searchField]);//I want you to filter through these monsters whenever either the monsters array 
  // changes or whenever the search field changes.
 


  console.log(searchField); // the default will be ''}
  //After typing values in input box : <whatever typed inside input box>

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return(
    <div className="App">
        <h1 className='app-title'>Monsters Rolodex</h1>
        <SearchBox className='monsters-search-box' onChangeHandler={onSearchChange} placeholder='search monsters' />
        <CardList monsters={filteredMonsters} />
      </div>
  )
}

export default App;
