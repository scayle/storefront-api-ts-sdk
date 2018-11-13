import {
  nockWithBapiScope,
  disableNetAndAllowBapiCors,
} from 'bapi/test-helpers/nock';
import {BapiCall} from 'bapi/interfaces/BapiCall';
import {execute} from '../execute';

const TestCall: BapiCall<true> = {
  method: 'GET',
  endpoint: `/api/true`,
  params: undefined,
  responseValidator: (o: any): o is true => o === true,
};

disableNetAndAllowBapiCors();

it('Get basket', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/api/true')
    .query({shopId: 139})
    .reply(500, false);

  try {
    await execute('https://api-cloud.example.com', 139, TestCall, true);
  } catch (e) {
    expect(e.message).toContain('Invalid response data');
    return;
  }

  expect(true).toBe(false); // should not be reached
});
