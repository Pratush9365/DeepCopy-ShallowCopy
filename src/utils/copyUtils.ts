export class ShallowCopy {
  // Shallow copy using spread operator
  static usingSpread<T>(original: T): T {
    if (Array.isArray(original)) {
      return [...original] as T;
    }
    if (typeof original === 'object' && original !== null) {
      return {...original} as T;
    }
    return original;
  }

  // Shallow copy using Object.assign
  static usingAssign<T extends object>(original: T): T {
    return Object.assign({}, original);
  }

  // Shallow copy using Array methods
  static usingArrayMethods<T>(arr: T[]): T[] {
    return arr.slice();
    // Alternatives: arr.concat([]), arr.map(item => item)
  }
}

export class DeepCopy {
  // Deep copy using JSON (simple but has limitations)
  static usingJSON<T>(original: T): T {
    return JSON.parse(JSON.stringify(original));
  }

  // Deep copy using recursive approach (handles most cases)
  static usingRecursive<T>(original: T): T {
    // Handle null
    if (original === null) {
      return original;
    }

    // Handle dates
    if (original instanceof Date) {
      return new Date(original.getTime()) as T;
    }

    // Handle arrays
    if (Array.isArray(original)) {
      return original.map(item => this.usingRecursive(item)) as T;
    }

    // Handle objects
    if (typeof original === 'object') {
      const copied = {} as T;
      for (const key in original) {
        if (original.hasOwnProperty(key)) {
          copied[key] = this.usingRecursive(original[key]);
        }
      }
      return copied;
    }

    // Handle primitives
    return original;
  }

  /**
   * Deep copy with circular reference detection
   * Handles cases where deep copy breaks due to circular references
   */
  static usingCircularAware<T>(original: T): T {
    const visited = new WeakMap();

    const copy = (obj: any): any => {
      if (obj === null || typeof obj !== 'object') {
        return obj;
      }

      if (visited.has(obj)) {
        return visited.get(obj);
      }

      let cloned: any;

      if (obj instanceof Date) {
        cloned = new Date(obj.getTime());
      } else if (Array.isArray(obj)) {
        cloned = [];
        visited.set(obj, cloned);
        obj.forEach((item, index) => {
          cloned[index] = copy(item);
        });
      } else {
        cloned = {};
        visited.set(obj, cloned);
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            cloned[key] = copy(obj[key]);
          }
        }
      }

      return cloned;
    };

    return copy(original);
  }

  /**
   * Deep copy with depth limit protection
   * Handles extremely nested structures
   */
  static usingDepthLimit<T>(original: T, maxDepth: number = 100): T {
    const visited = new WeakMap();
    let currentDepth = 0;

    const copy = (obj: any, depth: number): any => {
      if (depth > maxDepth) {
        console.warn('Max depth reached, returning reference');
        return obj;
      }

      if (obj === null || typeof obj !== 'object') {
        return obj;
      }

      if (visited.has(obj)) {
        return visited.get(obj);
      }

      let cloned: any;

      if (obj instanceof Date) {
        cloned = new Date(obj.getTime());
      } else if (Array.isArray(obj)) {
        cloned = [];
        visited.set(obj, cloned);
        obj.forEach((item, index) => {
          cloned[index] = copy(item, depth + 1);
        });
      } else {
        cloned = {};
        visited.set(obj, cloned);
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            cloned[key] = copy(obj[key], depth + 1);
          }
        }
      }

      return cloned;
    };

    return copy(original, currentDepth);
  }
}

/**
 * Alternative approach for very deep nested structures
 * Flattens the structure before copying
 */
export class FlatteningUtils {
  // Flatten nested object into single level
  static flatten(obj: any, prefix: string = '', result: any = {}): any {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (
          obj[key] !== null &&
          typeof obj[key] === 'object' &&
          !Array.isArray(obj[key])
        ) {
          this.flatten(obj[key], newKey, result);
        } else {
          result[newKey] = obj[key];
        }
      }
    }
    return result;
  }

  // Unflatten back to nested structure
  static unflatten(flatObj: any): any {
    const result: any = {};

    for (const key in flatObj) {
      if (flatObj.hasOwnProperty(key)) {
        const keys = key.split('.');
        let current = result;

        for (let i = 0; i < keys.length - 1; i++) {
          if (!(keys[i] in current)) {
            current[keys[i]] = {};
          }
          current = current[keys[i]];
        }

        current[keys[keys.length - 1]] = flatObj[key];
      }
    }

    return result;
  }

  /**
   * Deep copy using flattening approach
   * Useful for extremely nested structures
   */
  static deepCopyUsingFlatten<T>(original: T): T {
    const flattened = this.flatten(original);
    const copiedFlat = {...flattened};
    return this.unflatten(copiedFlat);
  }
}
