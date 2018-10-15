const dummy = (blogs) => {
  blogs
  return 1
}

const totalLikes = (Blogs) => {
  return Blogs.length === 0 ? 0 : Blogs.map(e => e.likes).reduce((acc, cur) => acc + cur)
}

const favoriteBlog = (Blogs) => {
  const compareBlogs = (acc, cur) => {
    if(acc.likes < cur.likes){return cur}
    else return acc
  }
  const formatResult = (result) => {
    return({
      title: result.title,
      author: result.author,
      likes: result.likes
    })
  }
  return Blogs.length === 0 ? 'no favorite blog' : formatResult(Blogs.reduce((acc, cur) => acc = compareBlogs(acc, cur)))
}

const mostBlogs = (Blogs) => {
  const authorList = (Blogs) => {
    const list = []
    Blogs.forEach(e => {
      if(!list.map(x => x.author).includes(e.author)){
        list.push({ author: e.author, blogs: 1 })
      } else if (list.map(x => x.author).includes(e.author)){
        list.find(y => y.author === e.author).blogs += 1
      } else {
        console.log('somehting wrong with ', list)
      }
    })
    return list
  }
  const compareAuthors = (acc, cur) => {
    if(acc.blogs < cur.blogs){return cur}
    else return acc
  }
  return Blogs.length === 0 ? 'no blogs' : authorList(Blogs).reduce((acc, cur) => compareAuthors(acc, cur))
}

const mostLikes = (Blogs) => {
  const authorList = (Blogs) => {
    const list = []
    Blogs.forEach(e => {
      if(!list.map(x => x.author).includes(e.author)){
        list.push({ author: e.author, likes: e.likes })
      } else if (list.map(x => x.author).includes(e.author)){
        list.find(y => y.author === e.author).likes += e.likes
      } else {
        console.log('somehting wrong with ', list)
      }
    })
    return list
  }
  const compareAuthors = (acc, cur) => {
    if(acc.likes < cur.likes){return cur}
    else return acc
  }
  return Blogs.length === 0 ? 'no blogs' : authorList(Blogs).reduce((acc, cur) => compareAuthors(acc, cur))
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}