import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryColumn()
  public todo: string;

  @Column()
  public priority: number;
}
