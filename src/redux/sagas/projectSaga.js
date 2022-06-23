import {
  GET_PROJECT_CATEGORIES,
  GET_PROJECT_CATEGORIES_SUCCESS,
  GET_PROJECT_CATEGORIES_ERROR,
  GET_PROJECT_SUBCATEGORIES,
  GET_PROJECT_SUBCATEGORIES_SUCCESS,
  GET_PROJECT_SUBCATEGORIES_ERROR,
  POST_PROJECT,
  POST_PROJECT_SUCCESS,
  POST_PROJECT_ERROR,
  GET_PROJECT,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_ERROR,
  PUT_PROJECT,
  PUT_PROJECT_SUCCESS,
  PUT_PROJECT_ERROR,
  DELETE_PROJECT,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_ERROR,
  GET_DROPDOWN_PROJECT,
  GET_DROPDOWN_PROJECT_SUCCESS,
  GET_DROPDOWN_PROJECT_ERROR,
  GET_PROJECT_DASHBOARD,
  GET_PROJECT_DASHBOARD_SUCCESS,
  GET_PROJECT_DASHBOARD_ERROR,
  URL,
} from '../../constants'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GET, POST, PUT, DELETE } from '../../services'

export function* getProjectCategories() {
  try {
    const res = yield call(GET, URL.PROJECT_CATEGORIES)
    let dataDropdown = [{ value: -1, label: 'Please Select Category' }]

    if (res.isSuccess && res.value.length > 0) {
      res.value.forEach((x) =>
        dataDropdown.push({ value: x.projectCategoryId, label: x.projectCategoryName }),
      )
    }
    yield put({
      type: GET_PROJECT_CATEGORIES_SUCCESS,
      data: dataDropdown,
    })
  } catch (err) {
    yield put({
      type: GET_PROJECT_CATEGORIES_ERROR,
      error: err.message,
    })
  }
}

export function* getProjectSubCategories() {
  try {
    const res = yield call(GET, URL.PROJECT_SUBCATEGORIES)
    let dataDropdown = [{ value: -1, label: 'Please Select Subcategory' }]

    if (res.isSuccess && res.value.length > 0) {
      res.value.forEach((x) =>
        dataDropdown.push({ value: x.projectSubCategoryId, label: x.projectSubCategoryName }),
      )
    }
    yield put({
      type: GET_PROJECT_SUBCATEGORIES_SUCCESS,
      data: dataDropdown,
    })
  } catch (err) {
    yield put({
      type: GET_PROJECT_SUBCATEGORIES_ERROR,
      error: err.message,
    })
  }
}

export function* postProject(action) {
  try {
    const res = yield call(POST, URL.PROJECT, action.payload)

    if (res) {
      // yield call(getProjects)
      yield put({
        type: POST_PROJECT_SUCCESS,
        data: res,
      })
      // yield call(getProjects)
    }
  } catch (err) {
    yield put({
      type: POST_PROJECT_ERROR,
      error: err.message,
    })
  }
}

export function* putProject(action) {
  try {
    const res = yield call(PUT, URL.PROJECT + '/' + action.payload.projectId, action.payload)

    if (res) {
      // yield call(getProjects)
      yield put({
        type: PUT_PROJECT_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: PUT_PROJECT_ERROR,
      error: err.message,
    })
  }
}

export function* deleteProject(action) {
  try {
    const res = yield call(DELETE, URL.PROJECT + '/' + action.payload.projectId)

    if (!res.isError) {
      // yield call(getProjects)
      yield put({
        type: DELETE_PROJECT_SUCCESS,
        data: res,
      })
    } else {
      yield put({
        type: DELETE_PROJECT_ERROR,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: DELETE_PROJECT_ERROR,
      error: err.message,
    })
  }
}

export function* getProjects() {
  try {
    const res = yield call(GET, URL.PROJECT)

    if (res.isSuccess && res.value.length > 0) {
      yield put({
        type: GET_PROJECT_SUCCESS,
        data: res.value,
      })
    }
  } catch (err) {
    yield put({
      type: GET_PROJECT_ERROR,
      error: err.message,
    })
  }
}

export function* getProjectDashboard() {
  try {
    const res = yield call(GET, URL.PROJECT + '/ProjectDasboard')

    if (res.isSuccess && res.value.projects.length > 0) {
      yield put({
        type: GET_PROJECT_DASHBOARD_SUCCESS,
        data: res.value, //.projects,
      })
    }
  } catch (err) {
    yield put({
      type: GET_PROJECT_DASHBOARD_ERROR,
      error: err.message,
    })
  }
}

export function* getDropdownProjects() {
  try {
    const res = yield call(GET, URL.PROJECT)
    let dataDropdown = [{ value: -1, label: 'Please Select Project' }]

    if (res.isSuccess && res.value.length > 0) {
      res.value.forEach((x) => dataDropdown.push({ value: x.projectId, label: x.projectName }))
      yield put({
        type: GET_DROPDOWN_PROJECT_SUCCESS,
        data: dataDropdown,
      })
    }
  } catch (err) {
    yield put({
      type: GET_DROPDOWN_PROJECT_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_PROJECT_CATEGORIES, getProjectCategories),
    takeLatest(GET_PROJECT_SUBCATEGORIES, getProjectSubCategories),
    takeLatest(POST_PROJECT, postProject),
    takeLatest(GET_PROJECT, getProjects),
    takeLatest(PUT_PROJECT, putProject),
    takeLatest(DELETE_PROJECT, deleteProject),
    takeLatest(GET_DROPDOWN_PROJECT, getDropdownProjects),
    takeLatest(GET_PROJECT_DASHBOARD, getProjectDashboard),
  ])
}
