import {createCategoryBySlugEndpointRequest} from 'bapi/endpoints/categories/categoryBySlug';
import {execute} from 'bapi/helpers/execute';
import {
  nockWithBapiScope,
  disableNetAndAllowBapiCors,
} from 'bapi/test-helpers/nock';

disableNetAndAllowBapiCors();

test('Fetch category by slug', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get(`/v1/categories/frauen/bekleidung/jeans/slim-fit`)
    .query({
      with: 'properties:name(),descendants',
      depth: '2',
      shopId: 139,
    })
    .replyWithFile(200, __dirname + '/responses/categoryBySlug.json', {
      'Content-Type': 'application/json',
    });

  const result = await execute(
    'https://api-cloud.example.com/v1/',
    139,
    createCategoryBySlugEndpointRequest({
      slugPath: ['frauen', 'bekleidung', 'jeans', 'slim-fit'],
      with: {
        children: 1,
      },
    }),
  );

  expect(result.data.children).toBeTruthy();
  expect(result.data.children!.length).toEqual(3);
});

test('Fetch category by slug error input: Error if receiving category list', async () => {
  nockWithBapiScope()
    .defaultReplyHeaders({'access-control-allow-origin': '*'})
    .get(`/v1/categories/&ecc=0`)
    .query({
      with: 'properties:name(),descendants',
      depth: '2',
      shopId: 139,
    })
    .replyWithFile(200, __dirname + '/responses/categories.json', {
      'Content-Type': 'application/json',
    });

  try {
    await execute(
      'https://api-cloud.example.com/v1/',
      139,
      createCategoryBySlugEndpointRequest({
        slugPath: ['&ecc=0'], // broken slug, as reported in https://servicedesk-aboutyou-cloud.atlassian.net/browse/WW-995
        with: {
          children: 1,
        },
      }),
    );

    // Fail test if above expression doesn't throw anything.
    expect(true).toBe(false);
  } catch (e) {
    expect((e as any).message).toBe('Invalid response data');
  }
});
