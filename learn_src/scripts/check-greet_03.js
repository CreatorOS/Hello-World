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
  const HelloWorld = await hre.ethers.getContractFactory('HelloWorld');
  const hw = await HelloWorld.deploy();

  await hw.deployed();
  console.log('Hello World Contract deployed to:', hw.address);
  console.log(`Calling greet()`);
  try {
    const greet = await hw.greet();
    console.log('greet() output: ', greet);
    if(greet === 'Hello World!') {
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
