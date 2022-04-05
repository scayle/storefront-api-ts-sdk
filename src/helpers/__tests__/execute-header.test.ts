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

disableNetAndAllowBapiCors({shopIdHeader: true});

it('execute 1', async () => {
  nockWithBapiScope({shopIdHeader: true})
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get('/api/true')
    .reply(500, false);

  try {
    await execute(
      'https://api-cloud.example.com',
      139,
      TestCall,
      true,
      'header',
    );
  } catch (e) {
    expect((e as any).message).toContain('Invalid response data');
    return;
  }

  expect(true).toBe(false); // should not be reached
});
