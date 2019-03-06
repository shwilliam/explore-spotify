import React from 'react'
import posed from 'react-pose'

const PosedDiv = posed.div({
  draggable: true,
  dragBounds: {
    top: '-20%',
    right: '50%',
    bottom: '20%',
    left: '-50%'
  }
})

const DraggableGraphContainer = ({ children }) => (
  <PosedDiv className="draggable">
    {children}
  </PosedDiv>
)

export default DraggableGraphContainer
