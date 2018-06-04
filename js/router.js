import React from 'react'
import { Route } from 'mobx-router'

// components
import DocumentView from './components/view/doc'
import PageEditView from './components/view/page'

const views = {
  doc: new Route({
    path: '/:doc',
    component: <DocumentView />,
    // beforeExit: (route, params, store, queryParams) => {
    //   store.beforeListViewExit(route, params, store, queryParams)
    // },
    onEnter: (route, params, store) => store.showDocView(params.doc)
  }),
  page: new Route({
    path: '/:doc/:page',
    component: <PageEditView />,
    // beforeExit: (route, params, store, queryParams) => {
    //   store.beforeListViewExit(route, params, store, queryParams)
    // },
    onEnter: (route, params, store) => store.showPageEditView(params.doc, params.page)
  })
}

export default views
