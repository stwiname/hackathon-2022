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
        getPrivateKey: flow(function* () {
            self.state = "pending";
            try {
                const user = yield window.ethereum.request({
                    method: "eth_requestAccounts",
                    params: [],
                })
                self.user = user;
                self.state = 'done'
            } catch (err) {
              console.log(err);
              self.state = 'error';
            }
        })
    }))
