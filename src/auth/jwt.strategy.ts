import { Injectable,UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ProfileService } from "src/profiles/profile.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private profileService: ProfileService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    async validate(payload:any){
        const { profile_id,id,email } = payload;
        const profile = await this.profileService.findProfileByID(profile_id);
        console.log("JWT",profile);
        if (!profile) {
      throw new UnauthorizedException('Profile not found for this token');
    }
    return{
         role: profile?.role,
         status: profile?.status,
    }
    }
}