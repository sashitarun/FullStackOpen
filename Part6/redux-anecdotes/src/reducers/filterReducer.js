
export const filterApplied = (content) =>
{
    return({
        type : 'APPLIED',
        data : {
            filterContent : content
        }
    })
}
const filterReducer = (state = '',action) => {
    switch (action.type) {
        case 'APPLIED':
            return action.data.filterContent
        default:
            return state;
    }
}

export default filterReducer
