import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post(`/signup`)
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.AuthService.signUp(authCredentialsDto);
  }
  @Post(`/signin`)
  singIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{
    accessToken: string;
  }> {
    return this.AuthService.signIn(authCredentialsDto);
  }
}
