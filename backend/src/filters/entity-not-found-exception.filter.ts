import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { EntityMetadataNotFoundError, EntityNotFoundError } from "typeorm";
import { Response } from "express";

@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: EntityMetadataNotFoundError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        
        return response.status(HttpStatus.NOT_FOUND).json({
            error: 'Not found',
            message: exception.message,
        });
    }
}