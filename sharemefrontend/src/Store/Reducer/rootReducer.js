const states = {};

const rootReducer = (state = states, action) => {
  switch (action.type) {
    case "checkUser":
      return {
        ...state,
        user: action.payload,
      };

    case "setCategory":
      return {
        ...state,
        currentCategory: action.payload,
      };
    case "setPins":
      return {
        ...state,
        pins: action.payload,
      };
    case "pinDetail":
      return {
        ...state,
        pinDetail: action.payload,
      };
    case "savePin":
      let { pins } = state;

      pins.filter((value) => {
        if (value._id === action.payload._id) {
          value?.save?.push(action.payload.pinDetails);
        }
      });
      return {
        ...state,
        pins: pins,
      };

    default:
      break;
  }
  return state;
};

export default rootReducer;
