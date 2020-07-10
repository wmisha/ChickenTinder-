import title from '../reducers/title'

describe("The title reducer", () => {

    it("can set the title", () => {
        expect(title("", {
            type: "SET_TITLE",
            title: "Bikini"
        })).toEqual("Bikini")
    })


    it("can take a bad argument and return the previous state", () => {
        expect(title("Pandas", {
            type: "BACON_PANCAKES",
            account: "Apples"
        })).toEqual("Pandas")
    })
})