import {
  ADD_EVENT,
  SUB_EVENT,
} from './actions'


const Events = (state, action) => {
  switch(action.type) {
    case ADD_EVENT:
      const addNum = {count: state.count + 1, num: state.num + 3}
      return {...addNum}

    case SUB_EVENT:
      const subNum = {count: state.count - 1, num: state.num - 3}
      return {...subNum}

    default:
      return state
  }
}


export default Events