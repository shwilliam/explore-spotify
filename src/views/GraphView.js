import React from 'react'

import TopHeader from '../components/TopHeader'
import ResetButton from '../components/ResetButton'
import PlayingInfo from '../components/PlayingInfo'
import HoverInfo from '../components/HoverInfo'
import DraggableGraphContainer from '../components/DraggableGraphContainer'
import NodeGraph from '../components/NodeGraph'
import VolumeSlider from '../components/VolumeSlider'

const GraphView = () => (
  <main role="main">
    <TopHeader>
      <ResetButton/>
    </TopHeader>
    <PlayingInfo/>
    <HoverInfo/>
    <DraggableGraphContainer>
      <NodeGraph/>
    </DraggableGraphContainer>
    <VolumeSlider/>
  </main>
)

export default GraphView
