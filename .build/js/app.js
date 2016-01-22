import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { createHistory, useBasename } from 'history';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './containers/App';
import AuthenticatedCoreLayout from './containers/AuthenticatedCoreLayout';
import LoginPage from './containers/LoginPage';
import SubredditPage from './containers/SubredditPage';
import MessagesPage from './containers/MessagesPage';
import SubredditCommentPage from './containers/SubredditCommentPage';

import rootReducer from './reducers/index';

import auth from './utils/auth';

// create a store that has redux-thunk middleware enabled
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(rootReducer);

let rootElement = document.getElementById('root');

const history = useBasename(createHistory)({
  basename: '/auth-flow'
})

function requireAuth(nextState, replaceState) {
  console.log(nextState, 'BOOM');
  if (!auth.loggedIn())
    replaceState({ nextPathname: nextState.location.pathname }, '/login')
}

render(
  <Provider store={store}>
    <Router>
			  <Route path="/" component={App} >
					<Route path="login" component={LoginPage} />
					<Route component={AuthenticatedCoreLayout} onEnter={requireAuth} >
						<Route path="subreddits" component={SubredditPage} />
						<Route path=":subreddit/comment/:id" component={SubredditCommentPage} />
						<Route path="messages" component={MessagesPage} />
					</Route>
				</Route>
		</Router>
  </Provider>,
  rootElement
)