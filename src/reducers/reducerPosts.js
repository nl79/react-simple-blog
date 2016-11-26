import { FETCH_POSTS, FETCH_POST } from '../actions/index';
const INITIAL_STATE = {
  // Array of blog posts.
  all: [],
  // Will hold a single post.
  post: null
};

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_POSTS:
      return {
        ...state, all: action.payload.data
      };
      break;

    case FETCH_POST:
      return {
        ...state, post: action.payload.data
      };
    default:
      return state;
  }
}