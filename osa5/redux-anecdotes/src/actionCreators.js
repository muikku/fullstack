export default {
    anecdoteCreation(content) {
        return {
            type: 'ADDNEW',
            data: { content }
        }
    },
    vote(id) {
        return{
            type: 'VOTE',
            data: { id }
        }
    }
}