import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
  Get,
  Req,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { NotFoundException } from '@nestjs/common';

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  // 🔐 SIGNUP
  @Post("signup")
  signup(@Body() body) {
    return this.authService.signup(body.email, body.password);
  }

  // 🔐 LOGIN
  @Post("login")
  async login(@Body() body) {
    const user = await this.authService.validateUser(
      body.email,
      body.password
    );

    if (!user) throw new UnauthorizedException("Invalid credentials");

    return this.authService.login(user);
  }

  // 🔐 JWT PROTECTED ROUTE
  @UseGuards(AuthGuard("jwt"))
  @Get("profile")
  getProfile(@Req() req) {
    return req.user;
  }

  // 🔥 FORGOT PASSWORD
  @Post("forgot-password")
  forgotPassword(@Body("email") email: string) {
    return this.authService.forgotPassword(email);
  }

  // 🔥 RESET PASSWORD
@Post('reset-password')
resetPassword(@Body() body) {
  return this.authService.updatePassword(body.email, body.password);
}

  @Post('reset-direct')
async resetDirect(@Body() body) {
  const user = await this.authService.validateEmail(body.email);

  if (!user) throw new NotFoundException("User not found");

  return this.authService.updatePassword(body.email, body.password);
}

  // ================================
  // 🔥 GOOGLE OAUTH
  // ================================

  // Step 1: Redirect to Google
  @Get("google")
  @UseGuards(AuthGuard("google"))
  googleAuth() {}

  // Step 2: Google Callback
  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleCallback(@Req() req, @Res() res) {
    const token = await this.authService.googleLogin(req.user);

    // redirect to frontend with JWT
    res.redirect(
      `http://localhost:3001/oauth-success?token=${token.access_token}`
    );
  }
}