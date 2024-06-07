import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from 'rxjs'
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
     
     canActivate(
          context : ExecutionContext
     ) :boolean | Promise<boolean> | Observable<boolean> {
          const request = context.switchToHttp().getRequest();
          return this.validateRequest(request)
     }

     validateRequest(request: any): boolean {
          const token = request.headers.authorization;
      
          if (!token) {
            return false;
          }

          const newToken = token.substring(7)

          try {
            
            const decoded = jwt.verify(newToken, process.env.JWT_SECRET);
          
            return true;
          } catch (err) {
            console.log(err)
            return false;
          }
        }

}