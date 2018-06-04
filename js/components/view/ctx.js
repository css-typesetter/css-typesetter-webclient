import React from 'react'
import {inject, observer} from 'mobx-react'
// import CMirrorEditor from '../input/editor'

const CtxEditView = ({store}) => {
  //
  const cv = store.cv
  const rows = []
  for (let k in cv.context) {
    rows.push(<div key={k}><b>{k}</b>: {cv.context[k]}</div>)
  }
  return cv.loading ? 'loading' : (
    <div>
      {rows}
      <button onClick={() => cv.cancel()}>back</button>
    </div>
  )
}
export default inject('store')(observer(CtxEditView))
