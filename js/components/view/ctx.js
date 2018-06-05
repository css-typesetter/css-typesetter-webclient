import React from 'react'
import {inject, observer} from 'mobx-react'
import CMirrorEditor from '../input/editor'

const UnObservedEditor = ({cv, ...rest}) => {
  return <CMirrorEditor value={cv.editedVal} {...rest} />
}

const CtxEditView = ({store}) => {
  //
  const cv = store.cv
  return cv.loading ? 'loading' : (
    <div>
      {
        cv.context.map((i, idx) => {
          return (cv.origRow === i) ? (
            <div key={idx}>
              <button className='btn btn-primary' onClick={() => cv.save()} disabled={cv.saving}>save</button>
              <button className='btn btn-secondary' onClick={() => cv.cancel()} disabled={cv.saving}>cancel</button>&nbsp;
              <input type='text' value={cv.editedKey} onChange={(evt) => cv.onChange('key', evt.target.value)} />&nbsp;:&nbsp;{
                cv.richeditor
                  ? <UnObservedEditor cv={cv} onChange={cv.onChange.bind(cv, 'val')} />
                  : <input type='text' value={cv.editedVal} onChange={(evt) => cv.onChange('val', evt.target.value)} />
              }
              <button className='btn btn-warning' onClick={() => cv.switchEditor()}>sw.editor</button>
            </div>
          ) : (
            <div key={idx}>
              <button className='btn btn-primary btn-sm' onClick={() => cv.edit(i)}>edit</button>&nbsp;
              <b>{i.key}</b>&nbsp;:&nbsp;{i.val}
            </div>
          )
        })
      }
      <hr />
      <button className='btn btn-success' onClick={() => cv.add()}>add</button>
    </div>
  )
}
export default inject('store')(observer(CtxEditView))
