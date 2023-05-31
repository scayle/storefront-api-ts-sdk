/**
 * @jest-environment node
 */

import {createFiltersEndpointRequest} from 'bapi/endpoints/filters/filters';
import {execute} from 'bapi/helpers/execute';
import {
  disableNetAndAllowBapiCors,
  nockWithBapiScope,
} from 'bapi/test-helpers/nock';
import * as zlib from 'zlib';

disableNetAndAllowBapiCors();

test.skip('Integration: Requests GZip by default', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .matchHeader('accept-encoding', 'gzip, deflate')
    .matchHeader('accept', 'application/json')
    .matchHeader('content-type', 'application/json')
    .matchHeader('user-agent', 'axios/0.26.1')
    .get(`/v1/filters?with=values&filters%5Bcategory%5D=20201&shopId=139`)

    .reply(200, zlib.gzipSync('[]'), {
      'content-encoding': 'gzip',
      'content-type': 'application/json; charset=UTF-8',
    });

  const result = await execute(
    'https://api-cloud.example.com/v1/',
    139,
    createFiltersEndpointRequest({
      where: {
        categoryId: 20201,
      },
    }),
    true,
    'query',
  );

  // NOTE: Can't assert on `content-encoding` header as that gets removed during processing
  // https://github.com/axios/axios/blob/21ae22dbd3ae3d3a55d9efd4eead3dd7fb6d8e6e/lib/adapters/http.js#L194
  // expect(result.headers['content-encoding']).toBe('gzip');

  expect(result.data).toEqual([]);
});
