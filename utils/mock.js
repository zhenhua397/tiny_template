import mockData from './mockData';

const _enableMock = true;

export function isMock() {
	return _enableMock;
}

export function mockRequest (path, data, method = 'POST') {
  const key = `${method} ${path}`;
	return new Promise((resolve, reject) => {
    if (mockData[key]) {
      console.log(`${path} mock成功 ${JSON.stringify(mockData[key])}`);
     resolve(mockData[key]);
    } else {
      console.log(`${path} mock失败`);
      reject({
        msg: '请求失败',
        status: 500
      });
    }
	});
}