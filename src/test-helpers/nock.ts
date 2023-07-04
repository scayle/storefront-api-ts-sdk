import nock from 'nock';

type Config = {shopIdHeader?: true};

export function disableNetAndAllowBapiCors(config?: Config) {
  nock.disableNetConnect();

  if (config && config.shopIdHeader) {
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
}

export function nockWithBapiScope(config?: Config) {
  return nock('https://api-cloud.example.com/', {
    reqheaders:
      config && config.shopIdHeader
        ? {
            'X-Shop-Id': '139',
          }
        : undefined,
  });
}
