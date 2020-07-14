const dummy = (blogs) => {
    var len = blogs.length
    if(len >=0 ) return 1
    else return 0
}

const totalLikes = (blogs) =>
{
    
    return blogs.reduce((sum , blog) =>
    {
        return sum + blog.likes
    },0)
}

const favouriteBlog = (blogs) =>
{
    const copy = blogs

    var highestIndex = 0 
    var highestLikes = 0
    var index = -1 

    copy.map((blog) =>
    {
        index = index + 1
        if(blog.likes > highestLikes) 
        {
            highestIndex = index
            highestLikes = blog.likes
        }
    })

    delete copy[highestIndex]._id
    delete copy[highestIndex].__v
    delete copy[highestIndex].url

    return copy[highestIndex]

}
module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
}