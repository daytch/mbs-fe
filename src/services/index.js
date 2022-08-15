import axios from 'axios'
import { /* getHeader, */ getHeaderToken } from './common'

export function POST(url, body, header = getHeaderToken(), type = 'default') {
  if (type === 'default') {
    return axios({
      url: url,
      method: 'post',
      data: body,
      headers: header,
    })
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          return res.data
        } else if (res.status === 401) {
          Logout()
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          Logout()
        }
        return err
      })
  } else {
    var formData = new FormData()
    formData.append('image', body.split('base64,')[1])

    return axios({
      url: url,
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          return res.data
        } else if (res.status === 401) {
          Logout()
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          Logout()
        }
        return err
      })
  }
}

export function POSTLogin(url, body) {
  return axios
    .post(url, { ...body })
    .then((res) => {
      if (res.status === 201 || res.status === 200) {
        return res.data
      } else if (res.status === 401) {
        return res.data
      }
    })
    .catch((err) => {
      if (err.response.status === 401) {
        return err.response
      }
      return err
    })
}

export function POSTWithMessage(url, body, header = getHeaderToken()) {
  return axios
    .post(
      url,
      { ...body },
      {
        headers: header,
      },
    )
    .then((res) => {
      if (res.status === 201 || res.status === 200) {
        return {
          isError: false,
          message: 'Success',
        }
      } else {
        return {
          isError: true,
          message: 'Failed to add Data',
        }
      }
    })
    .catch((err) => {
      if (err.response.status === 401) {
        Logout()
      }
      if (err.response.status === 400) {
        return {
          isError: true,
          message: err.response.data.error,
        }
      }
      return {
        isError: true,
        message: 'Something wrong in our system, please contact Administrator!',
      }
    })
}

export function Logout() {
  localStorage.clear()
  window.location = '/login'
}

export function GET(url, header = getHeaderToken()) {
  return axios
    .get(url, {
      headers: header,
    })
    .then((res) => {
      if (res.status === 200) {
        return res.data
      } else if (res.status === 401) {
        Logout()
      }
    })
    .catch((err) => {
      if (err.response.status === 401) {
        Logout()
      }
      return err
    })
}

export function PUT(url, body, header = getHeaderToken()) {
  return axios({
    url: url,
    method: 'put',
    data: body,
    headers: header,
  })
    .then((res) => {
      if (res.status === 200) {
        return res.data
      } else if (res.status === 401) {
        Logout()
      } else {
        return {
          isError: true,
          message: 'Failed to update',
        }
      }
    })
    .catch((err) => {
      if (err.response.status === 401) {
        Logout()
      }
      return err
      // if (err.response.status === 400) {
      //   return {
      //     isError: true,
      //     message: err.response.data.errors[0].description, // err.response.data.error,
      //   }
      // }
      // return {
      //   isError: true,
      //   message: 'Something wrong in our system, please contact Administrator!',
      // }
    })
}

export function DELETE(url, body, header = getHeaderToken()) {
  if (body) {
    return axios({
      url: url,
      method: 'delete',
      data: body,
      headers: header,
    })
      .then((res) => {
        if (res.status === 200) {
          return res.data
        } else if (res.status === 401) {
          Logout()
        } else {
          return {
            isError: true,
            message: 'Failed to update',
          }
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          Logout()
        }
        if (err.response.status === 400) {
          return {
            isError: true,
            message: err.response.data.error,
          }
        }
        return {
          isError: true,
          message: 'Something wrong in our system, please contact Administrator!',
        }
      })
  } else {
    return axios
      .delete(url, { headers: header })
      .then((res) => {
        if (res.status === 200) {
          return {
            isError: false,
            message: 'Delete Success.',
          }
        } else if (res.status === 401) {
          Logout()
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          Logout()
        }
        return {
          isError: true,
          message: 'Something error in our system, please contact Administrator.',
        }
      })
  }
}
