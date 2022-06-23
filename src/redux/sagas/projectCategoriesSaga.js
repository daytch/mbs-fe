import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  GET_LIST_PROJECT_CATEGORIES,
  GET_LIST_PROJECT_CATEGORIES_SUCCESS,
  GET_LIST_PROJECT_CATEGORIES_ERROR,
  POST_PROJECT_CATEGORIES,
  POST_PROJECT_CATEGORIES_SUCCESS,
  POST_PROJECT_CATEGORIES_ERROR,
  PUT_PROJECT_CATEGORIES,
  PUT_PROJECT_CATEGORIES_SUCCESS,
  PUT_PROJECT_CATEGORIES_ERROR,
  DELETE_PROJECT_CATEGORIES,
  DELETE_PROJECT_CATEGORIES_SUCCESS,
  DELETE_PROJECT_CATEGORIES_ERROR,
  POST_PROJECT_SUBCATEGORIES,
  POST_PROJECT_SUBCATEGORIES_SUCCESS,
  POST_PROJECT_SUBCATEGORIES_ERROR,
  PUT_PROJECT_SUBCATEGORIES,
  PUT_PROJECT_SUBCATEGORIES_SUCCESS,
  PUT_PROJECT_SUBCATEGORIES_ERROR,
  DELETE_PROJECT_SUBCATEGORIES,
  DELETE_PROJECT_SUBCATEGORIES_SUCCESS,
  DELETE_PROJECT_SUBCATEGORIES_ERROR,
  GET_PROJECT_SUBCATEGORY_BY_CATEGORYID,
  GET_PROJECT_SUBCATEGORY_BY_CATEGORYID_SUCCESS,
  GET_PROJECT_SUBCATEGORY_BY_CATEGORYID_ERROR,
  URL,
} from '../../constants'

import { GET, PUT, POSTWithMessage, DELETE } from '../../services'

export function* getListProjectCategories() {
  try {
    const res = yield call(GET, URL.PROJECT_CATEGORIES)
    let list = []
    if (res.isSuccess && res.value.length > 0) {
      res.value.forEach((item) => {
        list.push({
          projectCategoryId: item.projectCategoryId,
          projectCategoryName: item.projectCategoryName,
          projectSubCategoryId: 0,
          projectSubCategoryName: '-',
        })
        item.projectSubCategories.forEach((sub) => {
          list.push({
            projectCategoryId: item.projectCategoryId,
            projectCategoryName: item.projectCategoryName,
            projectSubCategoryId: sub.projectSubCategoryId,
            projectSubCategoryName: sub.projectSubCategoryName,
          })
        })
      })
    }

    yield put({
      type: GET_LIST_PROJECT_CATEGORIES_SUCCESS,
      data: list,
    })
  } catch (err) {
    yield put({
      type: GET_LIST_PROJECT_CATEGORIES_ERROR,
      error: err.message,
    })
  }
}

export function* getListProjectSubCategories(action) {
  try {
    const res = yield call(GET, URL.PROJECT_CATEGORIES + '/' + action.payload)

    if (res.isSuccess) {
      let dataDropdown = [{ value: -1, label: 'Please Select Subcategory' }]
      res.value.projectSubCategories.forEach((x) =>
        dataDropdown.push({ value: x.projectSubCategoryId, label: x.projectSubCategoryName }),
      )
      yield put({
        type: GET_PROJECT_SUBCATEGORY_BY_CATEGORYID_SUCCESS,
        data: dataDropdown,
      })
    }
  } catch (err) {
    yield put({
      type: GET_PROJECT_SUBCATEGORY_BY_CATEGORYID_ERROR,
      error: err.message,
    })
  }
}

export function* postProjectCategory(action) {
  try {
    const res = yield call(POSTWithMessage, URL.PROJECT_CATEGORIES, action.payload)

    if (!res.isError) {
      yield put({
        type: POST_PROJECT_CATEGORIES_SUCCESS,
        data: res,
      })
      yield call(GET_LIST_PROJECT_CATEGORIES)
      // yield call(getListProjectCategories)
    }
    else {
      yield put({
        type: POST_PROJECT_CATEGORIES_ERROR,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: POST_PROJECT_CATEGORIES_ERROR,
      error: err.message,
    })
  }
}

export function* putProjectCategory(action) {
  try {
    const res = yield call(
      PUT,
      URL.PROJECT_CATEGORIES + '/' + action.payload.projectCategoryId,
      action.payload,
    )

    if (!res.isError) {
      yield call(getListProjectCategories)
      yield put({
        type: PUT_PROJECT_CATEGORIES_SUCCESS,
        data: res,
      })
    } else {
      yield put({
        type: PUT_PROJECT_CATEGORIES_ERROR,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: PUT_PROJECT_CATEGORIES_ERROR,
      error: err.message,
    })
  }
}

export function* deleteProjectCategory(action) {
  try {
    const res = yield call(DELETE, URL.PROJECT_CATEGORIES + '/' + action.payload.id)

    if (res) {
      yield call(getListProjectCategories)
      yield put({
        type: DELETE_PROJECT_CATEGORIES_SUCCESS,
        data: res,
      })
    } else {
    }
  } catch (err) {
    yield put({
      type: DELETE_PROJECT_CATEGORIES_ERROR,
      error: err.message,
    })
  }
}

export function* postProjectSubCategory(action) {
  try {
    const res = yield call(POSTWithMessage, URL.PROJECT_SUBCATEGORIES, action.payload)

    if (!res.isError) {
      yield put({
        type: POST_PROJECT_SUBCATEGORIES_SUCCESS,
        data: res,
      })
      yield call(getListProjectCategories)
    } else {
      yield put({
        type: POST_PROJECT_SUBCATEGORIES_ERROR,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: POST_PROJECT_SUBCATEGORIES_ERROR,
      error: err.message,
    })
  }
}

export function* putProjectSubCategory(action) {
  try {
    const res = yield call(
      PUT,
      URL.PROJECT_SUBCATEGORIES + '/' + action.payload.projectSubCategoryId,
      action.payload,
    )

    if (!res.isError) {
      yield call(getListProjectCategories)
      yield put({
        type: PUT_PROJECT_SUBCATEGORIES_SUCCESS,
        data: res,
      })
    } else {
      yield put({
        type: PUT_PROJECT_SUBCATEGORIES_ERROR,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: PUT_PROJECT_SUBCATEGORIES_ERROR,
      error: err.message,
    })
  }
}

export function* deleteProjectSubCategory(action) {
  try {
    const res = yield call(DELETE, URL.PROJECT_SUBCATEGORIES + '/' + action.payload.id)

    if (res) {
      yield call(getListProjectCategories)
      yield put({
        type: DELETE_PROJECT_SUBCATEGORIES_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: DELETE_PROJECT_SUBCATEGORIES_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_LIST_PROJECT_CATEGORIES, getListProjectCategories),
    takeLatest(POST_PROJECT_CATEGORIES, postProjectCategory),
    takeLatest(PUT_PROJECT_CATEGORIES, putProjectCategory),
    takeLatest(DELETE_PROJECT_CATEGORIES, deleteProjectCategory),
    takeLatest(POST_PROJECT_SUBCATEGORIES, postProjectSubCategory),
    takeLatest(PUT_PROJECT_SUBCATEGORIES, putProjectSubCategory),
    takeLatest(DELETE_PROJECT_SUBCATEGORIES, deleteProjectSubCategory),
    takeLatest(GET_PROJECT_SUBCATEGORY_BY_CATEGORYID, getListProjectSubCategories),
  ])
}
