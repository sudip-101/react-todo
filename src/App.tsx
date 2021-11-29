import React from "react";
import "./App.scss";
import TodoContainer from "./containers/TodoContainer";

const App: React.FC = () => {
  return (
    <div className="App">
      <TodoContainer />
    </div>
  );
};

export default App;
