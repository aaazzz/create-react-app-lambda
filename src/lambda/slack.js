
console.log('NODE_ENV', process.env.NODE_ENV)
console.log('SLACK_URL', process.env.SLACK_WEBHOOK_URL)

import axios from 'axios'

const slackURL = process.env.SLACK_WEBHOOK_URL

export async function handler(event, context, callback) {
  const claims = context.clientContext && context.clientContext.user
  if (!claims) {
    return callback(null, {
      statusCode: 401,
      body: 'You must be signed in to call this function'
    })
  }
  if (event.httpMethod !== 'POST') {
    return callback(null, {
      statusCode: 410,
      body: 'Unsupported Request Method'
    })
  }
  const payload = event.body
  const body = {
    text: payload.text,
    attachment: [
      { "text": `From ${claims.email}` }
    ]
  }
  try {
    const response = await axios.post(slackURL, body)
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data.joke })
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
