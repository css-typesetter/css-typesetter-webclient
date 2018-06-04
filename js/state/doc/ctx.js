import { action, computed, observable } from 'mobx'
import axios from 'axios'
import BaseDoc from './base'

export default class PageEditState extends BaseDoc {

  constructor (store, doc, page) {
    super(store, doc)
    this.page = page
  }

  @observable saving = false
  @observable edited = null

  @action onChange (s) {
    this.content = s
  }

  @action save () {
    saving = true
    axios.post().then(this.onSaved.bind(this))
  }

  @action onSaved (data) {
    saving = false
  }

  @action cancel () {

  }

  @action back () {
    this.store.goTo('doc', {doc: this.doc})
  }

}
