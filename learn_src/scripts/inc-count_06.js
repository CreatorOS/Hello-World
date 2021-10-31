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
  const ContractFactory = await hre.ethers.getContractFactory('Counter');
  const contract = await ContractFactory.deploy();

  await contract.deployed();
  console.log('Counter Contract deployed to:', contract.address);
  try {
    console.log(`Calling get() before inc()...`);
    let count = await contract.get();
    console.log('get() output before inc: ', count.toString());
    console.log(`\nCalling inc()...`);
    await contract.inc();
    console.log(`Calling get() after inc()...`);
    count = await contract.get();
    console.log('get() output after inc: ', count.toString());
    if(count.toString() === '1') {
      console.log('Test Passed!');
      process.exit(0);
    } else {
      console.log('Test Failed!');
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
