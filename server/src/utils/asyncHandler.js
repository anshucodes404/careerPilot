//This is higher order method that takes a function and returns a function

//By try-catch method

const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(error.code || 500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

//By promise method

// const asyncHandlerPromise = (fn) => {
//     return (req, res, next) => {
//         Promise.resolve(fn(req, res, next)).catch(error => next(error))
//     }
// }

export { asyncHandler };
