import { Transform, TransformFnParams } from 'class-transformer';
import { RemoveDto } from 'common/dto/remove.dto.js';

const toBoolean = (value: unknown) => {
  switch (value) {
    case null:
      return 'Failure';
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return value;
  }
};

export const ToBoolean = () =>
  Transform(({ obj, key }) => {
    const getKeyValue = <T extends object, U extends keyof T>(
      obj: T,
      key: U,
    ) => {
      return obj[key];
    };
    toBoolean(getKeyValue(obj, key));
  });
