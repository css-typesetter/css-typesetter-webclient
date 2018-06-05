import React from 'react'
import {inject, observer} from 'mobx-react'
import CMirrorEditor from '../input/editor'

const CtxEditView = ({store}) => {
  //
  const cv = store.cv
  return cv.loading ? 'loading' : (
    <div>
      {
        cv.context.map((i, idx) => {
          return (cv.origRow === i) ? (
            <div key={idx}>
              <button onClick={() => cv.save()} disabled={cv.saving}>save</button>
              <button onClick={() => cv.cancel()} disabled={cv.saving}>cancel</button>&nbsp;
              <input type='text' value={cv.editedKey} onChange={(evt) => cv.onChange('key', evt.target.value)} />&nbsp;:&nbsp;{
                cv.richeditor
                  ? <CMirrorEditor value={cv.editedVal} onChange={cv.onChange.bind(cv, 'val')} />
                  : <input type='text' value={cv.editedVal} onChange={(evt) => cv.onChange('val', evt.target.value)} />
              }
              <button onClick={() => cv.switchEditor()}>sw.editor</button>
            </div>
          ) : (
            <div key={idx}>
              <button onClick={() => cv.edit(i)}>edit</button>&nbsp;
              <b>{i.key}</b>&nbsp;:&nbsp;{i.val}
            </div>
          )
        })
      }
      <button onClick={() => cv.add()}>add</button>
    </div>
  )
}
export default inject('store')(observer(CtxEditView))
