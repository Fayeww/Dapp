import { fetcher } from "../../graphql/auth-fetcher";
import {
  ChallengeQuery,
  ChallengeQueryVariables,
  ChallengeDocument,
  ChallengeRequest,
} from "../../graphql/generated";
import { apolloClient } from './apollo-client';


export const generateChallenge = async (request: ChallengeRequest) => {
  const result = await apolloClient.query({
    query: ChallengeDocument,
    variables: {
      request,
    },
  });

  return result.data.challenge;
};