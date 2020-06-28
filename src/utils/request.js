let baseURL = 'https://gank.io';

export function configBaseURL(url) {
  // 简单校验
  if (url && url.indexOf(http) !== -1) {
    baseURL = url;
  }
}

export function getData(path, data) {
  return request(path, data, 'GET');
}

export function postData(path, data) {
  return request(path, data, 'POST');
}

export function request(path, data, method = 'POST') {
  let url = path;
  if (path.indexOf(baseURL) === -1) {
    url = baseURL + path;
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data: data || {},
      method,
      success (res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(`${path} 请求成功 ${JSON.stringify(res)}`);
          resolve(res)
        }
        else {
          console.log(`${path} 请求失败 ${JSON.stringify(res)}`);
          reject(res)
        }
      },
      fail (err) {
        console.log(`${path} 请求失败 ${JSON.stringify(err)}`);
        reject({
          errMsg: '请求失败',
          statusCode: 500
        })
      }
    })
  })
}