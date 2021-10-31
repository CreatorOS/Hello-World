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
    console.log(`\nCalling inc()...`);
    await contract.inc();
    console.log(`Calling get() before dec()...`);
    let countBeforeDec = await contract.get();
    console.log('get() output before dec: ', countBeforeDec.toString());
    console.log(`\nCalling dec()...`);
    await contract.dec();
    console.log(`Calling get() after dec()...`);
    let countAfterDec = await contract.get();
    console.log('get() output after dec: ', countAfterDec.toString());
    if(countBeforeDec.toString() === '1' && countAfterDec.toString() === '0') {
      console.log('test passed');
      process.exit(0);
    } else {
      console.log('test failed');
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
