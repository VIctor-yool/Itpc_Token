import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

// 세션 타입 확장
interface SessionData {
  lastAccessTime?: number;
  [key: string]: any;
}

interface RequestWithSession {
  session: SessionData;
}

@Injectable()
export class TimeGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithSession>();
    const session = request.session;

    // 세션이 없으면 에러
    if (!session) {
      throw new UnauthorizedException('세션이 없습니다.');
    }

    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    // 현재 시간이 1시 10분(13:10) 이상이고, 1시 15분(13:15) 이하인 경우만 통과
    if (hour === 13 && minute >= 10 && minute <= 15) {
      return true;
    } else {
      throw new UnauthorizedException('허용된 시간이 아닙니다. 13:10 ~ 13:15에만 접근할 수 있습니다.');
    }
  }
}