/* Autogenerated file. Do not edit manually. */

/* tslint:disable */
/* eslint-disable */

/*
  Fuels version: 0.31.0
  Forc version: 0.32.2
  Fuel-Core version: 0.17.1
*/

import type {
  Interface,
  FunctionFragment,
  DecodedValue,
  Contract,
  BytesLike,
  BigNumberish,
  InvokeFunction,
  BN,
} from 'fuels';

interface SwaypadAbiInterface extends Interface {
  functions: {
    counter: FunctionFragment;
    increment: FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'counter', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'increment', values: [BigNumberish]): Uint8Array;

  decodeFunctionData(functionFragment: 'counter', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'increment', data: BytesLike): DecodedValue;
}

export class SwaypadAbi extends Contract {
  interface: SwaypadAbiInterface;
  functions: {
    counter: InvokeFunction<[], BN>;
    increment: InvokeFunction<[param: BigNumberish], BN>;
  };
}