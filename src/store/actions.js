import axios from "axios";
import * as types from './types';
const baseURL = '/api/';
export default {
  [types.FETCH_THEMES]({
    commit
  }) {
    axios.get(baseURL + "themes").then(res => {
      commit(types.MODIFY_THEMES, res.data.others)
    }).catch(err => console.log(err))
  },


  [types.FETCH_RECOMMENDLIST]({
    commit
  }, dateStr) {
    axios.get(baseURL + "news/before/" + dateStr).then(res => {
      commit(types.MODIFY_RECOMMENDLIST, res.data)
      commit(types.MODIFY_ISLOADING)
    }).catch(err => console.log(err))
  },


  [types.FETCH_COMMENTS]({
    commit
  }, id) {
    axios.get(baseURL + "story/" + id + "/short-comments").then(res => {
      commit(types.MODIFY_COMMENTS, res.data.comments)
    }).catch(err => console.log(err))
  },


  [types.FETCH_ARTICLE]({
    commit
  }, id) {
    axios.get(baseURL + "news/" + id).then(res => {
      res.data.body = res.data.body.replace(/src="http/g, "src=\"/img?url=http");
      res.data.body = res.data.body.replace(
        /src="https/g,
        "src=\"/img?url=https"
      );
      commit(types.MODIFY_ARTICLE, res.data)
    }).catch(err => console.log(err))
  }

}
