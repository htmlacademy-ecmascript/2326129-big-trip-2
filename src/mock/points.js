const points = [
  {
    'id': 'b6e30b4b-4b35-4fbd-aea9-7b9be137d55b',
    'base_price': 3551,
    'date_from': '2026-08-01T02:45:04.780Z',
    'date_to': '2026-08-01T19:19:04.780Z',
    'destination': '89731585-9320-4a00-89ba-f2667b46bef6',
    'is_favorite': true,
    'offers': [],
    'type': 'check-in'
  },
  {
    'id': '75e00517-be84-4e4f-81f4-4d1f82a78f7d',
    'base_price': 9567,
    'date_from': '2026-08-02T08:25:04.780Z',
    'date_to': '2026-08-02T16:57:04.780Z',
    'destination': 'd548e178-9373-4bba-b8a6-03bbae7fda73',
    'is_favorite': false,
    'offers': [
      '8b6bde16-db81-4b0c-b6f0-18b5da1106df',
      'd556b8d7-d4fe-4e90-bcd6-db5a5a249d23',
      'a55399d3-a5ed-46e4-a5ff-97cba88a9a42'
    ],
    'type': 'ship'
  },
  {
    'id': '18cc1577-4aff-4def-acba-e729cd6f3bc1',
    'base_price': 7217,
    'date_from': '2026-08-04T10:38:04.780Z',
    'date_to': '2026-08-06T00:56:04.780Z',
    'destination': '831548a8-6d8f-4058-8903-bd0cc495d7be',
    'is_favorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '10db1585-b2aa-4383-ab17-1f0e2b973d4b',
    'base_price': 8679,
    'date_from': '2026-08-06T20:49:04.780Z',
    'date_to': '2026-08-08T06:52:04.780Z',
    'destination': '89731585-9320-4a00-89ba-f2667b46bef6',
    'is_favorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': 'e02a2150-5a83-419b-a481-a0fff493b22d',
    'base_price': 9702,
    'date_from': '2026-08-09T21:04:04.780Z',
    'date_to': '2026-08-10T06:36:04.780Z',
    'destination': 'd4f083f7-82cb-4c76-9de4-f0a9545d3003',
    'is_favorite': true,
    'offers': [
      '3d12bf26-2bfd-4728-addc-bbc92398c5a7',
      '0d76f360-824c-459f-8cfe-69b627bcce0c',
      '9dce7cd6-64a1-4f48-af2d-5df3ee8882e3'
    ],
    'type': 'check-in'
  },
  {
    'id': 'fea1dedc-3dc5-41d3-88a0-b2574af88ccf',
    'base_price': 6947,
    'date_from': '2026-08-11T06:10:04.780Z',
    'date_to': '2026-08-12T17:39:04.780Z',
    'destination': '1b941616-3f51-4c24-9a0a-02f829666655',
    'is_favorite': false,
    'offers': [
      'd556b8d7-d4fe-4e90-bcd6-db5a5a249d23',
      'a55399d3-a5ed-46e4-a5ff-97cba88a9a42'
    ],
    'type': 'ship'
  },
  {
    'id': '7dca31cf-0fe6-4a19-8a99-170261c5f7cd',
    'base_price': 8270,
    'date_from': '2026-08-13T02:03:04.780Z',
    'date_to': '2026-08-14T11:18:04.780Z',
    'destination': '1b941616-3f51-4c24-9a0a-02f829666655',
    'is_favorite': false,
    'offers': [
      'd4058445-81ce-46b3-a6be-7769c84c3292'
    ],
    'type': 'restaurant'
  },
  {
    'id': 'bfb084b4-199a-49f9-9285-f51c3a599ff7',
    'base_price': 9785,
    'date_from': '2026-08-14T22:00:04.780Z',
    'date_to': '2026-08-16T20:04:04.780Z',
    'destination': '89731585-9320-4a00-89ba-f2667b46bef6',
    'is_favorite': true,
    'offers': [
      'b7dab9a1-3562-44a4-99ce-513d2733cce6',
      '04d59451-f2e0-4854-84f5-6128471c208f'
    ],
    'type': 'drive'
  },
  {
    'id': 'd2423e9f-5874-40c0-af8b-c8e29fc11136',
    'base_price': 365,
    'date_from': '2026-08-18T10:42:04.780Z',
    'date_to': '2026-08-19T00:52:04.780Z',
    'destination': 'd548e178-9373-4bba-b8a6-03bbae7fda73',
    'is_favorite': true,
    'offers': [
      '725914b4-6de2-44a0-a862-6e5dece538d3',
      '3d12bf26-2bfd-4728-addc-bbc92398c5a7',
      '0d76f360-824c-459f-8cfe-69b627bcce0c',
      '9dce7cd6-64a1-4f48-af2d-5df3ee8882e3'
    ],
    'type': 'check-in'
  },
  {
    'id': '006f3664-9bd9-4098-93e4-0d56b4c5cfa3',
    'base_price': 925,
    'date_from': '2026-08-20T18:26:04.780Z',
    'date_to': '2026-08-22T17:31:04.780Z',
    'destination': '040aaa23-a756-41e2-a4e8-1e6c2a928ad8',
    'is_favorite': true,
    'offers': [],
    'type': 'taxi'
  },
  {
    'id': '818bd8dd-844e-4bf7-9c85-6ba541bb493e',
    'base_price': 2543,
    'date_from': '2026-08-23T00:53:04.780Z',
    'date_to': '2026-08-23T10:15:04.780Z',
    'destination': '1b941616-3f51-4c24-9a0a-02f829666655',
    'is_favorite': true,
    'offers': [
      '0d76f360-824c-459f-8cfe-69b627bcce0c',
      '9dce7cd6-64a1-4f48-af2d-5df3ee8882e3'
    ],
    'type': 'check-in'
  },
  {
    'id': 'ee8f2944-6024-4d09-a518-ca3b2d885a98',
    'base_price': 8758,
    'date_from': '2026-08-24T22:56:04.780Z',
    'date_to': '2026-08-25T09:11:04.780Z',
    'destination': '5fe8f27e-c1f8-4b6a-90ba-ac59fd55155f',
    'is_favorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': 'd2fd1840-178a-4b42-a5a6-27c75365d44a',
    'base_price': 4521,
    'date_from': '2026-08-26T03:20:04.780Z',
    'date_to': '2026-08-27T00:40:04.780Z',
    'destination': '040aaa23-a756-41e2-a4e8-1e6c2a928ad8',
    'is_favorite': false,
    'offers': [
      '58bfafb7-13e2-4ec1-8df2-0399f41a4f06',
      '8f04e935-5680-4e41-8f00-ce2051ca961b',
      '4be615a7-8baa-45ed-9ca8-87a70f62e96a'
    ],
    'type': 'bus'
  },
  {
    'id': '84e782ba-8edf-482b-bb35-cf363a43005b',
    'base_price': 8434,
    'date_from': '2026-08-28T05:04:04.780Z',
    'date_to': '2026-08-29T15:18:04.780Z',
    'destination': '89731585-9320-4a00-89ba-f2667b46bef6',
    'is_favorite': true,
    'offers': [],
    'type': 'flight'
  },
  {
    'id': 'f43d5f68-349e-48f3-946b-df15f3aef078',
    'base_price': 4577,
    'date_from': '2026-08-30T12:50:04.780Z',
    'date_to': '2026-08-31T14:16:04.780Z',
    'destination': 'd548e178-9373-4bba-b8a6-03bbae7fda73',
    'is_favorite': true,
    'offers': [
      '58bfafb7-13e2-4ec1-8df2-0399f41a4f06',
      '8f04e935-5680-4e41-8f00-ce2051ca961b',
      '4be615a7-8baa-45ed-9ca8-87a70f62e96a'
    ],
    'type': 'bus'
  },
  {
    'id': 'cb57e54f-f3da-42ca-8a7d-b52a9ace408d',
    'base_price': 3553,
    'date_from': '2026-09-01T08:00:04.780Z',
    'date_to': '2026-09-02T04:51:04.780Z',
    'destination': '831548a8-6d8f-4058-8903-bd0cc495d7be',
    'is_favorite': false,
    'offers': [],
    'type': 'restaurant'
  },
  {
    'id': '606144f5-3ed5-4384-89f1-15390559c1bd',
    'base_price': 3067,
    'date_from': '2026-09-04T03:31:04.780Z',
    'date_to': '2026-09-05T20:18:04.780Z',
    'destination': '1b941616-3f51-4c24-9a0a-02f829666655',
    'is_favorite': true,
    'offers': [
      '58bfafb7-13e2-4ec1-8df2-0399f41a4f06',
      '8f04e935-5680-4e41-8f00-ce2051ca961b',
      '4be615a7-8baa-45ed-9ca8-87a70f62e96a'
    ],
    'type': 'bus'
  },
  {
    'id': 'e96d9566-4e69-4953-a32c-551248c89db7',
    'base_price': 6973,
    'date_from': '2026-09-07T19:41:04.780Z',
    'date_to': '2026-09-09T02:38:04.780Z',
    'destination': '5fe8f27e-c1f8-4b6a-90ba-ac59fd55155f',
    'is_favorite': false,
    'offers': [],
    'type': 'check-in'
  },
  {
    'id': '282dbda1-2231-405a-aa45-3fd23d192492',
    'base_price': 6718,
    'date_from': '2026-09-10T13:59:04.780Z',
    'date_to': '2026-09-12T04:49:04.780Z',
    'destination': '1b941616-3f51-4c24-9a0a-02f829666655',
    'is_favorite': true,
    'offers': [
      '40b120ad-f424-438d-ad18-57f5ac55ae76',
      '3e562952-6870-41a1-902f-49cef528e8b0',
      '8b6bde16-db81-4b0c-b6f0-18b5da1106df',
      'd556b8d7-d4fe-4e90-bcd6-db5a5a249d23',
      'a55399d3-a5ed-46e4-a5ff-97cba88a9a42'
    ],
    'type': 'ship'
  },
  {
    'id': 'cc9936f3-2fd5-4f7e-89f0-e045c5bd66eb',
    'base_price': 5872,
    'date_from': '2026-09-14T05:08:04.780Z',
    'date_to': '2026-09-15T19:14:04.780Z',
    'destination': '1b941616-3f51-4c24-9a0a-02f829666655',
    'is_favorite': true,
    'offers': [
      '6f926e65-733b-4c6c-bd21-e02d7e5979ad',
      '961f6c77-991a-4c23-bfc9-56477ef445fc'
    ],
    'type': 'train'
  },
  {
    'id': '26c9dc50-178a-4e6e-b035-407be4845f0e',
    'base_price': 5595,
    'date_from': '2026-09-17T05:04:04.780Z',
    'date_to': '2026-09-18T18:55:04.780Z',
    'destination': '1b941616-3f51-4c24-9a0a-02f829666655',
    'is_favorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '9aa90da8-5de3-420c-ab90-a25226351319',
    'base_price': 2529,
    'date_from': '2026-09-19T17:59:04.780Z',
    'date_to': '2026-09-20T23:30:04.780Z',
    'destination': '1b941616-3f51-4c24-9a0a-02f829666655',
    'is_favorite': false,
    'offers': [
      '0694db2c-34d8-443c-b394-f238758bd0c0',
      '725914b4-6de2-44a0-a862-6e5dece538d3',
      '3d12bf26-2bfd-4728-addc-bbc92398c5a7',
      '0d76f360-824c-459f-8cfe-69b627bcce0c',
      '9dce7cd6-64a1-4f48-af2d-5df3ee8882e3'
    ],
    'type': 'check-in'
  },
  {
    'id': 'e5e088da-5dd1-4392-a4a5-40605ef6f15b',
    'base_price': 1938,
    'date_from': '2026-09-21T20:35:04.780Z',
    'date_to': '2026-09-23T16:30:04.780Z',
    'destination': '040aaa23-a756-41e2-a4e8-1e6c2a928ad8',
    'is_favorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': 'c88127f3-738b-4ac6-956c-6155ea15fd2c',
    'base_price': 3209,
    'date_from': '2026-09-24T13:47:04.780Z',
    'date_to': '2026-09-25T06:19:04.780Z',
    'destination': '0a264369-b490-4454-9a8b-c1be05e56c6e',
    'is_favorite': true,
    'offers': [
      '151bd792-3600-4aff-a7e5-e37e30ecdb46',
      '5ae934ca-332d-4f29-93dd-5334e95f97e7',
      '56084452-5535-4296-9ddf-91e3e49f21d4',
      '7fcf7535-8473-4b0a-a528-6470cbc61c63'
    ],
    'type': 'flight'
  },
  {
    'id': '2ed7c205-aadb-41ed-8c02-03196a69a9e2',
    'base_price': 2317,
    'date_from': '2026-09-25T19:56:04.780Z',
    'date_to': '2026-09-26T18:34:04.780Z',
    'destination': '1b941616-3f51-4c24-9a0a-02f829666655',
    'is_favorite': false,
    'offers': [
      '8a4322c5-deb0-4242-9aec-bfa503b47e44',
      '48fe8297-5f1d-4ffe-af65-36932676318a',
      '8cc38fac-9f68-4bc3-8283-1f05aba6cfca'
    ],
    'type': 'taxi'
  }
];
