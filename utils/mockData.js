// key拼接规则：method + path
// 每添加一个mock数据，就在export末尾加一行...xxx

const bannerData = {
  'GET /banners': {
    status: 0,
    msg: 'ok',
    data: {
      id: 123,
      name: 'hehe'
    }
  }
};

export default {
  ...bannerData,
}