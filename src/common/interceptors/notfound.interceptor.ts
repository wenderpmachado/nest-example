import { Interceptor, NestInterceptor, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Interceptor()
export class NotFoundInterceptor implements NestInterceptor {
    intercept(dataOrRequest, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
        return stream$.do(
            (result) => {
                if (!result) {
                    throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
                }
            }
        );
    }
}
