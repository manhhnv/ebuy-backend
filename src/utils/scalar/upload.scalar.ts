import { Scalar } from '@nestjs/graphql';

import { GraphQLUpload } from 'apollo-server-express';
@Scalar('Upload')
export class Upload {
  description = 'Upload custom scalar type';

  parseValue(value) {
    return GraphQLUpload.parseValue(value);
  }

  serialize(value: any) {
    return GraphQLUpload.serialize(value);
  }

  parseLiteral(ast) {
    return GraphQLUpload.parseLiteral(ast, null);
  }
}
