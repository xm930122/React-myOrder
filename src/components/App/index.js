import React from 'react';
import './style.css';
import OrderList from "../OrderList";
import Header from "../Header";

function App() {
  return (
    <div className="app">
      <Header/>
      <OrderList/>
      
    </div>
  );
}

export default App;
