import reducer from './reducer';
import { createStore } from 'redux';
export default function makeStore() {
  return createStore(reducer, {
    userInfo: {}, //用户信息
    //这里生命需要存储在redux中的变量
  });
}
