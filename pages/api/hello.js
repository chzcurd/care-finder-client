// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import https from 'https'

export default function handler(req, res) {

  const makeRequest = async() => {
    https.get("https://www.knautzfamilywi.com/CareFinder-1.0.0/api/key/get", (resp) => {
      let data = ''
  
      // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(data)
      return data
    });
  
    }).on("error", (err) => {
      return "Error : " + err.message  
      
    })
  }

  console.log("test")

   makeRequest().then( output => {
    console.log("in output " + output)
    res.status(200).json({ data: output })

   })


}
