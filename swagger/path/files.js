module.exports = {
  '/files': {
    post: {
      tags: ['files'],
      summary: 'file 생성',
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
          name: 'date',
          in: 'formData',
          description: 'file to upload',
          required: false,
          type: 'text',
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
                id: 2,
                file: 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/Z2bwdxRF.jpg',
                date: '2020-01-08',
                updatedAt: '2020-01-07T12:19:23.971Z',
                createdAt: '2020-01-07T12:19:23.971Z',
              },
            },
          },
        },
        '500': {
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
  '/files/{id}': {
    put: {
      tags: ['files'],
      summary: 'file 수정',
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
          name: 'id',
          in: 'path',
          type: 'integer',
          default: 2,
          description: '파일 ID',
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
                id: 2,
                file: 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/Z2bwdxRF.jpg',
                date: '2020-01-08',
                updatedAt: '2020-01-07T12:19:23.971Z',
                createdAt: '2020-01-07T12:19:23.971Z',
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ['files'],
      summary: 'file 삭제',
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
          default: 2,
          description: '파일 ID',
          required: true,
        },
      ],
      responses: {
        '200': {
          schema: {
            type: 'object',
            example: {
              status: 200,
              message: '파일을 삭제 했습니다.',
              data: null,
            },
          },
        },
      },
    },
  },
};
