import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../instances/pg'


// Criando a interface que vai ser extensivel ao Model do sequelize

export interface UserInstance extends Model {
  id: number
  email: string
  password: string
}


// ensinando ao sequelize como está estruturado o nosso banco de dados para ele conseguir trabalhar.

export const User = sequelize.define<UserInstance>('User', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'users',
  timestamps: false
})