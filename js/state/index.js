import {observable, computed, action} from 'mobx'
import {RouterStore} from 'mobx-router'
import cs from './i18n/cs'

import DocState from './doc/doc'
import PageState from './doc/page'
import CtxState from './doc/ctx'
import StyleState from './doc/style'

export default class AppState {
  //
  constructor(views) {
    this.router = new RouterStore()
    this.views = views
    this.onError = this.onRequesterError.bind(this)
  }

  @observable i18n = cs
  @observable lang = 'en'

  __(str) {
    return this.i18n[str] || str
  }

  @action
  changeLang(lang) {
    this.lang = lang
    this.i18n = {}
  }

  @observable messages = observable.map({})

  @action addMessage(text, type = 'info', timeout = 2000) {
    const message = {text, type, timeout}
    this.messages.set(text, message)
    if(timeout > 0) {
      function _remove() {
        this.messages.delete(text)
      }
      setTimeout(_remove.bind(this), timeout)
    }
    return message
  }

  @action removeMessage(message) {
    this.messages.delete(message.text)
  }

  onRequesterError(err) {
    this.addMessage(err.message, 'error')
  }

  // ---------------------------------------

  showDocView (doc) {
    this.cv = new DocState(this, doc)
  }

  showPageEditView (doc, page) {
    this.cv = new PageState(this, doc, page)
  }

  showCtxEditView (doc) {
    this.cv = new CtxState(this, doc)
  }

  showStyleEditView (doc) {
    this.cv = new StyleState(this, doc)
  }

  // showEntityListView() {
  //   const entityname = this.router.params.entityname
  //   const StoreClass = this.listStores[entityname]
  //   if (StoreClass === undefined) {
  //     return this.on404('unknown entity ' + entityname)
  //   }
  //   const getEntries = (pars) => this.requester.getEntries(entityname, pars)
  //   this.cv = new StoreClass(this, this.router, getEntries, (newQPars) => {
  //     this.router.goTo(this.router.currentView, this.router.params, this, newQPars)
  //   })
  //   this.cv.init().catch(this.onError)
  // }

  beforeListViewExit() {
    const queryParamsBackup = Object.assign({}, this.router.queryParams)
    this.listQParamsBackup = queryParamsBackup
    this.listParamsBackup = Object.assign({}, this.router.params)
  }

  onListParamsChange(origParams, origQueryParams) {
    if (origParams.entityname !== this.router.params.entityname) {
      return this.showEntityListView()
    }
    return this.cv.init().catch(this.onRequesterError.bind(this))
  }

  goTo(view, params, queryParams={}) {
    this.router.goTo(this.views[view], params, this, queryParams)
  }

  addClicked() {
    this.router.goTo(this.views.entity_detail, {
      entityname: this.router.params.entityname,
      id: '_new'
    }, this)
  }

}
