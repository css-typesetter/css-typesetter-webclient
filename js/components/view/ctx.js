import React from 'react'
import {inject, observer} from 'mobx-react'
import CMirrorEditor from '../input/editor'

const Preview = observer(({cv}) => {
  return <div className='regular' dangerouslySetInnerHTML={{__html: cv.editedVal}} />
})

const UnObservedEditor = ({cv, ...rest}) => {
  return (
    <div>
      <div style={{width: '25%', float: 'right'}}><Preview cv={cv} /></div>
      <div style={{width: '70%'}}><CMirrorEditor value={cv.editedVal} {...rest} /></div>
    </div>
  )
}

// const _valStyle = {
//   maxWidth: '30em', display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis'
// }

const CtxEditView = ({store}) => {
  //
  const cv = store.cv
  return cv.loading ? store.__('loading') : (
    <div>
      <button className='btn btn-success' onClick={() => cv.add()}>{store.__('add')}</button>
      <hr />
      {
        cv.context.sort((a, b) => a.key.localeCompare(b.key)).map((i, idx) => {
          return (cv.origRow === i) ? (
            <div key={idx}>
              <button className='btn btn-primary' onClick={() => cv.save()} disabled={cv.saving}>{store.__('save')}</button>
              <button className='btn btn-secondary' onClick={() => cv.cancel()} disabled={cv.saving}>{store.__('cancel')}</button>&nbsp;
              <input type='text' value={cv.editedKey} onChange={(evt) => cv.onChange('key', evt.target.value)} />&nbsp;:&nbsp;{
                cv.richeditor
                  ? <UnObservedEditor cv={cv} onChange={cv.onChange.bind(cv, 'val')} />
                  : <input type='text' value={cv.editedVal} onChange={(evt) => cv.onChange('val', evt.target.value)} />
              }
              <button className='btn btn-warning' onClick={() => cv.switchEditor()}>{store.__('switch editor')}</button>
              <button className='btn btn-success' onClick={() => cv.mardownify()}>{store.__('mardownify')}</button>
              <button className='btn btn-error' onClick={() => cv.hyphenate()}>{store.__('hyphenate')}</button>
            </div>
          ) : (
            <div key={idx}>
              <button className='btn btn-primary btn-sm' onClick={() => cv.edit(i)}>{store.__('edit')}</button>&nbsp;
              <b>{i.key}</b>&nbsp;:&nbsp;<span>{i.val.substr(0, 40)}</span>
            </div>
          )
        })
      }
      {cv.editorUpdated.toString()}
    </div>
  )
}
export default inject('store')(observer(CtxEditView))
