import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  // ✅ FIXED HERE
  @Column({ type: 'varchar', nullable: true })
  resetToken: string | null;

  // ✅ FIXED HERE
  @Column({ type: 'timestamp', nullable: true })
  resetTokenExpiry: Date | null;
}