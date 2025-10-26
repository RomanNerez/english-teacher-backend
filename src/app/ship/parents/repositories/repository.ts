import { ObjectLiteral } from 'typeorm';
import AbstractRepository from '@ship/core/repositories/repository';

export default abstract class Repository<T extends ObjectLiteral> extends AbstractRepository<T> {

}