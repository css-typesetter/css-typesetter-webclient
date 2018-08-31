/* global marked */
import { action, computed, observable } from 'mobx'
import axios from 'axios'
import urlencode from 'urlencode'
import sax from 'sax'
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

  hyphenateText (text, parts, idx) {
    const service = 'https://pyphen-online-hyphenator.herokuapp.com/'
    const content = urlencode(text)
    const url = `${service}?lang=cs&alter=%26shy%3B&content=${content}`
    return axios.get(url).then(res => {
      parts[idx] = this.addNbsp(res.data)
    }).catch(() => {})
  }

  hyphenate () {
    const parser = sax.parser(false)
    const final = []
    const promises = []

    parser.onerror = function (e) {
      alert(e)
    }
    parser.ontext = (t) => {
      final.push('to')
      promises.push(this.hyphenateText(t, final, final.length - 1))
    }
    parser.onopentag = (node) => {
      final.push(`<${node.name}>`)
    }
    parser.onclosetag = (name) => {
      final.push(`</${name}>`)
    }
    parser.onend = () => {
      Promise.all(promises).then(() => {
        const result = final.slice(1, -1).join('')
        this.hyphenated(result)
      })
    }

    parser.write(`<div>${this.editedVal.toString()}</div>`)
    parser.close()
  }

  @action hyphenated (result) {
    this.editedVal = result
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
