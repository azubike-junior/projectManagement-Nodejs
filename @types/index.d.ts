interface Production {
  url: string;
//   dialect: string;
}

interface Development {
  url: string;
//   dialect?: string;
}

interface Config {
  production: Production;
  development: Development;
}



interface Authenticate {
  email?: string;
  password: string;
}