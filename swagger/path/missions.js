module.exports = {
  '/api/v1/missions': {
    get: {
      tags: ['missions'],
      summary: '오늘의 미션 조회',
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
                refresh: true,
                missions: [
                  {
                    id: 7,
                    title: '문제',
                    isContent: 1,
                    isImage: 0,
                    cycle: 1,
                    createdAt: '2020-01-12 16:24:32',
                    updatedAt: '2020-01-12 16:24:32',
                  },
                  {
                    id: 13,
                    title: '문제',
                    isContent: 1,
                    isImage: 0,
                    cycle: 1,
                    createdAt: '2020-01-12 16:24:33',
                    updatedAt: '2020-01-12 16:24:33',
                  },
                  {
                    id: 1,
                    title: '문제',
                    isContent: 1,
                    isImage: 0,
                    cycle: 1,
                    createdAt: '2020-01-12 16:24:28',
                    updatedAt: '2020-01-12 16:24:28',
                  },
                ],
              },
            },
          },
        },
      },
    },
    post: {
      tags: ['missions'],
      summary: '미션 등록',
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
              title: '문제',
              isContent: true,
              isImage: false,
              cycle: 1,
            },
          },
        },
      ],
      responses: {
        '200': {
          schema: {
            type: 'object',
            example: {
              status: 201,
              message: '',
              data: {
                id: 6,
                title: '문제',
                isContent: true,
                isImage: false,
                cycle: 1,
                updatedAt: '2020-01-03T17:35:02.955Z',
                createdAt: '2020-01-03T17:35:02.955Z',
              },
            },
          },
        },
      },
    },
  },

  '/api/v1/missions/{id}': {
    get: {
      tags: ['missions'],
      summary: '미션 조회',
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
          description: '미션 ID',
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
                id: 6,
                title: '문제',
                isContent: true,
                isImage: false,
                cycle: 1,
                createdAt: '2020-01-03T17:35:02.000Z',
                updatedAt: '2020-01-03T17:43:10.000Z',
              },
            },
          },
        },
      },
    },
    put: {
      tags: ['missions'],
      summary: '미션 수정',
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
              title: '문제',
              isContent: true,
              isImage: false,
              cycle: 1,
            },
          },
        },
        {
          name: 'id',
          in: 'path',
          type: 'integer',
          default: 1,
          description: '미션 ID',
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
                id: 6,
                title: '문제',
                isContent: true,
                isImage: false,
                cycle: 1,
                createdAt: '2020-01-03T17:35:02.000Z',
                updatedAt: '2020-01-03T17:43:10.000Z',
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ['missions'],
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
          description: '미션 ID',
          required: true,
        },
      ],
      summary: '미션 삭제',
      responses: {
        '200': {
          schema: {
            type: 'object',
            example: {
              status: 204,
              message: '문제를 삭제 했습니다.',
              data: null,
            },
          },
        },
      },
    },
  },
  '/api/v1/missions/refresh': {
    get: {
      tags: ['missions'],
      summary: '미션 재발급',
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
              refresh: false,
              missions: [
                {
                  id: 7,
                  title: '문제',
                  isContent: 1,
                  isImage: 0,
                  cycle: 1,
                  createdAt: '2020-01-12 16:24:32',
                  updatedAt: '2020-01-12 16:24:32',
                },
                {
                  id: 13,
                  title: '문제',
                  isContent: 1,
                  isImage: 0,
                  cycle: 1,
                  createdAt: '2020-01-12 16:24:33',
                  updatedAt: '2020-01-12 16:24:33',
                },
                {
                  id: 1,
                  title: '문제',
                  isContent: 1,
                  isImage: 0,
                  cycle: 1,
                  createdAt: '2020-01-12 16:24:28',
                  updatedAt: '2020-01-12 16:24:28',
                },
              ],
            },
          },
        },
        '400': {
          schema: {
            type: 'object',
            example: {
              status: 400,
              message: '갱신 횟수가 모자랍니다.',
              data: null,
            },
          },
        },
      },
    },
  },
};
