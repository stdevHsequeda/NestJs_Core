import { InputType, Field } from '@nestjs/graphql';
import { IQualitativeFieldOptions } from 'src/core/interfaces/IQualitativeFieldOptions';

/**
 * Options to filter by a String object. You only can use a field at a time.
 *
 * @export
 * @class StringFieldOptions
 * @implements {IQualitativeFieldOptions<string>}
 */
@InputType({
  description:
    'Options to filter by a String object. You only can use a field at a time.',
})
export class StringFieldOptions implements IQualitativeFieldOptions<string> {
  @Field(() => Boolean, { nullable: true })
  isNull?: boolean;
  @Field(() => String, { nullable: true })
  any?: string[];
  @Field(() => String, { nullable: true })
  is?: string;
  @Field(() => String, { nullable: true })
  not?: string;
  @Field(() => String, { nullable: true })
  in?: string[];
  @Field(() => String, { nullable: true })
  notIn?: string[];
  @Field(() => String, { nullable: true })
  contains?: string;
  @Field(() => String, { nullable: true })
  notContains?: string;
  @Field(() => String, { nullable: true })
  startsWith?: string;
  @Field(() => String, { nullable: true })
  notStartsWith?: string;
  @Field(() => String, { nullable: true })
  endsWith?: string;
  @Field(() => String, { nullable: true })
  notEndsWith?: string;
}
