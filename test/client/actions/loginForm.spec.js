import { polyfill } from 'es6-promise'
import fetchy from 'isomorphic-fetch/fetch-npm-node'
import nock from 'nock'
import { mockStore } from '../bootstrap'
import { startSubmit, stopSubmit } from 'redux-form'
import * as actions from 'actions/loginForm'

function fetch(url, options) {
  return fetchy(`http://localhost:9876${url}`, options)
}

global.fetch = fetch
polyfill()

describe('synchronous loginForm actions', () => {
  it('should create an action to open the login form', () => {
    const expectedAction = {
      type: 'OPEN_LOGIN_FORM'
    }

    expect(actions.openLoginForm()).to.eql(expectedAction)
  })

  it('should close the login form', () => {
    const expectedAction = {
      type: 'CLOSE_LOGIN_FORM'
    }

    expect(actions.closeLoginForm()).to.eql(expectedAction)
  })
})

describe('asynchronous loginForm actions', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  });

  afterEach(() => {
    nock.cleanAll()
    sandbox.restore()
  })

  it('should login a user when username/password are good', (done) => {
    const user = {
      name: 'Doug'
    }

    nock('http://localhost:9876')
      .post('/login')
      .reply(200, {user})

    const expectedActions = [
      startSubmit('login'),
      { errors: undefined, form: 'login', type: 'redux-form/STOP_SUBMIT' },
      { type: 'CLOSE_LOGIN_FORM' },
      { type: 'ADD_USER', user}
    ]

    const store = mockStore({ }, expectedActions, done)
    store.dispatch(actions.login('email', 'pass', 'all'))
  })

  it('should not login a user when username/password are bad', (done) => {
    const user = {
      name: 'Doug'
    }

    nock('http://localhost:9876')
      .post('/login')
      .reply(403, {user})

    const expectedActions = [
      startSubmit('login'),
      stopSubmit('login', {_error: 'email does not exist or password is bad'})
    ]

    const store = mockStore({ }, expectedActions, done)
    store.dispatch(actions.login('email', 'pass', 'all'))
  })
})
