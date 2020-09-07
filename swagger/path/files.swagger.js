module.exports = {
  // '/api/v1/files/week': {
  //   get: {
  //     tags: ['files'],
  //     summary: '일주일치 파일',
  //     produces: ['application/json'],
  //     parameters: [
  //       {
  //         name: 'Authorization',
  //         in: 'header',
  //         type: 'string',
  //         description: 'API 인증 키',
  //         default:
  //           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJiaXJ0aGRheSI6IjE5OTctMDEtMTYiLCJlbWFpbCI6Inl1Y2hvY29waWVAZ21haWwuY29tIiwibmFtZSI6IuycoOyglSIsImdlbmRlciI6IuyXrCIsInJlZnJlc2hEYXRlIjpudWxsLCJyZWZyZXNoVG9rZW4iOm51bGwsIm1pc3Npb24iOm51bGwsInNuc0lkIjoiMSIsInNuc1R5cGUiOiJnb29nbGUiLCJjcmVhdGVkQXQiOiIyMDIwLTAxLTAzVDE3OjM0OjM3LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIwLTAxLTAzVDE3OjM0OjM3LjAwMFoifSwiaWF0IjoxNTc4MDcyODc5LCJleHAiOjE1Nzg2Nzc2Nzl9.4jBy8Wrj9IukT2H2OU0UdqQjehNXMGio1KAd01z3DvE',
  //         required: true,
  //       },
  //     ],
  //     responses: {
  //       '200': {
  //         schema: {
  //           type: 'object',
  //           example: {
  //             status: 200,
  //             message: '',
  //             data: [
  //               {
  //                 id: 1,
  //                 cardUrl: 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/GbGLWobK.jpg',
  //                 date: '2020-01-12',
  //                 createdAt: '2020-01-12 19:50:35',
  //                 updatedAt: '2020-01-12 19:54:15',
  //               },
  //             ],
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
  // '/api/v1/files/{date}': {
  //   get: {
  //     tags: ['files'],
  //     summary: 'file 조회',
  //     consumes: ['multipart/form-data'],
  //     produces: ['application/json'],
  //     parameters: [
  //       {
  //         name: 'Authorization',
  //         in: 'header',
  //         type: 'string',
  //         description: 'API 인증 키',
  //         default:
  //           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJiaXJ0aGRheSI6IjE5OTctMDEtMTYiLCJlbWFpbCI6Inl1Y2hvY29waWVAZ21haWwuY29tIiwibmFtZSI6IuycoOyglSIsImdlbmRlciI6IuyXrCIsInJlZnJlc2hEYXRlIjpudWxsLCJyZWZyZXNoVG9rZW4iOm51bGwsIm1pc3Npb24iOm51bGwsInNuc0lkIjoiMSIsInNuc1R5cGUiOiJnb29nbGUiLCJjcmVhdGVkQXQiOiIyMDIwLTAxLTAzVDE3OjM0OjM3LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIwLTAxLTAzVDE3OjM0OjM3LjAwMFoifSwiaWF0IjoxNTc4MDcyODc5LCJleHAiOjE1Nzg2Nzc2Nzl9.4jBy8Wrj9IukT2H2OU0UdqQjehNXMGio1KAd01z3DvE',
  //         required: true,
  //       },
  //       {
  //         name: 'date',
  //         in: 'path',
  //         type: 'string',
  //         default: '2020-02-02',
  //         description: '날짜',
  //         required: true,
  //       },
  //     ],
  //     responses: {
  //       '200': {
  //         schema: {
  //           type: 'object',
  //           example: {
  //             status: 200,
  //             message: '',
  //             data: {
  //               id: 1,
  //               cardUrl: 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/GbGLWobK.jpg',
  //               date: '2020-01-12',
  //               createdAt: '2020-01-12 19:50:35',
  //               updatedAt: '2020-01-12 19:54:15',
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
  '/api/v1/files/svg/{id}': {
    put: {
      tags: ['files'],
      summary: 'file 수정',
      consumes: ['multipart/form-data'],
      produces: ['application/json'],
      parameters: [
        {
          name: 'file',
          in: 'formData',
          description: 'file to upload',
          required: false,
          type: 'file',
        },
        {
          name: 'part',
          in: 'formData',
          description: 'file to upload',
          required: false,
          type: 'text',
        },
        {
          name: 'id',
          in: 'path',
          type: 'integer',
          default: 2,
          description: '파일 ID',
          required: true,
        },
      ],
      responses: {
        200: {
          schema: {
            type: 'object',
            example: {
              status: 200,
              message: '',
              data: {
                id: 1,
                cardUrl: 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/GbGLWobK.jpg',
                part: 1,
                createdAt: '2020-01-12 19:50:35',
                updatedAt: '2020-01-12 19:54:15',
              },
            },
          },
        },
      },
    },
  },
  '/api/v1/files/{id}': {
    put: {
      tags: ['files'],
      summary: 'file 수정',
      consumes: ['multipart/form-data'],
      produces: ['application/json'],
      parameters: [
        {
          name: 'file',
          in: 'formData',
          description: 'file to upload',
          required: false,
          type: 'file',
        },
        {
          name: 'part',
          in: 'formData',
          description: 'file to upload',
          required: false,
          type: 'text',
        },
        {
          name: 'id',
          in: 'path',
          type: 'integer',
          default: 2,
          description: '파일 ID',
          required: true,
        },
      ],
      responses: {
        200: {
          schema: {
            type: 'object',
            example: {
              status: 200,
              message: '',
              data: {
                id: 1,
                cardUrl: 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/GbGLWobK.jpg',
                part: 1,
                createdAt: '2020-01-12 19:50:35',
                updatedAt: '2020-01-12 19:54:15',
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ['files'],
      summary: 'file 삭제',
      produces: ['application/json'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          type: 'integer',
          default: 2,
          description: '파일 ID',
          required: true,
        },
      ],
      responses: {
        200: {
          schema: {
            type: 'object',
            example: {
              status: 204,
              message: '파일을 삭제 했습니다.',
              data: null,
            },
          },
        },
      },
    },
  },
  '/api/v1/files': {
    post: {
      tags: ['files'],
      summary: 'file 생성',
      consumes: ['multipart/form-data'],
      produces: ['application/json'],
      parameters: [
        {
          name: 'file',
          in: 'formData',
          description: 'file to upload',
          required: false,
          type: 'file',
        },
        {
          name: 'part',
          in: 'formData',
          description: 'file to upload',
          required: false,
          type: 'text',
        },
      ],
      responses: {
        200: {
          schema: {
            type: 'object',
            example: {
              status: 201,
              message: '',
              data: {
                id: 1,
                cardUrl: 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/yzjOM7m5.jpg',
                part: 1,
                updatedAt: '2020-01-12T10:50:35.282Z',
                createdAt: '2020-01-12T10:50:35.282Z',
              },
            },
          },
        },
        500: {
          schema: {
            type: 'object',
            example: {
              status: 500,
              message: '해당날짜에 이미지가 이미 있습니다.',
              data: null,
            },
          },
        },
      },
    },
  },
};
