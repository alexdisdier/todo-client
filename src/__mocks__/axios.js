module.exports = {
  get: jest.fn(() => {
    return Promise.resolve({
      data: [
        {
          date: "2019-07-09T10:22:02.876Z",
          title: "GraphQL",
          isDone: false,
          pos: 3,
          _id: "5d246aee8e50ad0017f8c2ac",
          __v: 0
        },
        {
          date: "2019-09-23T05:18:31.813Z",
          title: "React",
          isDone: false,
          pos: 2,
          _id: "5d8855c8eb9ed00017e0a46c",
          __v: 0
        }
      ]
    });
  }),
  post: jest.fn(() => {
    return Promise.resolve({
      data: {}
    });
  })
};
