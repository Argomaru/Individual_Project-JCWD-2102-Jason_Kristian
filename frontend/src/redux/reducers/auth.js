const init_state = {
  id: "",
  username: "",
  email: "",
  full_name: "",
  bio: "",
  gender: "",
  avatar_url: "",
  is_verified: "",
};
import auth_types from "./types/auth";
function auth_reducer(state = init_state, action) {
  if (action.type === auth_types.AUTH_LOGIN) {
    return {
      ...state,
      id: action.payload.id,
      username: action.payload.username,
      email: action.payload.email,
      full_name: action.payload.full_name,
      bio: action.payload.bio,
      gender: action.payload.gender,
      avatar_url: action.payload.avatar_url,
      is_verified: action.payload.is_verified,
    };
  } else if (action.type === auth_types.AUTH_LOGOUT) {
    return init_state;
  }

  return state;
}

export default auth_reducer;
