import * as types from './types';
export default {
  [types.GET_THEMES]: state => {
    return state.themes
  },
  [types.GET_RECOMMENDLIST]: state => {
    return state.recommendlist
  },
  [types.GET_COMMENTS]: state => {
    return state.comments
  },
  [types.GET_ARTICLE]: state => {
    return state.article
  },
  [types.GET_ISLOADING]: state => {
    return state.isLoading
  },
}
