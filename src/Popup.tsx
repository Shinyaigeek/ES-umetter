import * as React from "react";
import copy from "clipboard-copy"

export const Popup = () => {
  return <div className="popup">
      <button onClick={() => {
          copy("asdf")
      }}>aiueo</button>
  </div>;
};