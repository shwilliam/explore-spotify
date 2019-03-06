import React from 'react'

const VolumeSlider = ({ volume, onChange }) => (
  <label id="volume-slider" htmlFor="range-slider">
    <div className="label">{volume}</div>
    <input
      id="range-slider"
      orient="vertical"
      type="range"
      name="range-slider"
      min="0"
      max="100"
      step="1"
      defaultValue={volume}
      onChange={(e) => onChange(e.target.value)}/>
  </label>
)

export default VolumeSlider
