import { authActions, store } from '_store';

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method) {
    return (url, body) => {
        const requestOptions = {
            method:method,
            headers: authHeader(url)
        };
      if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        var response = fetch(url, requestOptions).then(handleResponse);
      return response;
    }
}

// helper functions

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const token = authToken();
    const isLoggedIn = !!token;
    const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
}

function authToken() {
    return store.getState().auth.user?.token;
}

function handleResponse(response) {
   console.log("prueba"+response)
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            if ([401, 403].includes(response.status) && authToken()) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                const logout = () => store.dispatch(authActions.logout());
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        } else {
          if (data.status = 'SUCCESS')
          {
            if (data.token != 'undefined')
            {
              return ok({
                token: data.token
              });
            }
            return data;
          } else {
            const error = (data && data.status);
            return Promise.reject(error);
          }
        }


    });
  function ok(body) {
     return Promise.resolve(JSON.stringify(body))
  }
}