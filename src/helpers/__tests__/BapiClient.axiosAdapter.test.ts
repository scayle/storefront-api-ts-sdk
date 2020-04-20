import {BapiClient} from 'bapi/helpers/BapiClient';
import {disableNetAndAllowBapiCors} from 'bapi/test-helpers/nock';
import MockAdapter from 'axios-mock-adapter';
import Axios from 'axios';

var mock = new MockAdapter(Axios);

disableNetAndAllowBapiCors({shopIdHeader: true});

describe('Axios adapter', () => {
  it('should respond with desired response even with a custom axios adapter', async () => {
    mock
      .onGet('https://api-cloud.example.com/v1/baskets/customer_2137901')
      .reply(200, require(__dirname + '/responses/getBasket.json'));

    const bapi = new BapiClient({
      host: 'https://api-cloud.example.com/v1/',
      shopId: 139,
      axiosAdapter: mock.adapter(),
      shopIdPlacement: 'header',
    });

    const basketKey = 'customer_2137901';

    const basketResponse = await bapi.basket.get(basketKey);

    if (basketResponse.type !== 'success') {
      fail('Expected success response');
    }

    expect(basketResponse.basket).toHaveProperty(`cost`);
  });
});
