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
  return cv.loading ? 'loading' : (
    <div>
      <UnObservedEditor cv={cv} onChange={cv.onChange.bind(cv)} />
      <div className='btn-group'>
        <SaveButt cv={cv} />
        <button className='btn btn-secondary' onClick={() => cv.cancel()} disabled={cv.saving}>cancel</button>
      </div>
    </div>
  )
}
export default inject('store')(observer(PageListView))
