import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Measure {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column()
  customerCode: string;

  @Column()
  measureDatetime: Date;

  @Column()
  measureType: string;

  @Column()
  imageUrl: string;

  @Column()
  measureValue: string;

  @Column({ default: false })  // Adicionando a propriedade 'confirmed' com valor padrão false
  confirmed: boolean;
}
