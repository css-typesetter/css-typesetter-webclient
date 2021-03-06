import React from 'react'
import {inject, observer} from 'mobx-react'

const PageListView = ({store}) => {
  //
  const cv = store.cv

  return (
    <div>
      <h1>{store.__('document')}: {store.router.params.doc}</h1>
      <div className='btn-group'>
        <button className='btn btn-primary' onClick={() => cv.editContext()}>{store.__('edit context')}</button>
        <button className='btn btn-warning' onClick={() => cv.editStyle()}>{store.__('edit style')}</button>
        <button className='btn btn-success' onClick={() => cv.editPage('_new')}>{store.__('add page')}</button>
        <button className='btn btn-light' onClick={() => cv.viewDoc()}>{store.__('view in browser')}</button>
        <button className='btn btn-dark' onClick={() => cv.renderDoc()}>{store.__('render PDF')}</button>
      </div>
      <hr />
      <div className='row'>
        {
          store.cv.pages.map((i, idx) => (
            <div key={idx} className='col-6'>
              <h2>{store.__('page')} {idx + 1}</h2>
              <div className='btn-group'>
                <button className='btn btn-light' onClick={() => cv.showPreview(idx + 1)}>{store.__('view page')}</button>
                <button className='btn btn-primary' onClick={() => cv.editPage(idx + 1)}>{store.__('edit page')}</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
export default inject('store')(observer(PageListView))
