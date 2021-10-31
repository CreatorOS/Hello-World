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
  const ContractFactory = await hre.ethers.getContractFactory('Todos');
  const contract = await ContractFactory.deploy();

  await contract.deployed();
  console.log('Todos Contract deployed to:', contract.address);
  try {
    console.log('calling create(web3)');
    await contract.create('web3');
    console.log(`\nCalling get(0) after create(web3)...`);
    let todoBefore = await contract.get(0);
    console.log(`get(0) output: `, todoBefore);
    console.log('\ncalling toggleCompleted(0)');
    await contract.toggleCompleted(0);
    console.log(`\nCalling get(0) after toggleCompleted(0)...`);
    let todoAfter = await contract.get(0);
    console.log(`get(0) output: `, todoAfter);
    if(todoBefore.completed === false && todoAfter.completed === true) {
      console.log('Test passed!');
      process.exit(0);
    } else {
      console.log('Test failed!');
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
