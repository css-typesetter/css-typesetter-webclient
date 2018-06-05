import { action, computed, observable } from 'mobx'
import axios from 'axios'
import BaseDoc from './base'

export default class PageEditState extends BaseDoc {

  constructor (store, doc, page) {
    super(store, doc)
    this.page = page
  }

  @observable saving = false
  @observable content = ''

  @action onLoaded (res) {
    super.onLoaded(res)
    this.content = this.pages.length > 0 ? this.pages[parseInt(this.page) - 1] : ''
  }

  @action onChange (s) {
    this.content = s
  }

  @action save () {
    this.saving = true
    const p = this.page === '_new'
      ? axios.post(`${Conf.api_url}/${this.doc}/page`, {content: this.content})
      : axios.put(`${Conf.api_url}/${this.doc}/page/${this.page}`, {content: this.content})
    p.then(this.onSaved.bind(this)).catch(this.store.onError)
  }

  @action onSaved (data) {
    this.saving = false
    this.store.addMessage(this.store.__('saved'))
  }

  @action cancel () {
    this.store.goTo('doc', {doc: this.doc})
  }

}
