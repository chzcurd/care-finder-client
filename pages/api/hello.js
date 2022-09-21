// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {makeGET} from "../../helpers/httpHelpers"

//"https://www.knautzfamilywi.com/CareFinder-1.0.0/api/key/get"
export default async function handler(req, res) {

   const output = await makeGET(req.query.url)
    //console.log( output)
    res.status(200).json(output)


}
