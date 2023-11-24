/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'accounts',
      [
        {
          account_id: '336a7e3b-8d4f-394b-b4df-999a6554fc56',
          email: 'dayna21@example.com',
          password: '8354741d11a09dd82950b5c7f6f44ff05afb278b',
          role: 'tourist',
        },
        {
          account_id: '37807f91-d121-347d-bccb-22cb30a7b4dc',
          email: 'gregory.ward@example.net',
          password: '889e772c819a142d3e12700be0f2dd745a57c647',
          role: 'tourist',
        },
        {
          account_id: '3ce2fc0b-ad0d-338a-bf93-522492ae1cdf',
          email: 'smitham.madilyn@example.com',
          password: 'a663af69a0c3962a0a47c6d7a15be8c2f36abcd9',
          role: 'tour guide',
        },
        {
          account_id: '6fd78392-6947-3e52-84c4-5acea89fe2d0',
          email: 'earl92@example.net',
          password: 'a2161a2ad45d26b1a11a9ff5aaf1b5ff6d3bc5d1',
          role: 'tourist',
        },
        {
          account_id: '81fe8a5f-54b4-31e2-9caa-74edbb96289a',
          email: 'estefania12@example.org',
          password: '9aa914f588b4b21d87b041891810252e865b77e0',
          role: 'tourist',
        },
        {
          account_id: '8f449bc2-81a7-37bf-9feb-fd474aeb8976',
          email: 'gracie74@example.com',
          password: 'd39548e4789eeef44fbc90c85a0526be44bfe355',
          role: 'tour guide',
        },
        {
          account_id: '978431bb-1eae-35d8-b974-10d25250fbe6',
          email: 'candelario12@example.com',
          password: '37620e51df7f4f07593e8d2096875e51a5c70acb',
          role: 'tour guide',
        },
        {
          account_id: '9f8c9cd4-044d-3a57-a16f-8d5785e0c97a',
          email: 'vbergnaum@example.net',
          password: '8fee3d866da47437cbc17c1f388cad8c3cb87e67',
          role: 'tourist',
        },
        {
          account_id: 'c2bec257-b678-3176-8cb0-eab740060fb0',
          email: 'huels.izaiah@example.org',
          password: '60e37906b8f9647132a2861e94772a48a9bbe29e',
          role: 'tourist',
        },
        {
          account_id: 'd3b1c2c8-cf1f-32ae-8693-053790aae1cc',
          email: 'emmalee.roberts@example.com',
          password: '863846ce3cd1a0b56a480e72065125847327de06',
          role: 'tourist',
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('accounts', null, {});
  },
};
