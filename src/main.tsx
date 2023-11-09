import ReactDOM from 'react-dom/client'
import './index.css'
import Router from './Router'
import { store } from './store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(

    <Provider store={store}>
      <Router />
    </Provider>

)
