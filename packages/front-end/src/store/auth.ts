import { observable, action } from "mobx"
import { flow, types } from "mobx-state-tree"
import MetaMaskSDK from "@metamask/sdk"

export const Auth = types
    .model({
        state: types.optional(
            types.enumeration(["pending", "done", "error"]),
            "done"
        ),
        user: types.maybe(types.frozen()),
    })
    .actions((self) => ({
        getPrivateKey() {
            self.state = "pending"
            window.ethereum
                .request({
                    method: "eth_requestAccounts",
                    params: [],
                })
                .then((res: any) => {
                    console.log("request accounts", res)
                    self.user = res;
                    self.state = "done"
                })
                .catch((e: any) => {
                    console.log("request accounts ERR", e)
                    self.state = "error"
                })
        },
    }))
