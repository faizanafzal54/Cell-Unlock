import {
  addCategory,
  categoryList,
  categoryById,
  updateCategory,
} from 'src/store/services/category'
import { toastify } from '../services/toastify'

export const addCategoryAction = (obj, callback) => async (dispatch) => {
  try {
    const res = await addCategory(obj)
    if (res.status === 201) {
      toastify('success', res?.data?.data.message)
      callback()
    }
  } catch (err) {
    toastify('error', err?.response?.data?.err.message)
  }
}

export const categoryListAction = () => async (dispatch) => {
  try {
    const res = await categoryList()
    if (res.status === 200) {
      dispatch({
        type: 'CategoryList',
        payload: {
          categories: res.data.data.categories,
        },
      })
    }
  } catch (err) {
    toastify('error', err?.response?.data?.err.message)
  }
}

export const categoryByIdAction = (id) => async (dispatch) => {
  try {
    const res = await categoryById(id)
    return res.data?.data?.category
    // if (res.status === 200) {
    //   dispatch({
    //     type: 'CategoryList',
    //     payload: {
    //       categories: res.data.data.categories,
    //     },
    //   })
    // }
  } catch (err) {
    toastify('error', err?.response?.data?.err.message)
  }
}

export const updateCategoryAction = (id, obj, callback) => async (dispatch) => {
  try {
    const res = await updateCategory(id, obj)
    if (res.status === 200) {
      toastify('success', res?.data?.data.message)

      callback()
    }
  } catch (err) {
    toastify('error', err?.response?.data?.err.message)
  }
}
