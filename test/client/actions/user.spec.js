import * as actions from 'actions/user'

describe('user actions', () => {
  it('should return an add user action', () => {
    const user = {
      name: 'Doug'
    }

    const expectedAction = {
      type: 'ADD_USER',
      user
    }

    expect(actions.addUser(user)).to.eql(expectedAction)
  })
})
