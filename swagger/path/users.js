module.exports = {
  '/users': {
    post: {
      tags: ['users'],
      summary: '회원 가입',
      produces: ['application/json'],
      parameters: [
        {
          name: 'body',
          in: 'body',
          required: true,
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                example: 'aa@aa.com',
              },
              password: {
                type: 'string',
                example: 'aa',
              },
            },
          },
        },
      ],
      responses: {
        '200': {
          schema: {
            type: 'object',
            properties: {
              ok: {
                type: 'boolean',
                example: true,
              },
              error: {
                type: 'string',
                example: null,
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
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywibmlja05hbWUiOiJ5dW5pIiwiZW1haWwiOiJ5dW5pLmxlZUBtZW1lYm94LmNvbSIsImlhdCI6MTU1NDAxNjcyNCwiZXhwIjoxNTU0NjIxNTI0LCJpc3MiOiJUT0FTVCIsInN1YiI6InVzZXJJbmZvIn0.uCzt_eqGfX8F9fsB6cqloRlbVEqRqrC45FLECZQnDDo',
          required: true,
        },
      ],
      summary: '회원 탈퇴',
      responses: {
        '200': {
          schema: {
            type: 'object',
            properties: {
              ok: {
                type: 'boolean',
                example: true,
              },
              error: {
                type: 'string',
                example: null,
              },
            },
          },
        },
      },
    },
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
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywibmlja05hbWUiOiJ5dW5pIiwiZW1haWwiOiJ5dW5pLmxlZUBtZW1lYm94LmNvbSIsImlhdCI6MTU1NDAxNjcyNCwiZXhwIjoxNTU0NjIxNTI0LCJpc3MiOiJUT0FTVCIsInN1YiI6InVzZXJJbmZvIn0.uCzt_eqGfX8F9fsB6cqloRlbVEqRqrC45FLECZQnDDo',
          required: true,
        },
        {
          name: 'body',
          in: 'body',
          required: true,
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                example: 'aa@aa.com',
              },
              password: {
                type: 'string',
                example: 'aa',
              },
              nickName: {
                type: 'string',
                example: 'aa',
              },
            },
          },
        },
      ],
      responses: {
        '200': {
          schema: {
            type: 'object',
            properties: {
              ok: {
                type: 'boolean',
                example: true,
              },
              error: {
                type: 'string',
                example: null,
              },
            },
          },
        },
      },
    },
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
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywibmlja05hbWUiOiJ5dW5pIiwiZW1haWwiOiJ5dW5pLmxlZUBtZW1lYm94LmNvbSIsImlhdCI6MTU1NDAxNjcyNCwiZXhwIjoxNTU0NjIxNTI0LCJpc3MiOiJUT0FTVCIsInN1YiI6InVzZXJJbmZvIn0.uCzt_eqGfX8F9fsB6cqloRlbVEqRqrC45FLECZQnDDo',
          required: true,
        },
      ],
      responses: {
        '200': {
          schema: {
            type: 'object',
            properties: {
              ok: {
                type: 'boolean',
                example: true,
              },
              error: {
                type: 'string',
                example: null,
              },
              result: {
                type: 'array',
                items: {
                  type: 'object',
                  description: '유저 리스트',
                  properties: {
                    id: {
                      type: 'integer',
                      example: 12,
                    },
                    nickName: {
                      type: 'string',
                      example: 'aa',
                    },
                    token: {
                      type: 'string',
                      example:
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsIm5pY2tOYW1lIjpudWxsLCJlbWFpbCI6ImFhQGFhLmNvbSIsImlhdCI6MTU0MzA3MzU4NCwiZXhwIjoxNTQzNjc4Mzg0LCJpc3MiOiJPTkVQSUMiLCJzdWIiOiJ1c2VySW5mbyJ9.8lKBePdYO7Wv3bkAyAUUGfxbZwzZk7JNvuMx351Kfpg',
                    },
                    password: {
                      type: 'string',
                      example: 'aa',
                    },
                    createdAt: {
                      type: 'string',
                      example: '2018-11-24T15:16:33.000Z',
                    },
                    updatedAt: {
                      type: 'string',
                      example: '2018-11-24T15:34:34.000Z',
                    },
                    profileImg: {
                      type: 'string',
                      example: null,
                    },
                    deviceToken: {
                      type: 'string',
                      example: null,
                    },
                    age: {
                      type: 'string',
                      example: null,
                    },
                    gender: {
                      type: 'string',
                      example: null,
                    },
                    authToken: {
                      type: 'string',
                      example: null,
                    },
                    type: {
                      type: 'string',
                      example: null,
                    },
                    admin: {
                      type: 'string',
                      example: null,
                    },
                    leave: {
                      type: 'string',
                      example: false,
                    },
                    auth: {
                      type: 'string',
                      example: null,
                    },
                    noti: {
                      type: 'string',
                      example: false,
                    },
                    subNoti: {
                      type: 'string',
                      example: false,
                    },
                    snsId: {
                      type: 'string',
                      example: false,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/users/{id}': {
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
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywibmlja05hbWUiOiJ5dW5pIiwiZW1haWwiOiJ5dW5pLmxlZUBtZW1lYm94LmNvbSIsImlhdCI6MTU1NDAxNjcyNCwiZXhwIjoxNTU0NjIxNTI0LCJpc3MiOiJUT0FTVCIsInN1YiI6InVzZXJJbmZvIn0.uCzt_eqGfX8F9fsB6cqloRlbVEqRqrC45FLECZQnDDo',
          required: true,
        },
        {
          name: 'id',
          in: 'path',
          type: 'integer',
          default: 1,
          description: '유저 번호',
          required: true,
        },
      ],
      responses: {
        '200': {
          schema: {
            type: 'object',
            properties: {
              ok: {
                type: 'boolean',
                example: true,
              },
              error: {
                type: 'string',
                example: null,
              },
              result: {
                type: 'array',
                items: {
                  type: 'object',
                  description: '유저 리스트',
                  properties: {
                    id: {
                      type: 'integer',
                      example: 12,
                    },
                    nickName: {
                      type: 'string',
                      example: 'aa',
                    },
                    token: {
                      type: 'string',
                      example:
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsIm5pY2tOYW1lIjpudWxsLCJlbWFpbCI6ImFhQGFhLmNvbSIsImlhdCI6MTU0MzA3MzU4NCwiZXhwIjoxNTQzNjc4Mzg0LCJpc3MiOiJPTkVQSUMiLCJzdWIiOiJ1c2VySW5mbyJ9.8lKBePdYO7Wv3bkAyAUUGfxbZwzZk7JNvuMx351Kfpg',
                    },
                    password: {
                      type: 'string',
                      example: 'aa',
                    },
                    createdAt: {
                      type: 'string',
                      example: '2018-11-24T15:16:33.000Z',
                    },
                    updatedAt: {
                      type: 'string',
                      example: '2018-11-24T15:34:34.000Z',
                    },
                    profileImg: {
                      type: 'string',
                      example: null,
                    },
                    deviceToken: {
                      type: 'string',
                      example: null,
                    },
                    age: {
                      type: 'string',
                      example: null,
                    },
                    gender: {
                      type: 'string',
                      example: null,
                    },
                    authToken: {
                      type: 'string',
                      example: null,
                    },
                    type: {
                      type: 'string',
                      example: null,
                    },
                    admin: {
                      type: 'string',
                      example: null,
                    },
                    leave: {
                      type: 'string',
                      example: false,
                    },
                    auth: {
                      type: 'string',
                      example: null,
                    },
                    noti: {
                      type: 'string',
                      example: false,
                    },
                    subNoti: {
                      type: 'string',
                      example: false,
                    },
                    snsId: {
                      type: 'string',
                      example: false,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
