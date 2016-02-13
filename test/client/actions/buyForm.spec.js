import { polyfill } from 'es6-promise'
import fetchy from 'isomorphic-fetch/fetch-npm-node'
import nock from 'nock'
import { mockStore } from '../bootstrap'
import { startSubmit, stopSubmit } from 'redux-form'
import * as actions from 'actions/buyForm'

function fetch(url, options) {
  return fetchy(`http://localhost:9876${url}`, options)
}

global.fetch = fetch
polyfill()

describe('synchronous buyForm actions', () => {
  it('should create an action to open the buy form', () => {
    const expectedAction = {
      type: 'OPEN_BUY_FORM',
      packageId: 'all'
    }

    expect(actions.openBuyForm('all')).to.eql(expectedAction)
  })

  it('should close the buy form', () => {
    const expectedAction = {
      type: 'CLOSE_BUY_FORM'
    }

    expect(actions.closeBuyForm()).to.eql(expectedAction)
  })

  it('should create an action to mark the buy form as finished', () => {
    const expectedAction = {
      type: 'MARK_BUY_FORM_AS_FINISHED'
    }

    expect(actions.markBuyFormAsFinished()).to.eql(expectedAction)
  })

  it('should create an action to mark the buy form as failed', () => {
    const message = 'cats'
    const expectedAction = stopSubmit('buy', {_error: 'cats'})

    expect(actions.markBuyFormAsFailed(message)).to.eql(expectedAction)
  })
})

describe('asynchronous buy form actions', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  });

  afterEach(() => {
    nock.cleanAll()
    sandbox.restore()
  })

  describe('buy() action', () => {
    it('dispatches a charge action when form is valid', (done) => {
      const user = {
        name: 'Doug'
      }

      const stripeCreditCard = {
        number: '1234',
        cvc: '123',
        exp_month: '06',
        exp_year: '2015'
      }

      sandbox.stub(Stripe.card, 'createToken', (details, callback) => {
        callback(200, {id: 20})
      })

      nock('http://localhost:9876')
        .post('/buy')
        .reply(200, {user});

      const expectedActions = [
        startSubmit('buy'),
        { errors: undefined, form: 'buy', type: 'redux-form/STOP_SUBMIT' },
        { type: 'MARK_BUY_FORM_AS_FINISHED' },
        { type: 'ADD_USER', user}
      ]

      const store = mockStore({ }, expectedActions, done)
      store.dispatch(actions.buy(stripeCreditCard, {}, 'all'))
    })

    it('marks the form as failed when stripe returns an error message', (done) => {
      const message = 'Bad Card Data'

      sandbox.stub(Stripe.card, 'createToken', (details, callback) => {
        callback(200, {error: { message }, id: 20})
      })

      const expectedActions = [
        startSubmit('buy'),
        { errors: {_error: message}, form: 'buy', type: 'redux-form/STOP_SUBMIT' },
      ]

      const store = mockStore({ }, expectedActions, done)
      store.dispatch(actions.buy({}, {}, 'all'))
    })

    it('dispatches a markBuyFormAsFailed response when posting to /buy fails', (done) => {
      const message = 'bad thing'

      sandbox.stub(Stripe.card, 'createToken', (details, callback) => {
        callback(200, {error: { message }, id: 20})
      })

      nock('http://localhost:9876')
        .post('/buy')
        .reply(403, {error: { error: { message } }});

      const expectedActions = [
        startSubmit('buy'),
        { errors: {_error: message}, form: 'buy', type: 'redux-form/STOP_SUBMIT' },
      ]

      const store = mockStore({ }, expectedActions, done)
      store.dispatch(actions.buy({}, {}, 'all'))
    })
  })

  describe('charge() action', () => {
    it('adds a new user when data is valid', (done) => {
      const user = {
        name: 'Doug'
      }

      nock('http://localhost:9876')
        .post('/buy')
        .reply(200, {user})

      const expectedActions = [
        { errors: undefined, form: 'buy', type: 'redux-form/STOP_SUBMIT' },
        { type: 'MARK_BUY_FORM_AS_FINISHED' },
        { type: 'ADD_USER', user}
      ]

      const store = mockStore({ }, expectedActions, done)
      store.dispatch(actions.charge({id: 2}, {}, user, 'all'))
    })

    it('dispatches a markBuyFormAsFailed when data is invalid', (done) => {
      const message = 'bad thing'

      const user = {
        name: 'Doug'
      }

      nock('http://localhost:9876')
        .post('/buy')
        .reply(403, { error: { message } });

      const expectedActions = [
        { errors: {_error: message}, form: 'buy', type: 'redux-form/STOP_SUBMIT' },
      ]

      const store = mockStore({ }, expectedActions, done)
      store.dispatch(actions.charge({id: 2}, {}, user, 'all'))
    })
  })
})
