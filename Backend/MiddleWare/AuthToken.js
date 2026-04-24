const { auth } = require("express-oauth2-jwt-bearer")
const authVerify=auth({
    audience:'https://quiz-api.local',
    issuerBaseURL: 'https://dev-4qvcpdg6vfkv0i6p.us.auth0.com/',
    tokenSigningAlg: 'RS256',

})
module.exports={authVerify}