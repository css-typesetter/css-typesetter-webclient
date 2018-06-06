import React from 'react'
import { Route } from 'mobx-router'

// components
import DocumentView from './components/view/doc'
import PageEditView from './components/view/page'
import CtxEditView from './components/view/ctx'

const views = {
  doc: new Route({
    path: '/:doc',
    component: <DocumentView />,
    onEnter: (route, params, store) => store.showDocView(params.doc)
  }),
  ctx: new Route({
    path: '/:doc/ctx',
    component: <CtxEditView />,
    // beforeExit: (route, params, store, queryParams) => {
    //   store.beforeListViewExit(route, params, store, queryParams)
    // },
    onEnter: (route, params, store) => store.showCtxEditView(params.doc)
  }),
  style: new Route({
    path: '/:doc/style',
    component: <PageEditView />,
    // beforeExit: (route, params, store, queryParams) => {
    //   store.beforeListViewExit(route, params, store, queryParams)
    // },
    onEnter: (route, params, store) => store.showStyleEditView(params.doc)
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
