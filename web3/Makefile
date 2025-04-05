compile:
	npx hardhat compile

deploy:
	npx hardhat run ignition/modules/AltNode.ts --network eduChain

verify:
	npx hardhat verify --network eduChain 0x4a0302ad1437DDc60BDEF4ec65a1d8750Ab2940E

deploy-token:
	npx hardhat run ignition/modules/token.ts --network eduChain

verify-token:
	npx hardhat verify --network eduChain 0x74Ce2e9ef64018a1f7b1A0F035782045d566ef4f

deploy-accessControl:
	npx hardhat run ignition/modules/AccessControl.ts --network baseSepolia

verify-accessControl:
	npx hardhat verify --network baseSepolia 0x69A840189F4F26f67eC92d3A1bCa818711fE14aa
