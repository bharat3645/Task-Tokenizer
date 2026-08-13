const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Escrow", function () {
  const DEPOSIT = ethers.parseEther("1");

  async function deployEscrowFixture() {
    const [client, freelancer, stranger] = await ethers.getSigners();
    const Escrow = await ethers.getContractFactory("Escrow");
    const escrow = await Escrow.connect(client).deploy(freelancer.address, { value: DEPOSIT });
    return { escrow, client, freelancer, stranger };
  }

  it("sets client, freelancer, and amount from the deposit on deployment", async function () {
    const { escrow, client, freelancer } = await loadFixture(deployEscrowFixture);

    expect(await escrow.client()).to.equal(client.address);
    expect(await escrow.freelancer()).to.equal(freelancer.address);
    expect(await escrow.amount()).to.equal(DEPOSIT);
    expect(await escrow.jobCompleted()).to.equal(false);
    expect(await ethers.provider.getBalance(await escrow.getAddress())).to.equal(DEPOSIT);
  });

  it("emits PaymentDeposited on deployment", async function () {
    const [client, freelancer] = await ethers.getSigners();
    const Escrow = await ethers.getContractFactory("Escrow");

    const escrow = await Escrow.connect(client).deploy(freelancer.address, { value: DEPOSIT });
    await expect(escrow.deploymentTransaction())
      .to.emit(escrow, "PaymentDeposited")
      .withArgs(client.address, DEPOSIT);
  });

  it("lets the client mark the job completed", async function () {
    const { escrow, client } = await loadFixture(deployEscrowFixture);

    await escrow.connect(client).markJobCompleted();

    expect(await escrow.jobCompleted()).to.equal(true);
  });

  it("reverts if a non-client tries to mark the job completed", async function () {
    const { escrow, stranger } = await loadFixture(deployEscrowFixture);

    await expect(escrow.connect(stranger).markJobCompleted()).to.be.revertedWith("Only client can call this.");
  });

  it("reverts marking the job completed twice", async function () {
    const { escrow, client } = await loadFixture(deployEscrowFixture);

    await escrow.connect(client).markJobCompleted();

    await expect(escrow.connect(client).markJobCompleted()).to.be.revertedWith("Job already marked as completed.");
  });

  it("reverts releasing payment before the job is marked completed", async function () {
    const { escrow, client } = await loadFixture(deployEscrowFixture);

    await expect(escrow.connect(client).releasePayment()).to.be.revertedWith("Job not completed yet.");
  });

  it("reverts if a non-client tries to release payment", async function () {
    const { escrow, client, stranger } = await loadFixture(deployEscrowFixture);
    await escrow.connect(client).markJobCompleted();

    await expect(escrow.connect(stranger).releasePayment()).to.be.revertedWith("Only client can call this.");
  });

  it("releases the deposited amount to the freelancer and emits PaymentReleased", async function () {
    const { escrow, client, freelancer } = await loadFixture(deployEscrowFixture);
    await escrow.connect(client).markJobCompleted();

    await expect(escrow.connect(client).releasePayment())
      .to.changeEtherBalances([escrow, freelancer], [-DEPOSIT, DEPOSIT]);
  });

  it("emits PaymentReleased with the freelancer and amount", async function () {
    const { escrow, client, freelancer } = await loadFixture(deployEscrowFixture);
    await escrow.connect(client).markJobCompleted();

    await expect(escrow.connect(client).releasePayment())
      .to.emit(escrow, "PaymentReleased")
      .withArgs(freelancer.address, DEPOSIT);
  });
});
