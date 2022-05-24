const AWS = require('./aws-sdk')
const axios = require('axios')
const CognitoExpress = require('cognito-express')
const cognito = new AWS.CognitoIdentityServiceProvider()

const signUpFlow = async (email, password) => {
    await cognito
        .adminCreateUser({
            UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
            Username: email,
            MessageAction: 'SUPPRESS',
            TemporaryPassword: password,
        })
        .promise()
    const initAuthResponse = await cognito
        .adminInitiateAuth({
            AuthFlow: 'ADMIN_NO_SRP_AUTH',
            ClientId: process.env.AWS_COGNITO_CLIENT_ID,
            UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
            },
        })
        .promise()
    if (initAuthResponse.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
        await cognito
            .adminRespondToAuthChallenge({
                ChallengeName: 'NEW_PASSWORD_REQUIRED',
                ClientId: process.env.AWS_COGNITO_CLIENT_ID,
                UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
                ChallengeResponses: {
                    USERNAME: email,
                    NEW_PASSWORD: password,
                },
                Session: initAuthResponse.Session,
            })
            .promise()
    }
}

const signInFlow = async (email, password) => {
    return await cognito
        .adminInitiateAuth({
            AuthFlow: 'ADMIN_NO_SRP_AUTH',
            ClientId: process.env.AWS_COGNITO_CLIENT_ID,
            UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
            },
        })
        .promise()
}

const getCognitoUserEmail = async function getCognitoUserEmail(token) {
    const body = {
        AccessToken: token,
    }

    const headers = {
        'Content-Type': 'application/x-amz-json-1.1',
        'X-Amz-Target': 'AWSCognitoIdentityProviderService.GetUser',
    }

    const URL = `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com`

    const response = await axios.post(URL, body, {
        headers: headers,
    })
    const userAttr = response.data.UserAttributes
    const email = userAttr.find((x) => x.Name === 'email').Value
    return email
}

const cognitoExpress = new CognitoExpress({
    region: process.env.AWS_REGION,
    cognitoUserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
    tokenUse: 'access',
    tokenExpiration: 3600000,
})

module.exports = {
    signUpFlow,
    signInFlow,
    cognitoExpress,
    getCognitoUserEmail,
}
