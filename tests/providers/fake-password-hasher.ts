import { IPasswordHasher } from '../../src/application/providers/IPasswordHasher';

export class FakePasswordHasher implements IPasswordHasher {
  async hash(plain: string): Promise<string> {
    return `${plain}-hashed`;
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return `${plain}-hashed` === hash;
  }
}