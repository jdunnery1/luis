import {User} from "../models/user.model.js";

export const auth = async (req, res) => {
    try {
        const { id, firstName, lastName } = req.body

        const user = await User.findOne({clerkId: id})
        console.log(id)
        if (!user && id) {
            await User.create({
                clerkId: id,
                username: `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
                admin: false,
                cart: []
            })
            res.status(200).json({success:true})
        }
    } catch (e) {
        console.log(e)
    }
}