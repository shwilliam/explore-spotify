import React from 'react'

import TopHeader from '../components/TopHeader'
import RecommendationsModal from '../components/RecommendationsModal'
import ResetButton from '../components/ResetButton'
import PlayingInfo from '../components/PlayingInfo'
import HoverInfo from '../components/HoverInfo'
import DraggableGraphContainer from '../components/DraggableGraphContainer'
import NodeGraph from '../components/NodeGraph'
import VolumeControl from '../components/VolumeControl'

const GraphView = () => (
  <main role="main">
    <TopHeader>
      <RecommendationsModal/>
      <ResetButton/>
    </TopHeader>
    <PlayingInfo/>
    <HoverInfo/>
    <DraggableGraphContainer>
      <NodeGraph/>
    </DraggableGraphContainer>
    <VolumeControl/>
  </main>
)

export default GraphView
