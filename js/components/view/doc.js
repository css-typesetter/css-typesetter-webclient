import React from 'react'
import {inject, observer} from 'mobx-react'

const PageListView = ({store}) => {
  //
  const cv = store.cv

  return (
    <div>
      {
        store.cv.pages.map((i, idx) => (
          <div key={idx}>
            <h2>page {idx + 1}</h2>
            <button onClick={() => cv.showPreview(idx + 1)}>view page</button>
            <button onClick={() => cv.editPage(idx + 1)}>edit page</button>
          </div>
        ))
      }
      <button onClick={() => cv.editContext()}>edit context</button>
      <button onClick={() => cv.renderDoc()}>render PDF</button>
    </div>
  )
}
export default inject('store')(observer(PageListView))
