/* eslint-disable import/no-duplicates */
/* eslint-disable no-console */

// MEMO:
// When importing ES modules without using a bundler or transpiler, file extensions are required:
//   https://nodejs.org/api/esm.html#esm_mandatory_file_extensions

//
// Named import without `default export`:
//
// Good:
import { named1 } from './named-exports-no-default';
import * as namespaceObject1 from './named-exports-no-default';
// Bad: SyntaxError
// import defaultExport1 from './named-exports-no-default.esm.js';

//
// Named import with `default export`:
//
//   ALERT:
//     DO NOT USE default export
//     https://engineering.linecorp.com/ja/blog/you-dont-need-default-export
//
// Not bad:
import { named3 } from './named-exports-with-default';
import * as namespaceObject2 from './named-exports-with-default';
import defaultExport2 from './named-exports-with-default';

// Named import without `default export`:
console.log(named1);
console.log(namespaceObject1.named1, namespaceObject1.named2);

// Named import with `default export`:
console.log(named3);
console.log(namespaceObject2.named3, namespaceObject2.default);
console.log(defaultExport2);
