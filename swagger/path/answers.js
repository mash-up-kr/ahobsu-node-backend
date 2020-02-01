module.exports = {
  '/api/v1/answers': {
    post: {
      tags: ['answers'],
      summary: '답 작성',
      consumes: ['multipart/form-data'],
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
          name: 'file',
          in: 'formData',
          description: 'file to upload',
          required: false,
          type: 'file',
        },
        {
          name: 'missionId',
          in: 'formData',
          description: 'file to upload',
          required: true,
          type: 'integer',
        },
        {
          name: 'content',
          in: 'formData',
          description: 'file to upload',
          required: false,
          type: 'string',
        },
      ],
      responses: {
        '200': {
          schema: {
            type: 'object',
            example: {
              status: 201,
              message: '',
              data: [
                {
                  id: 1,
                  userId: 1,
                  missionId: 1,
                  imageUrl: 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/b6wUv0u1.jpg',
                  cardUrl: '',
                  content: 'bbb',
                  date: '2020-01-30',
                  createdAt: '2020-01-30T09:48:29.927Z',
                  updatedAt: '2020-01-30T09:48:30.029Z',
                  mission: {
                    id: 1,
                    title: '안녕',
                    isContent: true,
                    isImage: false,
                    cycle: 1,
                    createdAt: '2020-01-30T09:48:29.896Z',
                    updatedAt: '2020-01-30T09:48:29.896Z',
                  },
                },
              ],
            },
          },
        },
        '404': {
          schema: {
            type: 'object',
            example: {
              status: 404,
              message: '해당날짜에 답변이 존재합니다.',
              data: null,
            },
          },
        },
      },
    },
  },
  '/api/v1/answers/{id}': {
    put: {
      tags: ['answers'],
      summary: '답 수정',
      consumes: ['multipart/form-data'],
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
          description: '답 ID',
          required: true,
        },
        {
          name: 'file',
          in: 'formData',
          description: 'file to upload',
          required: false,
          type: 'file',
        },
        {
          name: 'content',
          in: 'formData',
          description: 'file to upload',
          required: false,
          type: 'string',
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
                userId: 1,
                missionId: 1,
                imageUrl: 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/b6wUv0u1.jpg',
                cardUrl: '',
                content: 'bbb',
                date: '2020-01-30',
                createdAt: '2020-01-30T09:48:29.927Z',
                updatedAt: '2020-01-30T09:48:30.029Z',
                mission: {
                  id: 1,
                  title: '안녕',
                  isContent: true,
                  isImage: false,
                  cycle: 1,
                  createdAt: '2020-01-30T09:48:29.896Z',
                  updatedAt: '2020-01-30T09:48:29.896Z',
                },
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ['answers'],
      summary: '답 삭제',
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
          description: '답 ID',
          required: true,
        },
      ],
      responses: {
        '200': {
          schema: {
            type: 'object',
            example: {
              status: 204,
              message: '답변을 삭제 했습니다.',
              data: null,
            },
          },
        },
      },
    },
  },
  '/api/v1/answers/week': {
    get: {
      tags: ['answers'],
      summary: '일주일치 데이터',
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
                today: '2020-01-30',
                answers: [
                  null,
                  null,
                  null,
                  {
                    id: 1,
                    userId: 1,
                    missionId: 1,
                    imageUrl: 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/b6wUv0u1.jpg',
                    cardUrl: '',
                    content: 'bbb',
                    date: '2020-01-30',
                    createdAt: '2020-01-30T09:48:29.927Z',
                    updatedAt: '2020-01-30T09:48:30.029Z',
                    mission: {
                      id: 1,
                      title: '안녕',
                      isContent: true,
                      isImage: false,
                      cycle: 1,
                      createdAt: '2020-01-30T09:48:29.896Z',
                      updatedAt: '2020-01-30T09:48:29.896Z',
                    },
                  },
                  null,
                  null,
                  null,
                ],
              },
            },
          },
        },
      },
    },
  },
  '/api/v1/answers/month': {
    get: {
      tags: ['answers'],
      summary: '한달치 데이터',
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
          name: 'date',
          in: 'query',
          type: 'string',
          description: '원하는 달(2020-01-01)',
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
                date: '2020-01-01',
                answers: [
                  [
                    {
                      id: 1,
                      userId: 1,
                      missionId: 1,
                      imageUrl: 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/b6wUv0u1.jpg',
                      cardUrl: '',
                      content: 'bbb',
                      date: '2020-01-27',
                      createdAt: '2020-01-30T09:48:29.927Z',
                      updatedAt: '2020-01-30T09:48:30.029Z',
                      mission: {
                        id: 1,
                        title: '안녕',
                        isContent: true,
                        isImage: false,
                        cycle: 1,
                        createdAt: '2020-01-30T09:48:29.896Z',
                        updatedAt: '2020-01-30T09:48:29.896Z',
                      },
                    },
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                  ],
                  [null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null],
                ],
              },
            },
          },
        },
      },
    },
  },
  '/api/v1/answers/{date}': {
    get: {
      tags: ['answers'],
      summary: '해당 날짜 데이터',
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
          name: 'date',
          in: 'path',
          type: 'string',
          default: '2020-01-06',
          description: '해당 날짜',
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
                  userId: 1,
                  missionId: 1,
                  imageUrl: 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/b6wUv0u1.jpg',
                  cardUrl: '',
                  content: 'bbb',
                  date: '2020-01-30',
                  createdAt: '2020-01-30T09:48:29.927Z',
                  updatedAt: '2020-01-30T09:48:30.029Z',
                  mission: {
                    id: 1,
                    title: '안녕',
                    isContent: true,
                    isImage: false,
                    cycle: 1,
                    createdAt: '2020-01-30T09:48:29.896Z',
                    updatedAt: '2020-01-30T09:48:29.896Z',
                  },
                },
              ],
            },
          },
        },
      },
    },
  },
};
