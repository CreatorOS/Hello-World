## Hello world

Write this code and run the test cases. Let's get a quick grasp of the programming language and syntax.

```
// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.8.3 and less than 0.9.0
pragma solidity ^0.8.3;

contract HelloWorld {
    string public greet = "Hello World!";
}
```

- `pragma` defines which version of the compiler to use to compile this program (aka smart contract). Solidity language is rapidly improving and using the correct compiler version is important to avoid code incompatibility.
- Like a class, we use `contract` in solidity
- Solidity is a typed language, `string` is a primitive data type.

```
run testcases 01.sh
```