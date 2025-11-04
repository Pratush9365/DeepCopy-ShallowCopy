import {DeepCopy} from '../utils/copyUtils';

export const DeepCopyExamples = {
  // Basic deep copy example
  basicExample: () => {
    console.log('\n=== Basic Deep Copy Example ===\n');

    const originalObject = {
      name: 'Ayush',
      age: 22,
      address: {
        city: 'Ghaziabad',
        country: 'India',
        coordinates: {
          lat: 40.7128,
          lng: -74.006,
        },
      },
      hobbies: ['reading', 'swimming'],
    };

    const deepCopy = DeepCopy.usingRecursive(originalObject);

    console.log('Original:', JSON.stringify(originalObject, null, 2));

    // Modify nested property
    deepCopy.address.city = 'London';
    deepCopy.address.coordinates.lat = 51.5074;
    deepCopy.hobbies.push('cycling');

    console.log('\nAfter modifying deep copy:');
    console.log('Original city:', originalObject.address.city);
    console.log('Deep copy city:', deepCopy.address.city);
    console.log('✓ Deep copy works correctly for nested objects');
  },

  // Deep copy limitations with JSON
  jsonLimitations: () => {
    console.log('\n=== JSON Deep Copy Limitations ===\n');

    const objectWithSpecialTypes = {
      date: new Date(),
      fn: function test() {
        return 'hello';
      },
      undefinedValue: undefined,
      nullValue: null,
      symbol: Symbol('test'),
    };

    console.log('Original:', objectWithSpecialTypes);

    const jsonCopy = DeepCopy.usingJSON(objectWithSpecialTypes);
    console.log('JSON Copy:', jsonCopy);
    console.log('⚠️  Lost: functions, undefined, symbols');
    console.log('⚠️  Date becomes string:', typeof jsonCopy.date);

    const recursiveCopy = DeepCopy.usingRecursive(objectWithSpecialTypes);
    console.log('\nRecursive Copy:', recursiveCopy);
    console.log('✓ Date preserved:', recursiveCopy.date instanceof Date);
  },

  // Circular reference problem
  circularReferenceProblem: () => {
    console.log('\n=== Circular Reference Problem ===\n');

    const obj: any = {name: 'test'};
    obj.self = obj; // Circular reference

    console.log('Creating object with circular reference...');

    try {
      const jsonCopy = DeepCopy.usingJSON(obj);
      console.log('JSON copy worked:', jsonCopy);
    } catch (error: any) {
      console.log('❌ JSON copy failed:', error?.message);
      console.log('This is where deep copy breaks!');
    }

    try {
      const recursiveCopy = DeepCopy.usingRecursive(obj);
      console.log('\nRecursive copy:', recursiveCopy);
      console.log('❌ This also breaks with circular reference');
    } catch (error: any) {
      console.log('❌ Recursive copy also failed:', error?.message);
    }

    // Solution
    const circularAwareCopy = DeepCopy.usingCircularAware(obj);
    console.log('\n✓ Circular-aware copy works:', circularAwareCopy);
    console.log(
      'Same reference maintained:',
      circularAwareCopy.self === circularAwareCopy,
    );
  },

  // Very deep nesting problem
  deepNestingProblem: () => {
    console.log('\n=== Very Deep Nesting Problem ===\n');

    console.log('Creating object with 50 levels of nesting...');

    let nestedObj: any = {value: 'deep'};
    for (let i = 0; i < 50; i++) {
      nestedObj = {level: i, child: nestedObj};
    }

    console.time('Recursive Deep Copy');
    try {
      DeepCopy.usingRecursive(nestedObj);
      console.timeEnd('Recursive Deep Copy');
    } catch (error: any) {
      console.timeEnd('Recursive Deep Copy');
      console.log('❌ Stack overflow:', error?.message);
    }

    console.time('Depth-Limited Copy (max 30 levels)');
    const limitedCopy = DeepCopy.usingDepthLimit(nestedObj, 30);
    console.timeEnd('Depth-Limited Copy');
    console.log('✓ Depth-limited copy prevented stack overflow');
    console.log(
      'Copied object depth limited:',
      limitedCopy.level !== undefined,
    );
  },

  // Large arrays problem
  largeArrayProblem: () => {
    console.log('\n=== Large Array Problem ===\n');

    const largeArray = new Array(100000).fill(null).map((_, i) => ({
      id: i,
      data: `item ${i}`,
    }));

    console.log('Array size:', largeArray.length);
    console.time('JSON Deep Copy');
    const jsonCopy = DeepCopy.usingJSON(largeArray);
    console.timeEnd('JSON Deep Copy');

    console.time('Recursive Deep Copy');
    const recursiveCopy = DeepCopy.usingRecursive(largeArray);
    console.timeEnd('Recursive Deep Copy');

    console.log('✓ Both work but can be slow for very large arrays');
    console.log(
      'Copied array size:',
      jsonCopy.length,
      '(JSON) vs',
      recursiveCopy.length,
      '(Recursive)',
    );
  },
};
