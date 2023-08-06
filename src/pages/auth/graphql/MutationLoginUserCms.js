export const mutatioLoginUserCms = `mutation login($LoginDto: LoginDto!) {
    result: login(params: $LoginDto){
      statusCode
      message
      data {
        auth{
          accessToken
          refreshToken
          tokenType
        }
        user {
          id
          userName
        }
      }
      error
    }
  }`;
