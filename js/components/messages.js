import React from 'react'
import PropTypes from 'prop-types'
import {observer} from 'mobx-react'

const style = {
  position: 'absolute',
  right: 0,
  bottom: '3em',
  color: 'white'
}
const itemStyle = {
  padding: '1em'
}
const typeStyle = {
  'info': 'green',
  'error': 'red'
}
function _itemStyle (type) {
  return Object.assign({}, itemStyle, {backgroundColor: typeStyle[type]})
}

const MessagesView = ({store}) => {
  let mess = []
  store.messages.forEach((message, key) => {
    mess.push(
      <span key={key} style={_itemStyle(message.type)}>
        {message.text}
      </span>
    )
  })
  return (<div style={style}>{mess}</div>)
}
MessagesView.propTypes = {
  store: PropTypes.object.isRequired
}
export default observer(MessagesView)
