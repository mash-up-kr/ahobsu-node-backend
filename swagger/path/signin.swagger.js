module.exports = {
  '/api/v1/signin': {
    post: {
      tags: ['signin'],
      summary: '가입 및 키 생성',
      produces: ['application/json'],
      parameters: [
        {
          name: 'Authorization',
          in: 'header',
          type: 'string',
          description: 'SNS 인증 키',
          default: 'aaa',
          required: true,
        },
        {
          name: 'body',
          in: 'body',
          required: true,
          schema: {
            type: 'object',
            example: {
              snsType: 'apple',
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
                accessToken:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJiaXJ0aGRheSI6IjE5OTctMDEtMTYiLCJlbWFpbCI6Inl1Y2hvY29waWVAZ21haWwuY29tIiwibmFtZSI6IuycoOyglSIsImdlbmRlciI6IuyXrCIsInJlZnJlc2hEYXRlIjpudWxsLCJyZWZyZXNoVG9rZW4iOm51bGwsIm1pc3Npb24iOiJ7XCJkYXRlXCI6XCIyMDIwLTAxLTA3XCIsXCJtaXNzaW9uXCI6W3tcImlkXCI6NCxcInRpdGxlXCI6XCIxMTExXCIsXCJpc0NvbnRlbnRcIjowLFwiaXNJbWFnZVwiOjAsXCJjcmVhdGVkQXRcIjpcIjIwMjAtMDEtMDNUMTc6MzQ6MzUuMDAwWlwiLFwidXBkYXRlZEF0XCI6XCIyMDIwLTAxLTAzVDE3OjM0OjM1LjAwMFpcIn0se1wiaWRcIjo3LFwidGl0bGVcIjpcIjExMTFcIixcImlzQ29udGVudFwiOjAsXCJpc0ltYWdlXCI6MCxcImNyZWF0ZWRBdFwiOlwiMjAyMC0wMS0wN1QxMTozMjo1NC4wMDBaXCIsXCJ1cGRhdGVkQXRcIjpcIjIwMjAtMDEtMDdUMTE6MzI6NTQuMDAwWlwifSx7XCJpZFwiOjMsXCJ0aXRsZVwiOlwiMTExMVwiLFwiaXNDb250ZW50XCI6MCxcImlzSW1hZ2VcIjowLFwiY3JlYXRlZEF0XCI6XCIyMDIwLTAxLTAzVDE3OjM0OjM0LjAwMFpcIixcInVwZGF0ZWRBdFwiOlwiMjAyMC0wMS0wM1QxNzozNDozNC4wMDBaXCJ9XX0iLCJzbnNJZCI6IjEiLCJzbnNUeXBlIjoiZ29vZ2xlIiwiY3JlYXRlZEF0IjoiMjAyMC0wMS0wM1QxNzozNDozNy4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMC0wMS0wN1QxMTozNDoyNC4wMDBaIn0sImlhdCI6MTU3ODM5ODI3MiwiZXhwIjoxNTc5MDAzMDcyfQ.UBYpPIRhUgnwyrYzYeSp-dEJ8KXF63cgJj2Jr4TzOpg',
                refreshToken:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzbnNJZCI6MSwiaWF0IjoxNTc4Mzk4MjcyLCJleHAiOjE1ODA5OTAyNzJ9.z8V6MFSwDOuKclTv-3hVucFCRtM6fQRtLVBZ-Dn5hlI',
                signUp: false,
              },
            },
          },
        },
      },
    },
  },
  '/api/v1/signin/refresh': {
    post: {
      tags: ['signin'],
      summary: '키 재생성',
      produces: ['application/json'],
      parameters: [
        {
          name: 'Authorization',
          in: 'header',
          type: 'string',
          description: 'API 인증 키',
          default:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzbnNJZCI6MSwiaWF0IjoxNTc4Mzk4MjcyLCJleHAiOjE1ODA5OTAyNzJ9.z8V6MFSwDOuKclTv-3hVucFCRtM6fQRtLVBZ-Dn5hlI',
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
                accessToken:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJiaXJ0aGRheSI6IjE5OTctMDEtMTYiLCJlbWFpbCI6Inl1Y2hvY29waWVAZ21haWwuY29tIiwibmFtZSI6IuycoOyglSIsImdlbmRlciI6IuyXrCIsInJlZnJlc2hEYXRlIjpudWxsLCJyZWZyZXNoVG9rZW4iOm51bGwsIm1pc3Npb24iOiJ7XCJkYXRlXCI6XCIyMDIwLTAxLTA3XCIsXCJtaXNzaW9uXCI6W3tcImlkXCI6NCxcInRpdGxlXCI6XCIxMTExXCIsXCJpc0NvbnRlbnRcIjowLFwiaXNJbWFnZVwiOjAsXCJjcmVhdGVkQXRcIjpcIjIwMjAtMDEtMDNUMTc6MzQ6MzUuMDAwWlwiLFwidXBkYXRlZEF0XCI6XCIyMDIwLTAxLTAzVDE3OjM0OjM1LjAwMFpcIn0se1wiaWRcIjo3LFwidGl0bGVcIjpcIjExMTFcIixcImlzQ29udGVudFwiOjAsXCJpc0ltYWdlXCI6MCxcImNyZWF0ZWRBdFwiOlwiMjAyMC0wMS0wN1QxMTozMjo1NC4wMDBaXCIsXCJ1cGRhdGVkQXRcIjpcIjIwMjAtMDEtMDdUMTE6MzI6NTQuMDAwWlwifSx7XCJpZFwiOjMsXCJ0aXRsZVwiOlwiMTExMVwiLFwiaXNDb250ZW50XCI6MCxcImlzSW1hZ2VcIjowLFwiY3JlYXRlZEF0XCI6XCIyMDIwLTAxLTAzVDE3OjM0OjM0LjAwMFpcIixcInVwZGF0ZWRBdFwiOlwiMjAyMC0wMS0wM1QxNzozNDozNC4wMDBaXCJ9XX0iLCJzbnNJZCI6IjEiLCJzbnNUeXBlIjoiZ29vZ2xlIiwiY3JlYXRlZEF0IjoiMjAyMC0wMS0wM1QxNzozNDozNy4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMC0wMS0wN1QxMTozNDoyNC4wMDBaIn0sImlhdCI6MTU3ODM5ODI3MiwiZXhwIjoxNTc5MDAzMDcyfQ.UBYpPIRhUgnwyrYzYeSp-dEJ8KXF63cgJj2Jr4TzOpg',
                refreshToken:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzbnNJZCI6MSwiaWF0IjoxNTc4Mzk4MjcyLCJleHAiOjE1ODA5OTAyNzJ9.z8V6MFSwDOuKclTv-3hVucFCRtM6fQRtLVBZ-Dn5hlI',
                signUp: true,
              },
            },
          },
        },
      },
    },
  },
};
