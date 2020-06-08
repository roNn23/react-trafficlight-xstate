import React from "react";
import "./styles.scss";
import { useMachine } from "use-machine";
import TrafficLight from "react-trafficlight";

const machineConfig = {
  id: "trafficSignal",
  initial: "stop",
  states: {
    stop: {
      after: {
        5000: "prepareToGo"
      }
    },
    prepareToGo: {
      after: {
        2000: "go"
      }
    },
    go: {
      after: {
        5000: "prepareToStop"
      }
    },
    prepareToStop: {
      after: {
        3000: "stop"
      }
    }
  }
};

const App = () => {
  const machine = useMachine(machineConfig, {
    actions: {
      sideEffect: () => console.log("sideEffect")
    }
  });

  return (
    <div className="App">
      <TrafficLight
        RedOn={
          machine.state.matches("stop") || machine.state.matches("prepareToGo")
        }
        YellowOn={
          machine.state.matches("prepareToStop") ||
          machine.state.matches("prepareToGo")
        }
        GreenOn={machine.state.matches("go")}
      />
    </div>
  );
};

export default App;
