/* global marked */
import { action, computed, observable } from 'mobx'
import axios from 'axios'
import urlencode from 'urlencode'
import xml from 'xml-parse'
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
  @observable editorUpdated = new Date()

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
    this.origRow = {key: '', val: ''}
    this.context.push(this.origRow)
    this.editedKey = this.editedVal = ''
  }

  @action mardownify () {
    this.editedVal = marked(this.editedVal)
    this.editorUpdated = new Date()
  }

  addNbsp (text) {
    return text.replace(/(\s+\S) (\S+)/g, '$1&nbsp;$2')
  }

  hyphenateText (node) {
    const service = 'https://pyphen-online-hyphenator.herokuapp.com/'
    const content = urlencode(node.text)
    const url = `${service}?lang=cs&alter=%26shy%3B&content=${content}`
    return axios.get(url).then(res => {
      node.text = this.addNbsp(res.data)
    }).catch(() => {})
  }

  // for recursion ..
  hyphenateNodeList (nodeList) {
    const promises = []
    nodeList.map(i => {
      if (i.type === 'text') {
        promises.push(this.hyphenateText(i))
      } else {
        promises.push(...this.hyphenateNodeList(i.childNodes))
      }
    })
    return promises
  }

  hyphenate () {
    const xmlDoc = xml.parse(this.editedVal)
    const promises = this.hyphenateNodeList(xmlDoc)
    Promise.all(promises).then(() => this.hyphenated(xmlDoc))
  }

  @action hyphenated (xmlDoc) {
    this.editedVal = xml.stringify(xmlDoc, 2)
    this.editorUpdated = new Date()
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
