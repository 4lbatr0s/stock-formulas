const schemas = {
  MOCK: {
    QUOTES: () => {
      return (
        [
          {
            T: "t",
            i: 96921,
            S: "TSLA",
            x: "D",
            p: Math.random() * 100 + 100,
            s: 1,
            t: "2021-02-22T15:51:44.208Z",
            c: ["@", "I"],
            z: "C",
          },
          {
            T: "t",
            i: 96921,
            S: "AMZN",
            x: "D",
            p: Math.random() * 100 + 100,
            s: 1,
            t: "2021-02-22T15:51:44.208Z",
            c: ["@", "I"],
            z: "C",
          },
          {
            T: "t",
            i: 96921,
            S: "MSFT",
            x: "D",
            p: Math.random() * 100 + 100,
            s: 1,
            t: "2021-02-22T15:51:44.208Z",
            c: ["@", "I"],
            z: "C",
          },
          {
            T: "t",
            i: 96921,
            S: "GOOGL",
            x: "D",
            p: Math.random() * 100 + 100,
            s: 1,
            t: "2021-02-22T15:51:44.208Z",
            c: ["@", "I"],
            z: "C",
          },
        ]
      )
    }
     
  },
};

export default schemas;
