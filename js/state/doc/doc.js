import { action, computed, observable } from 'mobx'
import BaseDoc from './base'
import axios from 'axios'

export default class DocState extends BaseDoc {

  showPreview (page) {
    window.open(`${Conf.api_url}/${this.doc}/${page}`)
  }

  @action editPage (page) {
    this.store.goTo('page', {doc: this.doc, page})
  }

  renderDoc (page) {
    window.open(`${Conf.api_url}/${this.doc}/render.pdf`)
  }

  viewDoc (page) {
    window.open(`${Conf.api_url}/${this.doc}/index.html`)
  }

  @action editContext () {
    this.store.goTo('ctx', {doc: this.doc})
  }

  @action editStyle () {
    this.store.goTo('style', {doc: this.doc})
  }
}
