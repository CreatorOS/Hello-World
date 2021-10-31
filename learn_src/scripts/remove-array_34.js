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
  const [deployer] = await ethers.getSigners();
  const ContractFactory = await hre.ethers.getContractFactory('Array');
  const contract = await ContractFactory.deploy();

  await contract.deployed();
  console.log('Array Contract deployed to:', contract.address);
  try {
    console.log(`Calling push(4)`);
    await contract.push(4);
    console.log(`Calling get(0)`);
    let numBefore = await contract.get(0);
    console.log(`get(0) output (before remove(0)):`, numBefore.toString());
    await contract.remove(0);
    console.log(`Calling get(0)`);
    let numAfter = await contract.get(0);
    console.log(`get(0) output (after remove(0)):`, numAfter.toString());
    if(numBefore.toString() === '4' && numAfter.toString() === '0') {
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
