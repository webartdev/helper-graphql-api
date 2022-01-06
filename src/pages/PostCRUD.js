import { useQuery, useQueryClient, useMutation } from "react-query";
import { API, graphqlOperation } from 'aws-amplify';
import { updatePost, deletePost, createPost } from "../graphql/mutations";
import { listPosts } from "../graphql/queries";

export const PostCRUD = () => {
    const queryVariables = {
        limit: 300
    }

    async function newPost(variables) {
        const {
            // id,
            postBody,
            postTitle,
            postOwnerId,
            postOwnerUsername,
        } = variables;
        return await API.graphql(
            graphqlOperation(createPost, {
                input: {
                    // id,
                    postBody,
                    postTitle,
                    postOwnerId,
                    postOwnerUsername,
                }
            })
        )
    }

    async function editPost(variables) {
        return await API.graphql(
            graphqlOperation(updatePost, { input: variables })
        )
    }

    const useMutatePost = (mutationFn) => {
        const queryClient = useQueryClient();

        return useMutation(mutationFn, {
            onSuccess: () => {
                queryClient.invalidateQueries(["posts"])
            }
        })
    };

    const create = useMutatePost(newPost)
    const update = useMutatePost(editPost)
    const query = useQuery(["posts"], () =>
        API.graphql(graphqlOperation(listPosts, queryVariables))
    )

    return {
        create,
        query,
        update
    };
}
