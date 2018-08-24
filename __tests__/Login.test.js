import React from 'react';
import * as actions from '../src/redux/actions/authActions'

describe('actions', () => {
  it('should create an action for login success', () => {
    const userData = {}
    const expectedAction={
      type:'LOGIN_SUCCESS',
      userData
    }
    expect(actions.loginSuccess(userData)).toEqual(expectedAction)
  })
})
