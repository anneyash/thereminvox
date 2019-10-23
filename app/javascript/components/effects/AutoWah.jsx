import React from "react";

import PlaySwitch from "../PlaySwitch";
import ToggleSwitch from "../ToggleSwitch";
import Slider from "../Slider";
import Knob from "../Knob";

export default class AutoWah extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let name = "autoWah";
    const {
      effect,
      on,
      toggleEffect,
      changeEffectWetValue,
      changeAutoWahValue
    } = this.props;

    return (
      <div className="Effect">
        <h1>Wah</h1>

        <div className="controlsContainer">
          <div className="controlsRow">
            <h2></h2>

            <Slider
              name={name}
              min="0"
              max="10"
              value={effect.wet.value}
              handleValueChange={changeEffectWetValue}
            />
          </div>
          <div className="controlsRow">
            <h2></h2>
            <Slider
              name={name}
              min="0"
              max="100"
              value={effect.maxWah}
              handleValueChange={changeAutoWahValue}
            />
          </div>
        </div>
        <ToggleSwitch value="Wah" current={on} handleClick={toggleEffect} />
      </div>
    );
  }
}
