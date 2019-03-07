/* eslint react/prop-types: 0 */
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

class DraggableGraphContainer extends React.PureComponent {
  render () {
    const { children, ...props } = this.props

    return (
      <PosedDiv className="draggable" {...props}>
        {children}
      </PosedDiv>
    )
  }
}

export default DraggableGraphContainer
