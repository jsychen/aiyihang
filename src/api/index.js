// let host = 'http://221.122.47.116:8010/';
let host = 'http://111.198.157.165:8010';

if (process.env.NODE_ENV === 'production') {
  // host = ' http://106.14.8.190:8010'
  host = ' http://111.198.157.165:8010'

}
const api = {
  host,
  // 登录
  login: `${host}/member/login`,
}
export default api
