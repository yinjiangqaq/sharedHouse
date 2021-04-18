//import { act } from 'react-dom/test-utils';

export default function reducer(state, action) {
  switch (action.type) {
    case 'SET_USERINFO': {
      return {
        ...state,
        userInfo: action.userInfo,
      };
    }
    default:
      return state;
  }
}
