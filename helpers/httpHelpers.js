
import {XMLParser, XMLBuilder, XMLValidator} from 'fast-xml-parser'

// "https://www.knautzfamilywi.com/CareFinder-1.0.0/api/key/get"
/*
 * Retrieves XML or JSON data from a url
*/
export async function makeGET(url) {
    console.log(url)
    const res = await fetch(url, {mode: 'cors' })



    try {

    
    const contentType = res.headers.get("content-type").split(';')[0]

    if (!res.ok) {
        console.err("Response not ok: ", res)
        return null
    }

    if (contentType === 'application/xml') {
        return new XMLParser().parse(await res.text());

    }
    else if (contentType === 'application/json'){
        return await res.json()
    }
    else {
        return await res.text()
    }
    }
    catch (err){
        console.error("Error paring data from url: " + url, err)
        return null
    }
    }


    export async function makePOST(url, body) {

        let contentType = 'json'
        contentType = 'xml'
        const options = {
            method: 'POST',
            body: body,
            headers: {'Content-Type': 'application/' + contentType},
            mode: 'cors'
        }

        const res = await fetch(url, options )

        if (!res.ok) {
            console.err("Response not ok: ", res)
            return null
        }
    
        try {
    
        
        const contentType = res.headers.get("content-type").split(';')[0]
    
        if (contentType === 'application/xml') {
            return new XMLParser().parse(await res.text());
    
        }
        else if (contentType === 'application/json'){
            return await res.json()
        }
        else {
            return await res.text()
        }
        }
        catch (err){
            console.error("Error paring data from url: " + url, err)
            return null
        }
        }


export async function proxyReq(url) {
    console.log('http://localhost:3000/api/hello?url=' + url)
    return await makeGET( 'http://localhost:3000/api/hello?url=' + url)
}