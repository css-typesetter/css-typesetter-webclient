import React from 'react'
import {inject, observer} from 'mobx-react'
import CMirrorEditor from '../input/editor'

const SaveButt = observer(({cv}) => {
  return <button className='btn btn-primary' onClick={() => cv.save()} disabled={cv.saving}>save</button>
})

const UnObservedEditor = ({cv, ...rest}) => {
  return <CMirrorEditor value={cv.content} {...rest} />
}

const PageListView = ({store}) => {
  //
  const cv = store.cv
  const mode = cv.cssmode ? 'css' : 'xml'
  return cv.loading ? 'loading' : [
    <UnObservedEditor cv={cv} onChange={cv.onChange.bind(cv)} mode={mode} />,
    <div className='btn-group'>
      <SaveButt cv={cv} />
      <button className='btn btn-secondary' onClick={() => cv.cancel()} disabled={cv.saving}>cancel</button>
    </div>
  ]
}
export default inject('store')(observer(PageListView))
