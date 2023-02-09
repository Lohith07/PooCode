import web3 from './web3';

const address = '0x85976C3411A955173C42674847053f4c2E0Fc5e5';
const abi =[
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "_DrugID",
				"type": "uint64"
			},
			{
				"internalType": "string",
				"name": "_BatchID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_DrugName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Currentlocation",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_MfgTimeStamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_ExpTimeStamp",
				"type": "uint256"
			},
			{
				"internalType": "int8",
				"name": "_CurrentTemperature",
				"type": "int8"
			},
			{
				"internalType": "int8",
				"name": "_MaxTemperature",
				"type": "int8"
			},
			{
				"internalType": "address",
				"name": "_SerialNumber",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_IsBad",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "_tokenURI",
				"type": "string"
			}
		],
		"name": "addDrugDetails",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_Name",
				"type": "string"
			},
			{
				"internalType": "uint64",
				"name": "_ContactNo",
				"type": "uint64"
			},
			{
				"internalType": "string",
				"name": "_UserPassword",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Email",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_nftAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "username",
				"type": "address"
			}
		],
		"name": "AddParticipant",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "newRole",
				"type": "string"
			}
		],
		"name": "AddRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "serialNumber",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "Receive",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_Name",
				"type": "string"
			},
			{
				"internalType": "uint64",
				"name": "_ContactNo",
				"type": "uint64"
			},
			{
				"internalType": "address",
				"name": "UserAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_UserPassword",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Role",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isUpdating",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "_isActive",
				"type": "bool"
			}
		],
		"name": "setUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "serialNumber",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "Ship",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "username",
				"type": "address"
			}
		],
		"name": "UpdateParticipant",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "serialNumber",
				"type": "address"
			}
		],
		"name": "addDrug",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "Role",
				"type": "string"
			}
		],
		"name": "addRole",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_SerialNumber",
				"type": "address"
			},
			{
				"internalType": "int8",
				"name": "_ImportingTemparature",
				"type": "int8"
			}
		],
		"name": "Receving",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_SerialNumber",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_ToUserName",
				"type": "address"
			},
			{
				"internalType": "int8",
				"name": "_ExportingTemparature",
				"type": "int8"
			}
		],
		"name": "Shipping",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "serialNumber",
				"type": "address"
			}
		],
		"name": "updateDrug",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "AdminAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_password",
				"type": "string"
			}
		],
		"name": "Authenticate",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "BatchDrugDetails",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "DrugID",
				"type": "uint64"
			},
			{
				"internalType": "string",
				"name": "BatchID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "DrugName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Currentlocation",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "CurrentproductOwner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "NextOwner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "MfgTimeStamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ExpTimeStamp",
				"type": "uint256"
			},
			{
				"internalType": "int8",
				"name": "CurrentTemperature",
				"type": "int8"
			},
			{
				"internalType": "int8",
				"name": "MaxTemperature",
				"type": "int8"
			},
			{
				"internalType": "string",
				"name": "Status",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "IsBad",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "BatchTreeDetails",
		"outputs": [
			{
				"internalType": "address",
				"name": "FromUserName",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "Location",
				"type": "string"
			},
			{
				"internalType": "int8",
				"name": "ImportingTemparature",
				"type": "int8"
			},
			{
				"internalType": "int8",
				"name": "ExportingTemparature",
				"type": "int8"
			},
			{
				"internalType": "uint256",
				"name": "ImportingDateTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ExportingDateTime",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "ToUserName",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "DrugStatus",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "BatchUserDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "Name",
				"type": "string"
			},
			{
				"internalType": "uint64",
				"name": "ContactNo",
				"type": "uint64"
			},
			{
				"internalType": "bool",
				"name": "IsActive",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "UserName",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "Email",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "DrugKeyList",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDrugKeyList",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRoleList",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "serialNumber",
				"type": "address"
			}
		],
		"name": "getTreeDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "FromUserName",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "Location",
						"type": "string"
					},
					{
						"internalType": "int8",
						"name": "ImportingTemparature",
						"type": "int8"
					},
					{
						"internalType": "int8",
						"name": "ExportingTemparature",
						"type": "int8"
					},
					{
						"internalType": "uint256",
						"name": "ImportingDateTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "ExportingDateTime",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "ToUserName",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "DrugStatus",
						"type": "string"
					}
				],
				"internalType": "struct SupplyChainStorage2.Tree[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "roles",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "UserNameList",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "UserNames",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userRole",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Users",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export default new web3.eth.Contract(abi,address);