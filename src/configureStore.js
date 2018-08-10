import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'

const configureStore = () => {
	let store = createStore(reducers, applyMiddleware(thunk))
	return store
}
export default configureStore