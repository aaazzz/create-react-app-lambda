import axios from 'axios'
const slackURL = process.env.SLACK_WEBHOOK_URL || 'https://hooks.slack.com/services/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'
console.log(slackURL)
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
    console.log(response)
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
