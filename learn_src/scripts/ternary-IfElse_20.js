// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat');
const BN = require('bn.js');

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const ContractFactory = await hre.ethers.getContractFactory('IfElse');
  const contract = await ContractFactory.deploy();

  await contract.deployed();
  console.log('IfElse Contract deployed to:', contract.address);
  try {
    console.log(`Calling ternary(5)`);
    let numLessThan10 = await contract.ternary(5);
    console.log('ternary(5) output (input < 10): ', numLessThan10.toString());
    console.log(`\nCalling ternary(11)`);
    let numMoreThan10 = await contract.ternary(11);
    console.log('ternary(11) output (input > 10): ', numMoreThan10.toString());
    if(numLessThan10.toString() === '1' && numMoreThan10.toString() === '2') {
      console.log('Test passed');
      process.exit(0);
    } else {
      console.log('Test failed');
      process.exit(1);
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
