import React from 'react'
import {inject, observer} from 'mobx-react'
import CMirrorEditor from '../input/editor'

const SaveButt = observer(({cv}) => {
  return <button onClick={() => cv.save()}>save</button>
})

const PageListView = ({store}) => {
  //
  const cv = store.cv
  return cv.loading ? 'loading' : (
    <div>
      <CMirrorEditor value={cv.content} onChange={cv.onChange.bind(cv)} />
      <SaveButt cv={cv} />
      <button onClick={() => cv.cancel()}>cancel</button>
    </div>
  )
}
export default inject('store')(observer(PageListView))
