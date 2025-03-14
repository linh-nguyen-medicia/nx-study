import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable } from "@nestjs/common";
import { IAuthenticationOptions } from '../../../../interfaces/authentication-options.interface';
import { IValidateReturn } from '../../../../interfaces/validate-return.interface';
import { OPTIONS__IDP } from '../../../../constants/injectors';
import { AuthenticationStrategies } from '../../../../constants/authentication-strategies';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  AuthenticationStrategies.JWT
) {
  //#region Constructor

  public constructor(
    @Inject(OPTIONS__IDP)
    protected readonly _options: IAuthenticationOptions
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: _options.ignoreExpiration,
      secretOrKey: _options.key,
      issuer: _options.issuer,
      audience: _options.audience,
      algorithms: ["HS256", "RS256"],
    });
  }

  //#endregion

  //#region Methods

  public async validate(payload: any): Promise<IValidateReturn> {
    return {
      userId: payload.identities[0].userId,
      username: payload.nickname,
      name: payload.name,
      picture: payload.picture,
    };
  }

  //#endregion
}
