const benchmark = (callback, title) => {
  title = title || callback.name;
  console.time(title);
  const a = callback();
  console.timeEnd(title);
  // console.log("Returns: ", a);
  return a;
};

const doXTimes = (callback, x) => {
  const functionToTest = () => {
    for (let i = 0; i < x; i++) {
      callback();
    }
  };

  // Rename the return function to have the same name as the callback
  Object.defineProperty(functionToTest, "name", { value: callback.name });

  return functionToTest;
};

const tasks = {
  declareVariable: () => {
    let a;
  },

  declareInteger: () => {
    let a = 1;
  },

  declareEmptyArray: () => {
    let a = [];
  },

  declareFloat: () => {
    let a = 1.1;
  },

  createSmallArray: () => {
    let a = [];
    for(let i = 0; i<10; i++){
      a.push(i);
    }
  },
};

// for (let task in tasks) {
//   const bigTask = doXTimes(tasks[task], Math.pow(10, 8))
//   benchmark(bigTask);
// }

module.exports = { doXTimes, benchmark }