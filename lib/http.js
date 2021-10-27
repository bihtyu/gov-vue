const axios = require('axios')

axios.interceptors.response.use(res => {
  return res.data
})

/**
 * 获取模板列表 
 * @returns Promise
 */
async function getRepoList() {
  return axios.get('https://api.github.com/repos/bihtyu/gov-template')
}

/**
 * 获取版本信息
 * @param {*} reop 
 * @returns 
 */
async function getTagList(reop) {
  return axios.get('https://api.github.com/repos/bihtyu/gov-template/tags')
}

module.exports = {
  getRepoList,
  getTagList
}
