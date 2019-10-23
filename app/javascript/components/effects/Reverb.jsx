import React from "react";

import PlaySwitch from "../PlaySwitch";
import ToggleSwitch from "../ToggleSwitch";
import Slider from "../Slider";
import Knob from "../Knob";

export default class Reverb extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let name = "reverb";
    const {
      effect,
      wet,
      on,
      toggleEffect,
      changeEffectWetValue,
      changeReverbValue
    } = this.props;

    return (
      <div className="Effect">
        <h1>Reverb</h1>

        <div className="controlsContainer">
          <div className="controlsRow">
            <h2>Wet</h2>

            <Slider
              name={name}
              min="0"
              max="1"
              value={wet}
              handleValueChange={changeEffectWetValue}
            />
          </div>
          <div className="controlsRow">
            <h2>Reverb</h2>
            <Slider
              name={name}
              min="0"
              max="100"
              on={on}
              value={effect.Reverb}
              handleValueChange={changeReverbValue}
            />
          </div>
        </div>
        <ToggleSwitch value="Reverb" current={on} handleClick={toggleEffect} />
      </div>
    );
  }
}
