import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
    const users = [
        { id: 1, name: "Paulo" },
        { id: 2, name: "Henrique" }
    ]

    return response.json(users);
}