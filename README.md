# TaskToken Economy Platform

A beginner-friendly Web3 gig platform that tokenizes tasks as ERC-20 tokens on Ethereum. It provides both smart contracts (with Hardhat) and a Next.js frontend for users to create, browse, and complete gigs.

## Table of Contents

- [Overview](#overview)
- [Current status](#current-status)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running the Platform](#running-the-platform)
- [Smart Contracts](#smart-contracts)
- [Frontend](#frontend)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Overview

This repository contains two main parts:

1. **Smart Contracts** – Solidity contracts for task registration (`Identity.sol`), job management, reputation tracking, and escrow, deployed via Hardhat.
2. **Frontend** – A Next.js (TypeScript) application under the `project/` folder, with Tailwind CSS and Framer Motion for UI.

## Current status

Stated plainly, so contributors and forkers know what's real today:

- **Wallet connect works.** `project/context/WalletContext.tsx` connects MetaMask via the injected `window.ethereum` provider (ethers v5's `Web3Provider`), tracks the active account/network, and reacts to account/chain changes.
- **The frontend needs no RPC configuration of its own.** It talks to whatever network the user's wallet is connected to — there's no `NEXT_PUBLIC_RPC_URL` or similar to set.
- **Job and freelancer listings on the homepage are static demo data** (`project/app/page.tsx`), not yet read from the deployed `Job` / `Reputation` contracts. Search/browse works against that demo data today.
- **No automated tests exist yet for the actual contracts** (`Identity.sol`, `Job.sol`, `Reputation.sol`, `Escrow.sol`). The repo previously carried the unmodified `npx hardhat init` sample test (`test/Lock.js`, deploying a `Lock` contract that isn't part of this project); it's been removed since it referenced a contract that doesn't exist here. Contributions adding real coverage for the four contracts above are very welcome.

## Project Structure

```plaintext
.
├─ contracts/              # Solidity smart contracts
│  ├─ Identity.sol         # User registration
│  ├─ Job.sol              # Job postings
│  ├─ Reputation.sol       # Freelancer ratings
│  └─ ...
├─ scripts/                # Hardhat deployment scripts
├─ test/                   # Smart contract tests
├─ project/                # Next.js front-end app
│  ├─ app/                 # App router pages and layouts
│  ├─ components/          # React components
│  ├─ globals.css          # Global styles
│  └─ ...
├─ hardhat.config.js       # Hardhat configuration
├─ .env.example            # Template for root .env (Hardhat/Sepolia)
├─ package.json            # Root dependencies (Hardhat, ethers)
├─ package-lock.json
└─ README.md               # This file
```

## Prerequisites

- Node.js (v16 or above)
- npm
- [Hardhat](https://hardhat.org)
- MetaMask or another Web3 wallet (required to use the frontend — there is no fallback RPC path)

## Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/bharat3645/Task-Tokenizer.git
   cd Task-Tokenizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd project && npm install
   ```

3. **Configure environment (root only)**
   - Copy `.env.example` to `.env` in the repo root:
     ```bash
     cp .env.example .env
     ```
   - Fill in your Sepolia RPC URL and a throwaway deployer private key:
     ```dotenv
     # .env
     ALCHEMY_SEPOLIA_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
     PRIVATE_KEY=your_wallet_private_key_without_0x_prefix
     ```
   - The `project/` frontend does **not** need a `.env` file — it connects
     directly through whatever wallet the user has installed.

## Running the Platform

### 1. Compile and Deploy Contracts

```bash
# in root folder
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

This will deploy contracts and output addresses in `deployed-addresses.json`.

### 2. Launch Frontend

```bash
# in project folder
npm run dev
```

Navigate to http://localhost:3000 to view the app.

## Smart Contracts

- `Identity.sol` – register users on-chain
- `Job.sol` – create and manage gigs
- `Reputation.sol` – track freelancer ratings
- `Escrow.sol` – hold and release payment for a job

Events, mappings, and functions are documented in each contract file.

## Frontend

Built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.
Features:

- Connect wallet via MetaMask (`window.ethereum`) and read the active account/network
- Browse jobs and freelancers (currently demo data — see [Current status](#current-status))
- Interactive UI with animated backgrounds

## Testing

Run unit tests for smart contracts:
```bash
npx hardhat test
# or, equivalently:
npm test
```

There are currently no tests covering `Identity.sol`, `Job.sol`, `Reputation.sol`,
or `Escrow.sol` — see [Current status](#current-status). PRs adding coverage
are welcome.

## Contributing

Contributions are welcome!

1. Fork the repo
2. Create a branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m "feat: add feature"`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
