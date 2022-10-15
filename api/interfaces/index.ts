interface Production {
  url: string;
}

interface Development {
  url: string;
}

export interface Config {
  production: Production;
  development: Development;
  expiresIn?: string;
  secret: string
}

export interface Base {
  id: string;
  updatedAt: string;
  createdAt: string;
  deletedAtt?: string;
}

export interface SuccessResponse {
  message: string;
  data: any;
}

export interface ErrorResponse {
  msg: any;
  error: string;
}
