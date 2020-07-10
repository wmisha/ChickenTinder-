import reducer from '../reducers'

describe("The account reducer", () => {

    it("can set the account", () => {
        expect(reducer({}, {
            type: "SET_ACCOUNT",
            account: "Bikini"
        })).toEqual({ account: "Bikini", title: "" })
    })

    it("can set the title", () => {
        expect(reducer({}, {
            type: "SET_TITLE",
            title: "Bikini"
        })).toEqual({ title: "Bikini", account: "" })
    })

    it("can remove the account", () => {
        expect(reducer({ account: "llamas" }, {
            type: "REMOVE_ACCOUNT",
        })).toEqual({account: "", title: ""})
    })

    it("can take a bad argument and return the previous state", () => {
        expect(reducer({ account: "Pandas" }, {
            type: "BACON_PANCAKES",
            account: "Apples"
        })).toEqual({ account: "Pandas", title: ""})
    })
})