import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthenticationStrategies } from '../../../../constants/authentication-strategies';

@Injectable()
export class JwtAuthenticationGuard extends AuthGuard([
  AuthenticationStrategies.JWT,
]) {
  //#region Constructor

  public constructor() {
    super();
  }

  //#endregion

  //#region Methods

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const ableToActive = super.canActivate(context);
      let actualResult = false;

      if (ableToActive instanceof Promise) {
        actualResult = await ableToActive;
      } else if (ableToActive instanceof Observable) {
        actualResult = await firstValueFrom(ableToActive);
      } else {
        actualResult = ableToActive;
      }

      return actualResult;
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException();
    }
  }

  //#endregion
}
