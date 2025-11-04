import {ShallowCopy} from '../utils/copyUtils';

export const ShallowCopyExamples = {
  // Basic shallow copy example
  basicExample: () => {
    console.log('\n=== Basic Shallow Copy Example ===\n');

    const originalObject = {
      name: 'Ayush',
      age: 22,
      address: {
        city: 'Agra',
        country: 'India',
      },
    };

    const shallowCopy = ShallowCopy.usingSpread(originalObject);

    console.log('Original object:', JSON.stringify(originalObject, null, 2));
    console.log('Shallow copy:', JSON.stringify(shallowCopy, null, 2));

    // Modify top level property
    shallowCopy.name = 'Ayush';
    console.log('\nAfter modifying top level property (name):');
    console.log('Original:', originalObject.name);
    console.log('Shallow Copy:', shallowCopy.name);

    // Modify nested property
    shallowCopy.address.city = 'Ghaziabad';
    console.log('\nAfter modifying nested property (address.city):');
    console.log('Original:', originalObject.address.city);
    console.log('Shallow Copy:', shallowCopy.address.city);
    console.log('⚠️  Notice: Both changed! This is shallow copy problem');
  },

  // Array shallow copy example
  arrayExample: () => {
    console.log('\n=== Array Shallow Copy Example ===\n');

    const originalArray = [
      {id: 1, name: 'Item 1'},
      {id: 2, name: 'Item 2'},
      {id: 3, name: 'Item 3'},
    ];

    const shallowCopy = ShallowCopy.usingSpread(originalArray);

    console.log('Original array:', JSON.stringify(originalArray, null, 2));

    // Modify item in array
    shallowCopy[0].name = 'Modified Item 1';
    console.log('\nAfter modifying first item:');
    console.log('Original[0]:', originalArray[0]);
    console.log('Shallow Copy[0]:', shallowCopy[0]);
    console.log('⚠️  Notice: Both changed!');
  },

  // When shallow copy is useful
  whenToUse: () => {
    console.log('\n=== When to Use Shallow Copy ===\n');

    // Good use case: Flat objects
    const flatObject = {
      name: 'Product',
      price: 100,
      stock: 50,
    };

    const copy = ShallowCopy.usingSpread(flatObject);
    copy.price = 120;

    console.log('Original price:', flatObject.price);
    console.log('Copy price:', copy.price);
    console.log('✓ Works fine for flat objects');

    // Good use case: Immutable updates
    const numbers = [1, 2, 3, 4, 5];
    const newNumbers = ShallowCopy.usingSpread(numbers);
    newNumbers.push(6);

    console.log('\nOriginal array:', numbers);
    console.log('Copy array:', newNumbers);
    console.log('✓ Works fine for primitive arrays');
  },

  // Performance comparison
  performanceComparison: () => {
    console.log('\n=== Performance: Shallow vs Deep Copy ===\n');

    const largeObject: any = {};
    for (let i = 0; i < 10000; i++) {
      largeObject[`key${i}`] = {
        name: `Item ${i}`,
        value: i,
      };
    }

    console.time('Shallow Copy');
    ShallowCopy.usingSpread(largeObject);
    console.timeEnd('Shallow Copy');

    console.time('JSON Deep Copy');
    JSON.parse(JSON.stringify(largeObject));
    console.timeEnd('JSON Deep Copy');

    console.log('✓ Shallow copy is always faster');
  },
};
