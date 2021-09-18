import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
    const products = [
        { id: 1, name: "Camisa" },
        { id: 2, name: "Calça" },
        { id: 3, name: "Vestido" }
    ]

    return response.json(products);
}