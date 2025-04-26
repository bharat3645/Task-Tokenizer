const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  
  const Identity = await ethers.getContractFactory("Identity");
  const identity = await Identity.deploy();
  await identity.waitForDeployment();
  console.log("✅ Identity Contract Deployed at:", await identity.getAddress());

  
  const Job = await ethers.getContractFactory("Job");
  const job = await Job.deploy();
  await job.waitForDeployment();
  console.log("✅ Job Contract Deployed at:", await job.getAddress());


  const Reputation = await ethers.getContractFactory("Reputation");
  const reputation = await Reputation.deploy();
  await reputation.waitForDeployment();
  console.log("✅ Reputation Contract Deployed at:", await reputation.getAddress());

  
  const Escrow = await ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(deployer.address, { value: ethers.parseEther("0.01") });
  await escrow.waitForDeployment();
  console.log("✅ Escrow Contract Deployed at:", await escrow.getAddress());

  // Save deployed addresses to a file for frontend use
  const fs = require("fs");
  const addresses = {
    identity: await identity.getAddress(),
    job: await job.getAddress(),
    reputation: await reputation.getAddress(),
    escrow: await escrow.getAddress(),
  };
  fs.writeFileSync("deployed-addresses.json", JSON.stringify(addresses, null, 2));
  console.log("📝 Contract addresses saved to deployed-addresses.json");
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
