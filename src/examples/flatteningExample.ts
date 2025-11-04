import {DeepCopy, FlatteningUtils} from '../utils/copyUtils';

export const FlatteningExample = {
  // Traditional deep copy fails
  traditionalCopyFails: () => {
    console.log('\n=== Traditional Deep Copy with Very Deep Nesting ===\n');

    let deeplyNested: any = {value: 0};

    // Create 100 levels of nesting
    for (let i = 1; i <= 100; i++) {
      deeplyNested = {
        level: i,
        data: `data at level ${i}`,
        child: deeplyNested,
      };
    }

    console.log('Created object with 100 levels of nesting');
    console.time('Traditional Deep Copy');

    try {
      DeepCopy.usingRecursive(deeplyNested);
      console.timeEnd('Traditional Deep Copy');
      console.log('✓ Worked');
    } catch (error: any) {
      console.timeEnd('Traditional Deep Copy');
      console.log('❌ Failed:', error?.message);
      console.log('❌ Stack overflow due to excessive recursion');
    }
  },

  // Flattening approach
  flatteningApproach: () => {
    console.log('\n=== Flattening Approach for Deep Copy ===\n');

    let deeplyNested: any = {value: 0};

    // Create 100 levels of nesting
    for (let i = 1; i <= 100; i++) {
      deeplyNested = {
        level: i,
        data: `data at level ${i}`,
        child: deeplyNested,
      };
    }

    console.log('Using flattening approach...');
    console.time('Flattening Deep Copy');

    try {
      const flattenedCopy = FlatteningUtils.deepCopyUsingFlatten(deeplyNested);
      console.timeEnd('Flattening Deep Copy');
      console.log('✓ Success! Flattening approach works');
      console.log('Level 1 child exists:', !!flattenedCopy.child);
      console.log('Level 2 child exists:', !!flattenedCopy.child?.child);
      console.log(
        'Max depth found:',
        FlatteningExample.findMaxDepth(flattenedCopy),
      );
    } catch (error: any) {
      console.timeEnd('Flattening Deep Copy');
      console.log('❌ Even flattening failed:', error?.message);
    }
  },

  // Even flattening has limits
  flatteningLimits: () => {
    console.log('\n=== When Even Flattening Breaks ===\n');

    // Create circular reference in deep nesting
    let deeplyNested: any = {value: 0};
    const root = deeplyNested;

    // Create 50 levels, then point back to root
    for (let i = 1; i <= 50; i++) {
      deeplyNested = {
        level: i,
        child: deeplyNested,
      };
    }
    deeplyNested.circularRef = root; // Circular reference

    console.log('Object with 50 levels + circular reference');

    try {
      FlatteningUtils.deepCopyUsingFlatten(deeplyNested);
      console.log('✓ Flattening works');
    } catch (error: any) {
      console.log('❌ Flattening failed:', error?.message);
    }

    // Best alternative: Circular-aware with depth limit
    console.time('Best Alternative: Circular-aware + Depth-limit');
    DeepCopy.usingDepthLimit(deeplyNested, 30);
    console.timeEnd('Best Alternative: Circular-aware + Depth-limit');
    console.log('✓ This is the most robust approach');
  },

  // Helper to find max depth
  findMaxDepth: (obj: any, depth: number = 0): number => {
    if (!obj || typeof obj !== 'object') {
      return depth;
    }

    let maxDepth = depth;
    for (const key in obj) {
      const value = obj[key];
      if (
        obj.hasOwnProperty(key) &&
        typeof value === 'object' &&
        value !== null
      ) {
        maxDepth = Math.max(
          maxDepth,
          FlatteningExample.findMaxDepth(value, depth + 1),
        );
      }
    }

    return maxDepth;
  },

  // Summary
  summary: () => {
    console.log('\n=== Summary: Handling Deep Copy Challenges ===\n');

    console.log('Problem 1: Very Deep Nesting');
    console.log('Traditional deep copy: Stack overflow');
    console.log('Solution: Use depth limit');
    console.log('Code: DeepCopy.usingDepthLimit(obj, maxDepth)');
    console.log('');

    console.log('Problem 2: Circular References');
    console.log('Traditional deep copy: Infinite loop');
    console.log('Solution: Use circular-aware copy');
    console.log('Code: DeepCopy.usingCircularAware(obj)');
    console.log('');

    console.log('Problem 3: Both Problems Together');
    console.log('Traditional deep copy: Complete failure');
    console.log('Solution: Combine both approaches');
    console.log('Implement: Circular-aware + depth limit');
    console.log('');

    console.log('Problem 4: Extreme Cases');
    console.log('Alternative: Flattening approach');
    console.log('Code: FlatteningUtils.deepCopyUsingFlatten(obj)');
    console.log('Note: Still has limitations with circular refs');
    console.log('');

    console.log('Best Practice:');
    console.log('1. Try simple DeepCopy.usingRecursive() first');
    console.log('2. If fails, use DeepCopy.usingCircularAware()');
    console.log('3. If stack overflow, add depth limit');
    console.log('4. For extreme cases, implement hybrid solution');
  },
};
