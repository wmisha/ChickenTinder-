const db = require("../models");

describe("The UserGroup Association", () => {
    it("can add a Group to a User's Groups", async () => {
        const user = await db.User.findOne();
        const group = await db.Group.findOne();

        await user.addGroup(group);

        const userWithGroupData = await db.User.findOne({
            where: {id: user.id},
            include: db.Group
        })

        expect(
            userWithGroupData.Groups.map(group => group.id)
        ).toContain(group.id)
    })

    it ("can add a user to the Group's Users", async () => {
        const user = await db.User.findOne();
        const group = await db.Group.findOne();

        await group.addUser(user);

        const userWithGroupData = await db.User.findOne({
            where: { id: user.id },
            include: db.Group
        })

        expect(
            userWithGroupData.Groups.map(group => group.id)
        ).toContain(group.id)
    })

    it (`can view a user as one of the user's group's users"`, async () => {
        const user = await db.User.findOne();
        const group = await db.Group.findOne();

        await user.addGroup(group);

        const groupWithUserData = await db.Group.findOne({
            where: { id: group.id },
            include: db.User
        })

        expect(
            groupWithUserData.Users.map(user => user.id)
        ).toContain(user.id)
    })

})

describe('The RestaurantGroup Association', () => {
    it ('Can add a restaurant to a group', async () => {
        const restaurant = await db.Restaurant.findOne();
        const group = await db.Group.findOne();

        await group.addRestaurant(restaurant);

        const groupWithRestaurantData = await db.Group.findOne({
            where: { id: group.id },
            include: db.Restaurant
        })

        expect(
            groupWithRestaurantData.Restaurants.map(restaurant => restaurant.id)
        ).toContain(restaurant.id)
    })

    it('Can add a group to a restaurant', async () => {
        const restaurant = await db.Restaurant.findOne();
        const group = await db.Group.findOne();

        await group.addRestaurant(restaurant);

        const restaurantWithGroupData = await db.Restaurant.findOne({
            where: { id: restaurant.id },
            include: db.Group
        })

        expect(
            restaurantWithGroupData.Groups.map(group => group.id)
        ).toContain(group.id)
    })
})

describe('The RestaurantVote Association', () => {
    it ('has a user vote for a restaurant', async () => {
        const user = await db.User.findOne();
        const restaurant = await db.Restaurant.findOne();

        const vote = await db.RestaurantVote.build();
        vote.setRestaurant(restaurant);
        vote.setUser(user);
        await vote.save();

        const votePrefetch = await db.RestaurantVote.findOne({
            where: {
                id: vote.id
            },
            include: [db.Restaurant, db.User]
        })
        expect(votePrefetch.Restaurant.id).toEqual(restaurant.id);
        expect(votePrefetch.User.id).toEqual(user.id)
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