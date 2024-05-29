import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: 'Marcadores'
})
export class Marcadores extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    idMarcador: number;

    @Column
    nombre: string;

    @Column({
        type: DataType.JSONB
    })
    coordenadas: object;
    
}
