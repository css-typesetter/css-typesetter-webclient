import { action, computed, observable } from 'mobx'
import axios from 'axios'

export default class BaseDocState {

  constructor (store, doc) {
    this.doc = doc
    this.store = store
    this.load(doc).then(this.onLoaded.bind(this)).catch(store.onError)
  }

  load (doc) {
    return axios.get(`${Conf.api_url}/${doc}`)
  }

  @observable pages = []
  @observable loading = true
  @observable context = {}

  @action onLoaded (res) {
    this.loading = false
    this.context = res.data[0]
    this.pages = res.data[1]
  }

}
