# Hello world

This quest is based on the examples seen in the popular repository [solidity-by-example.org](solidity-by-example.org)

In this quest we're going to write code in simple increments and understand the basics of the Solidity programming language and its syntax.

This quest assumes that you are aware of what is Ethereum and are looking to build dapps. Solidity is the language in which you write decentralized apps (aka dapps).

This Quest is best suited for those who like to learn the syntax before the concepts.


## Let's write code 
Write this code and run the test cases. Let's get a quick grasp of the programming language and syntax.

```
pragma solidity ^0.8.3;

contract HelloWorld {
    string public greet = "Hello World!";
}
```

- `pragma` defines which version of the compiler to use to compile this program (aka smart contract). Solidity language is rapidly improving and using the correct compiler version is important to avoid code incompatibility.
- Like a class, we use `contract` in solidity
- Solidity is a typed language, `string` is a primitive data type.

When you declare a variable as public in solidity, a getter method with the same name as variable is automatically generated for you.

The test script uses that test if the variable is set to `Hello World!` or not.
Click on `Run` to see the result.
