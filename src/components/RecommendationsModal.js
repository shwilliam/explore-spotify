/* eslint react/prop-types: 0 */
import React from 'react'
import Modal from 'react-modal'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { createPlaylist, addTracksToPlaylist } from '../assets/utils/spotify'

import { withRecommendationsContext } from '../context/recommendations'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: 10,
  ...draggableStyle
})

const getListStyle = isDraggingOver => ({
  background: '(--white)',
  padding: 5
})

Modal.setAppElement('#root')

class RecommendationsModal extends React.Component {
  state = {
    modalIsOpen: false,
    recommendations: this.props.recommendationsContext.clickedTracks
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.recommendationsContext.clickedTracks.length !== this.state.recommendations.length) {
      this.setState({ recommendations: nextProps.recommendationsContext.clickedTracks })
    }
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const recommendations = reorder(
      this.state.recommendations,
      result.source.index,
      result.destination.index
    )

    this.setState({
      recommendations
    })
  }

  exportPlaylist = () => {
    createPlaylist()
      .then(res => res.json())
      .then(({ id }) => {
        addTracksToPlaylist(id, this.state.recommendations.map(track => track.id))
          .then(res => res.json())
          .then(data => {
            // TODO: use alternative popup/toast
            alert('Playlist added!')
          })
          .catch((error) => {
            console.error(error) // eslint-disable-line
          })
      })
      .catch((error) => {
        console.error(error) // eslint-disable-line
      })
  }

  render () {
    const { modalIsOpen, recommendations } = this.state

    if (!recommendations.length) return null
    return (
      <>
        {
          !modalIsOpen && <button className="pin-bottom" onClick={this.openModal}>export</button>
        }
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Export recommendations"
          style={{
            content: {
              position: 'absolute',
              top: '130px',
              left: '1rem',
              right: '4.75rem',
              bottom: '80px',
              borderRadius: '0',
              border: 'none',
              padding: '60px'
            }
          }}
        >
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.state.recommendations.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {item.name}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <button id="recommendations-export-btn" onClick={this.exportPlaylist}>export</button>
          <button id="modal-close-btn" onClick={this.closeModal}>close</button>
        </Modal>
      </>
    )
  }
}

export default withRecommendationsContext(RecommendationsModal)
