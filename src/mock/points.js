const points = [
  {
    id: '005740a3-7aed-45e2-8f1f-e1ab77ae8df1',
    base_price: 4748,
    date_from: '2026-07-28T10:54:05.386Z',
    date_to: '2026-07-28T21:01:05.386Z',
    destination: '6aeab5e8-d5a9-4c89-a033-f0017af1e736',
    is_favorite: false,
    offers: [
      'dac19b64-2bbb-420b-b2f8-2cd64d6479c8'
    ],
    type: 'taxi'
  },
  {
    id: 'a7e08ff6-21e4-4c70-bf36-97c696de6b1d',
    base_price: 4357,
    date_from: '2026-07-30T13:33:05.386Z',
    date_to: '2026-07-31T14:42:05.386Z',
    destination: '5881602e-ac7a-4de5-9183-0c3a6089bba7',
    is_favorite: true,
    offers: [
      '65e92cef-c939-4b66-a130-2efc1c53560f',
      'df53354f-71ae-4329-949a-04d8ed96e7e7',
      '994869df-dc71-4162-8a32-b142217bc121'
    ],
    type: 'train'
  },
  {
    id: '41610b40-bc2b-4341-b160-51920a0ec6fc',
    base_price: 3602,
    date_from: '2026-08-01T12:06:05.386Z',
    date_to: '2026-08-02T01:36:05.386Z',
    destination: '6aeab5e8-d5a9-4c89-a033-f0017af1e736',
    is_favorite: true,
    offers: [],
    type: 'drive'
  },
  {
    id: '4c966b25-1f1b-4cee-8324-c6046a4eb0d9',
    base_price: 3187,
    date_from: '2026-08-02T10:24:05.386Z',
    date_to: '2026-08-02T21:51:05.386Z',
    destination: '5871ac2a-78b4-41aa-a875-aaa7490eb933',
    is_favorite: true,
    offers: [
      '2aa4346c-8a01-4b21-9b06-59458bb4a1bb',
      'e138c86a-6872-4c85-a005-9746a9731b2e'
    ],
    type: 'drive'
  },
  {
    id: '9dfccf4e-24cb-4984-8100-7687646f11b8',
    base_price: 5169,
    date_from: '2026-08-04T06:21:05.386Z',
    date_to: '2026-08-04T17:41:05.386Z',
    destination: '3d063f0b-2e23-4aad-85ac-682da44b3665',
    is_favorite: false,
    offers: [
      '2220fdf3-3586-40c5-bbc7-a109a7bb1e5d',
      '29f62ca0-1e7c-49a2-842e-122b5be7b016',
      '34907d48-a2c2-45af-bc7c-34b275c363db',
      'f621124e-3f65-41c6-908b-ed407573a00f',
      'e9ad4e41-4a2a-424b-8d66-8cc083094498',
      '9ce0ec82-fd88-4603-b5e6-2c15da171054'
    ],
    type: 'flight'
  },
  {
    id: '46e9916a-0495-484e-8128-f0562f992841',
    base_price: 3039,
    date_from: '2026-08-06T02:12:05.386Z',
    date_to: '2026-08-06T17:08:05.386Z',
    destination: '6aeab5e8-d5a9-4c89-a033-f0017af1e736',
    is_favorite: false,
    offers: [
      'df53354f-71ae-4329-949a-04d8ed96e7e7',
      '994869df-dc71-4162-8a32-b142217bc121'
    ],
    type: 'train'
  },
  {
    id: '0a93936e-0980-4533-8488-254c544b8596',
    base_price: 7253,
    date_from: '2026-08-08T02:54:05.386Z',
    date_to: '2026-08-09T07:44:05.386Z',
    destination: 'c0e0e33d-1157-4cc8-b414-c9bd718c27db',
    is_favorite: false,
    offers: [
      '2220fdf3-3586-40c5-bbc7-a109a7bb1e5d',
      '29f62ca0-1e7c-49a2-842e-122b5be7b016',
      '34907d48-a2c2-45af-bc7c-34b275c363db',
      'f621124e-3f65-41c6-908b-ed407573a00f',
      'e9ad4e41-4a2a-424b-8d66-8cc083094498',
      '9ce0ec82-fd88-4603-b5e6-2c15da171054'
    ],
    type: 'flight'
  },
  {
    id: '536d40a5-ff7e-47ee-a9ce-bb7103a4e994',
    base_price: 692,
    date_from: '2026-08-09T21:58:05.386Z',
    date_to: '2026-08-11T15:56:05.386Z',
    destination: 'c0e0e33d-1157-4cc8-b414-c9bd718c27db',
    is_favorite: false,
    offers: [
      '65892c39-1d64-42d3-9ded-a3807ec09161',
      '3d3fb3ad-6a4b-4239-852e-8568ed7c4e84',
      'a8e97ff1-f50d-4341-893c-c657938db912',
      '6e47ccb4-273d-40b2-8fe7-1c960428aef7',
      '8aa78c97-a572-4258-bf8d-65eee520a078',
      'f2380486-4fd7-46f3-8fac-1d3a7a2668e3'
    ],
    type: 'ship'
  },
  {
    id: '2d455557-e109-4af4-bc20-dce39d63b416',
    base_price: 4904,
    date_from: '2026-08-13T00:30:05.386Z',
    date_to: '2026-08-13T07:01:05.386Z',
    destination: '5871ac2a-78b4-41aa-a875-aaa7490eb933',
    is_favorite: true,
    offers: [
      'df53354f-71ae-4329-949a-04d8ed96e7e7',
      '994869df-dc71-4162-8a32-b142217bc121'
    ],
    type: 'train'
  },
  {
    id: 'fc8563fb-b7c5-4a0f-a511-679be53242eb',
    base_price: 6561,
    date_from: '2026-08-15T02:45:05.386Z',
    date_to: '2026-08-15T16:38:05.386Z',
    destination: 'ec58793c-7e7c-4c57-8c4b-5614740c167d',
    is_favorite: false,
    offers: [
      '2b5679d8-dea4-403d-b4a8-a14594dfb158',
      'db9de88f-deff-427e-a530-8a2d06d9eabf',
      '3a2eca9a-6003-4024-9468-c7e5b3a641d0',
      '0e1763c9-cbc7-4d6d-badb-b80df8406249'
    ],
    type: 'check-in'
  },
  {
    id: 'b52aa928-c65d-407b-8547-b6daae82e0ca',
    base_price: 1562,
    date_from: '2026-08-17T12:43:05.386Z',
    date_to: '2026-08-17T23:57:05.386Z',
    destination: 'c0e0e33d-1157-4cc8-b414-c9bd718c27db',
    is_favorite: false,
    offers: [
      '69d0ce66-d088-4572-bcf8-7df0fb6e17c6',
      '755d1733-546c-4d3d-8a99-2006d4ffe7cb',
      'dac19b64-2bbb-420b-b2f8-2cd64d6479c8'
    ],
    type: 'taxi'
  },
  {
    id: '6fdc55f0-17a4-46bb-a05f-93dd302903c7',
    base_price: 5626,
    date_from: '2026-08-19T22:36:05.386Z',
    date_to: '2026-08-20T14:08:05.386Z',
    destination: '5881602e-ac7a-4de5-9183-0c3a6089bba7',
    is_favorite: false,
    offers: [
      'e2a0f38b-8a93-4de8-ae05-1cf0ecf456ab'
    ],
    type: 'restaurant'
  },
  {
    id: '53ae2f8e-118f-40b7-8b32-d44cd51b6fba',
    base_price: 1960,
    date_from: '2026-08-22T04:38:05.386Z',
    date_to: '2026-08-22T23:31:05.386Z',
    destination: '50c07454-8099-4570-8020-40e3825ca84b',
    is_favorite: true,
    offers: [
      'd8a60be6-27ca-466b-a8d5-c3facc610cfc',
      'e2a0f38b-8a93-4de8-ae05-1cf0ecf456ab'
    ],
    type: 'restaurant'
  },
  {
    id: '7e3b7e0c-1d11-4456-bb7b-8bca37c556bb',
    base_price: 9388,
    date_from: '2026-08-23T10:49:05.386Z',
    date_to: '2026-08-25T02:10:05.386Z',
    destination: '6aeab5e8-d5a9-4c89-a033-f0017af1e736',
    is_favorite: true,
    offers: [
      '8ac3ad6d-3329-4233-b097-92ea5785321c',
      '0e5a3318-7726-40c9-848a-d86fc08fd53b',
      '6c5b4b69-8e2d-466e-abef-7850c7b0af81'
    ],
    type: 'bus'
  },
  {
    id: '72b1fae5-b556-4795-9c1b-eb3c50a16f44',
    base_price: 946,
    date_from: '2026-08-26T04:17:05.386Z',
    date_to: '2026-08-27T12:23:05.386Z',
    destination: '3d063f0b-2e23-4aad-85ac-682da44b3665',
    is_favorite: true,
    offers: [],
    type: 'taxi'
  },
  {
    id: '375d2da3-d313-48b6-bc9c-fdfefaae7779',
    base_price: 2193,
    date_from: '2026-08-29T06:28:05.386Z',
    date_to: '2026-08-31T04:14:05.386Z',
    destination: '3d063f0b-2e23-4aad-85ac-682da44b3665',
    is_favorite: true,
    offers: [],
    type: 'flight'
  },
  {
    id: 'bec8878d-4f08-4d8b-a1a0-b35ffd89dc4f',
    base_price: 2134,
    date_from: '2026-09-01T16:05:05.386Z',
    date_to: '2026-09-02T09:17:05.386Z',
    destination: '5881602e-ac7a-4de5-9183-0c3a6089bba7',
    is_favorite: false,
    offers: [
      'e138c86a-6872-4c85-a005-9746a9731b2e'
    ],
    type: 'drive'
  },
  {
    id: 'b4e27dc1-7935-4e70-b36f-8ee6dacf0df0',
    base_price: 7713,
    date_from: '2026-09-04T03:03:05.386Z',
    date_to: '2026-09-04T16:41:05.386Z',
    destination: 'd6012821-685c-4edd-b0f2-969ee0d0ccf0',
    is_favorite: false,
    offers: [
      '65892c39-1d64-42d3-9ded-a3807ec09161',
      '3d3fb3ad-6a4b-4239-852e-8568ed7c4e84',
      'a8e97ff1-f50d-4341-893c-c657938db912',
      '6e47ccb4-273d-40b2-8fe7-1c960428aef7',
      '8aa78c97-a572-4258-bf8d-65eee520a078',
      'f2380486-4fd7-46f3-8fac-1d3a7a2668e3'
    ],
    type: 'ship'
  },
  {
    id: '82603909-f18b-45dc-9146-24dd67080315',
    base_price: 1776,
    date_from: '2026-09-05T19:17:05.386Z',
    date_to: '2026-09-07T08:35:05.386Z',
    destination: '3d063f0b-2e23-4aad-85ac-682da44b3665',
    is_favorite: false,
    offers: [
      '994869df-dc71-4162-8a32-b142217bc121'
    ],
    type: 'train'
  },
  {
    id: '7df3be2c-c6c2-4aa1-b71a-e47e9d60ef20',
    base_price: 8269,
    date_from: '2026-09-09T04:32:05.386Z',
    date_to: '2026-09-10T21:16:05.386Z',
    destination: 'c0e0e33d-1157-4cc8-b414-c9bd718c27db',
    is_favorite: true,
    offers: [
      'd8a60be6-27ca-466b-a8d5-c3facc610cfc',
      'e2a0f38b-8a93-4de8-ae05-1cf0ecf456ab'
    ],
    type: 'restaurant'
  },
  {
    id: 'a42baf53-f84f-4245-9ed9-09f250b9e0cf',
    base_price: 3906,
    date_from: '2026-09-11T08:19:05.386Z',
    date_to: '2026-09-11T22:48:05.386Z',
    destination: 'c290edd5-f0f8-4049-b50d-f9269d6d1d19',
    is_favorite: true,
    offers: [
      '6c5b4b69-8e2d-466e-abef-7850c7b0af81'
    ],
    type: 'bus'
  },
  {
    id: 'fffcecb6-08af-48c0-8320-9c7fd4e35901',
    base_price: 5982,
    date_from: '2026-09-13T16:47:05.386Z',
    date_to: '2026-09-15T16:19:05.386Z',
    destination: '6aeab5e8-d5a9-4c89-a033-f0017af1e736',
    is_favorite: false,
    offers: [],
    type: 'check-in'
  },
  {
    id: '8fccb0a3-c57a-4244-b822-b79f0aaf64d9',
    base_price: 3334,
    date_from: '2026-09-16T03:53:05.386Z',
    date_to: '2026-09-18T02:14:05.386Z',
    destination: '99cf4281-9d1e-4487-927c-c32effdc533d',
    is_favorite: true,
    offers: [
      '8fb212d6-bb86-4090-8540-f16e7ebb97b9',
      '70563226-694e-41a3-b20f-54b9fab5d56c',
      '69d0ce66-d088-4572-bcf8-7df0fb6e17c6',
      '755d1733-546c-4d3d-8a99-2006d4ffe7cb',
      'dac19b64-2bbb-420b-b2f8-2cd64d6479c8'
    ],
    type: 'taxi'
  },
  {
    id: '95b5dbb7-ceaf-4ef2-a1f0-b0690e8bb66e',
    base_price: 6210,
    date_from: '2026-09-20T03:04:05.386Z',
    date_to: '2026-09-21T19:41:05.386Z',
    destination: 'd6012821-685c-4edd-b0f2-969ee0d0ccf0',
    is_favorite: true,
    offers: [
      'e2a0f38b-8a93-4de8-ae05-1cf0ecf456ab'
    ],
    type: 'restaurant'
  },
  {
    id: '8f86286f-1c27-4b4e-b744-b49b2919ae41',
    base_price: 586,
    date_from: '2026-09-23T14:47:05.386Z',
    date_to: '2026-09-25T05:36:05.386Z',
    destination: 'ec58793c-7e7c-4c57-8c4b-5614740c167d',
    is_favorite: false,
    offers: [
      '0e5a3318-7726-40c9-848a-d86fc08fd53b',
      '6c5b4b69-8e2d-466e-abef-7850c7b0af81'
    ],
    type: 'bus'
  }
];
