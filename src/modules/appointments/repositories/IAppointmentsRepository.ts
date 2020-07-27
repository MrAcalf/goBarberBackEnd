import Appointment from '../infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInMothFromProviderDTO from '@modules/appointments/dtos/IFindAllInMothFromProviderDTO'
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO'

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>
    findByDate(date: Date): Promise<Appointment | undefined>
    findAllInMothFromProvider(
        data: IFindAllInMothFromProviderDTO
    ): Promise<Appointment[]>
    findAllInDayFromProvider(
        data: IFindAllInDayFromProviderDTO
    ): Promise<Appointment[]>
}
