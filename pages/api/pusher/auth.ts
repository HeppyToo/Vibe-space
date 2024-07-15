import { NextApiRequest, NextApiResponse } from "next"

import {auth} from "@/auth";
import {pusherServer} from "@/lib/pusher";


export default async function handler(
    req: NextApiRequest, res: NextApiResponse
) {
    const session = await auth(req, res)

    if (!session?.user?.email) {
        return res.status(401);
    }

    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const data = {
        user_id: session.user.email,
    };

    const authResponse = pusherServer.authorizeChannel(socketId, channel, data);
    return res.send(authResponse);
};