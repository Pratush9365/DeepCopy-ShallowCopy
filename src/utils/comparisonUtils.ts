export class ShallowComparison {
  // Shallow comparison using ===
  static usingStrictEqual(a: any, b: any): boolean {
    return a === b;
  }

  // Shallow comparison for objects
  static shallowEqualObjects(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) {
      return true;
    }

    if (obj1 == null || obj2 == null) {
      return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;
  }

  // Shallow comparison for arrays
  static shallowEqualArrays(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  }
}

export class DeepComparison {
  // Deep comparison using JSON (has limitations)
  static usingJSON(obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  // Deep comparison using recursive approach
  static usingRecursive(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) {
      return true;
    }

    if (obj1 == null || obj2 == null) {
      return obj1 === obj2;
    }

    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
      return obj1 === obj2;
    }

    if (obj1 instanceof Date && obj2 instanceof Date) {
      return obj1.getTime() === obj2.getTime();
    }

    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      if (obj1.length !== obj2.length) {
        return false;
      }

      for (let i = 0; i < obj1.length; i++) {
        if (!this.usingRecursive(obj1[i], obj2[i])) {
          return false;
        }
      }
      return true;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (!keys2.includes(key)) {
        return false;
      }

      if (!this.usingRecursive(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  }

  // Deep comparison with circular reference detection
  static usingCircularAware(obj1: any, obj2: any): boolean {
    const visited1 = new WeakMap();
    const visited2 = new WeakMap();

    const compare = (a: any, b: any): boolean => {
      if (a === b) {
        return true;
      }

      if (a == null || b == null) {
        return a === b;
      }

      if (typeof a !== 'object' || typeof b !== 'object') {
        return a === b;
      }

      if (visited1.has(a) || visited2.has(b)) {
        return visited1.get(a) === b && visited2.get(b) === a;
      }

      visited1.set(a, b);
      visited2.set(b, a);

      if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) {
          return false;
        }

        for (let i = 0; i < a.length; i++) {
          if (!compare(a[i], b[i])) {
            return false;
          }
        }
        return true;
      }

      const keys1 = Object.keys(a);
      const keys2 = Object.keys(b);

      if (keys1.length !== keys2.length) {
        return false;
      }

      for (let key of keys1) {
        if (!keys2.includes(key)) {
          return false;
        }

        if (!compare(a[key], b[key])) {
          return false;
        }
      }

      return true;
    };

    return compare(obj1, obj2);
  }
}

// Quick comparison for performance when structure is known
export class QuickComparison {
  // Compare only specific keys
  static compareKeys(obj1: any, obj2: any, keys: string[]): boolean {
    for (let key of keys) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  }
}
