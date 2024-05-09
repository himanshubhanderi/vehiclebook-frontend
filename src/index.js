import React from "react";
import ReactDOM from "react-dom";

import OrderForm from "./components/OrderForm";

import "./styles.css";
import "react-notifications/lib/notifications.css";
import ParentComponent from "./components1/ParentComponent";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

function App() {
  // return <OrderForm />;
  return (
    <>
      <ParentComponent />
	  <NotificationContainer/>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
