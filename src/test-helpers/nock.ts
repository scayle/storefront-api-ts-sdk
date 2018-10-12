import * as nock from 'nock';

export function disableNetAndAllowBapiCors() {
  nock.disableNetConnect();

  nock('https://api-cloud.example.com/', {
    reqheaders: {
      'access-control-request-headers': 'X-Shop-Id',
    },
  })
    .options(/.*/)
    .reply(200, '', {
      'access-control-allow-origin': '*',
      'access-control-allow-headers': 'X-Shop-Id',
    })
    .persist();
}

export function nockWithBapiScope() {
  return nock('https://api-cloud.example.com/', {
    reqheaders: {
      'X-Shop-Id': '139',
    },
  });
}
