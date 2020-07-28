import { getMongoRepository, MongoRepository } from 'typeorm'

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification'
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO'

export default class NotificationsRepository implements INotificationsRepository {
    private ormRepository: MongoRepository<Notification>

    constructor() {
        this.ormRepository = getMongoRepository(Notification, 'mongo')
    }

    public async create({ content, recipient_id }: ICreateNotificationDTO): Promise<Notification> {
        const notifications = this.ormRepository.create({ content, recipient_id })

        await this.ormRepository.save(notifications)

        return notifications
    }
}
