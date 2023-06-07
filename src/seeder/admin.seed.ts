import 'reflect-metadata'
import { AppDataSource } from '../config/database.config'
import { Admin } from '../entities/admin.entity'

const AdminRepo = AppDataSource.getRepository(Admin)
const args = process.argv[2]
if(!args) {
    throw new Error('Please pprovide an argument')
}

