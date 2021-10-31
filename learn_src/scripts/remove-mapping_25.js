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
  const ContractFactory = await hre.ethers.getContractFactory('Mapping');
  const contract = await ContractFactory.deploy();

  await contract.deployed();
  console.log('Mapping Contract deployed to:', contract.address);
  try {
    console.log(`Calling get(${deployer.address}) before set(${deployer.address}, 3)...`);
    let numBeforeSet = await contract.get(deployer.address);
    console.log(`get(${deployer.address}) output before set: `, numBeforeSet.toString());

    console.log(`\nCalling set(${deployer.address}, 3)...`);
    await contract.set(deployer.address, 3);

    console.log(`\nCalling get(${deployer.address}) after set(${deployer.address}, 3)...`);
    let numAfterSet = await contract.get(deployer.address);
    console.log(`get(${deployer.address}) output after set(${deployer.address}, 3): `, numAfterSet.toString());

    console.log(`\nCalling remove(${deployer.address}) after set(${deployer.address}, 3)...`);
    await contract.remove(deployer.address);
    console.log(`\nCalling get(${deployer.address}) after remove(${deployer.address})...`);
    let numAfterRemove = await contract.get(deployer.address);
    console.log(`get(${deployer.address}) output after remove(${deployer.address}): `, numAfterRemove.toString());
    if(numBeforeSet.toString() === '0' && numAfterSet.toString() === '3' && numAfterRemove.toString() === '0') {
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
