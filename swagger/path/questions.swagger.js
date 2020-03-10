module.exports = {
  '/api/v1/questions/{page}': {
    get: {
      tags: ['questions'],
      summary: '질문 데이터 조회',
      produces: ['application/json'],
      parameters: [
        {
          name: 'page',
          in: 'path',
          type: 'string',
          default: '1',
          description: '해당 페이지',
          required: true,
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
                sum: 1,
                question: {
                  id: 1,
                  content: '나는 누구인가?',
                  updatedAt: '2020-02-23T08:07:59.120Z',
                  createdAt: '2020-02-23T08:07:59.120Z',
                },
              },
            },
          },
        },
      },
    },
  },

  '/api/v1/questions': {
    post: {
      tags: ['questions'],
      summary: '질문 작성',
      produces: ['application/json'],
      parameters: [
        {
          name: 'body',
          in: 'body',
          required: true,
          schema: {
            type: 'object',
            example: {
              content: '나는 누구인가?',
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
                id: 1,
                content: '나는 누구인가?',
                updatedAt: '2020-02-23T08:07:59.120Z',
                createdAt: '2020-02-23T08:07:59.120Z',
              },
            },
          },
        },
      },
    },
  },
};
