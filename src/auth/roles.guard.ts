import { CanActivate,ExecutionContext,ForbiddenException,Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";


@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get('role',context.getHandler());
        if(!requiredRoles){
            return true;
        }
        const request = context.switchToHttp().getRequest();
 
        const user = request.user;
       
        if (!user) {
          throw new ForbiddenException(
            'You must be logged in to perform this action',
          );
        }
         if (user.role !== requiredRoles) {
           throw new ForbiddenException('Access denied');
         }
            return true;
    }
}