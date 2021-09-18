import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
    console.log(request.query);
    const news = [
        { id: 1, name: "Brazil wins the World Cup" },
        { id: 2, name: "Bitcoin reaches US$100.000" },
        { id: 3, name: "The Covid19 pandemic is over" }
    ]

    return response.json(news);
}