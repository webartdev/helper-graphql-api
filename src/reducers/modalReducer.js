import { useReducer } from "react";
//#endregion
export const ACTIONS = {
  OPEN_MODAL: "OPEN_MODAL",
  CLOSE_MODAL: "CLOSE_MODAL",
  MODAL_TYPE: "MODAL_TYPE",
  FORM_VALUES: "FORM_VALUES"
}

export const initialState = {
  formValues: {
    id: '',
    postBody: '',
    postTitle: '',
    postOwnerId: '',
    postOwnerUsername: '',
    // createdAt: '',
    // posts: []
  },
  isModalOpen: false,
  modalType: ""
}

const modalReducer = (state, action) => {
  console.log("reducer action modal", action);
  switch (action.type) {
    case ACTIONS.OPEN_MODAL:
      return { ...state, isModalOpen: true }
    case ACTIONS.CLOSE_MODAL:
      return { ...state, isModalOpen: false }
    case ACTIONS.MODAL_TYPE:
      return { ...state, modalType: action.payload }
    case ACTIONS.FORM_VALUES:
      return { ...state, formValues: action.payload }
    default:
      // console.log('Default action for: ', action)
      return state
  }
}
export const ModalReducer = () => useReducer(modalReducer, initialState);