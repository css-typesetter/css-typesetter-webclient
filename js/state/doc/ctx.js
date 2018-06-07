import { action, computed, observable } from 'mobx'
import axios from 'axios'
import BaseDoc from './base'

export default class CtxEditState extends BaseDoc {

  constructor (store, doc, page) {
    super(store, doc)
    this.page = page
  }

  @observable saving = false
  @observable editedKey = null
  @observable editedVal = null
  @observable origRow = null
  @observable richeditor = false

  @action onChange (s) {
    this.content = s
  }

  @action save () {
    this.saving = true
    this.origRow.key = this.editedKey
    this.origRow.val = this.editedVal
    axios.put(`${Conf.api_url}/${this.doc}/context`, this.context.toJS())
    .then(this.onSaved.bind(this))
    .catch(this.store.onError)
  }

  @action onSaved (data) {
    this.saving = false
    this.origRow = null
    this.store.addMessage(this.store.__('saved'))
    this.adding === true && delete this.adding
  }

  @action cancel () {
    if (this.adding === true) {
      delete this.adding
      this.context.remove(this.origRow)
    }
    this.origRow = null
  }

  @action onChange (attr, val) {
    attr === 'key' ? this.editedKey = val : this.editedVal = val
  }

  @action switchEditor () {
    this.richeditor = !this.richeditor
  }

  add () {
    this.adding = true
    this.origRow = {}
    this.context.push(this.origRow)
    this.editedKey = this.editedVal = ''
  }

  @action edit (row) {
    this.origRow = row
    this.editedKey = row.key
    this.editedVal = row.val
  }

  @action back () {
    this.store.goTo('doc', {doc: this.doc})
  }

}
