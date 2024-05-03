import React from "react";
import "./App.css";

const ValidateDate = ({ dateTime, timer }) => {
  //let {valid,days,hours,mins,secs,message} = timer
  return (
    <div>
      {dateTime.valid ? (
        <div className="displayTimer">
          <div className="displayCard ">
            {timer.days}
            <p> Days</p>{" "}
          </div>

          <div className="displayCard ">
            {timer.hours} <p> Hours</p>{" "}
          </div>
          <div className="displayCard ">
            {timer.mins} <p> Minutes</p>{" "}
          </div>
          <div className="displayCard ">
            {timer.secs} <p> Seconds</p>{" "}
          </div>
        </div>
      ) : (
        <p>{dateTime.message}</p>
      )}
    </div>
  );
};

export default ValidateDate;
