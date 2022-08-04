const init_state = {
  value: false,
  //   username: "",
  //   email: "",
  //   full_name: "",
  //   bio: "",
  //   gender: "",
};
import render_types from "./types/automaticrendering";
import auth_types from "./types/auth";

function automateRendering_reducer(state = init_state, action) {
  if (action.type === auth_types.RENDER_POST) {
    return {
      ...state,
      value: action.payload.value,
    };
  }

  return state;
}

export default automateRendering_reducer;
