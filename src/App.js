import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import ValidateDate from "./ValidateDate";

function App() {
  const [isStart, setIsStart] = useState(false);
  const [dateTime, setDateTime] = useState({
    value: "",
    valid: true,
    message: "",
  });
  const [timer, setTimer] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 1,
  });

  function timerControl(e) {
    e.preventDefault();
    setIsStart(!isStart);
  }
  function formatDate(e) {
    setDateTime({
      value: e.target.value,
      valid: true,
      message: "",
    });

    console.log(Date.parse(e.target.value) - Date.parse(new Date()));
    if (Date.parse(e.target.value) < Date.parse(new Date())) {
      setDateTime({
        value: e.target.value,
        valid: false,
        message: "Date selected is less than current date",
      });
    } else if (
      Date.parse(e.target.value) - Date.parse(new Date()) >
      8640000000
    ) {
      setDateTime({
        value: e.target.value,
        valid: false,
        message: "Selected time is more than 100 days",
      });
    }
  }
  function totalTime(time) {
    let sec = Math.floor(time / 1000) % 60;
    let min = Math.floor(time / 1000 / 60) % 60;
    let hour = Math.floor(time / 1000 / 60 / 60) % 24;
    let day = Math.floor(time / 1000 / 60 / 60 / 24);

    if (sec< 0) {
      setDateTime({
        ...dateTime,
        valid: false,
        message: "Count down is over",
      });
      setIsStart(!isStart);
    }

    setTimer({
      days: day,
      hours: hour,
      mins: min,
      secs: sec,
    });
    console.log(day, hour, min, sec);
  }
  useEffect(() => {
    let time;
    if (isStart) {
      time = setInterval(() => {
        console.log(timer.secs);
        totalTime(Date.parse(dateTime.value) - Date.parse(new Date()));
      }, 1000);
    } else {
      setTimer({
        days: 0,
        hours: 0,
        mins: 0,
        secs: 0,
      });
      //setDateTime(0);
      clearInterval(time);
    }

    return () => clearInterval(time);
  }, [isStart]);

  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      <form onSubmit={timerControl} className="form">
        <input className="btn"
          type="datetime-local"
          value={dateTime.value}
          name="dateTime"
          onChange={formatDate}
        />
        <br/>
        <button type="submit" disabled={!dateTime.valid} className="btn">
          {isStart ? "Cancel Timer" : "Start Timer "}
        </button>
      </form>
      <br />
      <ValidateDate dateTime={dateTime} timer={timer} />
    </div>
  );
}

export default App;
