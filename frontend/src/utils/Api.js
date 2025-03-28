import axios from 'axios';

export async function apiGetWithToken(path) {
  let oldAccessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.get(path,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Authorization': 'Bearer ' + oldAccessToken
        },
      }
    );

    return response;

  } catch (error) {
    if (error.response && error.response.status === 403) {
      const renewalResponse = await axios.post('/api/token/renewal',
        {
          refreshToken: localStorage.getItem('refreshToken')
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
          },
        }
      );

      let data = renewalResponse.data;
      let { accessToken, refreshToken } = data.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      return await axios.get(path,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': 'Bearer ' + accessToken
          },
        }
      );
    }
  }
}


export async function apiPostWithToken(path, data) {
  let oldAccessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.post(path, data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Authorization': 'Bearer ' + oldAccessToken
        },
      }
    );

    return response;

  } catch (error) {
    if (error.response && error.response.status === 403) {
      const renewalResponse = await axios.post('/api/token/renewal',
        {
          refreshToken: localStorage.getItem('refreshToken')
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
          },
        }
      );

      let { accessToken, refreshToken } = renewalResponse.data.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      return await axios.post(path, data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': 'Bearer ' + accessToken
          },
        }
      );
    }
  }
}
