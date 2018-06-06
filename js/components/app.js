import React from 'react'
import {MobxRouter} from 'mobx-router'
import {observer, Provider} from 'mobx-react'
import MessagesView from './messages'

export const App = observer(({store}) => {
  return (
    <section className='view-wrapper'>
      <Provider store={store}>
        <MobxRouter />
      </Provider>
      <MessagesView store={store} />
    </section>
  )
})
