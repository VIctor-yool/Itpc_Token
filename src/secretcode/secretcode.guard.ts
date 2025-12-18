import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SecretcodeGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { headers } = context.switchToHttp().getRequest();
    const sc = headers['secret-code']
    if(!sc) throw new UnauthorizedException('시크릿코드가 필요합니다.');
    if(sc !== 'arombake') throw new UnauthorizedException('시크릿코드가 일치하지 않습니다.');
    return true;
  }
}
