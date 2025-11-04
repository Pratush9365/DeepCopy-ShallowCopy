import {ShallowComparison, DeepComparison} from '../utils/comparisonUtils';

export const ComparisonExamples = {
  // Shallow comparison basics
  shallowBasics: () => {
    console.log('\n=== Shallow Comparison Basics ===\n');

    const obj1 = {name: 'John', age: 30};
    const obj2 = {name: 'John', age: 30};

    console.log('obj1:', obj1);
    console.log('obj2:', obj2);

    const strictEqual = ShallowComparison.usingStrictEqual(obj1, obj2);
    console.log('\nStrict equality (===):', strictEqual);
    console.log('✓ Different references, so false');

    const shallowEqual = ShallowComparison.shallowEqualObjects(obj1, obj2);
    console.log('Shallow equal:', shallowEqual);
    console.log('✓ Same properties and values, so true');

    const obj3 = obj1;
    const refEqual = ShallowComparison.usingStrictEqual(obj1, obj3);
    console.log('\nSame reference:', refEqual);
    console.log('✓ Same reference, so true');
  },

  // Shallow comparison with nested objects
  shallowWithNested: () => {
    console.log('\n=== Shallow Comparison with Nested Objects ===\n');

    const obj1 = {
      name: 'John',
      address: {city: 'NYC'},
    };

    const obj2 = {
      name: 'John',
      address: {city: 'NYC'},
    };

    const shallowEqual = ShallowComparison.shallowEqualObjects(obj1, obj2);
    console.log('Shallow equal:', shallowEqual);
    console.log('⚠️  False! Because address references differ');

    const deepEqual = DeepComparison.usingRecursive(obj1, obj2);
    console.log('Deep equal:', deepEqual);
    console.log('✓ True because it checks nested objects');
  },

  // Array comparison
  arrayComparison: () => {
    console.log('\n=== Array Comparison ===\n');

    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    const arr3 = arr1;

    console.log('arr1:', arr1);
    console.log('arr2:', arr2);

    const strictEqual1 = ShallowComparison.usingStrictEqual(arr1, arr2);
    console.log('\narr1 === arr2:', strictEqual1);
    console.log('✓ Different references, false');

    const strictEqual2 = ShallowComparison.usingStrictEqual(arr1, arr3);
    console.log('arr1 === arr3:', strictEqual2);
    console.log('✓ Same reference, true');

    const shallowEqual = ShallowComparison.shallowEqualArrays(arr1, arr2);
    console.log('Shallow array equal:', shallowEqual);
    console.log('✓ Same elements, true');

    // Nested arrays
    const nestedArr1 = [
      [1, 2],
      [3, 4],
    ];
    const nestedArr2 = [
      [1, 2],
      [3, 4],
    ];

    const shallowNested = ShallowComparison.shallowEqualArrays(
      nestedArr1,
      nestedArr2,
    );
    console.log('\nShallow nested arrays:', shallowNested);
    console.log('⚠️  False because inner arrays are compared by reference');

    const deepNested = DeepComparison.usingRecursive(nestedArr1, nestedArr2);
    console.log('Deep nested arrays:', deepNested);
    console.log('✓ True because it recursively compares');
  },

  // Deep comparison examples
  deepComparison: () => {
    console.log('\n=== Deep Comparison Examples ===\n');

    const complexObj1 = {
      user: {
        name: 'John',
        age: 30,
        preferences: {
          theme: 'dark',
          notifications: true,
        },
      },
      tags: ['developer', 'javascript'],
      settings: {
        advanced: {
          performance: {
            caching: true,
          },
        },
      },
    };

    const complexObj2 = {
      user: {
        name: 'John',
        age: 30,
        preferences: {
          theme: 'dark',
          notifications: true,
        },
      },
      tags: ['developer', 'javascript'],
      settings: {
        advanced: {
          performance: {
            caching: true,
          },
        },
      },
    };

    const deepEqual = DeepComparison.usingRecursive(complexObj1, complexObj2);
    console.log('Deep equal:', deepEqual);
    console.log('✓ Fully identical structure and values');

    // Modify one property
    complexObj2.user.age = 31;
    const notEqual = DeepComparison.usingRecursive(complexObj1, complexObj2);
    console.log('\nAfter changing age:', notEqual);
    console.log('✓ Correctly detects difference');
  },

  // Date comparison
  dateComparison: () => {
    console.log('\n=== Date Comparison ===\n');

    const date1 = new Date('2024-01-01');
    const date2 = new Date('2024-01-01');

    console.log('date1:', date1);
    console.log('date2:', date2);

    const strictEqual = date1 === date2;
    console.log('\nStrict equal (===):', strictEqual);
    console.log('✓ Different object instances, false');

    const deepEqual = DeepComparison.usingRecursive(date1, date2);
    console.log('Deep equal:', deepEqual);
    console.log('✓ Checks actual date value, true');
  },

  // When to use which
  whenToUse: () => {
    console.log('\n=== When to Use Shallow vs Deep Comparison ===\n');

    console.log('Use Shallow Comparison when:');
    console.log('- Comparing primitive values');
    console.log('- Comparing flat objects/arrays');
    console.log('- Performance is critical');
    console.log('- You know structure is flat');

    console.log('\nUse Deep Comparison when:');
    console.log('- Comparing nested structures');
    console.log('- You need true value equality');
    console.log('- Testing/validating data structures');
    console.log('- React shouldComponentUpdate checks');
  },

  // Performance comparison
  performanceComparison: () => {
    console.log('\n=== Performance: Shallow vs Deep ===\n');

    const largeFlatObj = {} as any;
    for (let i = 0; i < 10000; i++) {
      largeFlatObj[`key${i}`] = i;
    }

    console.time('Shallow Compare');
    ShallowComparison.shallowEqualObjects(largeFlatObj, largeFlatObj);
    console.timeEnd('Shallow Compare');

    console.time('Deep Compare');
    DeepComparison.usingRecursive(largeFlatObj, largeFlatObj);
    console.timeEnd('Deep Compare');

    console.log('✓ Shallow is faster for flat objects');
  },
};
