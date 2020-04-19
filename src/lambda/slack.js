import axios from 'axios'
console.log('NODE_ENV', process.env.NODE_ENV)
console.log('SLACK_URL', process.env.SLACK_WEBHOOK_URL)
const slackURL = process.env.SLACK_WEBHOOK_URL
export async function handler(event, context, callback) {
  if (event.httpMethod !== 'POST') {
    return callback(null, {
      statusCode: 410,
      body: 'Unsupported Request Method'
    })
  }
  const data = event.body
  try {
    const response = await axios.post(slackURL, data)
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
