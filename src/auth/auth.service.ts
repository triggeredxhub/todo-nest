import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
constructor(@InjectRepository(User) private userRepository: Repository<User>,
private jwtService: JwtService
) {}

async register(username: string, password: string)  {
    const exist = await this.userRepository.findOne({ where: { username } });
    if (exist) {
      throw new Error('User already exists');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ username, passwordHash });
    return this.userRepository.save(user);
    
}

async login(username: string , password: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    
    const token = await this.jwtService.signAsync({ sub : user.id , username: user.username });
    return { token, user : { id: user.id , username: user.username } };

}
}