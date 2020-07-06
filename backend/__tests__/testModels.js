const db = require("../models");


describe("The User Model", () => {
    it("can create a new user", async () => {
        const user = await db.User.create({
            username: 'Test',
            pwd_hash: 'Test', salt: 'Test'
        })
        expect(user.username).toEqual('Test')
    })

    it("can find a user by username", async () => {
        const user = await db.User.findOne({
            where: {
                username: 'Test'
            }
        })
        expect(user).toBeTruthy()
        user.destroy();
    })   
})

describe("The Group Model", () => {
    it ("can create a new group", async () => {
        const group = await db.Group.create({
            group_name: 'Test',
            owner_id: 42,
            location: 'San Francisco',
            join_code: 424242,
            Disactive: false
        })

        expect(group.group_name).toEqual('Test')
    })

    it ("can find a user by username", async () => {
        const group = await db.Group.findOne({
            where: {
                group_name: 'Test'
            }
        })
        expect(group).toBeTruthy();
        group.destroy();
    })
})

describe("The Restaurant Model", () => {
    it ("can create a new restaurant", async () => {
        const restaurant = await db.Restaurant.create({
            group_id: 42,
            rating: 5,
            location: "Paris",
            price: 3,
            distance: 2000,
            vegetarian: true,
            weelchair: false,
            cuisine: "Yiddish Food"
        })

        expect(restaurant.cuisine).toEqual("Yiddish Food")
    })

    it ("can find a restaurant by cuisine", async () => {
        const restaurant = await db.Restaurant.findOne({
            where: {
                cuisine: "Yiddish Food"
            }
        })
        expect(restaurant).toBeTruthy();
        restaurant.destroy()
    })
})


describe("The Join Tables", () => {
    it("UserGroup has a user_id and a group_id", async () => {
        const userGroup = await db.UserGroup.create({
            user_id: 42,
            group_id: 42
        })

        expect(userGroup.user_id).toEqual(42)
        expect(userGroup.group_id).toEqual(42)
        userGroup.destroy();
    })

    it("RestaurantGroup has a restaurant_id and a group_id",async () => {
        const restaurantGroup = await db.RestaurantGroup.create({
            restaurant_id: 42,
            group_id: 42
        })

        expect(restaurantGroup.restaurant_id).toEqual(42)
        expect(restaurantGroup.group_id).toEqual(42)
        restaurantGroup.destroy();
    })

    it("RestaurantVote has a restaurant_id, a user_id, and a vote", async () => {
        const restaurantVote= await db.RestaurantVote.create({
            restaurant_id: 42,
            user_id: 42,
            vote: true
        })

        expect(restaurantVote.restaurant_id).toEqual(42)
        expect(restaurantVote.user_id).toEqual(42)
        expect(restaurantVote.vote).toBeTruthy();
        restaurantVote.destroy();
    })

})

beforeAll(async () => {
    const [user, group, restaurant] = await Promise.all([
        db.User.findOne(),
        db.Group.findOne(),
        db.Restaurant.findOne()
    ])

    if (!user) {
        await db.User.create({
            username: 'Timmy',
            pwd_hash: 'lksjfldkfj',
            salt: 'ldkjklj'
        })
    }

    if (!group) {
        await db.Group.create({
            group_name: 'Wilkins',
            owner_id: 42,
            location: 'San Francisco',
            join_code: 39840,
            Disactive: false
        })
    }

    if (!restaurant) {
        await db.Restaurant.create({
            group_id: 42,
            rating: 5,
            location: "Paris",
            price: 3,
            distance: 2000,
            vegetarian: true,
            weelchair: false,
            cuisine: "Yiddish Food"
        })
    }
})

afterAll(async () => {
    db.sequelize.close();
})