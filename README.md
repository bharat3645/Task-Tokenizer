# TaskToken Economy Platform

A beginner-friendly Web3 gig platform that tokenizes tasks as ERC-20 tokens on Ethereum. It provides both smart contracts (with Hardhat) and a Next.js frontend for users to create, browse, and complete gigs.

## Table of Contents

- [Overview](#overview)
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
├─ package.json            # Root dependencies (Hardhat, ethers)
├─ package-lock.json
└─ README.md               # This file
```

## Prerequisites

- Node.js (v16 or above)
- npm
- [Hardhat](https://hardhat.org)
- MetaMask or another Web3 wallet (optional for local testing)

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

3. **Configure environment**
   - Copy `.env.example` to `.env` in root and `project/` if needed.
   - Fill in your RPC URL and private key:
     ```dotenv
     # root/.env
     ALCHEMY_SEPOLIA_URL=https://sepolia.infura.io/v3/YOUR_KEY
     PRIVATE_KEY=your_wallet_private_key

     # project/.env.local
     NEXT_PUBLIC_RPC_URL=${ALCHEMY_SEPOLIA_URL}
     ```

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

Events, mappings, and functions are documented in each contract file.

## Frontend

Built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.
Features:

- Connect wallet and call smart contracts
- List and browse gigs
- Apply for tasks (mocks or real transactions)
- Interactive UI with animated backgrounds

## Testing

Run unit tests for smart contracts:
```bash
npx hardhat test
```

## Contributing

Contributions are welcome!

1. Fork the repo
2. Create a branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m "feat: add feature"`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
