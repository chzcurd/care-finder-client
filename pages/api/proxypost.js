// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {makePOST} from "../../helpers/httpHelpers"

//"https://www.knautzfamilywi.com/CareFinder-1.0.0/api/key/get"

/**
 * USAGE http://localhost:3000/api/proxypost?path=/api/test123
 */
export default async function handler(req, res) {

    console.log(req.body)

    const hostURL = 'http://' + req.headers.host + req.query.path
    

    console.log(req.query.path)

        const options = {
            method: 'POST',
            body: req.body,
            headers: {'Content-Type': 'application/' + contentType},
            mode: 'cors'
        }

        const output = await fetch(hostURL, options )

        console.log(output)
    
        return output.text().then(text => res.status(output.status).end(text))


}
