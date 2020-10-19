const Chance = require("chance");
const { doXTimes, benchmark } = require("./benchmark");
const LinkedList = require("./linkedList");

const chance = new Chance();

myList = new LinkedList(0);

const tasks = {
  prepend: () => {
    let myList = new LinkedList(0);
    for (let i = 0; i < Math.pow(10, 4); i++) {
      myList.prepend(chance.integer({ min: 0, max: 99 }));
    }
  },
  append: () => {
    let myList = new LinkedList(0);
    for (let i = 0; i < Math.pow(10, 4); i++) {
      myList.append(chance.integer({ min: 0, max: 99 }));
    }
  },
  push: () => {
    let myArray = [];
    for (let i = 0; i < Math.pow(10, 4); i++) {
      myArray.push(chance.integer({ min: 0, max: 99 }));
    }
  },
};

const randInt = () => {
  return chance.integer({ min: 0, max: 999999999999 });
};

const generateList = () => {
  let myList = new LinkedList(chance.name());

  doXTimes(() => { myList.prepend(chance.name()) }, Math.pow(10, 6))();
  return myList;
}

const lotsOfListInsertions = (myList) => {
  const insertionPoint = myList.elementAtPosition(Math.pow(10,6)/2);
  for(let i=0; i<Math.pow(10,3); i++){
    myList.insert(insertionPoint, 'Blah Blah');
  }
}

const lotsOfListPrependings = (myList) => {
  for(let i=0; i<Math.pow(10,3); i++){
    myList.prepend('Blah Blah');
  }
}

const lotsOfListAppendings = (myList) => {
  for(let i=0; i<Math.pow(10,3); i++){
    myList.append('Blah Blah');
  }
}

const lotsOfSlowListInsertions = (myList) => {
  const insertionPosition = Math.pow(10,6)/2;
  for(let i=0; i<Math.pow(10,3); i++){
    myList.insertAt(insertionPosition, 'Blah Blah');
  }
}

const generateArray = () => {
  let myArray = [];

  doXTimes(() => { myArray.push(chance.name()) }, Math.pow(10, 6))();
  return myArray;
}

const lotsOfArrayInsertions = (myArray) => {
  const insertionPosition = Math.pow(10,6)/2;
  doXTimes(() => {
    myArray.splice(insertionPosition, 0, 'Blah Blah');
  }, Math.pow(10,3)
  )();
}

const lotsOfArrayAppendings = (myArray) => {
  doXTimes(() => {
    myArray.push('Blah Blah');
  }, Math.pow(10,3)
  )();
}

const lotsOfArrayPrependings = (myArray) => {
  doXTimes(() => {
    myArray.splice(0, 0, 'Blah Blah');
  }, Math.pow(10,3)
  )();
}

const testList = benchmark(generateList);
benchmark(() => testList.find(4565123), 'failed find');
benchmark(() => testList.find(testList.valueAtPosition(10000)), 'successful find');
benchmark(() => lotsOfListInsertions(testList), 'lots of list insertions');

const testList2 = generateList();
benchmark(() => lotsOfSlowListInsertions(testList), 'lots of slow list insertions');

const testArray = benchmark(generateArray);
benchmark(() => lotsOfArrayInsertions(testArray), 'lots of array insertions');

benchmark(() => lotsOfArrayAppendings(testArray), 'lots of array appendings');
benchmark(() => lotsOfListPrependings(testList), 'lots of list prependings');
benchmark(() => lotsOfArrayPrependings(testArray), 'lots of array prependings');
benchmark(() => lotsOfListAppendings(testList), 'lots of list appendings');


// benchmark(doXTimes(myList.append(chance.integer({ min: 0, max: 99 }), 1)));

// const myList = new linkedList(13);
