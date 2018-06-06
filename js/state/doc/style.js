import { action, computed, observable } from 'mobx'
import axios from 'axios'
import PageEditState from './page'

export default class StyleEditState extends PageEditState {

  constructor (store, doc, page) {
    super(store, doc)
  }

  cssmode = true

  load (doc) {
    return axios.get(`${Conf.api_url}/${doc}/static/style.css`)
  }

  @action onLoaded (res) {
    this.loading = false
    this.content = res.data
  }

  @action save () {
    this.saving = true
    axios.put(`${Conf.api_url}/${this.doc}/style`, {content: this.content})
    .then(this.onSaved.bind(this))
    .catch(this.store.onError)
  }

}
