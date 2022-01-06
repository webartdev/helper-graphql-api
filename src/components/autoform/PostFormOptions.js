import * as yup from "yup"
//#endregion
export const shared = {
    // options: {
    //     who: [
    //         { value: "Elena Pearson", display: "Elena Pearson" }
    //     ]
    // },
    validationSchema: yup.object({
        postBody: yup.string().required("Post details are required"),
        postTitle: yup.string().required("Post title is required"),
        postOwnerUsername: yup.string().required("Post Username is required"),
        postOwnerId: yup.string().required("Post owner ID is required and could be a random number"),
    })
}
//#endregion
export const getFieldData = (state) => {
    return [
        // {
        //     id: "Who",
        //     label: "Who",
        //     options: shared.options.who,
        //     fieldType: "select"
        // },
        {
            id: "postBody",
            label: "post Body"
        },
        {
            id: "postTitle",
            label: "post Title"
        },
        {
            id: "postOwnerId",
            label: "post Owner Id"
        },
        {
            id: "postOwnerUsername",
            label: "post Owner Username"
        },
        {
            fullWidth: true,
            variant: "contained",
            color: "primary",
            type: "submit",
            text: state.modalType,
            fieldType: "button"
        },
    ]
}