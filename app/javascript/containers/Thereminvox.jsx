import React from "react";
import Tone from "tone";

export default class Thereminvox extends React.Component {
  constructor(props) {
    super(props);

    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    oscillator.type = "sine";

    let analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    oscillator.connect(analyser);

    this.state = {
      audioContext: audioContext,
      oscillator: oscillator,
      analyser: analyser,
      playing: false,
      x: 0,
      y: 0,
      fftData: []
    };

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleStartOrStopClick = this.handleStartOrStopClick.bind(this);
    this.changeFrequency = this.changeFrequency.bind(this);
    this.changeDetune = this.changeDetune.bind(this);
    this.changeVisualization = this.changeVisualization.bind(this);
    this.handleSynthPlay = this.handleSynthPlay.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousemove", this.handleMouseMove);
  }

  handleMouseMove(e) {
    this.setState({
      x: e.clientX,
      y: e.clientY
    });

    this.changeFrequency();
    this.changeDetune();
    this.changeVisualization();
  }

  handleStartOrStopClick() {
    let { playing } = this.state;

    if (playing) {
      this.handleStop();
    } else {
      this.handleStart();
    }
  }

  handleSynthPlay() {
    let synth = new Tone.Synth().toMaster();
    //synth.triggerAttackRelease("A4", "4n");

    let pattern = new Tone.Pattern(
      function(time, note) {
        synth.triggerAttackRelease(note, "4n");
      },
      ["C4", "D4", "E4", "G4", "A4"]
    );

    pattern.start(0);
    Tone.Transport.bpm.valye = 220;
    Tone.Transport.start();
  }

  handleStart() {
    let { audioContext, oscillator, analyser, x, y } = this.state;

    oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(x, audioContext.currentTime);

    //let sourse = audioContext.createMediaStreamSourse(oscillator);
    //sourse.connect(analyser);
    //analyser.connect(oscillator);

    oscillator.connect(audioContext.destination);
    oscillator.start();

    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    oscillator.connect(analyser);

    this.setState({
      oscillator: oscillator,
      analyser: analyser,
      playing: true
    });
  }

  handleStop() {
    let { oscillator } = this.state;
    oscillator.stop();

    this.setState({
      oscillator: oscillator,
      playing: false
    });
  }

  changeFrequency() {
    let { audioContext, oscillator, x, y } = this.state;
    oscillator.frequency.setValueAtTime(x, audioContext.currentTime);
  }

  changeDetune() {
    let { audioContext, oscillator, x, y } = this.state;
    oscillator.detune.setValueAtTime(x, audioContext.currentTime);
  }

  changeVisualization() {
    const { analyser, playing } = this.state;

    console.log(playing);

    if (playing) {
      console.log("bla");
      const bufferLength = analyser.frequencyBinCount;
      let dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);

      this.setState({
        fftData: dataArray
      });
    }
  }

  render() {
    const { playing, analyser, fftData } = this.state;
    let button = "Start";

    if (playing) {
      button = "Stop";
    }

    let elements = [];

    if (fftData != undefined) {
      fftData.map(function(fftParam, i) {
        elements.push(
          <div
            key={i}
            className="analyserCol"
            style={{ height: fftParam + "px" }}
          />
        );
      });
    }

    return (
      <div>
        <div onClick={this.handleSynthPlay}>Synth</div>
        <div onClick={this.handleStartOrStopClick}>{button}</div>
        <div className="analyser">{elements}</div>
      </div>
    );
  }
}
