import account from '../reducers/account'

describe("The account reducer", () => {
    it ("can set the account", () => {
       expect(account("", { 
           type: "SET_ACCOUNT",
           account: "Bikini"
       })).toEqual("Bikini")
    })

    it ("can remove the account", () => {
        expect(account("llamas", { 
            type: "REMOVE_ACCOUNT",
        })).toEqual("")
    })

    it ("can take a bad argument and return the previous state", () => {
        expect(account("Pandas", {
            type: "BACON PANCAKES",
            account: "Apples"
        })).toEqual("Pandas")
    })
})