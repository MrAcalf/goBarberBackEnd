import { uuid } from 'uuidv4'

import IUserTokenRepository from '../IUserTokensRepository'

import UserToken from '../../infra/typeorm/entities/UserToken'

class FakeUserTokensRepository implements IUserTokenRepository {
    private usersTokens: UserToken[] = []

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = new UserToken()

        Object.assign(userToken, {
            id: uuid(),
            token: uuid(),
            user_id
        })

        this.usersTokens.push(userToken)

        return userToken
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = this.usersTokens.find(
            findToken => findToken.token === token
        )

        return userToken
    }
}

export default FakeUserTokensRepository
