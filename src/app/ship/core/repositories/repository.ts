import { Repository as TypeORMRepository, ObjectLiteral } from 'typeorm';

export default abstract class Repository<T extends ObjectLiteral> extends TypeORMRepository<T> {

}
