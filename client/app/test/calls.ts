const clickContractAddress = '0x67c97D1FB8184F038592b2109F854dfb09C77C75';
const clickContractAbi = [
  {
    type: 'function',
    name: 'click',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;
 
export const calls = [
  {
    address: clickContractAddress,
    abi: clickContractAbi,
    functionName: 'click',
    args: [],
  }
];