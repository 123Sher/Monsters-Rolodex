import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // this is the App.js which represents the entire react application
import reportWebVitals from './reportWebVitals';



//The below code is the new and recommended way to render react applications in React18.
const root = ReactDOM.createRoot(document.getElementById('root')); //Creating a root that enabled React concurrent rendering features.
//The above line returns root object.
//Using the root object, we can call the render method.
root.render(
  <React.StrictMode> {/*In React 18, the Strict Mode intentionally double-invokes some lifecycle methods like componentDidMount it does only in development mode in order to catch any bugs. */}
  {/*It mounts the component.Unmounts it immediately.Then mounts it again — so that you can detect any unexpected side effects that shouldn't happen more than once. */}
    <App />  {/* this app is the component build in App.js and it will be rendered. it is the top level component.*/ }
  </React.StrictMode>
);




//The below code is the legacy way of rendering react applications.It directly renders the react elements into the specified DOM node.
//It doesn't create a root object and doesn't support the new concurrent rendering features of React 18.
//Using ReactDOM.render in react 18 will give you a warning in the console, and will run in compatibility mode.

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );



//<App /> => this html tag is some function that will return more html
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
