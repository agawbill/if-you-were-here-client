import React from "react";
import Cockpit from "./containers/Cockpit/Cockpit";
import Layout from "./containers/Layout/Layout";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Cockpit />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
