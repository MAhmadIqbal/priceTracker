import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNumber, Min, IsIn } from 'class-validator';

export class CreateAlertDto {
  @ApiProperty({
    example: 'ethereum',
    description: 'The blockchain name (e.g., ethereum or polygon)',
  })
  @IsString()
  @IsIn(['ethereum', 'polygon'], {
    message: 'Chain must be either ethereum or polygon',
  })
  chain: string;

  @ApiProperty({ example: 1000, description: 'Target price for the alert' })
  @IsNumber()
  @Min(0, { message: 'Price must be a positive number' })
  price: number;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email to notify when the target price is reached',
  })
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;
}
