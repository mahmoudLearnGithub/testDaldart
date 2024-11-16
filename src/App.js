import React from "react";
import Tabs from "./components/Tabs";

const App = () => {
  return (
    <div className="container" style={{ fontFamily: "Arial, sans-serif", padding: "" }}>
      <div className="title">
      <h1>/r/FlutterDev</h1>
        </div>
      <Tabs />
    </div>
  );
};

export default App;
