const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Reputation", function () {
  async function deployReputationFixture() {
    const [client, freelancer] = await ethers.getSigners();
    const Reputation = await ethers.getContractFactory("Reputation");
    const reputation = await Reputation.deploy();
    return { reputation, client, freelancer };
  }

  it("reports zero rating and zero completed jobs for an unrated freelancer", async function () {
    const { reputation, freelancer } = await loadFixture(deployReputationFixture);

    const [averageRating, completedJobs] = await reputation.getReputation(freelancer.address);
    expect(averageRating).to.equal(0);
    expect(completedJobs).to.equal(0);
  });

  it("records a single rating and reflects it in getReputation", async function () {
    const { reputation, client, freelancer } = await loadFixture(deployReputationFixture);

    await reputation.connect(client).rateFreelancer(freelancer.address, 4);

    const [averageRating, completedJobs] = await reputation.getReputation(freelancer.address);
    expect(averageRating).to.equal(4);
    expect(completedJobs).to.equal(1);
  });

  it("averages multiple ratings, flooring the integer division", async function () {
    const { reputation, client, freelancer } = await loadFixture(deployReputationFixture);

    // 5, 4, 4 -> total 13 / 3 ratings = 4 (floored from 4.33)
    await reputation.connect(client).rateFreelancer(freelancer.address, 5);
    await reputation.connect(client).rateFreelancer(freelancer.address, 4);
    await reputation.connect(client).rateFreelancer(freelancer.address, 4);

    const [averageRating, completedJobs] = await reputation.getReputation(freelancer.address);
    expect(averageRating).to.equal(4);
    expect(completedJobs).to.equal(3);
  });

  it("reverts on a rating of 0", async function () {
    const { reputation, client, freelancer } = await loadFixture(deployReputationFixture);

    await expect(reputation.connect(client).rateFreelancer(freelancer.address, 0)).to.be.revertedWith(
      "Invalid rating (1-5)",
    );
  });

  it("reverts on a rating above 5", async function () {
    const { reputation, client, freelancer } = await loadFixture(deployReputationFixture);

    await expect(reputation.connect(client).rateFreelancer(freelancer.address, 6)).to.be.revertedWith(
      "Invalid rating (1-5)",
    );
  });

  it("accepts the boundary ratings 1 and 5", async function () {
    const { reputation, client, freelancer } = await loadFixture(deployReputationFixture);

    await expect(reputation.connect(client).rateFreelancer(freelancer.address, 1)).to.not.be.reverted;
    await expect(reputation.connect(client).rateFreelancer(freelancer.address, 5)).to.not.be.reverted;
  });

  it("stores and returns an empty project link by default", async function () {
    const { reputation, freelancer } = await loadFixture(deployReputationFixture);
    expect(await reputation.getProjectLink(freelancer.address)).to.equal("");
  });

  it("lets a freelancer set their own project link, retrievable by anyone", async function () {
    const { reputation, freelancer } = await loadFixture(deployReputationFixture);

    await reputation.connect(freelancer).addProjectLink("https://github.com/example/portfolio");

    expect(await reputation.getProjectLink(freelancer.address)).to.equal("https://github.com/example/portfolio");
  });
});
