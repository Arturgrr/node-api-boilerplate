import { IPasswordHasher } from '@/application/providers/IPasswordHasher';
import { compare, hash } from 'bcryptjs';

export class BcryptPasswordHasher implements IPasswordHasher {
  private HASH_SALT_LENGTH = 8;

  async hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}