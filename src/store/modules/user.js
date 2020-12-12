export default {
  namespaced: true,
  state: {
    id: 0,
    name: '',
    type:"",
    simpleName:"",
    orderMsgCountNumber:0,
    modelMsgCountNumber:0,
  },
  mutations: {
    updateId (state, id) {
      state.id = id
    },
    updateName (state, name) {
      state.name = name
    },
    updateType (state, type) {
      state.type = type
    },
    updateSimpleName (state, simpleName) {
      state.simpleName = simpleName
    },
    updateOrderMsgCountNumber (state, orderMsgCountNumber) {
      state.orderMsgCountNumber = orderMsgCountNumber
    },
    updateModelMsgCountNumber (state, modelMsgCountNumber) {
      state.modelMsgCountNumber = modelMsgCountNumber
    }
  }
}
