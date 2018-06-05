import React from 'react'
import {MobxRouter} from 'mobx-router'
import {observer, Provider} from 'mobx-react'
import MessagesView from './messages'

export const App = observer(({store}) => {
  return (
    <section className='view-wrapper container-fluid'>
      <div className='row' style={{width: '100%'}}>
        <Provider store={store} style={{width: '100%'}}>
          <MobxRouter />
        </Provider>
        <MessagesView store={store} />
      </div>
    </section>
  )
})
