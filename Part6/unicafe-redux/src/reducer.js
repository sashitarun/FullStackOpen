let initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  //console.log(action)
  switch (action.type) {
    case 'GOOD':
      initialState = {...initialState, good : initialState.good + 1}
      return initialState
    case 'OK':
      initialState = {...initialState, ok : initialState.ok + 1}
      return initialState
    case 'BAD':
      initialState = {...initialState, bad : initialState.bad + 1}
      return initialState
    case 'ZERO':
      initialState = {
        good : 0,
        ok : 0,
        bad : 0
      }
      return initialState
    default: return state
  }
  
}

export default counterReducer