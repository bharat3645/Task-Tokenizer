const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Identity", function () {
  async function deployIdentityFixture() {
    const [alice, bob] = await ethers.getSigners();
    const Identity = await ethers.getContractFactory("Identity");
    const identity = await Identity.deploy();
    return { identity, alice, bob };
  }

  it("starts with nobody registered", async function () {
    const { identity, alice } = await loadFixture(deployIdentityFixture);
    expect(await identity.isRegistered(alice.address)).to.equal(false);
  });

  it("registers the caller and emits UserRegistered", async function () {
    const { identity, alice } = await loadFixture(deployIdentityFixture);

    await expect(identity.connect(alice).register())
      .to.emit(identity, "UserRegistered")
      .withArgs(alice.address);

    expect(await identity.isRegistered(alice.address)).to.equal(true);
    expect(await identity.registeredUsers(alice.address)).to.equal(true);
  });

  it("does not register other addresses as a side effect", async function () {
    const { identity, alice, bob } = await loadFixture(deployIdentityFixture);

    await identity.connect(alice).register();

    expect(await identity.isRegistered(bob.address)).to.equal(false);
  });

  it("reverts on a second registration from the same address", async function () {
    const { identity, alice } = await loadFixture(deployIdentityFixture);

    await identity.connect(alice).register();

    await expect(identity.connect(alice).register()).to.be.revertedWith("User already registered.");
  });
});
