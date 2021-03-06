import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus, EventBus } from '@nestjs/cqrs';
import { BaseEvent } from '../events/base.event';
import { FindQuery } from '../queries/find.query';
import { FindOneQuery } from '../queries/findone.query';
import { CreateCommand } from '../commands/create.command';
import { DeleteCommand } from '../commands/delete.command';
import { DeleteOneCommand } from '../commands/delete-one.command';
import { UpdateOneCommand } from '../commands/update-one.command';
import { UpdateCommand } from '../commands/update.command';
import { IPayloadResult } from '../interfaces/IPayloadResult';
import { AppBaseEntity } from '../entity/base.entity';
import { BaseInput } from '../input/base.input';

@Injectable()
export abstract class BaseService<T extends AppBaseEntity> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  getCommandBus(): CommandBus {
    return this.commandBus;
  }

  getQueryBus(): QueryBus {
    return this.queryBus;
  }

  publish(event: BaseEvent) {
    this.eventBus.publish(event);
  }

  async findQuery(findQuery: FindQuery<T>): Promise<IPayloadResult<T>> {
    return await this.queryBus.execute(findQuery);
  }

  async findOneQuery(findOneQuery: FindOneQuery<T>): Promise<T> {
    return this.queryBus.execute(findOneQuery);
  }

  async createCommand<T extends BaseInput>(
    createCommand: CreateCommand<T>,
  ): Promise<T> {
    return this.commandBus.execute(createCommand);
  }

  async deleteCommand(deleteCommand: DeleteCommand<T>): Promise<any> {
    return this.commandBus.execute(deleteCommand);
  }

  async deleteOneCommand(
    deleteOneCommand: DeleteOneCommand<T>,
  ): Promise<T | null> {
    return this.commandBus.execute(deleteOneCommand);
  }

  async updateOneCommand(updateOneCommand: UpdateOneCommand<T>): Promise<T> {
    return this.commandBus.execute(updateOneCommand);
  }

  async updateCommand(updateCommand: UpdateCommand<T>): Promise<T[]> {
    return this.commandBus.execute(updateCommand);
  }
}
