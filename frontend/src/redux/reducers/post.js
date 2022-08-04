const init_state = {
  value: false,
};
import auth_types from "../reducers/types/auth";
function post_reducer(state = init_state, action) {
  if (action.type === auth_types.FETCH_RENDER) {
    return {
      ...state,
      value: action.payload.value,
    };
  }
  return state;
}
export default post_reducer;
