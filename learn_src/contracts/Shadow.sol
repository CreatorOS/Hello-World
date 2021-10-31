// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract Parent {
    string public name = "Contract Parent";

    function getName() public view returns (string memory) {
        return name;
    }
}

// Shadowing is disallowed in Solidity 0.6
// This will not compile
// contract B is Parent {
//     string public name = "Contract B";
// }

contract Child is Parent {
    // This is the correct way to override inherited state variables.
    constructor() {
        name = "Contract Child";
    }

    // C.getName returns "Contract Child"
}
