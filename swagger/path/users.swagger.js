module.exports = {
  '/api/v1/users': {
    get: {
      tags: ['users'],
      summary: '유저 조회',
      produces: ['application/json'],
      parameters: [
        {
          name: 'Authorization',
          in: 'header',
          type: 'string',
          description: 'API 인증 키',
          default:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJiaXJ0aGRheSI6IjE5OTctMDEtMTYiLCJlbWFpbCI6Inl1Y2hvY29waWVAZ21haWwuY29tIiwibmFtZSI6IuycoOyglSIsImdlbmRlciI6IuyXrCIsInJlZnJlc2hEYXRlIjpudWxsLCJyZWZyZXNoVG9rZW4iOm51bGwsIm1pc3Npb24iOm51bGwsInNuc0lkIjoiMSIsInNuc1R5cGUiOiJnb29nbGUiLCJjcmVhdGVkQXQiOiIyMDIwLTAxLTAzVDE3OjM0OjM3LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIwLTAxLTAzVDE3OjM0OjM3LjAwMFoifSwiaWF0IjoxNTc4MDcyODc5LCJleHAiOjE1Nzg2Nzc2Nzl9.4jBy8Wrj9IukT2H2OU0UdqQjehNXMGio1KAd01z3DvE',
          required: true,
        },
      ],
      responses: {
        '200': {
          schema: {
            type: 'object',
            example: {
              status: 200,
              message: '',
              data: [
                {
                  id: 1,
                  birthday: '1997-01-16',
                  email: 'yuchocopie@gmail.com',
                  name: '유정',
                  gender: '여',
                  refreshDate: null,
                  refreshToken: null,
                  mission: null,
                  snsId: '1',
                  snsType: 'google',
                  createdAt: '2020-01-03T15:27:18.000Z',
                  updatedAt: '2020-01-03T15:27:18.000Z',
                },
              ],
            },
          },
        },
      },
    },
    // post: {
    //   tags: ['users'],
    //   summary: '회원 가입 완료를 위한 초기 정보 입력',
    //   produces: ['application/json'],
    //   parameters: [
    //     {
    //       name: 'Authorization',
    //       in: 'header',
    //       type: 'string',
    //       description: 'API 인증 키',
    //       default:
    //         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJiaXJ0aGRheSI6IjE5OTctMDEtMTYiLCJlbWFpbCI6Inl1Y2hvY29waWVAZ21haWwuY29tIiwibmFtZSI6IuycoOyglSIsImdlbmRlciI6IuyXrCIsInJlZnJlc2hEYXRlIjpudWxsLCJyZWZyZXNoVG9rZW4iOm51bGwsIm1pc3Npb24iOm51bGwsInNuc0lkIjoiMSIsInNuc1R5cGUiOiJnb29nbGUiLCJjcmVhdGVkQXQiOiIyMDIwLTAxLTAzVDE3OjM0OjM3LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIwLTAxLTAzVDE3OjM0OjM3LjAwMFoifSwiaWF0IjoxNTc4MDcyODc5LCJleHAiOjE1Nzg2Nzc2Nzl9.4jBy8Wrj9IukT2H2OU0UdqQjehNXMGio1KAd01z3DvE',
    //       required: true,
    //     },
    //     {
    //       name: 'body',
    //       in: 'body',
    //       required: true,
    //       schema: {
    //         type: 'object',
    //         example: {
    //           name: '김유정',
    //           birthday: '1997-01-16',
    //           email: 'yuchochpie@gmail.com',
    //           gender: '여',
    //           snsId: 1,
    //         },
    //       },
    //     },
    //   ],
    //   responses: {
    //     '200': {
    //       schema: {
    //         type: 'object',
    //         example: {
    //           status: 200,
    //           message: '',
    //           data: {
    //             id: 2,
    //             name: '김유정',
    //             birthday: '1997-01-16',
    //             email: 'yuchochpie@gmail.com',
    //             gender: '여',
    //             snsId: 1,
    //             snsType: 'google',
    //             updatedAt: '2020-01-03T16:46:07.880Z',
    //             createdAt: '2020-01-03T16:46:07.880Z',
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    put: {
      tags: ['users'],
      summary: '회원 정보 수정',
      produces: ['application/json'],
      parameters: [
        {
          name: 'Authorization',
          in: 'header',
          type: 'string',
          description: 'API 인증 키',
          default:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJiaXJ0aGRheSI6IjE5OTctMDEtMTYiLCJlbWFpbCI6Inl1Y2hvY29waWVAZ21haWwuY29tIiwibmFtZSI6IuycoOyglSIsImdlbmRlciI6IuyXrCIsInJlZnJlc2hEYXRlIjpudWxsLCJyZWZyZXNoVG9rZW4iOm51bGwsIm1pc3Npb24iOm51bGwsInNuc0lkIjoiMSIsInNuc1R5cGUiOiJnb29nbGUiLCJjcmVhdGVkQXQiOiIyMDIwLTAxLTAzVDE3OjM0OjM3LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIwLTAxLTAzVDE3OjM0OjM3LjAwMFoifSwiaWF0IjoxNTc4MDcyODc5LCJleHAiOjE1Nzg2Nzc2Nzl9.4jBy8Wrj9IukT2H2OU0UdqQjehNXMGio1KAd01z3DvE',
          required: true,
        },
        {
          name: 'body',
          in: 'body',
          required: true,
          schema: {
            type: 'object',
            example: {
              name: '김유정',
              birthday: '1997-01-16',
              gender: '여',
            },
          },
        },
      ],
      responses: {
        '200': {
          schema: {
            type: 'object',
            example: {
              status: 200,
              message: '',
              data: {
                id: 1,
                birthday: '1997-01-16',
                email: 'yuchochpie@gmail.com',
                name: '유정',
                gender: '여',
                refreshDate: null,
                refreshToken: null,
                mission: null,
                snsId: '1',
                snsType: 'google',
                createdAt: '2020-01-03T15:27:18.000Z',
                updatedAt: '2020-01-03T16:52:18.000Z',
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ['users'],
      parameters: [
        {
          name: 'Authorization',
          in: 'header',
          type: 'string',
          description: 'API 인증 키',
          default:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJiaXJ0aGRheSI6IjE5OTctMDEtMTYiLCJlbWFpbCI6Inl1Y2hvY29waWVAZ21haWwuY29tIiwibmFtZSI6IuycoOyglSIsImdlbmRlciI6IuyXrCIsInJlZnJlc2hEYXRlIjpudWxsLCJyZWZyZXNoVG9rZW4iOm51bGwsIm1pc3Npb24iOm51bGwsInNuc0lkIjoiMSIsInNuc1R5cGUiOiJnb29nbGUiLCJjcmVhdGVkQXQiOiIyMDIwLTAxLTAzVDE3OjM0OjM3LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIwLTAxLTAzVDE3OjM0OjM3LjAwMFoifSwiaWF0IjoxNTc4MDcyODc5LCJleHAiOjE1Nzg2Nzc2Nzl9.4jBy8Wrj9IukT2H2OU0UdqQjehNXMGio1KAd01z3DvE',
          required: true,
        },
      ],
      summary: '회원 탈퇴',
      responses: {
        '200': {
          schema: {
            type: 'object',
            example: {
              status: 204,
              message: '유저를 삭제 했습니다.',
              data: null,
            },
          },
        },
        '404': {
          schema: {
            type: 'object',
            example: {
              status: 404,
              message: '유저가 존재하지 없습니다.',
              data: null,
            },
          },
        },
        '412': {
          schema: {
            type: 'object',
            example: {
              status: 412,
              message: 'id가 올바르지 않습니다.',
              data: null,
            },
          },
        },
      },
    },
  },

  '/api/v1/users/refresh': {
    put: {
      tags: ['users'],
      summary: 'refresh Date reset',
      produces: ['application/json'],
      parameters: [
        {
          name: 'Authorization',
          in: 'header',
          type: 'string',
          description: 'API 인증 키',
          default:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJiaXJ0aGRheSI6IjE5OTctMDEtMTYiLCJlbWFpbCI6Inl1Y2hvY29waWVAZ21haWwuY29tIiwibmFtZSI6IuycoOyglSIsImdlbmRlciI6IuyXrCIsInJlZnJlc2hEYXRlIjpudWxsLCJyZWZyZXNoVG9rZW4iOm51bGwsIm1pc3Npb24iOm51bGwsInNuc0lkIjoiMSIsInNuc1R5cGUiOiJnb29nbGUiLCJjcmVhdGVkQXQiOiIyMDIwLTAxLTAzVDE3OjM0OjM3LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIwLTAxLTAzVDE3OjM0OjM3LjAwMFoifSwiaWF0IjoxNTc4MDcyODc5LCJleHAiOjE1Nzg2Nzc2Nzl9.4jBy8Wrj9IukT2H2OU0UdqQjehNXMGio1KAd01z3DvE',
          required: true,
        },
      ],
      responses: {
        '200': {
          schema: {
            type: 'object',
            example: {
              status: 200,
              message: '',
              data: {
                id: 1,
                birthday: '1997-01-16',
                email: 'yuchochpie@gmail.com',
                name: '유정',
                gender: '여',
                refreshDate: null,
                refreshToken: null,
                mission: null,
                snsId: '1',
                snsType: 'google',
                createdAt: '2020-01-03T15:27:18.000Z',
                updatedAt: '2020-01-03T16:52:18.000Z',
              },
            },
          },
        },
      },
    },
  },
  '/api/v1/users/my': {
    get: {
      tags: ['users'],
      summary: '내 정보 조회',
      produces: ['application/json'],
      parameters: [
        {
          name: 'Authorization',
          in: 'header',
          type: 'string',
          description: 'API 인증 키',
          default:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJiaXJ0aGRheSI6IjE5OTctMDEtMTYiLCJlbWFpbCI6Inl1Y2hvY29waWVAZ21haWwuY29tIiwibmFtZSI6IuycoOyglSIsImdlbmRlciI6IuyXrCIsInJlZnJlc2hEYXRlIjpudWxsLCJyZWZyZXNoVG9rZW4iOm51bGwsIm1pc3Npb24iOm51bGwsInNuc0lkIjoiMSIsInNuc1R5cGUiOiJnb29nbGUiLCJjcmVhdGVkQXQiOiIyMDIwLTAxLTAzVDE3OjM0OjM3LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIwLTAxLTAzVDE3OjM0OjM3LjAwMFoifSwiaWF0IjoxNTc4MDcyODc5LCJleHAiOjE1Nzg2Nzc2Nzl9.4jBy8Wrj9IukT2H2OU0UdqQjehNXMGio1KAd01z3DvE',
          required: true,
        },
      ],
      responses: {
        '200': {
          schema: {
            type: 'object',
            example: {
              status: 200,
              message: '',
              data: {
                id: 1,
                birthday: '1997-01-16',
                email: 'yuchocopie@gmail.com',
                name: '유정',
                gender: '여',
                refreshDate: null,
                refreshToken: null,
                mission:
                  '{"date":"2020-01-07","mission":[{"id":4,"title":"1111","isContent":0,"isImage":0,"createdAt":"2020-01-03T17:34:35.000Z","updatedAt":"2020-01-03T17:34:35.000Z"},{"id":7,"title":"1111","isContent":0,"isImage":0,"createdAt":"2020-01-07T11:32:54.000Z","updatedAt":"2020-01-07T11:32:54.000Z"},{"id":3,"title":"1111","isContent":0,"isImage":0,"createdAt":"2020-01-03T17:34:34.000Z","updatedAt":"2020-01-03T17:34:34.000Z"}]}',
                snsId: '1',
                snsType: 'google',
                createdAt: '2020-01-03T17:34:37.000Z',
                updatedAt: '2020-01-07T11:34:24.000Z',
              },
            },
          },
        },
      },
    },
  },
  '/api/v1/users/{id}': {
    get: {
      tags: ['users'],
      summary: '특정 유저 조회',
      produces: ['application/json'],
      parameters: [
        {
          name: 'Authorization',
          in: 'header',
          type: 'string',
          description: 'API 인증 키',
          default:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJiaXJ0aGRheSI6IjE5OTctMDEtMTYiLCJlbWFpbCI6Inl1Y2hvY29waWVAZ21haWwuY29tIiwibmFtZSI6IuycoOyglSIsImdlbmRlciI6IuyXrCIsInJlZnJlc2hEYXRlIjpudWxsLCJyZWZyZXNoVG9rZW4iOm51bGwsIm1pc3Npb24iOm51bGwsInNuc0lkIjoiMSIsInNuc1R5cGUiOiJnb29nbGUiLCJjcmVhdGVkQXQiOiIyMDIwLTAxLTAzVDE3OjM0OjM3LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIwLTAxLTAzVDE3OjM0OjM3LjAwMFoifSwiaWF0IjoxNTc4MDcyODc5LCJleHAiOjE1Nzg2Nzc2Nzl9.4jBy8Wrj9IukT2H2OU0UdqQjehNXMGio1KAd01z3DvE',
          required: true,
        },
        {
          name: 'id',
          in: 'path',
          type: 'integer',
          default: 1,
          description: '유저 ID',
          required: true,
        },
      ],
      responses: {
        '200': {
          schema: {
            type: 'object',
            example: {
              status: 200,
              message: '',
              data: {
                id: 1,
                birthday: '1997-01-16',
                email: 'yuchocopie@gmail.com',
                name: '유정',
                gender: '여',
                refreshDate: null,
                refreshToken: null,
                mission:
                  '{"date":"2020-01-07","mission":[{"id":4,"title":"1111","isContent":0,"isImage":0,"createdAt":"2020-01-03T17:34:35.000Z","updatedAt":"2020-01-03T17:34:35.000Z"},{"id":7,"title":"1111","isContent":0,"isImage":0,"createdAt":"2020-01-07T11:32:54.000Z","updatedAt":"2020-01-07T11:32:54.000Z"},{"id":3,"title":"1111","isContent":0,"isImage":0,"createdAt":"2020-01-03T17:34:34.000Z","updatedAt":"2020-01-03T17:34:34.000Z"}]}',
                snsId: '1',
                snsType: 'google',
                createdAt: '2020-01-03T17:34:37.000Z',
                updatedAt: '2020-01-07T11:34:24.000Z',
              },
            },
          },
        },
      },
    },
  },
};
