const productConfig = {
  mysql: {
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'wsxokn258lxl',
    database: 'my-project',
    connection: 10,
  },
};

const localConfig = {
  mysql: {
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'wsxokn258lxl',
    database: 'my-project',
    connection: 10,
  },
};

// 本地运行是没有process.env.NODE_ENV的，借此来区分【开发环境】和【生产环境】
const config = process.env.NODE_ENV ? productConfig : localConfig;

export default config;
