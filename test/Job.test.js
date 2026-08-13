const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Job", function () {
  async function deployJobFixture() {
    const [client, freelancer, otherFreelancer] = await ethers.getSigners();
    const Job = await ethers.getContractFactory("Job");
    const job = await Job.deploy();
    return { job, client, freelancer, otherFreelancer };
  }

  it("starts with a zero job counter", async function () {
    const { job } = await loadFixture(deployJobFixture);
    expect(await job.jobCounter()).to.equal(0);
  });

  it("posts a job, assigning id 1, storing its details, and emitting JobPosted", async function () {
    const { job, client } = await loadFixture(deployJobFixture);

    await expect(job.connect(client).postJob("Build a website", 1000))
      .to.emit(job, "JobPosted")
      .withArgs(1, client.address, "Build a website", 1000);

    expect(await job.jobCounter()).to.equal(1);

    const stored = await job.jobs(1);
    expect(stored.client).to.equal(client.address);
    expect(stored.description).to.equal("Build a website");
    expect(stored.budget).to.equal(1000);
    expect(stored.isOpen).to.equal(true);
    expect(stored.freelancer).to.equal(ethers.ZeroAddress);
  });

  it("increments the job id on each subsequent post", async function () {
    const { job, client } = await loadFixture(deployJobFixture);

    await job.connect(client).postJob("First job", 100);
    await job.connect(client).postJob("Second job", 200);

    expect(await job.jobCounter()).to.equal(2);
    expect((await job.jobs(1)).description).to.equal("First job");
    expect((await job.jobs(2)).description).to.equal("Second job");
  });

  it("lets a freelancer accept an open job and emits JobAccepted", async function () {
    const { job, client, freelancer } = await loadFixture(deployJobFixture);
    await job.connect(client).postJob("Build a website", 1000);

    await expect(job.connect(freelancer).acceptJob(1)).to.emit(job, "JobAccepted").withArgs(1, freelancer.address);

    const stored = await job.jobs(1);
    expect(stored.freelancer).to.equal(freelancer.address);
    expect(stored.isOpen).to.equal(false);
  });

  it("reverts if a job already accepted is accepted again", async function () {
    const { job, client, freelancer, otherFreelancer } = await loadFixture(deployJobFixture);
    await job.connect(client).postJob("Build a website", 1000);
    await job.connect(freelancer).acceptJob(1);

    await expect(job.connect(otherFreelancer).acceptJob(1)).to.be.revertedWith("Job already taken.");
  });

  it("reverts when accepting a job id that was never posted", async function () {
    const { job, freelancer } = await loadFixture(deployJobFixture);

    // jobs(999) reads a default-initialized struct whose isOpen is false,
    // so acceptJob correctly refuses it the same way it would an already-taken job.
    await expect(job.connect(freelancer).acceptJob(999)).to.be.revertedWith("Job already taken.");
  });
});
