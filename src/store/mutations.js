import * as types from './types';
export default {
  [types.MODIFY_THEMES](state, all) {
    state.themes = all
  },
  [types.MODIFY_RECOMMENDLIST](state, all) {
    state.recommendlist = all
  },
  [types.MODIFY_COMMENTS](state, all) {
    state.comments = all
  },
  [types.MODIFY_ARTICLE](state, all) {
    state.article = all
  },
  [types.MODIFY_ISLOADING](state) {
    state.isLoading = !state.isLoading
  },
}
