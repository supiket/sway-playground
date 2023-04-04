import { cssObj } from "@fuel-ui/css";
import { Box, BoxCentered, Stack } from "@fuel-ui/react";
import { useState } from "react";
import { NetworkState, NetworkSystem, useNetwork } from "../../../Connection";
import { ContractInterface } from "../../../ContractInterface";
import { loadAbi, loadBytecode, onCompile } from "../../../Core";
import { DeploySystem } from "../../../Deployment";
import { LocalFaucetButton } from "../../../Faucet";

export function Interface() {
    const [abi, setAbi] = useState(loadAbi());
    const [bytecode, setBytecode] = useState(loadBytecode());
    const [contractId, setContractId] = useState("");
    const [network, setNetwork] = useState("");
    const [networkState, setNetworkState] = useState(NetworkState.CAN_CONNECT);
    const [deployState, setDeployState] = useState(false);
    useNetwork(setNetwork, setDeployState);

    function onContractCompile() {
        let program = onCompile(setAbi, setBytecode, setDeployState);
        if (!program) {
            return <></>;
        };
    }

    return (
        <Box css={styles.contentWrapper}>
            {/* click is triggered by playground.js on contract compile */}
            <div className="ui" onClick={onContractCompile} />
            <BoxCentered minHS css={styles.contractInterface}>
                <Stack align={"center"}>
                    {
                        <NetworkSystem
                            setDeployState={setDeployState}
                            setNetwork={setNetwork}
                            networkState={networkState}
                            setNetworkState={setNetworkState}
                        />
                    }
                    {
                        (network.includes("localhost") || network.includes("127.0.0.1"))
                        &&
                        (networkState === NetworkState.CAN_DISCONNECT
                            || networkState === NetworkState.CONNECTING)
                        &&
                        <LocalFaucetButton />
                    }
                    {
                        (networkState === NetworkState.CAN_DISCONNECT
                            || networkState === NetworkState.DISCONNECTING)
                        &&
                        <DeploySystem
                            abi={abi}
                            bytecode={bytecode}
                            contractId={contractId}
                            setContractId={setContractId}
                            deployState={deployState}
                            setDeployState={setDeployState}
                        />
                    }
                    {
                        deployState
                        &&
                        (networkState === NetworkState.CAN_DISCONNECT
                            || networkState === NetworkState.DISCONNECTING)
                        &&
                        <ContractInterface key={contractId} contractId={contractId} />
                    }
                </Stack>
            </BoxCentered>
        </Box>
    );
}

const styles = {
    contentWrapper: cssObj({
        height: "100%",
        width: "50%",
        right: "0",
        position: "fixed",
        overflow: "scroll"
    }),
    contractInterface: cssObj({
        paddingBottom: "$10",
    }),
}