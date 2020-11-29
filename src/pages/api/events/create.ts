import { GraphQLClient } from "graphql-request"

export default async ({ body }, res) => {
  const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_URL, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_MUTATION_TOKEN}`,
    },
  })

  const { createVote } = await graphcms.request(
    `mutation upvoteProduct($id: ID!) {
      createVote(data: { product: { connect: { id: $id } } }) {
        id
      }
    }`,
    { id: body.id },
  )

  await graphcms.request(
    `mutation publishUpvote($id: ID!) {
      publishVote(where: { id: $id }, to: PUBLISHED) {
        id
      }
    }`,
    { id: createVote.id },
  )

  res.status(201).json({ id: createVote.id })
}
