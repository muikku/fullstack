let token = null

const blogs = [
    {
    id: "5bd6f2fbb8fc49156abc0f95",
    title: "Lets put emphasis in blogs",
    author: "Blogger",
    url: "url",
    likes: 5,
    user: "5bd6e45045646310e6638e28"
        },
    {
    id: "5bd83e0b354678124ba310ff",
    title: "Niaga falls omg",
    author: "Activist N",
    url: "url",
    likes: 5,
    user: "5bd6e45045646310e6638e28"
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

const getUserBlogs = () => {
    return Promise.resolve(blogs)
}

const setToken = (newToken) => {
    token = `bearer ${newToken}`
  }

export default {getAll, blogs, getUserBlogs, setToken}