import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import * as crypto from "crypto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  // 🔐 SIGNUP
  async signup(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    return this.usersService.create(email, hashed);
  }

  // 🔐 VALIDATE USER
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) return null;

    // for google users (no password)
    if (!user.password) return null;

    const match = await bcrypt.compare(password, user.password);
    return match ? user : null;
  }

  // 🔐 LOGIN (JWT)
  async login(user: any) {
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // 🔥 GOOGLE LOGIN
  async googleLogin(profile: any) {
    let user = await this.usersService.findByEmail(profile.email);

    if (!user) {
      user = await this.usersService.create(profile.email);
    }

    return this.login(user);
  }

  // 🔥 FORGOT PASSWORD
  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    await this.usersService.save(user);

    return {
      message: "Reset link generated",
      link: `http://localhost:3001/reset-password?token=${token}`,
    };
  }


  async validateEmail(email: string) {
  return this.usersService.findByEmail(email);
}

async updatePassword(email: string, password: string) {
  const user = await this.usersService.findByEmail(email);

  // ✅ FIX HERE
  if (!user) {
    throw new NotFoundException('User not found');
  }

  const hashed = await bcrypt.hash(password, 10);

  user.password = hashed;

  await this.usersService.save(user);

  return { message: 'Password updated successfully' };
}
}