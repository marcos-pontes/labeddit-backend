import { IdGenerator } from './../service/IdGenerator';
import { UserBusiness } from '../business/UsersBusiness';
import { UserController } from '../controller/UsersController';
import  express  from "express"
import { UserDatabase } from '../database/UsersDatabase';
import { TokenManager } from '../service/TokenManager';
import { HashManager } from '../service/HashManager';
export const userRouter = express.Router()
const userController = new UserController( 
    new UserBusiness(
        new UserDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
    )
)



userRouter.post("/signup", userController.signup)

userRouter.post("/login", userController.login)

