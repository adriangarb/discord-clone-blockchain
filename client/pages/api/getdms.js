import { client } from '../../lib/client'

const query = `*[_type == "conversations" && isDm==true]{
  roomId,
  roomName,
  "avatar": image.asset->url
}`

export default async (req, res) => {
  try {
    const sanityResponse = await client.fetch(query)
    const response = sanityResponse.map(item => {
      return item
    })
    res.status(200).send(response)
  } catch (error) {
    console.error(error)
    res.status(500).send('error', error)
  }
}