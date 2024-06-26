import { PartialType } from '@nestjs/mapped-types';
import { CreateEcommerceDto } from './create-ecommerce.dto';

export class UpdateEcommerceDto extends PartialType(CreateEcommerceDto) {}
